using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaApi.DTOs;
using SistemaApi.Entidades;
using SistemaApi.Utilidades;
using System.Linq;

namespace SistemaApi.Controllers
{
    [ApiController]
    [Route("api/ventascf")]
    public class VentasConsumidorFinalController: ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public VentasConsumidorFinalController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<VentaConsumidorFinalDTO>> Get(int id)
        {
            var venta = await context.VentaConsumidorFinal.Include(x => x.VentaCFProducto).ThenInclude(x => x.Producto).FirstOrDefaultAsync(x => x.Id == id);

            if (venta == null) { return NotFound(); }

            var dto = mapper.Map<VentaConsumidorFinalDTO>(venta);
            return dto;
        }

        [HttpGet("filtrar")]
        public async Task<ActionResult<List<VentaConsumidorFinalDTO>>> Filtrar([FromQuery] VentaConsumidorFinalFiltrarDTO ventaConsumidorFinalFiltrarDTO)
        {
            if (ventaConsumidorFinalFiltrarDTO.Registrado && !ventaConsumidorFinalFiltrarDTO.Consumidor)
            {
                return new List<VentaConsumidorFinalDTO>();
            }
            else
            {
                var ventasQueryable = context.VentaConsumidorFinal.AsQueryable();
                if (ventaConsumidorFinalFiltrarDTO.ProductoId != 0)
                {
                    ventasQueryable = ventasQueryable
                        .Where(x => x.VentaCFProducto.Select(y => y.ProductoId)
                        .Contains(ventaConsumidorFinalFiltrarDTO.ProductoId));
                }

                if (ventaConsumidorFinalFiltrarDTO.FechaDeVenta != null)
                {

                    ventasQueryable = ventasQueryable.Where(x => x.FechaDeVenta.Date <= ventaConsumidorFinalFiltrarDTO.FechaDeVenta.Value.Date);
                }

                await HttpContext.InsertarParametrosPaginacionEnCabecera(ventasQueryable);

                var ventas = await ventasQueryable.Paginar(ventaConsumidorFinalFiltrarDTO.PaginacionDTO).ToListAsync();
                return mapper.Map<List<VentaConsumidorFinalDTO>>(ventas);
            }   
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] VentaCreacionCFDTO ventaCreacioncfDTO)
        {
            double total = 0;

            if (ventaCreacioncfDTO.ProductosIds.Count == 0)
            {
                return BadRequest("Ingresar al menos un producto");
            }
            foreach (var tuple in ventaCreacioncfDTO.ProductosIds)
            {
                var producto = await context.Productos.FirstOrDefaultAsync(x => x.Id == tuple[0]);
                if (tuple[1] > producto.Cantidad)
                {
                    return BadRequest("No hay suficientes unidades del producto");
                }
            }
            foreach (var tuple in ventaCreacioncfDTO.ProductosIds)
            {
                var id = tuple[0];
                var cantidad = tuple[1];
                var producto = await context.Productos.FirstOrDefaultAsync(x => x.Id == id);
                producto.Cantidad = producto.Cantidad - cantidad;
                total = total + (producto.Precio * cantidad);
            }
            var venta = mapper.Map<VentaConsumidorFinal>(ventaCreacioncfDTO);
            venta.PrecioTotal = total;
            venta.FechaDeVenta = DateTime.Now;
            context.Add(venta);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
