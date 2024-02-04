import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const CourseList = ({ courses }) => {
  const [expandedCourses, setExpandedCourses] = useState([]);
  const [editingComponentId, setEditingComponentId] = useState(null);
  const [editedNote, setEditedNote] = useState(0);
  const [editedWeight, setEditedWeight] = useState(0);
  const [appData, setAppData] = useState(courses);

  const setData = (newData) => {
    setAppData(newData);
  };

  const toggleExpansion = (courseId) => {
    setExpandedCourses((prevExpandedCourses) =>
      prevExpandedCourses.includes(courseId)
        ? prevExpandedCourses.filter((id) => id !== courseId)
        : [...prevExpandedCourses, courseId]
    );
    // Resetear el modo de edición al expandir/cerrar una materia
    setEditingComponentId(null);
  };

  const getComponentsForCourse = (courseId) => {
    const course = appData.courses.find((c) => c.id === courseId);
    return course ? course.components : [];
  };

  const startEditing = (component) => {
    setEditedNote(component.grade);
    setEditedWeight(component.weight);
    setEditingComponentId(component.id);
  };

  const handleEditSubmit = (e, courseId, componentId) => {
    e.preventDefault();

    // Validar que el valor de la nota esté entre 0 y 5
    const isValidNote = /^[0-5](\.\d+)?$/.test(editedNote);
    if (!isValidNote) {
      alert(
        "La nota debe estar entre 0 y 5, recuerde usar punto (.) si quiere usar un valor decimal."
      );
      return;
    }

    // Validar que el valor del peso sea un entero entre 0 y 100
    const isValidWeight = /^([0-9]|[1-9][0-9]|100)$/.test(editedWeight);
    if (!isValidWeight) {
      alert("El peso debe ser un valor entero entre 0 y 100.");
      return;
    }

    // Lógica para guardar los cambios en la nota y el peso
    saveEditedData(courseId, componentId, editedNote, editedWeight);
    // Desactiva el modo de edición
    setEditingComponentId(null);
  };

  const saveEditedData = (courseId, componentId, newNote, newWeight) => {
    const updatedData = { ...appData }; // Copia el objeto data para no mutar el estado directamente

    // Encuentra el curso en apoData.courses
    const course = updatedData.courses.find((c) => c.id === courseId);
    if (course) {
      // Encuentra el componente en el curso
      const component = course.components.find(
        (comp) => comp.id === componentId
      );
      if (component) {
        // Actualiza los valores
        component.grade = parseFloat(newNote);
        component.weight = parseFloat(newWeight);
      }
    }

    // Puedes imprimir el nuevo estado actualizado en la consola
    console.log(updatedData);

    // Actualiza el estado con el nuevo objeto data
    setData(updatedData); // Asumiendo que tienes una función setData para actualizar el estado
  };

  return (
    <>
      <div>
        <h2 className="text-center font-extrabold text-3xl text-blue-950 mb-12">
          Materias del {appData.semester.name}:
        </h2>
        <ul className="mb-12 flex flex-col items-center">
          {appData.semester.courses.map((course) => (
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
                    <hr />
                    <ul>
                      {getComponentsForCourse(course.id).map((component) => (
                        <li className="mt-2" key={component.id}>
                          {/* <div className="flex justify-between"> */}
                          <p>{component.name}</p>
                          {editingComponentId === component.id ? (
                            <form
                              onSubmit={(e) =>
                                handleEditSubmit(e, course.id, component.id)
                              }
                            >
                              <div className="flex justify-between mt-3">
                                <label>
                                  Nota:
                                  <input
                                    className="text-black w-14 ml-3"
                                    type="text"
                                    name="Nota"
                                    value={editedNote}
                                    onChange={(e) =>
                                      setEditedNote(e.target.value)
                                    }
                                  />
                                </label>
                                <label>
                                  Peso:
                                  <input
                                    className="text-black w-14 ml-3 mr-1"
                                    type="text"
                                    name="Peso"
                                    value={editedWeight}
                                    onChange={(e) =>
                                      setEditedWeight(e.target.value)
                                    }
                                  />
                                  %
                                </label>
                              </div>
                              <div className="flex justify-between mt-3">
                                <p>Estado:</p>
                                <p>
                                  {component.wasEvaluated
                                    ? "Evaluado"
                                    : "No Evaluado"}
                                </p>
                              </div>
                              <div className="flex justify-center">
                                <button
                                  className="py-3 px-6 my-4 mx-60 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                  type="submit"
                                >
                                  Guardar
                                </button>
                              </div>
                            </form>
                          ) : (
                            <>
                              <div className="flex justify-between mt-3">
                                <p>Nota: {component.grade}</p>
                                <p>Peso: {component.weight}%</p>
                              </div>
                              <div className="flex justify-between mt-3">
                                <p>Estado:</p>
                                <p>
                                  {component.wasEvaluated
                                    ? "Evaluado"
                                    : "No Evaluado"}
                                </p>
                              </div>
                              <div className="flex justify-center">
                                <button
                                  className="py-3 px-5 my-4 mx-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                  onClick={() => startEditing(component)}
                                >
                                  Editar
                                </button>
                              </div>
                            </>
                          )}
                          {/* </div> */}
                          <hr />
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
