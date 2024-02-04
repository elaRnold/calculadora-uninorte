import "./App.css";
import SemesterInfo from "./components/SemesterInfo";
import CourseList from "./components/CourseList";
import Layout from "./components/Layout";
import data from "../src/assets/data";

function App() {
  const { courses } = data;

  return (
    <>
      <Layout data={data}>
        {/* <div> */}
          {/* <h1 className="font-black">Calculadora PGA</h1> */}
          {/* <SemesterInfo semester={data} /> */}
          {/* <CourseList courses={courses} /> */}
        {/* </div> */}
      </Layout>
    </>
  );
}

export default App;
