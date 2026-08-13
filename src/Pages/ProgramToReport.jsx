import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../db/db";
import BackButton from "../Components/BackButton";
import CreateExerciseLinkBtn from "../Components/CreateExerciseLinkBtn";
import { useTranslation } from "react-i18next";

const ProgramToReport = () => {
  const { t } = useTranslation();

  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const programs = await db.programs.toArray();
      setPrograms(programs);
    };

    fetchPrograms();
  }, []);

  return (
    <>
      <div className="start-page-column transparent mb3">
        <div className="transparent">
          <BackButton />
          <h2 className="breadCrumb transparent">H2</h2>
        </div>
        <div className="exerciseList transparent">
          {(!programs || programs.length === 0) && (
            <>
              <p className="transparent">{t("group.notFound")}</p>
              <CreateExerciseLinkBtn />
            </>
          )}

          {programs.map((program) => {
            const displayName = program.programName;
            const routeValue = `/report/programToReport/${program.id}`;

            return (
              <Link
                key={program.id}
                to={`${routeValue}`}
                className="exerciseListBtn"
              >
                {displayName}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProgramToReport;
