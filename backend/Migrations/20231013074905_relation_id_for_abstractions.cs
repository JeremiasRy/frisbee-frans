using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class relation_id_for_abstractions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "relation_id",
                table: "round_comment",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "relation_id",
                table: "hole_comment",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "relation_id",
                table: "course_comment",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "relation_id",
                table: "round_comment");

            migrationBuilder.DropColumn(
                name: "relation_id",
                table: "hole_comment");

            migrationBuilder.DropColumn(
                name: "relation_id",
                table: "course_comment");
        }
    }
}
