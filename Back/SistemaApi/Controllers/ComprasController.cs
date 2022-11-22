using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaApi.DTOs;
using SistemaApi.Entidades;

namespace SistemaApi.Controllers
{
    [ApiController]
    [Route("api/compras")]
    public class ComprasController: ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ApplicationDbContext context;

        public ComprasController(IMapper mapper, ApplicationDbContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<CompraDTO>>> Get()
        {
            var compras = await context.Compras.Include(x => x.CompraProducto).ThenInclude(x => x.Producto).ToListAsync();
            var resultado = mapper.Map<List<CompraDTO>>(compras);

            return resultado;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CompraCreacionDTO compraCreacionDTO)
        {
            double total = 0;
            var proveedor = await context.Proveedores.FirstOrDefaultAsync(x => x.Id == compraCreacionDTO.ProveedorId);
            if (proveedor == null)
            {
                return BadRequest("El cliente no esta registrado");
            }

            if (compraCreacionDTO.ProductosIds.Count == 0)
            {
                return BadRequest("Ingresar al menos un producto");
            }
            foreach (var tuple in compraCreacionDTO.ProductosIds)
            {
                var producto = await context.Productos.FirstOrDefaultAsync(x => x.Id == tuple[0]);
                if (tuple[1] > producto.Cantidad)
                {
                    return BadRequest("No hay suficientes unidades del producto");
                }
            }
            foreach (var tuple in compraCreacionDTO.ProductosIds)
            {
                var id = tuple[0];
                var cantidad = tuple[1];
                var producto = await context.Productos.FirstOrDefaultAsync(x => x.Id == id);
                producto.Cantidad = producto.Cantidad - cantidad;
                total = total + (producto.Precio * cantidad);
            }
            var compra = mapper.Map<Compra>(compraCreacionDTO);
            compra.PrecioTotal = total;
            compra.FechaDeCompra = DateTime.Now;
            context.Add(compra);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
