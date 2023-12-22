import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/NoteContext";
import AddNote from "./Addnote";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "default",
    deadline: null,
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.title, note.description, note.tag);
    refClose.current.click();
    props.showAlert("Note Updated Successfully!", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setNote({ ...note, deadline: date });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
      >
        Update Your Note
      </button>
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={note.title}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={note.description}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    value={note.tag}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="deadline" className="form-label">
                    Deadline
                  </label>
                  <br />
                  <DatePicker
                    selected={note.deadline}
                    onChange={handleDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText="Select Deadline"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={note.title.length < 5 || note.description.length < 5}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-center">Your Notes</h2>
      {notes.length === 0 ? (
        "No notes to display"
      ) : (
        <div className="row my-3">
          {notes
            .slice(0)
            .reverse()
            .map((note) => {
              return (
                <NoteItem
                  key={note._id}
                  updateNote={updateNote}
                  note={note}
                  showAlert={props.showAlert}
                />
              );
            })}
        </div>
      )}
    </>
  );
};

export default Notes;
