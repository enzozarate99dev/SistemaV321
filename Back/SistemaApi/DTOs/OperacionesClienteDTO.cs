﻿namespace SistemaApi.DTOs
{
    public class OperacionesClienteDTO
    {
        public int Id_venta { get; set; }
        public int ClienteId { get; set; }
        public double PrecioTotal { get; set; }
        public DateTime FechaDeVenta { get; set; }
        public string TipoComprobante { get; set; }
        public bool Pagada { get; set; }
        public List<PagoDTO> Pagos { get; set; }

    }
}
