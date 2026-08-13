import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ReportExercise from "./ReportExercise";
import { useParams } from "react-router-dom";
import { db } from "../db/db";
import { useEffect, useState } from "react";

const Carousel = () => {
  const { programId } = useParams();
  const [exerciseList, setExerciseList] = useState([]);
  const id = Number(programId); // Convert programId to a number

  //  in edit exercise include deletion of exercise from programExercises table. Handle missing url param and render some
  // ux message if no exercise exist bcz swiper wont render at all if thats the case.
  useEffect(() => {
    const fetchExercises = async () => {
      const programExercisesRow = await db.programExercises
        .where("program_id")
        .equals(id)
        .toArray();

      programExercisesRow.sort((a, b) => a.order - b.order);
      const result = [];

      for (const row of programExercisesRow) {
        const exerciseRow = await db.exercises
          .where("id")
          .equals(row.exercise_id)
          .first();
        if (!exerciseRow) continue;

        result.push(exerciseRow);
      }
      console.log(result);
      setExerciseList(result);
    };
    fetchExercises();
  }, [id]);

  return (
    <Swiper spaceBetween={10} slidesPerView={1}>
      {exerciseList.map((row) => (
        <SwiperSlide key={row.id}>
          <ReportExercise exerciseData={row} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
