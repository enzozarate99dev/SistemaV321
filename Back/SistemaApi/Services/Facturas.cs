using Facturante;
using Microsoft.AspNetCore.Server.Kestrel;
using System.Net;
using System.Text;
using System.Xml.Serialization;


namespace SistemaApi.Services
{
    public class Facturas : IFacturas
    {
        ComprobantesClient comprobantesClient;
        public Facturas()
        {
            comprobantesClient = new ComprobantesClient(ComprobantesClient.EndpointConfiguration.BasicHttpBinding_IComprobantes);

        }
        public async Task<int?> GenerarFactura(CrearComprobanteRequest crearComprobanteRequest)
        {

            CrearComprobanteResponse response = await comprobantesClient.CrearComprobanteAsync(crearComprobanteRequest);

            DetalleComprobanteRequest request = new DetalleComprobanteRequest();
            request.Autenticacion = new Autenticacion();
            request.Autenticacion.Usuario = "TESTING_API_6N";
            request.Autenticacion.Hash = "10BgP6cOWs78";
            request.Autenticacion.Empresa = 3468;
            request.IdComprobante = (int)response.IdComprobante;

            DetalleComprobanteResponse detResponse = await comprobantesClient.DetalleComprobanteAsync(request);
            if (response.IdComprobante != null)
            {
                return response.IdComprobante;
            }
            else
            {
                return -1;
            }          
        }

        public async Task<ListadoComprobantesResponse> GetFacturas()
        {
            ListadoComprobantesRequest request = new ListadoComprobantesRequest();
            request.Autenticacion = new Autenticacion();
            request.Autenticacion.Usuario = "TESTING_API_6N";
            request.Autenticacion.Hash = "10BgP6cOWs78";
            request.Autenticacion.Empresa = 3468; //[Identificador de la empresa a la que pertenece el usuario]
            request.FechaDesde = DateTime.Now.AddDays(-2);
            request.FechaHasta = DateTime.Now.AddDays(2);

            ListadoComprobantesResponse responseList = await comprobantesClient.ListadoComprobantesAsync(request);
            return responseList;
        }

        private string ObjectToXml<T>(T objectToSerialise)
        {
            StringWriter Output = new StringWriter(new StringBuilder());
            XmlSerializer xs = new XmlSerializer(objectToSerialise.GetType());
            XmlSerializerNamespaces ns = new XmlSerializerNamespaces();
            ns.Add("fac", "http://www.facturante.com.API");
            xs.Serialize(Output, objectToSerialise, ns);
            return Output.ToString();
        }
    }
}
