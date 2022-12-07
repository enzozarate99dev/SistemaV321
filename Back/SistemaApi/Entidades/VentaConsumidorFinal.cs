namespace SistemaApi.Entidades
{
    public class VentaConsumidorFinal
    {
        public int Id { get; set; }
        public string NombreCliente { get; set; }
        public double? PrecioTotal { get; set; }
        public DateTime FechaDeVenta { get; set; }
        public int FormaDePago { get; set; }
        public int IdComprobante { get; set; }
        public List<VentaCFProducto> VentaCFProducto { get; set; }
    }
}
