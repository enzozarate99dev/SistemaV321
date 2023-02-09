using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaApi.DTOs;
using SistemaApi.Entidades;
using SistemaApi.Utilidades;

namespace SistemaApi.Controllers
{
    [ApiController]
    [Route("api/presupuestos")]
    public class PresupuestoController: ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public PresupuestoController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("filtrar")]
        public async Task<ActionResult<List<PresupuestosDTO>>> Filtrar([FromQuery] PresupuestoFiltrarDTO presupuestoFiltrarDTO)
        {
            var productosQueryable = context.Presupuestos.Include(x=>x.PresupuestoProducto).ThenInclude(y=>y.Producto).AsQueryable();

            if (!string.IsNullOrEmpty(presupuestoFiltrarDTO.Nombre))
            {
                productosQueryable = productosQueryable.Where(x => x.Nombre.Contains(presupuestoFiltrarDTO.Nombre));
            }
            if (presupuestoFiltrarDTO.ProductoId != 0)
            {
                productosQueryable = productosQueryable
                    .Where(x => x.PresupuestoProducto.Select(y => y.ProductoId)
                    .Contains(presupuestoFiltrarDTO.ProductoId));
            }

            if (presupuestoFiltrarDTO.FechaDeVenta != null)
            {

                productosQueryable = productosQueryable.Where(x => x.FechaDeVenta.Date <= presupuestoFiltrarDTO.FechaDeVenta.Value.Date);
            }

            await HttpContext.InsertarParametrosPaginacionEnCabecera(productosQueryable);

            var presupuestos = await productosQueryable.Paginar(presupuestoFiltrarDTO.PaginacionDTO).OrderBy(x => x.Nombre).ToListAsync();
            var resultado = mapper.Map<List<PresupuestosDTO>>(presupuestos);
            return resultado;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<PresupuestosDTO>> Get(int id)
        {
            var presupuesto = await context.Presupuestos.Include(x => x.PresupuestoProducto).ThenInclude(x => x.Producto).FirstOrDefaultAsync(x => x.Id == id);

            if (presupuesto == null) { return NotFound(); }

            var dto = mapper.Map<PresupuestosDTO>(presupuesto);
            return dto;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PresupuestoCreacionDTO presupuestoCreacionDTO)
        {
            double total = 0;

            if (presupuestoCreacionDTO.ProductosIds.Count == 0)
            {
                return BadRequest("Ingresar al menos un producto");
            }
            foreach (var tuple in presupuestoCreacionDTO.ProductosIds)
            {
                var producto = await context.Productos.FirstOrDefaultAsync(x => x.Id_producto == tuple[0]);
                if (tuple[1] > producto.Cantidad)
                {
                    return BadRequest("No hay suficientes unidades del producto");
                }
            }
            foreach (var tuple in presupuestoCreacionDTO.ProductosIds)
            {
                var id = tuple[0];
                var cantidad = tuple[1];
                var producto = await context.Productos.FirstOrDefaultAsync(x => x.Id_producto == id);
                producto.Cantidad = producto.Cantidad - cantidad;
                total = total + (producto.Precio * cantidad);
            }
            total = total - (total * (presupuestoCreacionDTO.Descuento / 100));
            var presupuesto = mapper.Map<Presupuestos>(presupuestoCreacionDTO);
            presupuesto.PrecioTotal = total;
            presupuesto.FechaDeVenta = DateTime.Now;
            context.Add(presupuesto);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] PresupuestoCreacionDTO presupuestoCreacionDTO)
        {
            var presupuesto = await context.Presupuestos.Include(x => x.PresupuestoProducto).FirstOrDefaultAsync(x => x.Id == id);
            double total = 0;

            if (presupuesto == null)
            {
                return NotFound();
            }
            if (presupuestoCreacionDTO.ProductosIds.Count == 0)
            {
                return BadRequest("Ingresar al menos un producto");
            }
            foreach (var tuple in presupuestoCreacionDTO.ProductosIds)
            {
                var producto = await context.Productos.FirstOrDefaultAsync(x => x.Id_producto == tuple[0]);
                if (tuple[1] > producto.Cantidad)
                {
                    return BadRequest("No hay suficientes unidades del producto");
                }
            }

            foreach (var tuple in presupuestoCreacionDTO.ProductosIds)
            {
                var idP = tuple[0];
                var cantidad = tuple[1];
                var producto = await context.Productos.FirstOrDefaultAsync(x => x.Id_producto == idP);
                producto.Cantidad = producto.Cantidad - cantidad;
                total = total + (producto.Precio * cantidad);
            }
            total = total - (total * (presupuestoCreacionDTO.Descuento / 100));

            presupuesto = mapper.Map(presupuestoCreacionDTO, presupuesto);
            presupuesto.PrecioTotal = total;

            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var presupuesto = await context.Presupuestos.FirstOrDefaultAsync(x => x.Id == id);

            if (presupuesto == null)
            {
                return NotFound();
            }

            context.Remove(presupuesto);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
