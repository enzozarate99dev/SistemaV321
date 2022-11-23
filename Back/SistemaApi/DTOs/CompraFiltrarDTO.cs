namespace SistemaApi.DTOs
{
    public class CompraFiltrarDTO
    {
        public int Pagina { get; set; }
        public int RecordsPorPagina { get; set; }
        public PaginacionDTO PaginacionDTO
        {
            get { return new PaginacionDTO() { Pagina = Pagina, RecordsPorPagina = RecordsPorPagina }; }
        }
        public int ProveedorId { get; set; }
        public DateTime? FechaDeCompra { get; set; }
    }
}
