using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaApi.DTOs;

namespace SistemaApi.Controllers
{
    [Route("/api/sucursales")]
    [ApiController]
    public class SucursalController : ControllerBase
    {
        private readonly ILogger<ProductoController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public SucursalController(ILogger<ProductoController> logger, ApplicationDbContext context, IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;

        }

        [HttpGet]
        public async Task<ActionResult<List<SucursalDTO>>> Get()
        {
            var sucursales = await context.Sucursales.OrderBy(x => x.Id).ToListAsync();
            var resultado = mapper.Map<List<SucursalDTO>>(sucursales);
            return resultado;
        }


        [HttpGet("{id:int}")]
        public async Task<ActionResult<SucursalDTO>> Get(int id)
        {
            var sucursal = await context.Sucursales.FirstOrDefaultAsync(x => x.Id == id);

            if (sucursal == null) { return NotFound(); }

            var dto = mapper.Map<SucursalDTO>(sucursal);
            return dto;
        }
    }
}
