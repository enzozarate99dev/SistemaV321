using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaApi.DTOs;
using SistemaApi.Entidades;
using SistemaApi.Utilidades;
using System.Net;
using System.Runtime.InteropServices;

namespace SistemaApi.Controllers
{
    [ApiController]
    [Route("api/ventas")]
    public class VentasController: ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public VentasController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

       
        [HttpGet]
        public async Task<ActionResult<List<VentaDTO>>> Get()
        {
            var ventas = await context.Ventas.Include(x=>x.VentaProducto).ThenInclude(x=>x.Producto).ToListAsync();
            return mapper.Map<List<VentaDTO>>(ventas);
        }

        [HttpGet("ventasCliente/{id:int}")]
        public async Task<ActionResult<List<VentaDTO>>> Ventas(int id)
        {
            var ventas = await context.Ventas.Where(x => x.ClienteId == id).ToListAsync();
            return mapper.Map<List<VentaDTO>>(ventas);
        }

        [HttpGet("chart")]
        public async Task<ActionResult<int[]>> Chart()
        {
            var ventas = await context.Ventas.OrderBy(x => x.FechaDeVenta.Date).ToListAsync();
            var ventasCF = await context.VentaConsumidorFinal.OrderBy(x => x.FechaDeVenta.Date).ToListAsync();
            int[] resultado = new int[12];
            for(var j=0; j<12; j++)
            {
                resultado[j] = 0;
            }
            foreach(var venta in ventas)
            {
                resultado[venta.FechaDeVenta.Month - 1]++;
            }
            foreach (var ventacf in ventasCF)
            {
                resultado[ventacf.FechaDeVenta.Month - 1]++;
            }
            return resultado;
        }

        [HttpGet("chartSemanal")]
        public async Task<ActionResult<List<SemanalDTO>>> Semanal()
        {
            var ventas = await context.Ventas.Where(x => x.FechaDeVenta.Date >= (DateTime.Today.AddDays(-6)).Date).ToListAsync();
            var ventascf = await context.VentaConsumidorFinal.Where(x => x.FechaDeVenta.Date >= (DateTime.Today.AddDays(-6)).Date).ToListAsync();
            int[] cantidades = new int[7];
            string[] dias = new string[7];
            for(var i=0; i < 7; i++)
            {
                cantidades[i] = 0;
                dias[i] = DateTime.Today.AddDays(i - 6).ToString("dddd").ToUpper();
            }
            foreach(var venta in ventas)
            {
                var k = 0;
                while(venta.FechaDeVenta.Date != DateTime.Today.AddDays(k-6).Date)
                {
                    k++;
                }
                cantidades[k]++;
            }
            foreach (var ventacf in ventascf)
            {
                var k = 0;
                while (ventacf.FechaDeVenta.Date != DateTime.Today.AddDays(k - 6).Date)
                {
                    k++;
                }
                cantidades[k]++;
            }
            var dto = new List<SemanalDTO>();
            for(var h=0; h<7; h++)
            {
                var obj = new SemanalDTO { Dia = dias[h], Cantidad = cantidades[h] };
                dto.Add(obj);
            }
            return dto;
        }

