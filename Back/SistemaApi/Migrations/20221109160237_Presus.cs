using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaApi.Migrations
{
    public partial class Presus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Descuento",
                table: "Presupuestos",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Descuento",
                table: "Presupuestos");
        }
    }
}
