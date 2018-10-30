using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace FishForCash.Repository.Migrations
{
    public partial class AddTradeBootyTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BootyTrades",
                columns: table => new
                {
                    BootyTradeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BuyerPlayerId = table.Column<int>(nullable: false),
                    SellerPlayerId = table.Column<int>(nullable: false),
                    TradeBooty = table.Column<string>(nullable: true),
                    TradeDate = table.Column<DateTime>(nullable: false),
                    TradeForBooty = table.Column<string>(nullable: true),
                    TradeForQty = table.Column<int>(nullable: false),
                    TradeQty = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BootyTrades", x => x.BootyTradeId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BootyTrades");
        }
    }
}
