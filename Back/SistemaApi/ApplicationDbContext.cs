using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SistemaApi.Entidades;

namespace SistemaApi
{
    public class ApplicationDbContext: IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions options): base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<VentaProducto>()
                .HasKey(x => new { x.ProductoId, x.VentaId });
            modelBuilder.Entity<Venta>(e => {
                e.HasOne(x => x.Cliente).WithMany(y => y.Ventas).HasForeignKey(z => z.ClienteId).HasConstraintName("Venta1");
                });



            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Producto> Productos { get; set; }
        public DbSet<Venta> Ventas { get; set; }
        public DbSet<VentaProducto> VentaProductos { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
    }
}
