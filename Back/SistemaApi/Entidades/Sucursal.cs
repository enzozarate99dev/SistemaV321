using SistemaApi.DTOs;
using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaApi.Entidades
{
    public class Sucursal
    {
        public int Id { get; set; }
        public string Direccion { get; set; }
/*        public List<Usuario> Usuarios { get; set; }*/
        public List<Producto> Productos { get; set; }
        public List<Venta> Ventas { get; set; }
    }
}
