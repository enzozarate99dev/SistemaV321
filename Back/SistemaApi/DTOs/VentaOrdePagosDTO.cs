using SistemaApi.Entidades;

namespace SistemaApi.DTOs
{
    public class VentaOrdePagosDTO
    {
        public int PagoId { get; set; }
        public int Venta_orderId { get; set; }
        public  ICollection<PagosDTO> Pago { get; set; }
    }
}
