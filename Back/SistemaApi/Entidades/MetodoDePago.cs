using System.ComponentModel.DataAnnotations;

namespace SistemaApi.Entidades
{
    public class MetodoDePago
    {
        [Key]

        public int Id_metodoDePago { get; set; }
        public int Id_pago { get; set; }
        public string FormaDePago { get; set; }
        public virtual Pagos Pagos { get; set; }
    }
}
