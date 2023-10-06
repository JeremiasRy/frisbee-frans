using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    public partial class grade_model : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "grade_id",
                table: "course",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "grade",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    value = table.Column<string>(type: "text", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_grade", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_course_grade_id",
                table: "course",
                column: "grade_id");

            migrationBuilder.CreateIndex(
                name: "ix_city_name",
                table: "city",
                column: "name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "fk_course_grade_grade_id",
                table: "course",
                column: "grade_id",
                principalTable: "grade",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_course_grade_grade_id",
                table: "course");

            migrationBuilder.DropTable(
                name: "grade");

            migrationBuilder.DropIndex(
                name: "ix_course_grade_id",
                table: "course");

            migrationBuilder.DropIndex(
                name: "ix_city_name",
                table: "city");

            migrationBuilder.DropColumn(
                name: "grade_id",
                table: "course");
        }
    }
}
