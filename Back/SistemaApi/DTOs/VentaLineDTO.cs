using SistemaApi.Entidades;

namespace SistemaApi.DTOs
{
    public class VentaLineDTO
    {
        public int Id_venta_line { get; set; }
        public int VentaId { get; set; }
        public double PrecioUnitario { get; set; }
        public int Cantidad { get; set; }
        public double Iva { get; set; }
        public ProductoVentaLineDTO Producto { get; set; }
    }
}
