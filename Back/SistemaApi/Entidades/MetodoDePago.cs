using System.ComponentModel.DataAnnotations;

namespace SistemaApi.Entidades
{
    public class MetodoDePago
    {
        [Key]
        public int Id_metodo { get; set; }
        public string NombreMetodo { get; set; }
        public  ICollection<Pago> Pagos { get; set; }
/*        public virtual  ICollection<PagosMetodosDePago> PagosMetodosDePago { get; set; }
*/    }
}
