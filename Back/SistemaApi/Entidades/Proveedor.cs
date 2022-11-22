﻿namespace SistemaApi.Entidades
{
    public class Proveedor
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public virtual ICollection<Compra> Compras { get; set; }
    }
}
