using SistemaApi.Entidades;

namespace SistemaApi.DTOs
{
    public class PagosDTO
    {
        public int Id_pago { get; set; }
        public double PrecioTotal { get; set; }
        public DateTime FechaDePago { get; set; }
        public List<MetodosDePagoDTO> MetodosDePago { get; set; }
    }
}
