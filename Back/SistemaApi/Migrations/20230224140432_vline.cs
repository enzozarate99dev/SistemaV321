using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaApi.Migrations
{
    public partial class vline : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Venta_Lines_Productos_ProductoId",
                table: "Venta_Lines");

            migrationBuilder.DropIndex(
                name: "IX_Venta_Lines_ProductoId",
                table: "Venta_Lines");

            migrationBuilder.CreateIndex(
                name: "IX_Venta_Lines_ProductoId",
                table: "Venta_Lines",
                column: "ProductoId");

            migrationBuilder.AddForeignKey(
                name: "Producto-VentaLine",
                table: "Venta_Lines",
                column: "ProductoId",
                principalTable: "Productos",
                principalColumn: "Id_producto",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "Producto-VentaLine",
                table: "Venta_Lines");

            migrationBuilder.DropIndex(
                name: "IX_Venta_Lines_ProductoId",
                table: "Venta_Lines");

            migrationBuilder.CreateIndex(
                name: "IX_Venta_Lines_ProductoId",
                table: "Venta_Lines",
                column: "ProductoId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Venta_Lines_Productos_ProductoId",
                table: "Venta_Lines",
                column: "ProductoId",
                principalTable: "Productos",
                principalColumn: "Id_producto",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
