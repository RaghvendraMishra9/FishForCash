using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace FishForCash.Repository.Migrations
{
    public partial class addcolumnbooty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TotalAwarded",
                table: "Booties",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TotalRedeemed",
                table: "Booties",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalAwarded",
                table: "Booties");

            migrationBuilder.DropColumn(
                name: "TotalRedeemed",
                table: "Booties");
        }
    }
}
