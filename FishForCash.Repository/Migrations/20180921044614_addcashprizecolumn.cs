using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace FishForCash.Repository.Migrations
{
    public partial class addcashprizecolumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CashBalance",
                table: "Players",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PrizeBalance",
                table: "Players",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CashBalance",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "PrizeBalance",
                table: "Players");
        }
    }
}
