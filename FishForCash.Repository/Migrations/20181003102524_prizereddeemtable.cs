using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace FishForCash.Repository.Migrations
{
    public partial class prizereddeemtable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PrizeRedeem",
                columns: table => new
                {
                    PrizeRedeemId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Cheque = table.Column<string>(nullable: true),
                    DatePosted = table.Column<DateTime>(nullable: true),
                    DateRedeemd = table.Column<DateTime>(nullable: true),
                    PLayerId = table.Column<int>(nullable: true),
                    PrizeValue = table.Column<double>(nullable: true),
                    Processed = table.Column<bool>(nullable: false),
                    RedeemedProduct = table.Column<bool>(nullable: false),
                    SPCABranchId = table.Column<int>(nullable: false),
                    SPCADonation = table.Column<bool>(nullable: false),
                    SSMATimestamp = table.Column<DateTime>(nullable: true),
                    Voucher = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrizeRedeem", x => x.PrizeRedeemId);
                    table.ForeignKey(
                        name: "FK_PrizeRedeem_Players_PLayerId",
                        column: x => x.PLayerId,
                        principalTable: "Players",
                        principalColumn: "PLayerId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PrizeRedeem_PLayerId",
                table: "PrizeRedeem",
                column: "PLayerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PrizeRedeem");
        }
    }
}
