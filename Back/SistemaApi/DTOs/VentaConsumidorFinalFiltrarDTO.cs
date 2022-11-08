namespace SistemaApi.DTOs
{
    public class VentaConsumidorFinalFiltrarDTO
    {
        public int Pagina { get; set; }
        public int RecordsPorPagina { get; set; }
        public PaginacionDTO PaginacionDTO
        {
            get { return new PaginacionDTO() { Pagina = Pagina, RecordsPorPagina = RecordsPorPagina }; }
        }
        public int ProductoId { get; set; }
        public DateTime? FechaDeVenta { get; set; }
        public bool Consumidor { get; set; }
        public bool Registrado { get; set; }
    }
}
