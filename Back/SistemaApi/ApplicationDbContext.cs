using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SistemaApi.Entidades;

namespace SistemaApi
{
    public class ApplicationDbContext: IdentityDbContext<Usuario>
    {
        public ApplicationDbContext(DbContextOptions options): base(options)
        {
        }
       /* protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL("Server=127.0.0.1;Database=u402506303_sistema_makers;Uid=u402506303_admin;Pwd=Makers.MM666;");
        }
*/

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Venta>()
                .HasOne(x => x.Cliente)
                .WithMany(y => y.Ventas)
                .HasForeignKey(x => x.ClienteId)
                .HasConstraintName("Venta1");



            modelBuilder.Entity<VentaLine>()
                .HasOne(x => x.Venta)
                .WithMany(y => y.VentaLines)
                .HasForeignKey(x => x.VentaId)
                .HasConstraintName("Venta_line1");
          
              modelBuilder.Entity<VentaLine>()
                   .HasOne(vl => vl.Producto)
                   .WithMany(p => p.VentaLine)
                   .HasForeignKey(vl => vl.ProductoId)
                   .HasConstraintName("Producto-VentaLine");

            modelBuilder.Entity<Venta>()
            .HasMany(v => v.Pagos)
            .WithMany(p => p.Ventas)
            .UsingEntity<VentaPago>(
                vp => vp.HasOne(vp => vp.Pago).WithMany(),
                vp => vp.HasOne(vp => vp.Venta).WithMany()
            );
     
           

            modelBuilder.Entity<VentaCFProducto>()

                .HasKey(x => new { x.VentaCFId, x.ProductoId });

            modelBuilder.Entity<PresupuestoProducto>()
                .HasKey(x => new { x.PresupuestoId, x.ProductoId });

            modelBuilder.Entity<CompraProducto>()
                .HasKey(x => new { x.ProductoId, x.CompraId });
            modelBuilder.Entity<Compra>(e =>
            {
                e.HasOne(x => x.Proveedor)
                .WithMany(y => y.Compras)
                .HasForeignKey(z => z.ProveedorId)
                .HasConstraintName("Compra1");
            });

            modelBuilder.Entity<Sucursal>()
           .HasMany(s => s.Ventas)
           .WithOne(v => v.Sucursal)
           .HasForeignKey(v => v.SucursalId);

            modelBuilder.Entity<Sucursal>()
                .HasMany(s => s.Productos)
                .WithOne(p => p.Sucursal)
                .HasForeignKey(p => p.SucursalId);

        /*    modelBuilder.Entity<Sucursal>()
               .HasMany(s => s.Usuarios)
               .WithOne(u => u.Sucursal)
               .HasForeignKey(u => u.SucursalId);*/


            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Producto> Productos { get; set; }
        public DbSet<Venta> Ventas { get; set; }
        public DbSet<VentaLine> Venta_Lines { get; set; }
        public DbSet<Pago> Pagos { get; set; }
        public DbSet<MetodoDePago> MetodosDePago { get; set; }
        public DbSet<VentaPago> VentaPagos { get; set; }
        public DbSet<ClienteEntidad> Clientes { get; set; }
        public DbSet<VentaCFProducto> VentaCFProducto { get; set; }
        public DbSet<VentaConsumidorFinal> VentaConsumidorFinal { get; set; }
        public DbSet<Presupuestos> Presupuestos { get; set; }
        public DbSet<PresupuestoProducto> PresupuestoProducto { get; set; }
        public DbSet<Proveedor> Proveedores { get; set; }
        public DbSet<Compra> Compras { get; set; }
        public DbSet<CompraProducto> CompraProductos { get; set; }
        public DbSet<Sucursal> Sucursales { get; set; }
       /* protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            *//*optionsBuilder.UseMySQL("server=185.206.160.3;user=u402506303_admin;password=Makers.MM666;database=u402506303_sistema_makers");*//*
            optionsBuilder.UseMySQL("server=localhost;user=root;password=;database=u402506303_sistema_makers");
        hay q instalar pomelo y mysql entity framework
        }*/
    }
}
