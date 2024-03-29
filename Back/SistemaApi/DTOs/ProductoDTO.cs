﻿using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class ProductoDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public double Precio { get; set; }
        public int Cantidad { get; set; }
        public string Codigo { get; set; }
        public string Categoria { get; set; }
        public string Descripcion { get; set; }
        public string? Foto { get; set; }
    }
}
