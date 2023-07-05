import React, { useState, useEffect } from 'react';
import "./App.css";
import Nav from "./Nav";
import AttendeesList from "./AttendeesList";
import LocationForm from "./LocationForm";
import ConferenceForm from "./ConferenceForm";
import AttendConferenceForm from "./AttendConferenceForm";
import PresentationForm from "./PresentationForm";
import MainPage from "./MainPage.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(props) {

  const [ conferences, setConferences ] = useState([]);

  async function getConferences() {
    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setConferences(data.conferences);
    }
  }


  useEffect(() => {
    getConferences();
  }, []);


  if (props.attendees === undefined) {
    return null;
  }
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Nav />
        <div className="container">
          <Routes>
            <Route index element={<MainPage conferences={conferences} />} />
            <Route path="locations">
              <Route path="new" element={<LocationForm />} />
            </Route>
            <Route path="conferences">
              <Route path="new" element={<ConferenceForm getConferences={getConferences} />} />
            </Route>
            <Route path="attendees">
              <Route index element={<AttendeesList attendees={props.attendees}/>}/>
              <Route path="new" element={<AttendConferenceForm conferences={conferences} />} />
            </Route>
            <Route path="presentations">
              <Route path="new" element={<PresentationForm conferences={conferences}  />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
