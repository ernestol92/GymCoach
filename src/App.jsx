import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Pages/Layout";
import Start from "./Pages/Start";
import ReportCategory from "./Pages/ReportCategory";
import UpperBody from "./Pages/UpperBody";
import LowerBody from "./Pages/LowerBody";
import AddPage from "./Pages/AddPage";
import Timer from "./Pages/Timer";
import { seedMuscles } from "./db/db";
import ExerciseToReport from "./Pages/ExerciseToReport";
import ReportExercise from "./Components/ReportExercise";
import CardioToReport from "./Pages/CardioToReport";
import ReportCardio from "./Components/ReportCardio";
import HistoryToSee from "./Pages/HistoryToSee";
import ExtendedExerciseHistory from "./Components/ExtendedExerciseHistory";
import Cardio from "./Pages/Cardio";
import PastWorkoutReview from "./Pages/PastWorkoutReview";
import BackupData from "./Pages/BackupData";
import GenericExercises from "./Pages/GenericExercises";
import ExerciseEditPage from "./Pages/ExerciseEditPage";
import WeightLog from "./Pages/WeightLog";
import AddExercise from "./Components/AddExercise";
import AddProgram from "./Components/AddProgram";
import EditPage from "./Pages/EditPage";
import ProgramEditPage from "./Pages/ProgramEditPage";
import ReportPage from "./Pages/ReportPage";
import ProgramToReport from "./Pages/ProgramToReport";
import Carousel from "./Components/Carousel";

const App = () => {
  useEffect(() => {
    seedMuscles();
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Start />} />

        {/* Report paths */}
        <Route path="/report" element={<ReportPage />}></Route>
        <Route path="/report/reportCategory" element={<ReportCategory />} />
        <Route
          path="/report/reportCategory/UpperBody"
          element={<UpperBody />}
        ></Route>
        <Route
          path="/report/reportCategory/LowerBody"
          element={<LowerBody />}
        ></Route>
        <Route
          path="/report/reportCategory/:group"
          element={<CardioToReport />}
        ></Route>

        <Route
          path="/report/reportCategory/UpperBody/:group"
          element={<ExerciseToReport />}
        ></Route>
        <Route
          path="/report/reportCategory/LowerBody/:group"
          element={<ExerciseToReport />}
        ></Route>
        <Route
          path="/report/reportCategory/UpperBody/:group/:exercise"
          element={<ReportExercise />}
        ></Route>
        <Route
          path="/report/reportCategory/LowerBody/:group/:exercise"
          element={<ReportExercise />}
        ></Route>
        <Route
          path="/report/reportCategory/:group/:exercise"
          element={<ReportCardio />}
        ></Route>

        <Route
          path="/report/programToReport"
          element={<ProgramToReport />}
        ></Route>

        <Route
          path="/report/programToReport/:programId"
          element={<Carousel />}
        ></Route>

        {/* Adding exercises */}
        <Route path="/add" element={<AddPage />}></Route>
        <Route path="/add/addExercise" element={<AddExercise />}></Route>
        <Route path="/add/addProgram" element={<AddProgram />}></Route>
        <Route
          path="/add/addExercise/genericList"
          element={<GenericExercises />}
        ></Route>
        {/* Timer */}
        <Route path="/timer" element={<Timer />}></Route>

        {/* Library */}
        <Route path="/edit" element={<EditPage />}></Route>
        <Route
          path="/edit/exerciseLibrary"
          element={<ExerciseEditPage />}
        ></Route>
        <Route
          path="/edit/programLibrary"
          element={<ProgramEditPage />}
        ></Route>

        {/* History sections */}
        <Route path="/history" element={<HistoryToSee />}></Route>
        <Route path="/history/:action" element={<ReportCategory />}></Route>

        {/* History UpperBody paths */}
        <Route
          path="/history/exerciseHistory/UpperBody"
          element={<UpperBody mode="history" />}
        ></Route>
        <Route
          path="/history/exerciseHistory/UpperBody/:group"
          element={<ExerciseToReport mode="history" />}
        ></Route>
        <Route
          path="/history/exerciseHistory/UpperBody/:group/:exercise"
          element={<ExtendedExerciseHistory mode="history" />}
        ></Route>

        {/* History LowerBody paths */}
        <Route
          path="/history/exerciseHistory/LowerBody"
          element={<LowerBody mode="history" />}
        ></Route>
        <Route
          path="/history/exerciseHistory/LowerBody/:group"
          element={<ExerciseToReport mode="history" />}
        ></Route>
        <Route
          path="/history/exerciseHistory/LowerBody/:group/:exercise"
          element={<ExtendedExerciseHistory mode="history" />}
        ></Route>

        {/* History Cardio paths */}
        <Route
          path="/history/exerciseHistory/:group"
          element={<CardioToReport mode="history" />}
        ></Route>
        {/* History latest sessions path */}
        <Route
          path="/history/workoutHistory"
          element={<PastWorkoutReview />}
        ></Route>

        <Route path="/weightLog" element={<WeightLog />}></Route>

        <Route path="/exportImport" element={<BackupData />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
