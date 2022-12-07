using AutoMapper;
using Facturante;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaApi.DTOs;
using SistemaApi.Entidades;
using SistemaApi.Migrations;
using SistemaApi.Services;
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
        private readonly IFacturas facturas;
        ComprobantesClient comprobantesClient;

        public VentasConsumidorFinalController(ApplicationDbContext context, IMapper mapper, IFacturas facturas)
        {
            this.context = context;
            this.mapper = mapper;
            this.facturas = facturas;
            comprobantesClient = new ComprobantesClient(ComprobantesClient.EndpointConfiguration.BasicHttpBinding_IComprobantes);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<VentaConsumidorFinalDTO>> Get(int id)
        {
            var venta = await context.VentaConsumidorFinal.Include(x => x.VentaCFProducto).ThenInclude(x => x.Producto).FirstOrDefaultAsync(x => x.Id == id);

            if (venta == null) { return NotFound(); }

            var dto = mapper.Map<VentaConsumidorFinalDTO>(venta);
            return dto;
        }

        [HttpGet("pdf/{id:int}")]
        public async Task<ActionResult<string>> URLPDF(int id)
        {
            var venta = await context.VentaConsumidorFinal.FirstOrDefaultAsync(x => x.Id == id);
            if (venta == null)
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
            venta.PrecioTotal = total + (total*(ventaCreacioncfDTO.Iva/100));
            venta.FechaDeVenta = DateTime.Now;
            context.Add(venta);
            var obj = await CrearRequest(ventaCreacioncfDTO);
            var idComp = await facturas.GenerarFactura(obj);
            if (idComp != -1)
            {
                venta.IdComprobante = (int)idComp;
                context.Add(venta);
                await context.SaveChangesAsync();
                return NoContent();
            }
            else
            {
                return BadRequest("Error al generar comprobante Facturante.com");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var venta = await context.VentaConsumidorFinal.FirstOrDefaultAsync(x => x.Id == id);

            if (venta == null)
            {
                return NotFound();
            }

            context.Remove(venta);
            await context.SaveChangesAsync();
            return NoContent();
        }

        private async Task<CrearComprobanteRequest> CrearRequest(VentaCreacionCFDTO ventaCreacionCFDTO)
        {
            CrearComprobanteRequest request = new CrearComprobanteRequest();
            request.Autenticacion = new Autenticacion();
            request.Autenticacion.Usuario = "TESTING_API_6N";
            request.Autenticacion.Hash = "10BgP6cOWs78";
            request.Autenticacion.Empresa = 3468;


            request.Cliente = new Cliente();
            request.Cliente.CondicionPago = ventaCreacionCFDTO.FormaDePago;
            request.Cliente.Contacto = ventaCreacionCFDTO.NombreCliente;
            request.Cliente.NroDocumento = "1";
            request.Cliente.EnviarComprobante = true;
            request.Cliente.TipoDocumento = 1;
            request.Cliente.TratamientoImpositivo = 3;
            request.Cliente.CodigoPostal = "-";
            request.Cliente.DireccionFiscal = "-";
            request.Cliente.Localidad = "-";
            request.Cliente.MailContacto = "-";
            request.Cliente.MailFacturacion = "-";
            request.Cliente.PercibeIIBB = false;
            request.Cliente.PercibeIVA = false;
            request.Cliente.Provincia = "-";
            request.Cliente.RazonSocial = "-";
            request.Cliente.Telefono = "-";

            request.Encabezado = new ComprobanteEncabezado();
            request.Encabezado.Bienes = 1;
            request.Encabezado.CondicionVenta = ventaCreacionCFDTO.FormaDePago;
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
            request.Encabezado.TipoComprobante = ventaCreacionCFDTO.TipoComprobante;
            request.Encabezado.TipoDeCambio = 1;

            int longitud = ventaCreacionCFDTO.ProductosIds.Count;
            request.Items = new ComprobanteItem[longitud];

            for (var i = 0; i < longitud; i++)
            {
                request.Items[i] = new ComprobanteItem();
                var prod = await context.Productos.FirstOrDefaultAsync(x => x.Id == ventaCreacionCFDTO.ProductosIds[i][0]);
                request.Items[i].Bonificacion = 0;
                request.Items[i].Cantidad = ventaCreacionCFDTO.ProductosIds[i][1];
                request.Items[i].Codigo = prod.Codigo;
                request.Items[i].Detalle = prod.Descripcion;
                request.Items[i].Gravado = true;
                request.Items[i].IVA = (decimal)ventaCreacionCFDTO.Iva;
                request.Items[i].PrecioUnitario = (decimal)prod.Precio;
            }

            return request;

        }
    }
}
