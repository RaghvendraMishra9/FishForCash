using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace FishForCash.Repository.Migrations
{
    public partial class addcolumnwinning : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RecordSourceId",
                table: "WinningDetails",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WinningDetails_RecordSourceId",
                table: "WinningDetails",
                column: "RecordSourceId");

            migrationBuilder.AddForeignKey(
                name: "FK_WinningDetails_RecordSources_RecordSourceId",
                table: "WinningDetails",
                column: "RecordSourceId",
                principalTable: "RecordSources",
                principalColumn: "RecordSourceId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WinningDetails_RecordSources_RecordSourceId",
                table: "WinningDetails");

            migrationBuilder.DropIndex(
                name: "IX_WinningDetails_RecordSourceId",
                table: "WinningDetails");

            migrationBuilder.DropColumn(
                name: "RecordSourceId",
                table: "WinningDetails");
        }
    }
}
