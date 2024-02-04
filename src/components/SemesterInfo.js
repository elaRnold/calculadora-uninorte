import React from "react";
import { CChart } from "@coreui/react-chartjs";

const SemesterInfo = ({ semester }) => {
  // const dataSemesterCourses = semester.semester.courses;
  // console.log(dataSemesterCourses);

  return (
    <>
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:py-11">
        <div className="w-full lg:w-2/4 text-center">
          <div className="py-6">
            <h1 className="font-extrabold	text-4xl my-5 text-blue-950">
              {semester.semester.name}
            </h1>
            <p className="font-bold text-2xl my-5 bg-blue-950	 text-cyan-50 p-2">
              PGA Actual: {semester.currentPGA}
            </p>
            <p className="font-bold text-2xl my-5 bg-blue-950	 text-cyan-50 p-2">
              Créditos acumulados: {semester.creditsSoFar}
            </p>
          </div>
        </div>
        <div className="w-full lg:w-2/4 bg-slate-200">
          <CChart
            type="line"
            data={{
              labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
              datasets: [
                {
                  label: "PGA",
                  backgroundColor: "rgba(251, 0, 0, 0.8)",
                  borderColor: "rgba(251, 0, 0, 0.8)",
                  pointBackgroundColor: "rgba(251, 0, 0, 0.8)",
                  pointBorderColor: "#fff",
                  pointRadius: 6, // Ajusta este valor según lo grande que quieras el punto
                  data: [semester.currentPGA],
                },
              ],
            }}
            options={{
              scales: {
                x: {
                  grid: {
                    // color: getStyle("--cui-border-color-translucent"),
                  },
                  ticks: {
                    // color: getStyle("--cui-body-color"),
                  },
                },
                y: {
                  beginAtZero: true, // Establece el eje y para comenzar desde cero
                  max: 5, // Establece el valor máximo en el eje y
                  grid: {
                    // color: getStyle("--cui-border-color-translucent"),
                  },
                  ticks: {
                    // color: getStyle("--cui-body-color"),
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SemesterInfo;
