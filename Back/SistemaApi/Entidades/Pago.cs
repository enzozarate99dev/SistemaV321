using System.ComponentModel.DataAnnotations;

namespace SistemaApi.Entidades
{
    public class Pago
    {
        [Key]
        public int Id_pago { get; set; }
    /*    public int Cliente_Id { get; set; }*/
        public double Importe { get; set; }
   /*     public virtual ClienteEntidad Cliente { get; set; }*/
        public DateTime Fecha { get; set; }
        public  ICollection<MetodoDePago> MetodosDePago { get; set; }
        public virtual ICollection<PagosMetodosDePago> PagosMetodosDePago { get; set; }
        public  ICollection<Venta> Ventas { get; set; }


    }
}

