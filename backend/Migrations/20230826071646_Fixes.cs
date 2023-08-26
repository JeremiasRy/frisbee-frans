using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class Fixes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_hole_course_course_id1",
                table: "hole");

            migrationBuilder.DropForeignKey(
                name: "fk_round_asp_net_users_user_id1",
                table: "round");

            migrationBuilder.DropIndex(
                name: "ix_round_user_id1",
                table: "round");

            migrationBuilder.DropIndex(
                name: "ix_hole_course_id1",
                table: "hole");

            migrationBuilder.DropColumn(
                name: "user_id1",
                table: "round");

            migrationBuilder.DropColumn(
                name: "course_id1",
                table: "hole");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "user_id1",
                table: "round",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "course_id1",
                table: "hole",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "ix_round_user_id1",
                table: "round",
                column: "user_id1");

            migrationBuilder.CreateIndex(
                name: "ix_hole_course_id1",
                table: "hole",
                column: "course_id1");

            migrationBuilder.AddForeignKey(
                name: "fk_hole_course_course_id1",
                table: "hole",
                column: "course_id1",
                principalTable: "course",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_round_asp_net_users_user_id1",
                table: "round",
                column: "user_id1",
                principalTable: "AspNetUsers",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
