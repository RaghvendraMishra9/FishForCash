using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace FishForCash.Repository.Migrations
{
    public partial class addalreadyplayedtable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PrizeInNo",
                table: "Prizes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "PrizeInNo",
                table: "Prizes",
                nullable: true);
        }
    }
}
