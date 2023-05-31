using AutoMapper;
using Facturante;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Any;
using Newtonsoft.Json;
using SistemaApi.DTOs;
using SistemaApi.Entidades;
using SistemaApi.Services;
using SistemaApi.Utilidades;
using System.Net;
using System.Runtime.InteropServices;
using System.Security.Cryptography.X509Certificates;
using System.Security.Policy;
using System.Text.Json;
using System.Xml;

namespace SistemaApi.Controllers
{
    [ApiController]
    [Route("api/ventas")]
    public class VentasController: ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IFacturas facturas;
        private readonly ILogger<VentasController> logger;
        ComprobantesClient comprobantesClient;

        public VentasController(ApplicationDbContext context, IMapper mapper, IFacturas facturas, ILogger<VentasController> logger)
        {
            this.context = context;
            this.mapper = mapper;
            this.facturas = facturas;
            this.logger = logger;
            comprobantesClient = new ComprobantesClient(ComprobantesClient.EndpointConfiguration.BasicHttpBinding_IComprobantes);
        }


       /* [HttpGet]
        public async Task<ActionResult<List<VentaDTO>>> Get()
        {
            logger.LogInformation("prueba logger");
            var ventas = await context.Ventas.Include(x => x.Venta_Lines).ToListAsync();
            return mapper.Map<List<VentaDTO>>(ventas);
        }*/
        [HttpGet]
        public async Task<ActionResult<List<VentaDTO>>> GetVentas()
        {
            logger.LogInformation("prueba logger");

            var ventas = await context.Ventas
                .Include(v => v.Cliente)
                .Include(v => v.VentaLines)
                    .ThenInclude(vl => vl.Producto)
                .Include(v => v.Pagos)
                    .ThenInclude(p => p.MetodosDePago)
                
                .ToListAsync();

            return mapper.Map<List<VentaDTO>>(ventas);
        }

        [HttpGet("fact")]
        public async Task<ActionResult<ListadoComprobantesResponse>> Fact()
        {
            var list = await facturas.GetFacturas();
            return list;
        }

   /*     [HttpGet("pdf/{id:int}")]
        public async Task<ActionResult<string>> URLPDF(int id)
        {
            var venta = await context.Ventas.FirstOrDefaultAsync(x => x.Id_venta == id);
            if(venta == null)
            {
                return BadRequest("No existe la venta");
            }

            DetalleComprobanteRequest request = new DetalleComprobanteRequest();
            request.Autenticacion = new Autenticacion();
            request.Autenticacion.Usuario = "TESTING_API_6N";
            request.Autenticacion.Hash = "10BgP6cOWs78";
            request.Autenticacion.Empresa = 3468;
            request.IdComprobante = venta.IdComprobante;
            DetalleComprobanteResponse detResponse = await comprobantesClient.DetalleComprobanteAsync(request);
            return detResponse.Comprobante.URLPDF;
        }*/

       /* [HttpPost("webhook")]
        [Consumes("application/xml")]
        public async Task<ActionResult> WebHookFunc([FromBody] DetalleComprobante detalleComprobante)
        {
            logger.LogInformation("log webhook");
            logger.LogInformation(detalleComprobante.ToString());
            logger.LogInformation(detalleComprobante.EstadoComprobante.ToString());
            logger.LogInformation(detalleComprobante.IdComprobante.ToString());


            *//*var venta = await context.Ventas.FirstOrDefaultAsync(x => x.IdComprobante == detalleComprobante.Comprobante.IdComprobante);
            if (venta == null)
            {
                return BadRequest("La venta no existe");
            }
            if (detalleComprobante.Comprobante.EstadoComprobante == 2)
            {
                venta.ConfirmacionAfip = 3;
            }
            else if (detalleComprobante.Comprobante.EstadoComprobante == 4)
            {
                venta.ConfirmacionAfip = 3;
            }
            await context.SaveChangesAsync();*//*

            return NoContent();
        }*/

