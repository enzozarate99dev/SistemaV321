using Microsoft.EntityFrameworkCore;
using SistemaApi;
using AutoMapper;
using SistemaApi.Utilidades;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using SistemaApi.Services;
using System.Text.Json;
using System.Text.Json.Serialization;
using SistemaApi.Entidades;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddControllers(options =>
{
    options.Filters.Add(typeof(ParsearBadRequest));
}).ConfigureApiBehaviorOptions(BehaviorBadRequests.Parsear);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<IAlmacenadorArchivos, AlmacenadorArchivosLocal>();

builder.Services.AddTransient<IFacturas, Facturas>();
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddIdentity<Usuario, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opciones => opciones.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer= false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["llavejwt"])),
        ClockSkew = TimeSpan.Zero
    });

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));


/*builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseMySQL(configuration.GetConnectionString("DefaultConnection"),
    mySqlOptions =>
    {
        mySqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(30),
            errorNumbersToAdd: null);
    }));
*/

builder.Services.AddCors(options =>
{
    var frontendURL = configuration.GetValue<string>("frontend_url");
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader() //Esto funciona pero no es seguro
        .WithExposedHeaders(new string[] { "cantidadTotalRegistros" });
    });
});




JsonSerializerOptions options = new()
{
    ReferenceHandler = ReferenceHandler.IgnoreCycles,
    WriteIndented = true
};
/*
builder.Services.AddApplicationInsightsTelemetry(builder.Configuration["APPLICATIONINSIGHTS_CONNECTION_STRING"]);
*/
var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseSwagger();
app.UseSwaggerUI();

app.UseStaticFiles();

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors();
app.UseAuthorization();

app.UseEndpoints(endpoints => {
    endpoints.MapControllers();

});
app.MapControllers();

app.Run();
