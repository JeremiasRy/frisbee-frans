﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HtmlParser;

public class Course
{
    public string Name { get; set; }
    public string Address { get; set; }
    public string Grade { get; set; }
    public List<Hole> Holes { get; set; }
}
public class CourseGradeParsed
{
    public string Name { get; set; }
    public string Address { get; set; }
    public Grade Grade { get; set; }
    public List<Hole> Holes { get; set; }

    public static CourseGradeParsed FromCourse(Course course)
    {
        Grade grade = new ();
        if (Enum.TryParse(course.Grade, out Grade result)) {
            grade = result;
        } else
        {
            grade = Grade.NoGrade;
        }
        return new CourseGradeParsed()
        {
            Name = course.Name,
            Address = course.Address,
            Grade = grade,
            Holes = course.Holes
        };
    }
}
public enum Grade
{
    NoGrade = -1,
    d3 = 0,
    d2 = 1,
    d1 = 2,
    c3 = 3,
    c2 = 4,
    c1 = 5,
    b3 = 6,
    b2 = 7,
    b1 = 8,
    a3 = 9,
    a2 = 10,
    a1 = 11,
    aa3 = 12,
    aa2 = 13,
    aa1 = 14,
    aaa1 = 15,
}
