namespace SistemaApi.DTOs
{
    public class PresupuestoFiltrarDTO
    {
        public int Pagina { get; set; }
        public int RecordsPorPagina { get; set; }
        public PaginacionDTO PaginacionDTO
        {
            get { return new PaginacionDTO() { Pagina = Pagina, RecordsPorPagina = RecordsPorPagina }; }
        }
        public string? Nombre { get; set; }
        public int ProductoId { get; set; }
        public DateTime? FechaDeVenta { get; set; }
    }
}
