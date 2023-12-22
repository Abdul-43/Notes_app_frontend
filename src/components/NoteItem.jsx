import React, { useContext } from "react";
import noteContext from "../context/NoteContext";
// import axios from 'axios'; // Import Axios

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote ,markTaskAsComplete} = context;
  const { note, updateNote } = props;
  

  const formatDateAndTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = date.toISOString().split('T')[0];
    const formattedTime = date.toTimeString().split(' ')[0];
    return `${formattedDate} - ${formattedTime}`;
  };

  return (
    <div className={`col-md-4 ${note.completed ? 'bg-light' : ''}`}>
      <div className="card my-3 border border-1 border-secondary">
        <div className="card-body ">
          <h5 className="card-text text-start">
            <span className=" me-2 fw-bold align-middle">{note.title}</span>-
            <span className="badge badge-secondary fst-italic ms-2">
              {note.tag}
            </span>
          </h5>
          <p className="card-text">{note.description}</p>
          {note.deadline && (
            <p className="card-text"><strong>Deadline :</strong> {formatDateAndTime(note.deadline)}</p>
          )}
        </div>
        <div className="card-footer d-flex justify-content-around flex-wrap">
          <button
            type="submit"
            className="btn btn-primary col-3"
            onClick={() => {
              updateNote(note);
            }}
          >

            <i className="fa-solid fa-pen-to-square mx-2"></i>
            Edit
          </button>
          <button
            type="submit"
            className="btn btn-danger col-3"
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Successfully Deleted", "success");
            }}
          >
            {" "}
            <i className="fa-solid fa-trash mx-2"></i>
            Delete
          </button>
          <button
            type="submit"
            className={`btn btn-success col-3 ${note.completed ? 'disabled' : ''}`}
            onClick={() => {
              markTaskAsComplete(note._id);
            }}
            disabled={note.completed}
          >
            <i className="fa-solid fa-check mx-2"></i>
            Mark Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
