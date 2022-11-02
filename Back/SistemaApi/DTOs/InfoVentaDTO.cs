namespace SistemaApi.DTOs
{
    public class InfoVentaDTO
    {
        public int IdVenta { get; set; }
        public List<ProductoDTO> Productos { get; set; }
    }
}
