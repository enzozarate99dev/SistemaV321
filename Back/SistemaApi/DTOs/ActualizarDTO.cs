namespace SistemaApi.DTOs
{
    public class ActualizarDTO
    {
        public List<int> Ids { get; set; }
        public double Valor { get; set; }
        public bool Aumentar { get; set; }
        public bool Descontar { get; set; }
    }
}
