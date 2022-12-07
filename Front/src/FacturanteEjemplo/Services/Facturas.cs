using Facturante;
using FacturanteEjemplo.Services.Interfaces;
using Microsoft.AspNetCore.Server.Kestrel;

namespace FacturanteEjemplo.Services
{
    public class Facturas : IFacturas
    {
        ComprobantesClient comprobantesClient;
        public Facturas()
        {
            comprobantesClient = new ComprobantesClient(ComprobantesClient.EndpointConfiguration.BasicHttpBinding_IComprobantes);
        }
        public async void GenerarFactura()
        {
            CrearComprobanteRequest request = new CrearComprobanteRequest();
            request.Autenticacion = new Autenticacion();
            request.Autenticacion.Usuario = "TESTING_API_6N";
            request.Autenticacion.Hash = "10BgP6cOWs78";
            request.Autenticacion.Empresa = 3468; 


            request.Cliente = new Cliente();
            request.Cliente.CodigoPostal = "7600";
            request.Cliente.CondicionPago = 1;
            request.Cliente.Contacto = "Juan Perez";
            request.Cliente.DireccionFiscal = "Calle 1234";
            request.Cliente.EnviarComprobante = true;
            request.Cliente.Localidad = "Mar del Plata";
            request.Cliente.MailContacto = "prueba@prueba.com";
            request.Cliente.MailFacturacion = "prueba@prueba.com";
            request.Cliente.NroDocumento = "12345678";
            request.Cliente.PercibeIIBB = false;
            request.Cliente.PercibeIVA = false;
            request.Cliente.Provincia = "Buenos Aires";
            request.Cliente.RazonSocial = "Juan Perez";
            request.Cliente.Telefono = "5521111";
            request.Cliente.TipoDocumento = 1;
            request.Cliente.TratamientoImpositivo = 3;

            request.Encabezado = new ComprobanteEncabezado();
            request.Encabezado.Bienes = 2;
            request.Encabezado.CondicionVenta = 1;
            request.Encabezado.EnviarComprobante = true;
            request.Encabezado.FechaHora = new DateTime(2015, 09, 30);
            request.Encabezado.FechaServDesde = new DateTime(2015, 09, 30);
            request.Encabezado.FechaServHasta = new DateTime(2015, 10, 05);
            request.Encabezado.FechaVtoPago = new DateTime(2015, 10, 05);
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
            request.Encabezado.SubTotal = (decimal)664.46;
            request.Encabezado.SubTotalExcento = 0;
            request.Encabezado.SubTotalNoAlcanzado = 0;
            request.Encabezado.TipoComprobante = "FB";
            request.Encabezado.TipoDeCambio = 1;
            request.Encabezado.Total = 804;
            request.Encabezado.TotalConDescuento = 0;
            request.Encabezado.TotalNeto = (decimal)664.46;

            request.Items = new ComprobanteItem[3];

            request.Items[0] = new ComprobanteItem();
            request.Items[0].Bonificacion = 0;
            request.Items[0].Cantidad = 1;
            request.Items[0].Codigo = "CODPROD";
            request.Items[0].Detalle = "Producto Uno";
            request.Items[0].Gravado = true;
            request.Items[0].IVA = 21;
            request.Items[0].PrecioUnitario = 100;
            request.Items[0].Total = 121;

            request.Items[1] = new ComprobanteItem();
            request.Items[1].Bonificacion = 0;
            request.Items[1].Cantidad = 1;
            request.Items[1].Codigo = "CODPROD2";
            request.Items[1].Detalle = "Producto Dos";
            request.Items[1].Gravado = true;
            request.Items[1].IVA = 21;
            request.Items[1].PrecioUnitario = (decimal)164.46;
            request.Items[1].Total = 199;

            request.Items[2] = new ComprobanteItem();
            request.Items[2].Bonificacion = 0;
            request.Items[2].Cantidad = 2;
            request.Items[2].Codigo = "CODPROD3";
            request.Items[2].Detalle = "Producto Tres";
            request.Items[2].Gravado = true;
            request.Items[2].IVA = 21;
            request.Items[2].PrecioUnitario = 200;
            request.Items[2].Total = 484;

            var response  = await comprobantesClient.CrearComprobanteAsync(request);

        }
    }
}