        [HttpGet("ventasCliente/{id:int}")]
        public async Task<ActionResult<List<OperacionesClienteDTO>>> Ventas(int id)
        {
            var ventas = await context.Ventas.Where(x => x.ClienteId == id)
                .Include(v => v.Pagos)
                .ThenInclude(p => p.MetodosDePago)
                .ToListAsync();
            return mapper.Map<List<OperacionesClienteDTO>>(ventas);
        }


       /* [HttpGet("pagosCliente/{id:int}")]
        public async Task<ActionResult<List<PagosDTO>>> Pagos(int id)
        {
            var pagos = await context.Pagos.Where(x => Cliente)
        }*/

     /*   [HttpGet("chart")]
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
        }*/

       /* [HttpGet("chartSemanal")]
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
        }*/

       /* [HttpGet("chartProductos")]
        public async Task<ActionResult<List<ProductoChartDTO>>> ChartProductos()
        {
            var ventas = await context.Ventas.Include(x => x.Venta_Lines).ThenInclude(y => y.Producto).OrderBy(x=>x.Id_venta).ToListAsync();
            var ventascf = await context.VentaConsumidorFinal.Include(x => x.VentaCFProducto).ThenInclude(y => y.Producto).OrderBy(x => x.Id).ToListAsync();
            var productos = await context.Productos.ToListAsync();
            var list = new List<ProductoChartDTO>();
            var ids = new List<int>();
            int[] cantidades = new int[productos.Count];
            string[] categorias = new string[productos.Count];
            string[] nombres = new string[productos.Count];
            for(var i=0; i<productos.Count; i++)
            {
                ids.Add(productos[i].Id_producto);
                categorias[i] = productos[i].Categoria;
                nombres[i] = productos[i].Nombre;
                cantidades[i] = 0;
            }
            foreach(var venta in ventas)
            {
                foreach(var producto in venta.Venta_Lines)
                {
                    var ind = ids.FindIndex(x => x == producto.Id_producto);
                    cantidades[ind]+=producto.Cantidad;
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
        }*/

        [HttpGet("{id:int}")]
        public async Task<ActionResult<VentaDTO>> Get(int id)
        {
           
            var venta = await context.Ventas
                .Include(v => v.Cliente)
                .Include(v => v.VentaLines)
                    .ThenInclude(vl => vl.Producto)
                .Include(v => v.Pagos)
                    .ThenInclude(p => p.MetodosDePago)
                .FirstOrDefaultAsync(v => v.Id_venta == id);

            if (venta == null) { return NotFound(); }

            var dto = mapper.Map<VentaDTO>(venta);
            return dto;
        }

