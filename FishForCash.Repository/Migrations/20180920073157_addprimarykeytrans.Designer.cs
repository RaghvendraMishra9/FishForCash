﻿// <auto-generated />
using FishForCash.Repository.DB;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace FishForCash.Repository.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20180920073157_addprimarykeytrans")]
    partial class addprimarykeytrans
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("FishForCash.Repository.DB.Country", b =>
                {
                    b.Property<int>("CountryId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CountryName");

                    b.HasKey("CountryId");

                    b.ToTable("Countries");
                });

            modelBuilder.Entity("FishForCash.Repository.DB.Player", b =>
                {
                    b.Property<int>("PLayerId")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("AccountValidated");

                    b.Property<bool>("Active");

                    b.Property<string>("Address1");

                    b.Property<string>("Address2");

                    b.Property<int?>("AgeGroup");

                    b.Property<string>("City");

                    b.Property<int?>("CountryId");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("EmailId");

                    b.Property<string>("FirstName");

                    b.Property<bool>("GetUpdateByEmail");

                    b.Property<string>("ImageName");

                    b.Property<bool?>("IsLogin");

                    b.Property<string>("LastName");

                    b.Property<DateTime>("ModifiedDate");

                    b.Property<int?>("NoOfTimesPlayed");

                    b.Property<string>("Occupation");

                    b.Property<string>("Password");

                    b.Property<string>("PetImageName");

                    b.Property<byte[]>("PetPhoto");

                    b.Property<string>("PhoneNo");

                    b.Property<byte[]>("PlayerImage");

                    b.Property<int?>("RoleId");

                    b.Property<string>("ScreenName");

                    b.Property<int?>("StateId");

                    b.Property<bool>("TermsAccepted");

                    b.Property<DateTime?>("TodayDate");

                    b.Property<Guid?>("Token");

                    b.Property<bool>("WatchGamePlay");

                    b.HasKey("PLayerId");

                    b.HasIndex("CountryId");

                    b.HasIndex("RoleId");

                    b.HasIndex("StateId");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("FishForCash.Repository.DB.Prize", b =>
                {
                    b.Property<int>("PrizeId")
                        .ValueGeneratedOnAdd();

                    b.Property<double?>("AmountAwarded");

                    b.Property<int?>("MaxLimit");

                    b.Property<int?>("NumberAwarded");

                    b.Property<string>("PrizeName");

                    b.Property<string>("PrizeType");

                    b.HasKey("PrizeId");

                    b.ToTable("Prizes");
                });

            modelBuilder.Entity("FishForCash.Repository.DB.RecordSource", b =>
                {
                    b.Property<int>("RecordSourceId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("RecordSourceName");

                    b.HasKey("RecordSourceId");

                    b.ToTable("RecordSources");
                });

            modelBuilder.Entity("FishForCash.Repository.DB.Role", b =>
                {
                    b.Property<int>("RoleId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("RoleName");

                    b.HasKey("RoleId");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("FishForCash.Repository.DB.State", b =>
                {
                    b.Property<int>("StateId")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CountryId");

                    b.Property<string>("StateName");

                    b.HasKey("StateId");

                    b.HasIndex("CountryId");

                    b.ToTable("States");
                });

            modelBuilder.Entity("FishForCash.Repository.DB.Transaction", b =>
                {
                    b.Property<int>("TransactionId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("GameCode");

                    b.Property<int?>("PLayerId");

                    b.Property<string>("Status");

                    b.Property<DateTime>("TransactionDate");

                    b.Property<string>("TransactionType");

                    b.Property<string>("TransactionValue");

                    b.HasKey("TransactionId");

                    b.HasIndex("PLayerId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("FishForCash.Repository.DB.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Active");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<DateTime>("LastUpdated");

                    b.Property<string>("Password");

                    b.Property<string>("UpdatedBy");

                    b.Property<string>("UserEmail");

                    b.Property<string>("UserName");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("FishForCash.Repository.DB.WebCode", b =>
                {
                    b.Property<int>("WebCodeId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("AssignDateIssued");

                    b.Property<string>("GameCode");

                    b.Property<bool>("GameCodePlayed");

                    b.Property<int?>("PLayerId");

                    b.Property<int?>("RecordSourceId");

                    b.HasKey("WebCodeId");

                    b.HasIndex("PLayerId");

                    b.HasIndex("RecordSourceId");

                    b.ToTable("WebCodes");
                });

            modelBuilder.Entity("FishForCash.Repository.DB.WinningDetail", b =>
                {
                    b.Property<int>("WinningDetailId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateWon");

                    b.Property<string>("FreePlay");

                    b.Property<string>("GameCodeNo");

                    b.Property<int?>("PLayerId");

                    b.Property<int?>("PrizeId");

                    b.Property<string>("ProductType");

                    b.Property<int?>("RewardId");

                    b.Property<bool?>("Rewarded");

                    b.HasKey("WinningDetailId");

                    b.HasIndex("PLayerId");

                    b.HasIndex("PrizeId");

                    b.ToTable("WinningDetails");
                });

            modelBuilder.Entity("FishForCash.Repository.DB.Player", b =>
                {
                    b.HasOne("FishForCash.Repository.DB.Country", "Country")
                        .WithMany("Players")
                        .HasForeignKey("CountryId");

                    b.HasOne("FishForCash.Repository.DB.Role", "Role")
                        .WithMany("Players")
                        .HasForeignKey("RoleId");

                    b.HasOne("FishForCash.Repository.DB.State", "State")
                        .WithMany("Players")
                        .HasForeignKey("StateId");
                });

            modelBuilder.Entity("FishForCash.Repository.DB.State", b =>
                {
                    b.HasOne("FishForCash.Repository.DB.Country", "Country")
                        .WithMany("States")
                        .HasForeignKey("CountryId");
                });

            modelBuilder.Entity("FishForCash.Repository.DB.Transaction", b =>
                {
                    b.HasOne("FishForCash.Repository.DB.Player", "Player")
                        .WithMany("Transactions")
                        .HasForeignKey("PLayerId");
                });

            modelBuilder.Entity("FishForCash.Repository.DB.WebCode", b =>
                {
                    b.HasOne("FishForCash.Repository.DB.Player", "Player")
                        .WithMany("WebCodes")
                        .HasForeignKey("PLayerId");

                    b.HasOne("FishForCash.Repository.DB.RecordSource", "RecordSource")
                        .WithMany("WebCodes")
                        .HasForeignKey("RecordSourceId");
                });

            modelBuilder.Entity("FishForCash.Repository.DB.WinningDetail", b =>
                {
                    b.HasOne("FishForCash.Repository.DB.Player", "Player")
                        .WithMany("WinningDetails")
                        .HasForeignKey("PLayerId");

                    b.HasOne("FishForCash.Repository.DB.Prize", "Prize")
                        .WithMany("WinningDetails")
                        .HasForeignKey("PrizeId");
                });
#pragma warning restore 612, 618
        }
    }
}
