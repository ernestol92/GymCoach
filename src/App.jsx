import React, {useEffect} from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom"
import Layout from "./Pages/Layout";
import Start from './Pages/Start';
import ReportCategory from './Pages/ReportCategory';
import UpperBody from './Pages/UpperBody';
import LowerBody from './Pages/LowerBody';
import AddExercise from './Pages/AddExercise';
import Timer from './Pages/Timer';
import { seedMuscles } from './db/db';
import ExerciseToReport from './Pages/ExerciseToReport';
import ReportExercise from './Components/ReportExercise';
import CardioToReport from './Pages/CardioToReport';
import ReportCardio from './Components/ReportCardio';
import HistoryToSee from './Pages/HistoryToSee';
import ExtendedExerciseHistory from './Components/ExtendedExerciseHistory';
import Cardio from './Pages/Cardio';
import PastWorkoutReview from './Pages/PastWorkoutReview';
import BackupData from './Pages/BackupData';


const App = () => {

  useEffect(() => {
    seedMuscles();
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Start/>} />
        <Route path="/reportCategory" element={<ReportCategory />} />
        <Route path='/reportCategory/UpperBody' element={<UpperBody/>}></Route>
        <Route path='/reportCategory/LowerBody' element={<LowerBody/>}></Route>
        <Route path='/reportCategory/:group' element={<CardioToReport/>}></Route>

        <Route path='/reportCategory/UpperBody/:group' element={<ExerciseToReport/>}></Route>
        <Route path='/reportCategory/LowerBody/:group' element={<ExerciseToReport/>}></Route>
        <Route path='/reportCategory/UpperBody/:group/:exercise' element={<ReportExercise/>}></Route>
        <Route path='/reportCategory/LowerBody/:group/:exercise' element={<ReportExercise/>}></Route>
        <Route path='/reportCategory/:group/:exercise' element={<ReportCardio/>}></Route>
        
        <Route path='/addExercise'element={<AddExercise />}></Route>
        
        <Route path='/timer'element={<Timer />}></Route>

        {/* History sections */}
        <Route path='/history'element={<HistoryToSee />}></Route>
        <Route path='/history/:action' element={<ReportCategory/>}></Route>
        
        {/*  UpperBody paths */}
        <Route path='/history/exerciseHistory/UpperBody' element={<UpperBody mode="history"/>}></Route>
        <Route path='/history/exerciseHistory/UpperBody/:group' element={<ExerciseToReport mode="history"/>}></Route>
        <Route path='/history/exerciseHistory/UpperBody/:group/:exercise' element={<ExtendedExerciseHistory mode="history"/>}></Route>
        
        {/*  LowerBody paths */}
        <Route path='/history/exerciseHistory/LowerBody' element={<LowerBody mode="history"/>}></Route>
        <Route path='/history/exerciseHistory/LowerBody/:group' element={<ExerciseToReport mode="history"/>}></Route>
        <Route path='/history/exerciseHistory/LowerBody/:group/:exercise' element={<ExtendedExerciseHistory mode="history"/>}></Route>

        {/* Cardio paths */}
        <Route path='/history/exerciseHistory/:group' element={<CardioToReport mode="history"/>}></Route>

        <Route path='/history/workoutHistory' element={<PastWorkoutReview/>}></Route>
        
        
        <Route path='/exportImport' element={<BackupData/>}></Route>
      </Route>
    </Routes>
  )
}

export default App
