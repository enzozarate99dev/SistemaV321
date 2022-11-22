namespace SistemaApi.Entidades
{
    public class CompraProducto
    {
        public int CompraId { get; set; }
        public int ProductoId { get; set; }
        public int Unidades { get; set; }
        public Compra Compra { get; set; }
        public Producto Producto { get; set; }
    }
}
