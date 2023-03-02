using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaApi.Migrations
{
    public partial class outmetodopago : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "MetodoDePago1",
                table: "MetodosDePago");

            migrationBuilder.AddColumn<int>(
                name: "MetodoDePago",
                table: "Pagos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_MetodosDePago_Pagos_PagoId",
                table: "MetodosDePago",
                column: "PagoId",
                principalTable: "Pagos",
                principalColumn: "Id_pago",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MetodosDePago_Pagos_PagoId",
                table: "MetodosDePago");

            migrationBuilder.DropColumn(
                name: "MetodoDePago",
                table: "Pagos");

            migrationBuilder.AddForeignKey(
                name: "MetodoDePago1",
                table: "MetodosDePago",
                column: "PagoId",
                principalTable: "Pagos",
                principalColumn: "Id_pago",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
