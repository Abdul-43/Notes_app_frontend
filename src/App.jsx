import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Alert from "./components/Alert";
import NoteState from "./context/NoteState";
import { Login } from "./components/Login";
import { Signup } from "./components/Register";
import { useState } from "react";
import { Usernotes } from "./pages/Usernotes";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route
              exact
              path="/notes"
              element={<Usernotes showAlert={showAlert} />}
            />
            <Route
              exact
              path="/"
              element={<Login showAlert={showAlert} />}
            />
            <Route
              exact
              path="/register"
              element={<Signup showAlert={showAlert} />}
            />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}
export default App;
