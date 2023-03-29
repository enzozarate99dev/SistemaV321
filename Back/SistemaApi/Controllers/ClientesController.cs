﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaApi.DTOs;
using SistemaApi.Entidades;
using SistemaApi.Utilidades;

namespace SistemaApi.Controllers
{
    [ApiController]
    [Route("api/clientes")]
    public class ClientesController: ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ApplicationDbContext context;

        public ClientesController(IMapper mapper, ApplicationDbContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ClienteDTO>>> GetTodos()
        {
            var clientes = await context.Clientes.ToListAsync();
            return mapper.Map<List<ClienteDTO>>(clientes);
        }


        [HttpGet("filtrar")]
        public async Task<ActionResult<List<ClienteDTO>>> Filtrar([FromQuery] ClienteFiltrarDTO clienteFiltrarDTO)
        {
            var clientesQueryable = context.Clientes.AsQueryable();

            if (!string.IsNullOrEmpty(clienteFiltrarDTO.NombreYApellido))
            {
                clientesQueryable = clientesQueryable.Where(x => x.NombreYApellido.Contains(clienteFiltrarDTO.NombreYApellido));
            }
            await HttpContext.InsertarParametrosPaginacionEnCabecera(clientesQueryable);

            var clientes = await clientesQueryable.Paginar(clienteFiltrarDTO.PaginacionDTO).ToListAsync();
            return mapper.Map<List<ClienteDTO>>(clientes);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ClienteDTO>> Get(int id)
        {
            var cliente = await context.Clientes.FirstOrDefaultAsync(x => x.Id_cliente== id);

            if (cliente == null) { return NotFound(); }

            var dto = mapper.Map<ClienteDTO>(cliente);
            return dto;
        }

        [HttpGet("ventasCliente/{id:int}")]
        public async Task<ActionResult<List<OperacionesClienteDTO>>> Ventas(int id)
        {
            var ventas = await context.Ventas.Where(x => x.ClienteId == id)
                .Include(v => v.Pagos)
                .ThenInclude(p => p.MetodosDePago)
                .ToListAsync();
            return mapper.Map<List<OperacionesClienteDTO>>(ventas);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ClienteCreacionDTO clienteCreacionDTO)
        {
            var cliente = mapper.Map<ClienteEntidad>(clienteCreacionDTO);
            cliente.Deuda = 0;

            context.Add(cliente);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] ClienteCreacionDTO clienteCreacionDTO)
        {
            var cliente = await context.Clientes.FirstOrDefaultAsync(x => x.Id_cliente == id);

            if (cliente == null)
            {
                return NotFound();
            }

            cliente = mapper.Map(clienteCreacionDTO, cliente);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var cliente = await context.Clientes.FirstOrDefaultAsync(x => x.Id_cliente == id);

            if (cliente == null)
            {
                return NotFound();
            }

            context.Remove(cliente);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