         [HttpGet("filtrar")]
         public async Task<ActionResult<List<VentaDTO>>> Filtrar([FromQuery] VentaFiltrarDTO ventaFiltrarDTO, int sucursalId)
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
                         .Where(x => x.VentaLines.Select(y => y.ProductoId)
                         .Contains(ventaFiltrarDTO.ProductoId));
                 }

                 if (ventaFiltrarDTO.FechaDeVenta != null)
                 {

                     ventasQueryable = ventasQueryable.Where(x => x.FechaDeVenta.Date <= ventaFiltrarDTO.FechaDeVenta.Value.Date);
                 }

                ventasQueryable = ventasQueryable.Where(x => x.SucursalId == sucursalId);

                await HttpContext.InsertarParametrosPaginacionEnCabecera(ventasQueryable);

                 var ventas = await ventasQueryable.OrderByDescending(x => x.FechaDeVenta).Paginar(ventaFiltrarDTO.PaginacionDTO)
                    .Include(y=>y.Cliente)
                    .Include(y => y.VentaLines)
                        .ThenInclude(vl => vl.Producto)
                    .Include(y => y.Pagos)
                        .ThenInclude(p => p.MetodosDePago)                 
                    .ToListAsync();

                 return mapper.Map<List<VentaDTO>>(ventas);
             }       
         }
        [HttpGet("pagoVentas/{idPago:int}")]
        public async Task<ActionResult<List<VentaPagosDTO>>> VentaPagos(int idPago)
        {
            var ventas = await context.Ventas.Where(v => v.Pagos.Any(p => p.Id_pago == idPago)).ToListAsync();

            return mapper.Map<List<VentaPagosDTO>>(ventas);
        }

        

        [HttpPost]
        public async Task<ActionResult<VentaCreacionDTO>> Post( VentaCreacionDTO ventaCreacion)
        {

            var cliente = await context.Clientes.FindAsync(ventaCreacion.ClienteId);
            if (cliente == null)
            {
                return BadRequest("El cliente no esta registrado");
            }

            var venta = new Venta
            {
                FechaDeVenta = DateTime.Now,
                Cliente = cliente,
                SucursalId = ventaCreacion.SucursalId,
                Adeudada = 0,
                Pagada = true,
                TipoComprobante = "FA",
                Descuento = 0,
                PrecioTotal = 0,
                Pagos = new List<Pago>()

            };

            double precioFinal = 0;

            venta.VentaLines = ventaCreacion.VentaLines.Select(vlc =>
            {
                var producto = context.Productos.Find(vlc.ProductoId);
                if (producto == null)
                {
                    throw new Exception($"El producto con id {vlc.ProductoId} no existe");
                    /*return BadRequest($"El producto con id {vlc.ProductoId} no existe");*/
                }

                var ventaLine = new VentaLine
                {
                    Producto = producto,
                    Venta = venta,
                    VentaId = venta.Id_venta,
                    PrecioUnitario = producto.Precio,
                    Cantidad = vlc.Cantidad
                };

                if (producto.Cantidad < vlc.Cantidad)
                {
                    throw new Exception("No hay suficientes unidades de producto");
                }

                producto.Cantidad -= vlc.Cantidad;
                venta.Descuento = ventaCreacion.Descuento; 
                precioFinal += vlc.Cantidad * ventaLine.PrecioUnitario;

                if (venta.Descuento != null)
                {
                   
                    venta.PrecioTotal += precioFinal - precioFinal * venta.Descuento.Value / 100;
                }
                else
                {
                    venta.PrecioTotal += precioFinal;
                }
              
                return ventaLine;
            }).ToList();

          

            var pagos = ventaCreacion.Pagos.Select(p => new Pago
            {
                Importe = p.Importe,
                Fecha = DateTime.Now,
                MetodosDePago = context.MetodosDePago.Where(m => p.MetodosDePagoIds.Contains(m.Id_metodo)).ToList(),
                Ventas = new List<Venta>() { venta }
            }).ToList();

            venta.Pagos = pagos;

            // agregar el objeto Venta a la base de datos
            context.Ventas.Add(venta);
            await context.SaveChangesAsync();

            return NoContent();

        

        }

        [HttpPut("cancelar/{id:int}")]
        public async Task<ActionResult> Cancelar(int id, [FromBody] VentaCancelarDTO ventaCancelarDTO)
        {
            var venta = await context.Ventas.FirstOrDefaultAsync(x => x.Id_venta == id);
            var cliente = await context.Clientes.FirstOrDefaultAsync(x => x.Id_cliente == venta.ClienteId);

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
            var venta = await context.Ventas.FirstOrDefaultAsync(x => x.Id_venta == id);

            if (venta == null)
            {
                return NotFound();
            }

            context.Remove(venta);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }


 /*   [HttpGet("PostGet")]
    public async Task<ActionResult<VentasPostGetDTO>> PostGet()
    {
        var productos = await context.Productos
            .Where(x => x.Cantidad > 0)
            .OrderBy(x => x.Nombre)
            .ToListAsync();
        var productosDTO = mapper.Map<List<ProductoDTO>>(productos);
        return new VentasPostGetDTO() { Productos = productosDTO };
    }*/




   
    /* private async Task<CrearComprobanteRequest> CrearRequest(ClienteEntidad cliente, VentaCreacionDTO ventaCreacionDTO)
     {
         CrearComprobanteRequest request = new CrearComprobanteRequest();
         request.Autenticacion = new Autenticacion();
         request.Autenticacion.Usuario = "TESTING_API_6N";
         request.Autenticacion.Hash = "10BgP6cOWs78";
         request.Autenticacion.Empresa = 3468;


         request.Cliente = new Cliente();
         request.Cliente.CodigoPostal = cliente.CodigoPostal;
         request.Cliente.CondicionPago = ventaCreacionDTO.FormaDePago;
         request.Cliente.Contacto = cliente.NombreYApellido;
         request.Cliente.DireccionFiscal = cliente.Domicilio;
         request.Cliente.EnviarComprobante = true;
         request.Cliente.Localidad = cliente.Localidad;
         request.Cliente.MailContacto = cliente.Email;
         request.Cliente.MailFacturacion = cliente.Email;
         request.Cliente.NroDocumento = cliente.NroDocumento;
         request.Cliente.PercibeIIBB = cliente.PercibeIIBB;
         request.Cliente.PercibeIVA = cliente.PercibeIVA;
         request.Cliente.Provincia = cliente.Provincia;
         request.Cliente.RazonSocial = cliente.RazonSocial;
         request.Cliente.Telefono = cliente.Telefono;
         request.Cliente.TipoDocumento = cliente.TipoDocumento;
         request.Cliente.TratamientoImpositivo = ventaCreacionDTO.TratamientoImpositivo;

         request.Encabezado = new ComprobanteEncabezado();
         request.Encabezado.Bienes = 1;
         request.Encabezado.CondicionVenta = ventaCreacionDTO.FormaDePago;
         request.Encabezado.EnviarComprobante = true;
         request.Encabezado.FechaHora = DateTime.Now;
         request.Encabezado.FechaVtoPago = DateTime.Now.AddDays(7);
         request.Encabezado.ImporteImpuestosInternos = 0;
         request.Encabezado.ImportePercepcionesMunic = 0;
         request.Encabezado.Moneda = 2;
         request.Encabezado.Observaciones = "";
         request.Encabezado.OrdenCompra = "";
         request.Encabezado.PercepcionIIBB = 0;
         request.Encabezado.PercepcionIVA = 0;
         request.Encabezado.PorcentajeIIBB = 0;
         request.Encabezado.Prefijo = "00099";
         request.Encabezado.Remito = "";
         request.Encabezado.TipoComprobante = ventaCreacionDTO.TipoComprobante;
         request.Encabezado.TipoDeCambio = 1;
         request.Encabezado.WebHook = new WebHook();
         request.Encabezado.WebHook.Url = "https://sistemamakersapi.azurewebsites.net/api/ventas/webhook";
         //request.Encabezado.WebHook.Url = "https://eodkmdwv8jdt7dt.m.pipedream.net";
         var header = new HttpHeader[1];
         header[0] = new HttpHeader { Name = "Authorization", Value = "10BgP6cOWs78" };
         request.Encabezado.WebHook.Headers = header;

         int longitud = ventaCreacionDTO.ProductosIds.Count;
         request.Items = new ComprobanteItem[longitud];

         for(var i = 0; i < longitud; i++)
         {
             request.Items[i] = new ComprobanteItem();
             var prod = await context.Productos.FirstOrDefaultAsync(x => x.Id == ventaCreacionDTO.ProductosIds[i][0]);
             request.Items[i].Bonificacion = 0;
             request.Items[i].Cantidad = ventaCreacionDTO.ProductosIds[i][1];
             request.Items[i].Codigo = prod.Codigo;
             request.Items[i].Detalle = prod.Descripcion;
             request.Items[i].Gravado = true;
             request.Items[i].IVA = (decimal)ventaCreacionDTO.Iva;
             request.Items[i].PrecioUnitario = (decimal)prod.Precio;
         }

         return request;

     } */
}

