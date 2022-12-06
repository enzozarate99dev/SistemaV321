using Facturante;

namespace SistemaApi.Services
{
    public interface IFacturas
    {
        public void GenerarFactura(CrearComprobanteRequest crearComprobanteRequest);
        public void GetFacturas();
    }
}
