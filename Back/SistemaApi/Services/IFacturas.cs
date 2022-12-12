using Facturante;

namespace SistemaApi.Services
{
    public interface IFacturas
    {
        public Task<int?> GenerarFactura(CrearComprobanteRequest crearComprobanteRequest);
        public Task<ListadoComprobantesResponse> GetFacturas();
    }
}
