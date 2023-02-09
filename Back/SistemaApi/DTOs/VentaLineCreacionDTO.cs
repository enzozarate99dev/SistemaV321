namespace SistemaApi.DTOs
{
    public class VentaLineCreacionDTO
    {
        public int Id_producto { get; set; }
        public double PrecioUnitario { get; set; }
        public int Cantidad { get; set; }
        public double Iva { get; set; }
        public ProductoDTO Producto { get; set; }
    }
}
