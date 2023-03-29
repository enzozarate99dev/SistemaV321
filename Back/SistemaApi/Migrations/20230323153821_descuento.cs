using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaApi.Migrations
{
    public partial class descuento : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Descuento",
                table: "Ventas",
                type: "float",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Descuento",
                table: "Ventas");
        }
    }
}
