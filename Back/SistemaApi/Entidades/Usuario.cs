using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace SistemaApi.Entidades
{
    public class Usuario : IdentityUser
    {
        /*  [Key]
          public string UserName { get; set; }
          public string Email { get; set; }
          public string Role { get; set; }
          public virtual Sucursal Sucursal { get; set; }*/
        public int SucursalId { get; set; }

    }
}
