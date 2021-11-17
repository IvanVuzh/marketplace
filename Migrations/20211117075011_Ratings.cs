using Microsoft.EntityFrameworkCore.Migrations;

namespace MarketPlace5.Migrations
{
    public partial class Ratings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DisplayRating",
                table: "Ratings");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DisplayRating",
                table: "Ratings",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
