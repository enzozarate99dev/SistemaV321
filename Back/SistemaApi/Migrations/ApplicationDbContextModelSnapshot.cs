﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SistemaApi;

#nullable disable

namespace SistemaApi.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("SistemaApi.Entidades.ClienteEntidad", b =>
                {
                    b.Property<int>("Id_cliente")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id_cliente"), 1L, 1);

                    b.Property<string>("CodigoPostal")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double?>("Deuda")
                        .HasColumnType("float");

                    b.Property<string>("Domicilio")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Localidad")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NombreYApellido")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NroDocumento")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NroIngresos")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PercibeIIBB")
                        .HasColumnType("bit");

                    b.Property<bool>("PercibeIVA")
                        .HasColumnType("bit");

                    b.Property<string>("Provincia")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RazonSocial")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telefono")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TipoDocumento")
                        .HasColumnType("int");

                    b.HasKey("Id_cliente");

                    b.ToTable("Clientes");
                });

            modelBuilder.Entity("SistemaApi.Entidades.Compra", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("FechaDeCompra")
                        .HasColumnType("datetime2");

                    b.Property<double?>("PrecioTotal")
                        .HasColumnType("float");

                    b.Property<int>("ProveedorId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ProveedorId");

                    b.ToTable("Compras");
                });

            modelBuilder.Entity("SistemaApi.Entidades.CompraProducto", b =>
                {
                    b.Property<int>("ProductoId")
                        .HasColumnType("int");

                    b.Property<int>("CompraId")
                        .HasColumnType("int");

                    b.Property<int>("Unidades")
                        .HasColumnType("int");

                    b.HasKey("ProductoId", "CompraId");

                    b.HasIndex("CompraId");

                    b.ToTable("CompraProductos");
                });

            modelBuilder.Entity("SistemaApi.Entidades.MetodoDePago", b =>
                {
                    b.Property<int>("Id_metodoDePago")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id_metodoDePago"), 1L, 1);

                    b.Property<string>("FormaDePago")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Id_pago")
                        .HasColumnType("int");

                    b.HasKey("Id_metodoDePago");

                    b.HasIndex("Id_pago");

                    b.ToTable("MetodoDePagos");
                });

            modelBuilder.Entity("SistemaApi.Entidades.Pagos", b =>
                {
                    b.Property<int>("Id_pago")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id_pago"), 1L, 1);

                    b.Property<DateTime>("FechaDePago")
                        .HasColumnType("datetime2");

                    b.Property<double>("PrecioTotal")
                        .HasColumnType("float");

                    b.HasKey("Id_pago");

                    b.ToTable("Pagos");
                });

            modelBuilder.Entity("SistemaApi.Entidades.PresupuestoProducto", b =>
                {
                    b.Property<int>("PresupuestoId")
                        .HasColumnType("int");

                    b.Property<int>("ProductoId")
                        .HasColumnType("int");

                    b.Property<int>("Unidades")
                        .HasColumnType("int");

                    b.HasKey("PresupuestoId", "ProductoId");

                    b.HasIndex("ProductoId");

                    b.ToTable("PresupuestoProducto");
                });

            modelBuilder.Entity("SistemaApi.Entidades.Presupuestos", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<double>("Descuento")
                        .HasColumnType("float");

                    b.Property<DateTime>("FechaDeVenta")
                        .HasColumnType("datetime2");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double?>("PrecioTotal")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("Presupuestos");
                });

            modelBuilder.Entity("SistemaApi.Entidades.Producto", b =>
                {
                    b.Property<int>("Id_producto")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id_producto"), 1L, 1);

                    b.Property<int>("Cantidad")
                        .HasColumnType("int");

                    b.Property<string>("Categoria")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Codigo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Foto")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<double>("Precio")
                        .HasColumnType("float");

                    b.HasKey("Id_producto");

                    b.ToTable("Productos");
                });

            modelBuilder.Entity("SistemaApi.Entidades.Proveedor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Direccion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telefono")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Proveedores");
                });

            modelBuilder.Entity("SistemaApi.Entidades.Venta", b =>
                {
                    b.Property<int>("Id_venta")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id_venta"), 1L, 1);

                    b.Property<double>("Adeudada")
                        .HasColumnType("float");

                    b.Property<DateTime>("FechaDeVenta")
                        .HasColumnType("datetime2");

                    b.Property<int>("Id_cliente")
                        .HasColumnType("int");

                    b.Property<double?>("PrecioTotal")
                        .HasColumnType("float");

                    b.Property<int>("TratamientoImpositivo")
                        .HasColumnType("int");

                    b.HasKey("Id_venta");

                    b.HasIndex("Id_cliente");

                    b.ToTable("Ventas");
                });

            modelBuilder.Entity("SistemaApi.Entidades.Venta_line", b =>
                {
                    b.Property<int>("Id_venta_line")
                        .HasColumnType("int");

                    b.Property<int>("Cantidad")
                        .HasColumnType("int");

                    b.Property<int>("Id_venta")
                        .HasColumnType("int");

                    b.Property<double>("Iva")
                        .HasColumnType("float");

                    b.Property<double>("PrecioUnitario")
                        .HasColumnType("float");

                    b.HasKey("Id_venta_line");

                    b.HasIndex("Id_venta");

                    b.ToTable("Venta_Lines");
                });

            modelBuilder.Entity("SistemaApi.Entidades.Venta_order", b =>
                {
                    b.Property<int>("Id_venta_order")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id_venta_order"), 1L, 1);

                    b.Property<DateTime>("Fecha")
                        .HasColumnType("datetime2");

                    b.Property<int>("Id_venta")
                        .HasColumnType("int");

                    b.Property<string>("TipoComprobante")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id_venta_order");

                    b.HasIndex("Id_venta");

                    b.ToTable("Venta_Orders");
                });

            modelBuilder.Entity("SistemaApi.Entidades.Venta_order_Pago", b =>
                {
                    b.Property<int>("PagoId")
                        .HasColumnType("int");

                    b.Property<int>("Venta_orderId")
                        .HasColumnType("int");

                    b.HasKey("PagoId", "Venta_orderId");

                    b.HasIndex("Venta_orderId");

                    b.ToTable("Venta_Order_Pagos");
                });

            modelBuilder.Entity("SistemaApi.Entidades.VentaCFProducto", b =>
                {
                    b.Property<int>("VentaCFId")
                        .HasColumnType("int");

                    b.Property<int>("ProductoId")
                        .HasColumnType("int");

                    b.Property<int>("Unidades")
                        .HasColumnType("int");

                    b.HasKey("VentaCFId", "ProductoId");

                    b.HasIndex("ProductoId");

                    b.ToTable("VentaCFProducto");
                });

            modelBuilder.Entity("SistemaApi.Entidades.VentaConsumidorFinal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("ConfirmacionAfip")
                        .HasColumnType("int");

                    b.Property<DateTime>("FechaDeVenta")
                        .HasColumnType("datetime2");

                    b.Property<int>("FormaDePago")
                        .HasColumnType("int");

                    b.Property<int>("IdComprobante")
                        .HasColumnType("int");

                    b.Property<string>("NombreCliente")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double?>("PrecioTotal")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("VentaConsumidorFinal");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SistemaApi.Entidades.Compra", b =>
                {
                    b.HasOne("SistemaApi.Entidades.Proveedor", "Proveedor")
                        .WithMany("Compras")
                        .HasForeignKey("ProveedorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("Compra1");

                    b.Navigation("Proveedor");
                });

            modelBuilder.Entity("SistemaApi.Entidades.CompraProducto", b =>
                {
                    b.HasOne("SistemaApi.Entidades.Compra", "Compra")
                        .WithMany("CompraProducto")
                        .HasForeignKey("CompraId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SistemaApi.Entidades.Producto", "Producto")
                        .WithMany()
                        .HasForeignKey("ProductoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Compra");

                    b.Navigation("Producto");
                });

            modelBuilder.Entity("SistemaApi.Entidades.MetodoDePago", b =>
                {
                    b.HasOne("SistemaApi.Entidades.Pagos", "Pagos")
                        .WithMany("MetodosDePago")
                        .HasForeignKey("Id_pago")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("MetodoPago1");

                    b.Navigation("Pagos");
                });

            modelBuilder.Entity("SistemaApi.Entidades.PresupuestoProducto", b =>
                {
                    b.HasOne("SistemaApi.Entidades.Presupuestos", "Presupuesto")
                        .WithMany("PresupuestoProducto")
                        .HasForeignKey("PresupuestoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SistemaApi.Entidades.Producto", "Producto")
                        .WithMany()
                        .HasForeignKey("ProductoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Presupuesto");

                    b.Navigation("Producto");
                });

            modelBuilder.Entity("SistemaApi.Entidades.Venta", b =>
                {
                    b.HasOne("SistemaApi.Entidades.ClienteEntidad", "Cliente")
                        .WithMany("Ventas")
                        .HasForeignKey("Id_cliente")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("Venta1");

                    b.Navigation("Cliente");
                });

            modelBuilder.Entity("SistemaApi.Entidades.Venta_line", b =>
                {
                    b.HasOne("SistemaApi.Entidades.Venta", "Venta")
                        .WithMany("Venta_Lines")
                        .HasForeignKey("Id_venta")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("Venta_line1");

                    b.HasOne("SistemaApi.Entidades.Producto", "Producto")
                        .WithOne("Venta_line")
                        .HasForeignKey("SistemaApi.Entidades.Venta_line", "Id_venta_line")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Producto");

                    b.Navigation("Venta");
                });

            modelBuilder.Entity("SistemaApi.Entidades.Venta_order", b =>
                {
                    b.HasOne("SistemaApi.Entidades.Venta", "Venta")
                        .WithMany("Venta_Orders")
                        .HasForeignKey("Id_venta")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("Venta_order1");

                    b.Navigation("Venta");
                });

            modelBuilder.Entity("SistemaApi.Entidades.Venta_order_Pago", b =>
                {
                    b.HasOne("SistemaApi.Entidades.Pagos", "Pago")
                        .WithMany("Venta_Order_Pagos")
                        .HasForeignKey("PagoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SistemaApi.Entidades.Venta_order", "Venta_Order")
                        .WithMany("Venta_Order_Pagos")
                        .HasForeignKey("Venta_orderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pago");

                    b.Navigation("Venta_Order");
                });

            modelBuilder.Entity("SistemaApi.Entidades.VentaCFProducto", b =>
                {
                    b.HasOne("SistemaApi.Entidades.Producto", "Producto")
                        .WithMany()
                        .HasForeignKey("ProductoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SistemaApi.Entidades.VentaConsumidorFinal", "VentaCF")
                        .WithMany("VentaCFProducto")
                        .HasForeignKey("VentaCFId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Producto");

                    b.Navigation("VentaCF");
                });

            modelBuilder.Entity("SistemaApi.Entidades.ClienteEntidad", b =>
                {
                    b.Navigation("Ventas");
                });

            modelBuilder.Entity("SistemaApi.Entidades.Compra", b =>
                {
                    b.Navigation("CompraProducto");
                });

            modelBuilder.Entity("SistemaApi.Entidades.Pagos", b =>
                {
                    b.Navigation("MetodosDePago");

                    b.Navigation("Venta_Order_Pagos");
                });

            modelBuilder.Entity("SistemaApi.Entidades.Presupuestos", b =>
                {
                    b.Navigation("PresupuestoProducto");
                });

            modelBuilder.Entity("SistemaApi.Entidades.Producto", b =>
                {
                    b.Navigation("Venta_line")
                        .IsRequired();
                });

            modelBuilder.Entity("SistemaApi.Entidades.Proveedor", b =>
                {
                    b.Navigation("Compras");
                });

            modelBuilder.Entity("SistemaApi.Entidades.Venta", b =>
                {
                    b.Navigation("Venta_Lines");

                    b.Navigation("Venta_Orders");
                });

            modelBuilder.Entity("SistemaApi.Entidades.Venta_order", b =>
                {
                    b.Navigation("Venta_Order_Pagos");
                });

            modelBuilder.Entity("SistemaApi.Entidades.VentaConsumidorFinal", b =>
                {
                    b.Navigation("VentaCFProducto");
                });
#pragma warning restore 612, 618
        }
    }
}
