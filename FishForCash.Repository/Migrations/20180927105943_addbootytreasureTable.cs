using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace FishForCash.Repository.Migrations
{
    public partial class addbootytreasureTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Booties",
                columns: table => new
                {
                    BootyId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BootyIcon = table.Column<string>(nullable: true),
                    BootyName = table.Column<string>(nullable: true),
                    BootyProbability = table.Column<int>(nullable: true),
                    BootyValue = table.Column<double>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Booties", x => x.BootyId);
                });

            migrationBuilder.CreateTable(
                name: "TreasureChests",
                columns: table => new
                {
                    TreasureChestId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    PLayerId = table.Column<int>(nullable: true),
                    a = table.Column<int>(nullable: true),
                    b = table.Column<int>(nullable: true),
                    c = table.Column<int>(nullable: true),
                    d = table.Column<int>(nullable: true),
                    e = table.Column<int>(nullable: true),
                    f = table.Column<int>(nullable: true),
                    g = table.Column<int>(nullable: true),
                    h = table.Column<int>(nullable: true),
                    i = table.Column<int>(nullable: true),
                    j = table.Column<int>(nullable: true),
                    k = table.Column<int>(nullable: true),
                    l = table.Column<int>(nullable: true),
                    m = table.Column<int>(nullable: true),
                    n = table.Column<int>(nullable: true),
                    o = table.Column<int>(nullable: true),
                    p = table.Column<int>(nullable: true),
                    q = table.Column<int>(nullable: true),
                    r = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TreasureChests", x => x.TreasureChestId);
                    table.ForeignKey(
                        name: "FK_TreasureChests_Players_PLayerId",
                        column: x => x.PLayerId,
                        principalTable: "Players",
                        principalColumn: "PLayerId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TreasureChests_PLayerId",
                table: "TreasureChests",
                column: "PLayerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Booties");

            migrationBuilder.DropTable(
                name: "TreasureChests");
        }
    }
}
