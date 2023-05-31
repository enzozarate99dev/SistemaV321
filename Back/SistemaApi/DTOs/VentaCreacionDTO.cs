﻿using Microsoft.AspNetCore.Mvc;
using SistemaApi.Utilidades;
using System.ComponentModel.DataAnnotations;

namespace SistemaApi.DTOs
{
    public class VentaCreacionDTO
    {
        
        public int ClienteId { get; set; }
        public int SucursalId { get; set; }
        public ICollection<VentaLineCreacionDTO> VentaLines { get; set; }
        public ICollection<PagoCreacionDTO> Pagos { get; set; }
        public double? Descuento { get; set; }

    }
}
