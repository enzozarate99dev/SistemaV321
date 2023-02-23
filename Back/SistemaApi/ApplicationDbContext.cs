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

           
       
            modelBuilder.Entity<Venta>(e => {
                e.HasOne(x => x.Cliente).WithMany(y => y.Ventas).HasForeignKey(x => x.ClienteId).HasConstraintName("Venta1");
                });
            
           

            modelBuilder.Entity<VentaLine>(e => {
                e.HasOne(x => x.Venta).WithMany(y => y.VentaLines).HasForeignKey(x => x.VentaId).HasConstraintName("Venta_line1");
            });

            /*   modelBuilder.Entity<VentaLine>(e =>
               {
                   e.HasOne(vl => vl.Productos).WithMany(p => p.VentaLines).HasForeignKey(vl => vl.ProductoId).HasConstraintName("Producto-VentaLine");
               });*/
            /*  modelBuilder.Entity<VentaLine>()
                   .HasOne(v => v.Producto)
                   .WithOne(p => p.VentaLine)
                   .HasForeignKey<VentaLine>(v => v.ProductoId);*/

            modelBuilder.Entity<Producto>()
                .HasOne(p => p.VentaLine)
                .WithOne(vl => vl.Producto)
                .HasForeignKey<VentaLine>(p => p.ProductoId);



            modelBuilder.Entity<VentaCFProducto>()

                .HasKey(x => new { x.VentaCFId, x.ProductoId });

            modelBuilder.Entity<PresupuestoProducto>()
                .HasKey(x => new { x.PresupuestoId, x.ProductoId });

            modelBuilder.Entity<CompraProducto>()
                .HasKey(x => new { x.ProductoId, x.CompraId });
            modelBuilder.Entity<Compra>(e =>
            {
                e.HasOne(x => x.Proveedor).WithMany(y => y.Compras).HasForeignKey(z => z.ProveedorId).HasConstraintName("Compra1");
            });


            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Producto> Productos { get; set; }
        public DbSet<Venta> Ventas { get; set; }
        public DbSet<VentaLine> Venta_Lines { get; set; }
        public DbSet<ClienteEntidad> Clientes { get; set; }
        public DbSet<VentaCFProducto> VentaCFProducto { get; set; }
        public DbSet<VentaConsumidorFinal> VentaConsumidorFinal { get; set; }
        public DbSet<Presupuestos> Presupuestos { get; set; }
        public DbSet<PresupuestoProducto> PresupuestoProducto { get; set; }
        public DbSet<Proveedor> Proveedores { get; set; }
        public DbSet<Compra> Compras { get; set; }
        public DbSet<CompraProducto> CompraProductos { get; set; }
    }
}
