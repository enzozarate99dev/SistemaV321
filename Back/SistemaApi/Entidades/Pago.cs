using System.ComponentModel.DataAnnotations;

namespace SistemaApi.Entidades
{
    public class Pago
    {
        [Key]
        public int Id_pago { get; set; }
        public double Importe { get; set; }
        public DateTime Fecha { get; set; }
        public int MetodoDePago { get; set; }
        public ICollection<Venta> Ventas { get; set; }


    }
}
