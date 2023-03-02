using System.ComponentModel.DataAnnotations;

namespace SistemaApi.Entidades
{
    public class MetodoDePago
    {
        [Key]
        public int Id { get; set; }
        public int PagoId { get; set; }
        public string Metodo { get; set; }
        public virtual Pago Pago { get; set; }
    }
}
