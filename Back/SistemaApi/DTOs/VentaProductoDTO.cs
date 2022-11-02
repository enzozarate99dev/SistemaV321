using SistemaApi.Entidades;

namespace SistemaApi.DTOs
{
    public class VentaProductoDTO
    {
        public int VentaId { get; set; }
        public int ProductoId { get; set; }
        public int Unidades { get; set; }
        public Venta Venta { get; set; }
        public Producto Producto { get; set; }
    }
}
