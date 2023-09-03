using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class holelogic_v2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_hole_result_round_round_id",
                table: "hole_result");

            migrationBuilder.DropIndex(
                name: "ix_hole_result_hole_id",
                table: "hole_result");

            migrationBuilder.DropIndex(
                name: "ix_hole_result_user_id",
                table: "hole_result");

            migrationBuilder.AlterColumn<int>(
                name: "round_id",
                table: "hole_result",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_hole_result_hole_id",
                table: "hole_result",
                column: "hole_id");

            migrationBuilder.CreateIndex(
                name: "ix_hole_result_user_id",
                table: "hole_result",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "fk_hole_result_round_round_id",
                table: "hole_result",
                column: "round_id",
                principalTable: "round",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_hole_result_round_round_id",
                table: "hole_result");

            migrationBuilder.DropIndex(
                name: "ix_hole_result_hole_id",
                table: "hole_result");

            migrationBuilder.DropIndex(
                name: "ix_hole_result_user_id",
                table: "hole_result");

            migrationBuilder.AlterColumn<int>(
                name: "round_id",
                table: "hole_result",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateIndex(
                name: "ix_hole_result_hole_id",
                table: "hole_result",
                column: "hole_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_hole_result_user_id",
                table: "hole_result",
                column: "user_id",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "fk_hole_result_round_round_id",
                table: "hole_result",
                column: "round_id",
                principalTable: "round",
                principalColumn: "id");
        }
    }
}
