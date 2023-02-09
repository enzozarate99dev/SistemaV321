using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaApi.Migrations
{
    public partial class pago : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pagos_Ventas_VentaId_venta",
                table: "Pagos");

            migrationBuilder.DropIndex(
                name: "IX_Pagos_VentaId_venta",
                table: "Pagos");

            migrationBuilder.DropColumn(
                name: "VentaId_venta",
                table: "Pagos");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "VentaId_venta",
                table: "Pagos",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pagos_VentaId_venta",
                table: "Pagos",
                column: "VentaId_venta");

            migrationBuilder.AddForeignKey(
                name: "FK_Pagos_Ventas_VentaId_venta",
                table: "Pagos",
                column: "VentaId_venta",
                principalTable: "Ventas",
                principalColumn: "Id_venta");
        }
    }
}
