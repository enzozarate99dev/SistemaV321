using FacturanteEjemplo.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FacturanteEjemplo.Controllers
{
    [ApiController]
    [Route("Facturante")]
    public class HomeController : Controller
    {
        private readonly IFacturas _facturas;
        public HomeController(IFacturas facturas)
        {
            _facturas = facturas;
        }
        [HttpGet("PruebaFacturante")]
        public void PruebaFacturante()
        {
            _facturas.GenerarFactura();
        }

    }
}
