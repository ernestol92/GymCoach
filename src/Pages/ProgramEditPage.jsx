import React, { useEffect, useState } from "react";
import BackButton from "../Components/BackButton";
import { db } from "../db/db";
import { IconPoint, IconEdit, IconTrash } from "@tabler/icons-react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const ProgramEditPage = () => {
  const [programs, setPrograms] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [editingProgram, setEditingProgram] = useState(null);
  const [programName, setProgramName] = useState("");

  useEffect(() => {
    const fetchPrograms = async () => {
      const programs = await db.programs.toArray();
      setPrograms(programs);
    };

    fetchPrograms();
  }, []);

  // im not sure if isEditOpen should be triggering a re-render of the page, but it seems to be working fine for now.
  const toggleEditClick = (program) => {
    setEditingProgram(program);
    setProgramName(program.programName);
    setIsEditOpen((isEditOpen) => !isEditOpen);
    // Handle the edit button click event here
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setEditingProgram(null);
    setProgramName("");
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    const trimmedName = programName.trim();

    if (!editingProgram || !trimmedName) return;
    console.log(trimmedName);

    await db.programs.update(editingProgram.id, {
      programName: trimmedName,
    });

    setPrograms((prev) =>
      prev.map((program) =>
        program.id === editingProgram.id
          ? { ...program, programName: trimmedName }
          : program,
      ),
    );

    closeEditModal();
  };

  const handleDeleteProgram = async (program) => {
    await db.programs.delete(program.id);
    // Optionally, you can also remove the program from the programs state to update the UI immediately
    setPrograms((prevPrograms) =>
      prevPrograms.filter((p) => p.id !== program.id),
    );

    await db.programExercises.where("program_id").equals(program.id).delete();
  };

  return (
    <div className="start-page-column transparent relative">
      <div className="transparent">
        <BackButton />
        <h2 className="breadCrumb transparent">Edit Program</h2>
      </div>

      <div className="exercise-edit-list transparent">
        <ul className="transparent">
          <h3 className="transparent mb mt uppercase title-color">Programs</h3>
          {programs.map((program) => (
            <li className="transparent li mb" key={program.id}>
              <div className="transparent li title-color">
                <IconPoint size={25} stroke={1} className="list-bullet" />
                {program.programName}
              </div>
              <div className="flex">
                <button
                  className="list-btn"
                  onClick={() => toggleEditClick(program)}
                >
                  <IconEdit size={20} stroke={1.5} />
                </button>
                <button
                  className="list-btn delete"
                  onClick={() => handleDeleteProgram(program)}
                >
                  <IconTrash size={20} stroke={1.5} className="transparent" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* modal for editing the program */}

      {isEditOpen && (
        <div className="edit-modal glass-dark card-fx transparent">
          <div className="modal-content transparent ">
            <div className="modal-header transparent">
              <h3 className="transparent h3">Edit Program</h3>
              <button className="close-modal-btn" onClick={closeEditModal}>
                <XMarkIcon className="transparent icon-md close-modal-btn" />
              </button>
            </div>
            <form
              className="modal-form transparent"
              onSubmit={handleEditSubmit}
            >
              <label className="transparent" htmlFor="program-name">
                Program Name:
              </label>
              <input
                type="text"
                className="transparent"
                id="program-name"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
              />
              <button type="submit" className="transparent">
                Save Changes
              </button>
              {/* Add your edit form fields here */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramEditPage;
