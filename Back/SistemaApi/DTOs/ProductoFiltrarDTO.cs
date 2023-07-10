namespace SistemaApi.DTOs
{
    public class ProductoFiltrarDTO
    {
        public int Pagina { get; set; }
        public int RecordsPorPagina { get; set; }
        public PaginacionDTO PaginacionDTO
        {
            get { return new PaginacionDTO() { Pagina = Pagina, RecordsPorPagina = RecordsPorPagina }; }
        }

        public string? Nombre { get; set; }
        public string? Codigo { get; set; }
        public double Precio { get; set; }
        public bool StockDisponible { get; set; }
        public bool SinStock { get; set; }
    }
}
