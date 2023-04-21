using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaApi.DTOs;
using SistemaApi.Entidades;
using SistemaApi.Utilidades;

namespace SistemaApi.Controllers
{
    [Route("/api/productos")]
    [ApiController]
    public class ProductoController: ControllerBase
    {
        private readonly ILogger<ProductoController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IAlmacenadorArchivos almacenadorArchivos;
        private readonly string contenedor = "actores";

        public ProductoController(ILogger<ProductoController> logger, ApplicationDbContext context, IMapper mapper, IAlmacenadorArchivos almacenadorArchivos)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
            this.almacenadorArchivos = almacenadorArchivos;

        }

        [HttpGet]
        public async Task<ActionResult<List<ProductoDTO>>> Get()
        {
            var productos = await context.Productos.OrderBy(x => x.Id_producto).ToListAsync();
            var resultado = mapper.Map<List<ProductoDTO>>(productos);
            return resultado; 
        }


        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductoDTO>> Get(int id)
        {
            var producto = await context.Productos.FirstOrDefaultAsync(x => x.Id_producto == id); 

            if (producto == null) { return NotFound(); }

            var dto = mapper.Map<ProductoDTO>(producto);
            return dto;
        }

        [HttpGet("filtrar")]
        public async Task<ActionResult<List<ProductoDTO>>> Filtrar([FromQuery] ProductoFiltrarDTO productoFiltrarDTO)
        {
            var productosQueryable = context.Productos.AsQueryable();

            if (!string.IsNullOrEmpty(productoFiltrarDTO.Nombre))
            {
                productosQueryable = productosQueryable.Where(x => x.Nombre.Contains(productoFiltrarDTO.Nombre));
            }
            if (!string.IsNullOrEmpty(productoFiltrarDTO.Codigo))
            {
                productosQueryable = productosQueryable.Where(x => x.Codigo.Contains(productoFiltrarDTO.Codigo));
            }
            if (productoFiltrarDTO.Precio != 0)
            {
                productosQueryable = productosQueryable.Where(x => x.Precio <= productoFiltrarDTO.Precio).AsQueryable();
            }
            if (productoFiltrarDTO.StockDisponible && !productoFiltrarDTO.SinStock)
            {
                productosQueryable = productosQueryable.Where(x => x.Cantidad > 0);
            }
            if (productoFiltrarDTO.SinStock && !productoFiltrarDTO.StockDisponible)
            {
                productosQueryable = productosQueryable.Where(x => x.Cantidad == 0);
            }

            await HttpContext.InsertarParametrosPaginacionEnCabecera(productosQueryable);

            var productos = await productosQueryable.Paginar(productoFiltrarDTO.PaginacionDTO).OrderBy(x=> x.Id_producto).ToListAsync();
            var resultado = mapper.Map<List<ProductoDTO>>(productos);
            return resultado;
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromForm] ProductoCreacionDTO productoCreacionDTO)
        {
            var producto = mapper.Map<Producto>(productoCreacionDTO);
            if (productoCreacionDTO.Foto != null)
            {
                producto.Foto = await almacenadorArchivos.GuardarArchivo(contenedor, productoCreacionDTO.Foto);
            }

            context.Add(producto);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] ProductoCreacionDTO productoCreacionDTO)
        {
            var producto = await context.Productos.FirstOrDefaultAsync(x => x.Id_producto == id);

            if (producto == null)
            {
                return NotFound();
            }

            producto = mapper.Map(productoCreacionDTO, producto);

            if (productoCreacionDTO.Foto != null)
            {
                producto.Foto = await almacenadorArchivos.EditarArchivo(contenedor, productoCreacionDTO.Foto, producto.Foto);
            }

            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("actualizar")]
        public async Task<ActionResult> Put([FromBody] ActualizarDTO actualizarDTO)
        {
            var productos = new List<Producto>();
            foreach(var id in actualizarDTO.Ids)
            {
                var objeto = await context.Productos.FirstOrDefaultAsync(x=>x.Id_producto == id);
                productos.Add(objeto);
            }
            if (actualizarDTO.Aumentar && !actualizarDTO.Descontar)
            {
                foreach (var producto in productos)
                {
                    producto.Precio = producto.Precio + (producto.Precio * actualizarDTO.Valor / 100);
                }
            }
            if (actualizarDTO.Descontar && !actualizarDTO.Aumentar)
            {
                foreach (var producto in productos)
                {
                    producto.Precio = producto.Precio - (producto.Precio * actualizarDTO.Valor / 100);
                }
            }


            await context.SaveChangesAsync();
            return NoContent();
        }


        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var producto = await context.Productos.FirstOrDefaultAsync(x => x.Id_producto == id);

            if (producto == null)
            {
                return NotFound();
            }

            context.Remove(producto);
            await context.SaveChangesAsync();      
            return NoContent();
        }
    }
}
