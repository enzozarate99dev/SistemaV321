using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaApi.Migrations
{
    public partial class newventaorder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VentaOrderPago",
                columns: table => new
                {
                    PagosId_pago = table.Column<int>(type: "int", nullable: false),
                    VentaOrdersId_VentaOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VentaOrderPago", x => new { x.PagosId_pago, x.VentaOrdersId_VentaOrder });
                    table.ForeignKey(
                        name: "FK_VentaOrderPago_Pagos_PagosId_pago",
                        column: x => x.PagosId_pago,
                        principalTable: "Pagos",
                        principalColumn: "Id_pago",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VentaOrderPago_VentaOrders_VentaOrdersId_VentaOrder",
                        column: x => x.VentaOrdersId_VentaOrder,
                        principalTable: "VentaOrders",
                        principalColumn: "Id_VentaOrder",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VentaOrderPago_VentaOrdersId_VentaOrder",
                table: "VentaOrderPago",
                column: "VentaOrdersId_VentaOrder");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VentaOrderPago");
        }
    }
}
