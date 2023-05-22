using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaApi.Migrations
{
    public partial class deletepagos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PagosMetodosDePagos");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PagosMetodosDePagos",
                columns: table => new
                {
                    MetodoId = table.Column<int>(type: "int", nullable: false),
                    PagoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PagosMetodosDePagos", x => new { x.MetodoId, x.PagoId });
                    table.ForeignKey(
                        name: "FK_PagosMetodosDePagos_MetodosDePago_MetodoId",
                        column: x => x.MetodoId,
                        principalTable: "MetodosDePago",
                        principalColumn: "Id_metodo",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PagosMetodosDePagos_Pagos_PagoId",
                        column: x => x.PagoId,
                        principalTable: "Pagos",
                        principalColumn: "Id_pago",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PagosMetodosDePagos_PagoId",
                table: "PagosMetodosDePagos",
                column: "PagoId");
        }
    }
}
