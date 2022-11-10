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
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly IConfiguration configuration;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly ApplicationDbContext context;

        public CuentasController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IConfiguration configuration, RoleManager<IdentityRole> roleManager, ApplicationDbContext context)
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
                listado.Add(new UsuariosDTO { UserName = usuario.UserName, Email= usuario.Email, Role = roles[0] });
            }
            return listado;
        }

        [HttpPost("crear")]
        public async Task<ActionResult<RespuestaAutenticacion>> Crear([FromBody] RegistroCreacionDTO credenciales)
        {
            var usuarios = new IdentityUser { UserName = credenciales.Nombre, Email = credenciales.Email };
            var resultado = await userManager.CreateAsync(usuarios, credenciales.Password);      
            if (resultado.Succeeded)
            {
                await roleManager.CreateAsync(new IdentityRole(credenciales.Role));
                var user = await userManager.FindByEmailAsync(credenciales.Email);
                await userManager.AddToRoleAsync(user, credenciales.Role);
                return await ConstruirToken(credenciales);
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

        /*[HttpDelete("{nombre:string}")]
        public async Task<ActionResult> Delete(string nombre)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == nombre);
            var userRol = await context.UserRoles.FirstOrDefaultAsync(x => x.UserId == user.Id);

            if (user == null)
            {
                return NotFound();
            }

            context.Remove(user);
            context.Remove(userRol);
            await context.SaveChangesAsync();
            return NoContent();
        }*/

        [HttpDelete]
        public async Task<ActionResult> Delete()
        {
            var users = await context.Users.ToListAsync();
            var userRol = await context.Users.ToListAsync();
            foreach(var user in users)
            {
                context.Remove(user);
            }
            foreach(var userRo in userRol)
            {
                context.Remove(userRo);
            }
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

        private async Task<RespuestaAutenticacion> ConstruirToken(RegistroCreacionDTO credenciales)
        {
            var claims = new List<Claim>()
            {
                new Claim("email",credenciales.Email),
                new Claim("nombre", credenciales.Nombre),
                new Claim("role", credenciales.Role)
            };

            var usuario = await userManager.FindByEmailAsync(credenciales.Email);
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
    }
}
