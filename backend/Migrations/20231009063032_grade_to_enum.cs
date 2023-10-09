using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    public partial class grade_to_enum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_course_grade_grade_id",
                table: "course");

            migrationBuilder.DropTable(
                name: "grade");

            migrationBuilder.DropIndex(
                name: "ix_course_grade_id",
                table: "course");

            migrationBuilder.RenameColumn(
                name: "grade_id",
                table: "course",
                newName: "course_grade");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "course_grade",
                table: "course",
                newName: "grade_id");

            migrationBuilder.CreateTable(
                name: "grade",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    created_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    value = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_grade", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_course_grade_id",
                table: "course",
                column: "grade_id");

            migrationBuilder.AddForeignKey(
                name: "fk_course_grade_grade_id",
                table: "course",
                column: "grade_id",
                principalTable: "grade",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
