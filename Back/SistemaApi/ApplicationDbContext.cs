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

            modelBuilder.Entity<VentaLine>()
                .HasOne(v => v.Productos)
                .WithOne(p => p.Venta_line)
                .HasForeignKey<VentaLine>(v => v.ProductoId);
               

            modelBuilder.Entity<VentaOrder>(e =>
            {
                e.HasOne(x => x.Venta).WithMany(y => y.VentaOrders).HasForeignKey(x => x.VentaId).HasConstraintName("Venta_order1");
            });

            modelBuilder.Entity<VentaOrderPago>()
                .HasKey(x => new { x.PagoId, x.Venta_orderId });
            modelBuilder.Entity<VentaOrderPago>()
                .HasOne(x => x.Pago)
                .WithMany(y => y.Venta_Order_Pagos)
                .HasForeignKey(x => x.PagoId);
            modelBuilder.Entity<VentaOrderPago>()
                .HasOne(x => x.Venta_Order)
                .WithMany(y => y.Venta_Order_Pagos)
                .HasForeignKey(x => x.Venta_orderId);

            modelBuilder.Entity<MetodoDePago>(e => {
                e.HasOne(x => x.Pagos).WithMany(y => y.MetodosDePago).HasForeignKey(x => x.Id_pago).HasConstraintName("MetodoPago1");
            });

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
        public DbSet<VentaOrder> Venta_Orders { get; set; }
        public DbSet<VentaOrderPago> Venta_Order_Pagos { get; set; }
        public DbSet<ClienteEntidad> Clientes { get; set; }
        public DbSet<VentaCFProducto> VentaCFProducto { get; set; }
        public DbSet<VentaConsumidorFinal> VentaConsumidorFinal { get; set; }
        public DbSet<Presupuestos> Presupuestos { get; set; }
        public DbSet<PresupuestoProducto> PresupuestoProducto { get; set; }
        public DbSet<Proveedor> Proveedores { get; set; }
        public DbSet<Compra> Compras { get; set; }
        public DbSet<CompraProducto> CompraProductos { get; set; }
        public DbSet<Pagos> Pagos { get; set; }
        public DbSet<MetodoDePago> MetodoDePagos { get; set; }
    }
}
