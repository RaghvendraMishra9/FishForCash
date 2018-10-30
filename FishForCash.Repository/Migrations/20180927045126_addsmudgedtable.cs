using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace FishForCash.Repository.Migrations
{
    public partial class addsmudgedtable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Smudgeds",
                columns: table => new
                {
                    SumdgedId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Actioned = table.Column<bool>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    ExpiryDate = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    NewCode = table.Column<string>(nullable: true),
                    PLayerId = table.Column<int>(nullable: true),
                    ProductName = table.Column<string>(nullable: true),
                    SmudgedCode = table.Column<string>(nullable: true),
                    SmudgedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Smudgeds", x => x.SumdgedId);
                    table.ForeignKey(
                        name: "FK_Smudgeds_Players_PLayerId",
                        column: x => x.PLayerId,
                        principalTable: "Players",
                        principalColumn: "PLayerId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Smudgeds_PLayerId",
                table: "Smudgeds",
                column: "PLayerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Smudgeds");
        }
    }
}
