using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class ReworkCourseLogic : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "course_id",
                table: "round",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "ix_round_course_id",
                table: "round",
                column: "course_id");

            migrationBuilder.AddForeignKey(
                name: "fk_round_course_course_id",
                table: "round",
                column: "course_id",
                principalTable: "course",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_round_course_course_id",
                table: "round");

            migrationBuilder.DropIndex(
                name: "ix_round_course_id",
                table: "round");

            migrationBuilder.DropColumn(
                name: "course_id",
                table: "round");
        }
    }
}
