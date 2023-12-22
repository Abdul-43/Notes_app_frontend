import React, { useState, useEffect } from "react";
import NoteContext from "./NoteContext";
import axios from "axios"; // Import axios

const NoteState = (props) => {
  const host = "http://localhost:8000";
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes(); // Fetch notes on component mount
  }, []);

  // Fetch all notes
  const getNotes = async () => {
    try {
      const response = await axios.get(`${host}/api/notes/fetchallnotes`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add a note
  const addNote = async (title, description, tag, deadline) => {

    try {
      const response = await axios.post(
        `${host}/api/notes/addnote`,
        { title, description, tag, deadline },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      setNotes([...notes, response.data]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${host}/api/notes/deletenote/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const updatedNotes = notes.filter((note) => note._id !== id);
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag, deadline) => {
    try {
      await axios.put(
        `${host}/api/notes/updatenote/${id}`,
        { title, description, tag, deadline },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const updatedNotes = notes.map((note) =>
        note._id === id ? { ...note, title, description, tag, deadline } : note
      );
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  // Mark task
  const markTaskAsComplete = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/notes/${id}/complete`,
        {}
      );
      getNotes();
    } catch (error) {
      console.error("Error marking task as complete:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        markTaskAsComplete,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
