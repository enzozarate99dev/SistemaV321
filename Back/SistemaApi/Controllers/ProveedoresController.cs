using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaApi.DTOs;
using SistemaApi.Entidades;
using SistemaApi.Utilidades;

namespace SistemaApi.Controllers
{
    [ApiController]
    [Route("api/proveedores")]
    public class ProveedoresController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ApplicationDbContext context;

        public ProveedoresController(IMapper mapper, ApplicationDbContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProveedorDTO>>> Get()
        {
            var proveedores = await context.Proveedores.Include(x => x.Compras).ThenInclude(y => y.CompraProducto).ThenInclude(z => z.Producto).ToListAsync();
            return mapper.Map<List<ProveedorDTO>>(proveedores);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProveedorDTO>> Get(int id)
        {
            var proveedor = await context.Proveedores.Include(x => x.Compras).ThenInclude(y => y.CompraProducto).ThenInclude(z => z.Producto).FirstOrDefaultAsync(x => x.Id == id);

            if (proveedor == null) { return NotFound(); }

            var dto = mapper.Map<ProveedorDTO>(proveedor);
            return dto;
        }

        [HttpGet("filtrar")]
        public async Task<ActionResult<List<ProveedorDTO>>> Filtrar([FromQuery] ProveedorFiltrarDTO proveedorFiltrarDTO)
        {
            var proveedoresQueryable = context.Proveedores.AsQueryable();

            if (!string.IsNullOrEmpty(proveedorFiltrarDTO.Nombre))
            {
                proveedoresQueryable = proveedoresQueryable.Where(x => x.Nombre.Contains(proveedorFiltrarDTO.Nombre));
            }
            await HttpContext.InsertarParametrosPaginacionEnCabecera(proveedoresQueryable);

            var proveedores = await proveedoresQueryable.Paginar(proveedorFiltrarDTO.PaginacionDTO).ToListAsync();
            return mapper.Map<List<ProveedorDTO>>(proveedores);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ProveedorCreacionDTO proveedorCreacionDTO)
        {
            var proveedor = mapper.Map<Proveedor>(proveedorCreacionDTO);
            context.Add(proveedor);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] ProveedorCreacionDTO proveedorCreacionDTO)
        {
            var proveedor = await context.Proveedores.FirstOrDefaultAsync(x => x.Id == id);

            if (proveedor == null)
            {
                return NotFound();
            }

            proveedor = mapper.Map(proveedorCreacionDTO, proveedor);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var proveedor = await context.Proveedores.FirstOrDefaultAsync(x => x.Id == id);

            if (proveedor == null)
            {
                return NotFound();
            }

            context.Remove(proveedor);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
