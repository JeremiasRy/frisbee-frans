using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    public partial class HoleLogic : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "pk_hole_result",
                table: "hole_result");

            migrationBuilder.DropColumn(
                name: "next_hole_id",
                table: "hole");

            migrationBuilder.DropColumn(
                name: "previous_hole_id",
                table: "hole");

            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "hole_result",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "length",
                table: "hole",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "nth_hole",
                table: "hole",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "course",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddPrimaryKey(
                name: "pk_hole_result",
                table: "hole_result",
                column: "id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "pk_hole_result",
                table: "hole_result");

            migrationBuilder.DropColumn(
                name: "length",
                table: "hole");

            migrationBuilder.DropColumn(
                name: "nth_hole",
                table: "hole");

            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "hole_result",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "next_hole_id",
                table: "hole",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "previous_hole_id",
                table: "hole",
                type: "integer",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "name",
                table: "course",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddPrimaryKey(
                name: "pk_hole_result",
                table: "hole_result",
                columns: new[] { "user_id", "hole_id" });
        }
    }
}
