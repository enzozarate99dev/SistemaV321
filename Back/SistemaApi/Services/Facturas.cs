using Facturante;
using Microsoft.AspNetCore.Server.Kestrel;

namespace SistemaApi.Services
{
    public class Facturas : IFacturas
    {
        ComprobantesClient comprobantesClient;
        public Facturas()
        {
            comprobantesClient = new ComprobantesClient(ComprobantesClient.EndpointConfiguration.BasicHttpBinding_IComprobantes);
        }
        public async void GenerarFactura(CrearComprobanteRequest crearComprobanteRequest)
        {

            var response = await comprobantesClient.CrearComprobanteAsync(crearComprobanteRequest);
        
        }

        public async void GetFacturas()
        {
            ListadoComprobantesRequest request = new ListadoComprobantesRequest();
            request.Autenticacion = new Autenticacion();
            request.Autenticacion.Usuario = "";
            request.Autenticacion.Hash = "";
            request.Autenticacion.Empresa = 3468; //[Identificador de la empresa a la que pertenece el usuario]
            request.FechaDesde = DateTime.Now.AddDays(-2);
            request.FechaHasta = DateTime.Now.AddDays(2);

            ListadoComprobantesResponse responseList = await comprobantesClient.ListadoComprobantesAsync(request);
        }
    }
}
