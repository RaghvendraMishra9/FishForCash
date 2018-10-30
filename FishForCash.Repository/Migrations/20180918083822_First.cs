using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace FishForCash.Repository.Migrations
{
    public partial class First : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    CountryId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CountryName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.CountryId);
                });

            migrationBuilder.CreateTable(
                name: "Prizes",
                columns: table => new
                {
                    PrizeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AmountAwarded = table.Column<double>(nullable: true),
                    MaxLimit = table.Column<int>(nullable: true),
                    NumberAwarded = table.Column<int>(nullable: true),
                    PrizeName = table.Column<string>(nullable: true),
                    PrizeType = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prizes", x => x.PrizeId);
                });

            migrationBuilder.CreateTable(
                name: "RecordSources",
                columns: table => new
                {
                    RecordSourceId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RecordSourceName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecordSources", x => x.RecordSourceId);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    RoleId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RoleName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.RoleId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Active = table.Column<bool>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    LastUpdated = table.Column<DateTime>(nullable: false),
                    Password = table.Column<string>(nullable: true),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UserEmail = table.Column<string>(nullable: true),
                    UserName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "States",
                columns: table => new
                {
                    StateId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CountryId = table.Column<int>(nullable: true),
                    StateName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_States", x => x.StateId);
                    table.ForeignKey(
                        name: "FK_States_Countries_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Countries",
                        principalColumn: "CountryId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    PLayerId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AccountValidated = table.Column<bool>(nullable: false),
                    Active = table.Column<bool>(nullable: false),
                    Address1 = table.Column<string>(nullable: true),
                    Address2 = table.Column<string>(nullable: true),
                    AgeGroup = table.Column<int>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    CountryId = table.Column<int>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    EmailId = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    GetUpdateByEmail = table.Column<bool>(nullable: false),
                    ImageName = table.Column<string>(nullable: true),
                    IsLogin = table.Column<bool>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    ModifiedDate = table.Column<DateTime>(nullable: false),
                    NoOfTimesPlayed = table.Column<int>(nullable: true),
                    Occupation = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    PetImageName = table.Column<string>(nullable: true),
                    PetPhoto = table.Column<byte[]>(nullable: true),
                    PhoneNo = table.Column<string>(nullable: true),
                    PlayerImage = table.Column<byte[]>(nullable: true),
                    RoleId = table.Column<int>(nullable: true),
                    ScreenName = table.Column<string>(nullable: true),
                    StateId = table.Column<int>(nullable: true),
                    TermsAccepted = table.Column<bool>(nullable: false),
                    TodayDate = table.Column<DateTime>(nullable: true),
                    Token = table.Column<Guid>(nullable: true),
                    WatchGamePlay = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.PLayerId);
                    table.ForeignKey(
                        name: "FK_Players_Countries_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Countries",
                        principalColumn: "CountryId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Players_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Players_States_StateId",
                        column: x => x.StateId,
                        principalTable: "States",
                        principalColumn: "StateId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WebCodes",
                columns: table => new
                {
                    WebCodeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AssignDateIssued = table.Column<DateTime>(nullable: false),
                    GameCode = table.Column<string>(nullable: true),
                    GameCodePlayed = table.Column<bool>(nullable: false),
                    PLayerId = table.Column<int>(nullable: true),
                    RecordSourceId = table.Column<int>(nullable: true),
                    UsedSatus = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WebCodes", x => x.WebCodeId);
                    table.ForeignKey(
                        name: "FK_WebCodes_Players_PLayerId",
                        column: x => x.PLayerId,
                        principalTable: "Players",
                        principalColumn: "PLayerId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WebCodes_RecordSources_RecordSourceId",
                        column: x => x.RecordSourceId,
                        principalTable: "RecordSources",
                        principalColumn: "RecordSourceId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WinningDetails",
                columns: table => new
                {
                    WinningDetailId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FreePlay = table.Column<string>(nullable: true),
                    GameCodeNo = table.Column<string>(nullable: true),
                    PLayerId = table.Column<int>(nullable: true),
                    PrizeId = table.Column<int>(nullable: true),
                    ProductType = table.Column<string>(nullable: true),
                    RewardId = table.Column<int>(nullable: true),
                    Rewarded = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WinningDetails", x => x.WinningDetailId);
                    table.ForeignKey(
                        name: "FK_WinningDetails_Players_PLayerId",
                        column: x => x.PLayerId,
                        principalTable: "Players",
                        principalColumn: "PLayerId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WinningDetails_Prizes_PrizeId",
                        column: x => x.PrizeId,
                        principalTable: "Prizes",
                        principalColumn: "PrizeId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Players_CountryId",
                table: "Players",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_Players_RoleId",
                table: "Players",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Players_StateId",
                table: "Players",
                column: "StateId");

            migrationBuilder.CreateIndex(
                name: "IX_States_CountryId",
                table: "States",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_WebCodes_PLayerId",
                table: "WebCodes",
                column: "PLayerId");

            migrationBuilder.CreateIndex(
                name: "IX_WebCodes_RecordSourceId",
                table: "WebCodes",
                column: "RecordSourceId");

            migrationBuilder.CreateIndex(
                name: "IX_WinningDetails_PLayerId",
                table: "WinningDetails",
                column: "PLayerId");

            migrationBuilder.CreateIndex(
                name: "IX_WinningDetails_PrizeId",
                table: "WinningDetails",
                column: "PrizeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "WebCodes");

            migrationBuilder.DropTable(
                name: "WinningDetails");

            migrationBuilder.DropTable(
                name: "RecordSources");

            migrationBuilder.DropTable(
                name: "Players");

            migrationBuilder.DropTable(
                name: "Prizes");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "States");

            migrationBuilder.DropTable(
                name: "Countries");
        }
    }
}
