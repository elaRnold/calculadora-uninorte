import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const CourseList = ({ courses }) => {
  const [expandedCourses, setExpandedCourses] = useState([]);

  const toggleExpansion = (courseId) => {
    setExpandedCourses((prevExpandedCourses) =>
      prevExpandedCourses.includes(courseId)
        ? prevExpandedCourses.filter((id) => id !== courseId)
        : [...prevExpandedCourses, courseId]
    );
  };

  const dataSemesterCourses = courses.semester.courses;
  const eachCourse = courses.courses;

  const getComponentsForCourse = (courseId) => {
    const course = eachCourse.find((c) => c.id === courseId);
    return course ? course.components : [];
  };

  return (
    <>
      <div>
        <h2 className="text-center font-extrabold text-3xl text-blue-950 mb-12">
          Materias del {courses.semester.name}:
        </h2>
        <ul className="mb-12 flex flex-col items-center">
          {dataSemesterCourses.map((course) => (
            <li className="w-2/4 min-w-96" key={course.id}>
              <h3
                className="bg-blue-950 text-center p-3 m-2 text-white rounded-lg text-xl font-semibold flex justify-between items-center"
                onClick={() => toggleExpansion(course.id)}
                style={{ cursor: "pointer" }}
              >
                <span>{course.name}</span>
                {expandedCourses.includes(course.id) ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </h3>
              {expandedCourses.includes(course.id) && (
                <div>
                  <div className="bg-slate-400 p-3 m-2 text-xl font-semibold text-white rounded-lg">
                    <div className="flex justify-between">
                    <p>Nota General: {course.grade}</p>
                    <p>Creditos: {course.credits}</p>
                    </div>
                    <hr></hr>
                    <ul>
                      {getComponentsForCourse(course.id).map((component) => (
                        <li className="mt-2" key={component.id}>
                          <div className="flex justify-between">
                          <p>{component.name}</p>
                          <p>Nota: {component.grade}</p>
                          </div>
                          <div className="flex justify-between">
                          <p>Peso:</p>
                          <p>{component.weight}%</p>
                          </div>
                          <div className="flex justify-between">
                          <p>Estado:</p>
                          <p>{(component.wasEvaluated)?"Evaluado":"No Evaluado"}</p>
                          </div>
                          <hr></hr>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CourseList;