        [HttpGet("chartProductos")]
        public async Task<ActionResult<List<ProductoChartDTO>>> ChartProductos()
        {
            var ventas = await context.Ventas.Include(x => x.VentaProducto).ThenInclude(y => y.Producto).OrderBy(x=>x.Id).ToListAsync();
            var ventascf = await context.VentaConsumidorFinal.Include(x => x.VentaCFProducto).ThenInclude(y => y.Producto).OrderBy(x => x.Id).ToListAsync();
            var productos = await context.Productos.ToListAsync();
            var list = new List<ProductoChartDTO>();
            var ids = new List<int>();
            int[] cantidades = new int[productos.Count];
            string[] categorias = new string[productos.Count];
            string[] nombres = new string[productos.Count];
            for(var i=0; i<productos.Count; i++)
            {
                ids.Add(productos[i].Id);
                categorias[i] = productos[i].Categoria;
                nombres[i] = productos[i].Nombre;
                cantidades[i] = 0;
            }
            foreach(var venta in ventas)
            {
                foreach(var producto in venta.VentaProducto)
                {
                    var ind = ids.FindIndex(x => x == producto.ProductoId);
                    cantidades[ind]+=producto.Unidades;
                }
            }
            foreach (var venta in ventascf)
            {
                foreach (var producto in venta.VentaCFProducto)
                {
                    var ind = ids.FindIndex(x => x == producto.ProductoId);
                    cantidades[ind]+=producto.Unidades;
                }
            }
            for(var h = 0; h < productos.Count;h++)
            {
                var obj = new ProductoChartDTO { IdProducto = ids[h], Cantidad = cantidades[h], Categoria = categorias[h], Nombre = nombres[h] };
                list.Add(obj);
            }
            return list;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<VentaDTO>> Get(int id)
        {
            var venta = await context.Ventas.Include(x => x.VentaProducto).ThenInclude(x => x.Producto).FirstOrDefaultAsync(x=>x.Id == id);

            if (venta == null) { return NotFound(); }

            var dto = mapper.Map<VentaDTO>(venta);
            return dto;
        }

        [HttpGet("filtrar")]
        public async Task<ActionResult<List<VentaDTO>>> Filtrar([FromQuery] VentaFiltrarDTO ventaFiltrarDTO)
        {
            if (ventaFiltrarDTO.Consumidor && !ventaFiltrarDTO.Registrado)
            {
                return new List<VentaDTO>();
            }
            else
            {
                var ventasQueryable = context.Ventas.AsQueryable();
                if (ventaFiltrarDTO.ClienteId != 0)
                {
                    ventasQueryable = ventasQueryable.Where(x => x.ClienteId == ventaFiltrarDTO.ClienteId);
                }

                if (ventaFiltrarDTO.ProductoId != 0)
                {
                    ventasQueryable = ventasQueryable
                        .Where(x => x.VentaProducto.Select(y => y.ProductoId)
                        .Contains(ventaFiltrarDTO.ProductoId));
                }

                if (ventaFiltrarDTO.FechaDeVenta != null)
                {

                    ventasQueryable = ventasQueryable.Where(x => x.FechaDeVenta.Date <= ventaFiltrarDTO.FechaDeVenta.Value.Date);
                }

                await HttpContext.InsertarParametrosPaginacionEnCabecera(ventasQueryable);

                var ventas = await ventasQueryable.Paginar(ventaFiltrarDTO.PaginacionDTO).Include(y=>y.Cliente).OrderBy(x=>x.ClienteId).ToListAsync();
                
                return mapper.Map<List<VentaDTO>>(ventas);
            }       
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] VentaCreacionDTO ventaCreacionDTO)
        {
            double total = 0;
            var cliente = await context.Clientes.FirstOrDefaultAsync(x => x.Id == ventaCreacionDTO.ClienteId);
            if(cliente == null)
            {
                return BadRequest("El cliente no esta registrado");
            }

            if(ventaCreacionDTO.ProductosIds.Count == 0)
            {
                return BadRequest("Ingresar al menos un producto");
            }
            foreach (var tuple in ventaCreacionDTO.ProductosIds)
            {
                var producto = await context.Productos.FirstOrDefaultAsync(x => x.Id == tuple[0]);
                if (tuple[1] > producto.Cantidad)
                {
                    return BadRequest("No hay suficientes unidades del producto");
                }
            }
            foreach (var tuple in ventaCreacionDTO.ProductosIds)
            {
                var id = tuple[0];
                var cantidad = tuple[1];
                var producto = await context.Productos.FirstOrDefaultAsync(x => x.Id == id);
                producto.Cantidad = producto.Cantidad - cantidad;
                total = total + (producto.Precio * cantidad);
            }
            var venta = mapper.Map<Venta>(ventaCreacionDTO);
            venta.PrecioTotal = total;
            Random r = new Random();
            venta.FechaDeVenta = DateTime.Now.AddDays(r.Next(0,7)*-1);
            if (venta.FormaDePago == "Cuenta Corriente")
            {
                venta.Adeudada = total;
                cliente.Deuda += total;
            }
            else
            {
                venta.Adeudada = 0;
                cliente.Deuda += 0;
            }
            context.Add(venta);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("PostGet")]
        public async Task<ActionResult<VentasPostGetDTO>> PostGet()
        {
            var productos = await context.Productos
                .Where(x => x.Cantidad > 0)
                .OrderBy(x => x.Nombre)
                .ToListAsync();
            var productosDTO = mapper.Map<List<ProductoDTO>>(productos);
            return new VentasPostGetDTO() { Productos = productosDTO };
        }

        [HttpPut("cancelar/{id:int}")]
        public async Task<ActionResult> Cancelar(int id, [FromBody] VentaCancelarDTO ventaCancelarDTO)
        {
            var venta = await context.Ventas.FirstOrDefaultAsync(x => x.Id == id);
            var cliente = await context.Clientes.FirstOrDefaultAsync(x => x.Id == venta.ClienteId);

            if (venta == null)
            {
                return NotFound();
            }
            venta.Adeudada -= ventaCancelarDTO.Pago;
            cliente.Deuda -= ventaCancelarDTO.Pago;

            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var venta = await context.Ventas.FirstOrDefaultAsync(x => x.Id == id);

            if (venta == null)
            {
                return NotFound();
            }

            context.Remove(venta);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
