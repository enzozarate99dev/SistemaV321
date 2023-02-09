using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaApi.Migrations
{
    public partial class correcciones : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Venta_Lines_Productos_Id_producto",
                table: "Venta_Lines");

            migrationBuilder.DropForeignKey(
                name: "Venta_line1",
                table: "Venta_Lines");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Venta_Lines",
                table: "Venta_Lines");

            migrationBuilder.DropColumn(
                name: "ConfirmacionAfip",
                table: "Ventas");

            migrationBuilder.DropColumn(
                name: "IdComprobante",
                table: "Ventas");

            migrationBuilder.DropColumn(
                name: "TipoComprobante",
                table: "Ventas");

            migrationBuilder.DropColumn(
                name: "Id_producto",
                table: "Venta_Lines");

            migrationBuilder.DropColumn(
                name: "Id_venta",
                table: "Pagos");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Venta_Lines",
                table: "Venta_Lines",
                column: "Id_venta_line");

            migrationBuilder.CreateIndex(
                name: "IX_Venta_Lines_Id_venta",
                table: "Venta_Lines",
                column: "Id_venta");

            migrationBuilder.AddForeignKey(
                name: "FK_Venta_Lines_Productos_Id_venta_line",
                table: "Venta_Lines",
                column: "Id_venta_line",
                principalTable: "Productos",
                principalColumn: "Id_producto",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "Venta_line1",
                table: "Venta_Lines",
                column: "Id_venta",
                principalTable: "Ventas",
                principalColumn: "Id_venta",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Venta_Lines_Productos_Id_venta_line",
                table: "Venta_Lines");

            migrationBuilder.DropForeignKey(
                name: "Venta_line1",
                table: "Venta_Lines");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Venta_Lines",
                table: "Venta_Lines");

            migrationBuilder.DropIndex(
                name: "IX_Venta_Lines_Id_venta",
                table: "Venta_Lines");

            migrationBuilder.AddColumn<int>(
                name: "ConfirmacionAfip",
                table: "Ventas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IdComprobante",
                table: "Ventas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "TipoComprobante",
                table: "Ventas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Id_producto",
                table: "Venta_Lines",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Id_venta",
                table: "Pagos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Venta_Lines",
                table: "Venta_Lines",
                column: "Id_producto");

            migrationBuilder.AddForeignKey(
                name: "FK_Venta_Lines_Productos_Id_producto",
                table: "Venta_Lines",
                column: "Id_producto",
                principalTable: "Productos",
                principalColumn: "Id_producto",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "Venta_line1",
                table: "Venta_Lines",
                column: "Id_producto",
                principalTable: "Ventas",
                principalColumn: "Id_venta",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
