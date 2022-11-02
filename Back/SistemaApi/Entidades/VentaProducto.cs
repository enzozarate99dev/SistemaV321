namespace SistemaApi.Entidades
{
    public class VentaProducto
    {
        public int VentaId { get; set; }
        public int ProductoId { get; set; }
        public int Unidades { get; set; }
        public Venta Venta { get; set; }
        public Producto Producto { get; set; }
    }
}
