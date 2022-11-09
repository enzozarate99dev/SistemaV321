namespace SistemaApi.Entidades
{
    public class PresupuestoProducto
    {
        public int PresupuestoId { get; set; }
        public int ProductoId { get; set; }
        public int Unidades { get; set; }
        public Presupuestos Presupuesto { get; set; }
        public Producto Producto { get; set; }
    }
}
