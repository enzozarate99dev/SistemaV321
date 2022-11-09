namespace SistemaApi.Entidades
{
    public class Presupuestos
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public double? PrecioTotal { get; set; }
        public double Descuento { get; set; }
        public DateTime FechaDeVenta { get; set; }
        public List<PresupuestoProducto> PresupuestoProducto { get; set; }
    }
}
