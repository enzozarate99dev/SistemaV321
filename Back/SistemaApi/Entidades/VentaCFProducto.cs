namespace SistemaApi.Entidades
{
    public class VentaCFProducto
    {
        public int VentaCFId { get; set; }
        public int ProductoId { get; set; }
        public int Unidades { get; set; }
        public VentaConsumidorFinal VentaCF { get; set; }
        public Producto Producto { get; set; }
    }
}
