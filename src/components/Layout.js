import React, { useState } from "react";
import SemesterInfo from "./SemesterInfo";
import CourseList from "./CourseList";
import { FaBars, FaTimes } from "react-icons/fa";

const Layout = ({ data }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState("home");

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleOptionChange = (option) => {
    setCurrentOption(option);
  };

  // Mapea las opciones a sus componentes correspondientes
  const optionComponents = {
    home: <SemesterInfo semester={data} />,
    ListaMAterias: <CourseList courses={data} />,
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="flex justify-between items-center bg-red-500 p-2 shadow-xl">
          <a href="/">
            <h1 className="text-white text-2xl font-bold flex">
              <img
                id="logo_uni_sticky"
                className="w-7 mr-2"
                alt=""
                src="https://www.uninorte.edu.co/o/uninorte-theme/images/uninorte/header/uni-logo-symbol.svg"
              ></img>
              Calculadora Uninorte
            </h1>
          </a>
          <button
            onClick={toggleMenu}
            className="text-white text-base"
          >
            {isMenuOpen ? <FaTimes className="w-7 h-7"/> : <FaBars className="w-7 h-7" />}
          </button>
        </header>
        <div
          className={`flex flex-col items-center bg-gray-800 relative ${
            isMenuOpen ? "w-full" : "w-0 hidden"
          } overflow-hidden transition-width bg-gray-200 p-2`}
        >
          {isMenuOpen && (
            <>
              <button
                onClick={() => handleOptionChange("home")}
                className="text-white block w-fit p-2 hover:bg-blue-900 mb-2 rounded-lg"
              >
                Home
              </button>
              <button
                onClick={() => handleOptionChange("ListaMAterias")}
                className="text-white block w-fit p-2 hover:bg-blue-900 rounded-lg"
              >
                Lista de Materias
              </button>
            </>
          )}
        </div>
        <div className="flex">
          <div className="w-full mx-5 my-5">
            {/* Renderiza el componente de contenido según la opción seleccionada */}
            {optionComponents[currentOption]}
          </div>
        </div>
        <footer className="bg-black	 text-white py-8">
          <div className="container mx-auto flex flex-col items-center">
            <div className="mb-4">
              <img
                src="https://www.uninorte.edu.co/o/uninorte-theme/images/uninorte/footer_un/logo.png"
                alt="Logo"
                className="h-12 w-auto"
              ></img>
            </div>
            <div className="my-3 flex space-x-4">
              <a
                href="https://www.uninorte.edu.co/"
                className="hover:text-cyan-400"
              >
                Inicio
              </a>
              <a
                href="https://www.uninorte.edu.co/web/sobre-nosotros"
                className="hover:text-cyan-400"
              >
                Acerca de
              </a>
              <a
                href="https://www.uninorte.edu.co/estudia"
                className="hover:text-cyan-400"
              >
                Programas Académicos
              </a>
              <a
                href="https://www.uninorte.edu.co/canales-de-atencion"
                className="hover:text-cyan-400"
              >
                Contacto
              </a>
            </div>
            <p className="text-sm text-center">Universidad del Norte &copy; 2024</p>
            <p className="text-sm text-center">Todos los derechos reservados</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
