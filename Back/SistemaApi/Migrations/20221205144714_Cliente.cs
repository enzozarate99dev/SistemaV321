using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaApi.Migrations
{
    public partial class Cliente : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CodigoPostal",
                table: "Clientes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "CondicionPago",
                table: "Clientes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Localidad",
                table: "Clientes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "NroDocumento",
                table: "Clientes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "PercibeIIBB",
                table: "Clientes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PercibeIVA",
                table: "Clientes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Provincia",
                table: "Clientes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "RazonSocial",
                table: "Clientes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "TipoDocumento",
                table: "Clientes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TratamientoImpositivo",
                table: "Clientes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CodigoPostal",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "CondicionPago",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "Localidad",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "NroDocumento",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "PercibeIIBB",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "PercibeIVA",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "Provincia",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "RazonSocial",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "TipoDocumento",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "TratamientoImpositivo",
                table: "Clientes");
        }
    }
}
