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
/*
            modelBuilder.Entity<VentaPago>()
                .HasKey(vp => new { vp.PagoId, vp.VentaId });*/

            /*   modelBuilder.Entity<VentaOrder>()
                   .HasOne(vo => vo.Venta)
                   .WithMany(v => v.VentaOrders)
                   .HasForeignKey(vo => vo.VentaId)
                   .HasConstraintName("VentaOrder1");

               modelBuilder.Entity<VentaOrder>()
                   .HasMany(vo => vo.Pagos)
                   .WithMany(p => p.VentaOrders)
                   .UsingEntity(x => x.ToTable("VentaOrderPago"));

               modelBuilder.Entity<VentaOrderPago>()
                   .HasKey(vop => new { vop.PagoId, vop.VentaOrderId });*/







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


            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Producto> Productos { get; set; }
        public DbSet<Venta> Ventas { get; set; }
        public DbSet<VentaLine> Venta_Lines { get; set; }
     /*   public DbSet<VentaOrderPago> VentaOrderPagos { get; set; }*/
        public DbSet<Pago> Pagos { get; set; }
        public DbSet<MetodoDePago> MetodosDePago { get; set; }
      /*  public DbSet<VentaOrder> VentaOrders { get; set; }*/
      public DbSet<VentaPago> VentaPagos { get; set; }
                       
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
