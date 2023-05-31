using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SistemaApi.DTOs;
using SistemaApi.Entidades;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace SistemaApi.Controllers
{
    [ApiController]
    [Route("api/cuentas")]
    public class CuentasController : ControllerBase
    {
        private readonly UserManager<Usuario> userManager;
        private readonly SignInManager<Usuario> signInManager;
        private readonly IConfiguration configuration;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly ApplicationDbContext context;

        public CuentasController(UserManager<Usuario> userManager, SignInManager<Usuario> signInManager, IConfiguration configuration, RoleManager<IdentityRole> roleManager, ApplicationDbContext context)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.roleManager = roleManager;
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<UsuariosDTO>>> Get()
        {
            var usuarios = await context.Users.ToListAsync();
            var listado = new List<UsuariosDTO>();
            foreach(var usuario in usuarios)
            {
                var roles = await userManager.GetRolesAsync(usuario);
                listado.Add(new UsuariosDTO { UserName = usuario.UserName, Email= usuario.Email, Role = roles[0], SucursalId = usuario.SucursalId });
            }
            return listado;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UsuariosDTO>> User(string id)
        {

            /* var user = await userManager.GetUserAsync(HttpContext.User);*/
            /*var user = await userManager.FindByIdAsync(name);
            if (user == null) { return NotFound(); }
            var userRol = await userManager.GetRolesAsync(user);*/
            var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == id);
            /* var userRol = await context.UserRoles.FirstOrDefaultAsync(x => x.UserId == user.Id);*/
            var userRol = await userManager.GetRolesAsync(user);

            if (user == null)
            {
                return NotFound();
            }

            return new UsuariosDTO { UserName = user.UserName, Email = user.Email, Role = userRol[0], SucursalId = user.SucursalId };
        }

        [HttpPost("crear")]
        public async Task<ActionResult<RespuestaAutenticacion>> Crear([FromBody] RegistroCreacionDTO credenciales)
        {
            var usuarios = new Usuario { UserName = credenciales.Nombre, Email = credenciales.Email };
            var resultado = await userManager.CreateAsync(usuarios, credenciales.Password);
            if (resultado.Succeeded)
            {
                await roleManager.CreateAsync(new IdentityRole(credenciales.Role));
                var user = await userManager.FindByEmailAsync(credenciales.Email);
                await userManager.AddToRoleAsync(user, credenciales.Role);

                var idSucursal = await ObtenerIdSucursal(credenciales.SucursalId);
                user.SucursalId = idSucursal;
                await context.SaveChangesAsync();

                return NoContent();
            }
            else
            {
                return BadRequest(resultado.Errors);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<RespuestaAutenticacion>> Login([FromBody] LoginDTO login)
        {
            var resultado = await signInManager.PasswordSignInAsync(login.Nombre, login.Password, isPersistent: false, lockoutOnFailure: false);
            
            if (resultado.Succeeded)
            {
                return await ConstruirToken(login);
            }
            else
            {
                return BadRequest("Login incorrecto");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == id);
            var userRol = await context.UserRoles.FirstOrDefaultAsync(x => x.UserId == user.Id);

            if (user == null)
            {
                return NotFound();
            }

            context.Remove(user);
            context.Remove(userRol);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == id);
            var userRol = await context.UserRoles.FirstOrDefaultAsync(x => x.UserId == user.Id);

            if (user == null)
            {
                return NotFound();
            }

            context.Remove(user);
            context.Remove(userRol);
            await context.SaveChangesAsync();
            return NoContent();
        }

        private async Task<RespuestaAutenticacion> ConstruirToken(LoginDTO login)
        {
            var usuario = await userManager.FindByNameAsync(login.Nombre);
            var roles = await userManager.GetRolesAsync(usuario);
            var claims = new List<Claim>()
            {
                new Claim("nombre", login.Nombre),
                new Claim("role", roles[0])
            };

            
            var claimsDB = await userManager.GetClaimsAsync(usuario);
         
            claims.AddRange(claimsDB);

            var llave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["llavejwt"]));
            var creds = new SigningCredentials(llave, SecurityAlgorithms.HmacSha256);

            var expiracion = DateTime.UtcNow.AddYears(1);

            var token = new JwtSecurityToken(issuer: null, audience: null, claims: claims, expires: expiracion, signingCredentials: creds);

            return new RespuestaAutenticacion()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiracion = expiracion
            };
        }
        private async Task<int> ObtenerIdSucursal(int  sucursalId)
        {
            var sucursal = await context.Sucursales.FirstOrDefaultAsync(s => s.Id == sucursalId);
            if (sucursal != null)
            {
                return sucursal.Id;
            }
            else
            {
                throw new Exception("La dirección de sucursal no es válida.");
            }
        }
      

    }
}
