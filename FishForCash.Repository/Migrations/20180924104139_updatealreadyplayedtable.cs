using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace FishForCash.Repository.Migrations
{
    public partial class updatealreadyplayedtable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Alreadyplayeds",
                columns: table => new
                {
                    AlreadyplayedId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CureentPlayerId = table.Column<int>(nullable: true),
                    CureentPlayerName = table.Column<string>(nullable: true),
                    CurrentPlayerEmail = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    GameCode = table.Column<string>(nullable: true),
                    PLayerId = table.Column<int>(nullable: true),
                    PlayedDate = table.Column<DateTime>(nullable: false),
                    PlayerEmail = table.Column<string>(nullable: true),
                    Result = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alreadyplayeds", x => x.AlreadyplayedId);
                    table.ForeignKey(
                        name: "FK_Alreadyplayeds_Players_PLayerId",
                        column: x => x.PLayerId,
                        principalTable: "Players",
                        principalColumn: "PLayerId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Alreadyplayeds_PLayerId",
                table: "Alreadyplayeds",
                column: "PLayerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Alreadyplayeds");
        }
    }
}
