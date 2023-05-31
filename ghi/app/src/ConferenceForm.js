import React, { useEffect, useState } from "react";

function ConferenceForm(props) {
    const [locations, setLocations] = useState([]);
    const [name, setName] = useState('');
    const [starts, setStarts] = useState('');
    const [ends, setEnds] = useState('');
    const [description, setDescription] = useState('');
    const [maximumPresentation, setMaximumPresentation] = useState('');
    const [maximumAttendee, setMaximumAttendee] = useState('');
    const [location, setLocation] = useState('');

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value)
    }

    const handleStartChange = (event) => {
        const value = event.target.value;
        setStarts(value)
    }

    const handleEndChange = (event) => {
        const value = event.target.value;
        setEnds(value)
    }

    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value)
    }

    const handleMaximumPresentationChange = (event) => {
        const value = event.target.value;
        setMaximumPresentation(value)
    }

    const handleMaximumAttendeeChange = (event) => {
        const value = event.target.value;
        setMaximumAttendee(value)
    }

    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.name = name
        data.starts = starts
        data.ends = ends
        data.description = description
        data.max_presentations = maximumPresentation
        data.max_attendees = maximumAttendee
        data.location = location

        const conferenceUrl='http://localhost:8000/api/conferences/'
        const fetchConfig = {
            method:"post",
            body:JSON.stringify(data),
            headers: {
                'Content-Type':'application/json'
            }
        }

        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference);

            setName('');
            setStarts('');
            setEnds('');
            setDescription('');
            setMaximumPresentation('');
            setMaximumAttendee('');
            setLocation('');
        }
    }

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferencelocation/';
        const response = await fetch(url);

        if (response.ok) {
        const data = await response.json();
        setLocations(data.locations);
        };
    }

    useEffect(() => {
        fetchData();
      }, []);


    return (
    <>
        <div className="row">
        <div className="offset-3 col-7">
          <div className="shadow p-4 mt-4">
            <h1>Create a new conference</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input
                onChange={handleNameChange}
                placeholder="Name"
                required value={name}
                type="text" name="name" id="name" className="form-control"/>
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                onChange={handleStartChange}
                placeholder="Starts"
                required value={starts}
                type="date" name="starts" id="starts" className="form-control"/>
                <label htmlFor="starts">Starts</label>
              </div>
              <div className="form-floating mb-3">
                <input
                onChange={handleEndChange}
                placeholder="Ends"
                required value={ends}
                type="date" name="ends" id="ends" className="form-control"/>
                <label htmlFor="ends">Ends</label>
              </div>
              <div className="mb-3">
                <label htmlFor="Description" className="form-label">Description</label>
                <textarea
                onChange={handleDescriptionChange}
                value={description}
                className="form-control"
                name="description" id="description" rows="3"></textarea>
              </div>
              <div className="form-floating mb-3">
                <input
                onChange={handleMaximumPresentationChange}
                placeholder="Maximum presentations"
                required value={maximumPresentation}
                type="number" name="max_presentations" id="max_presentations" className="form-control"/>
                <label htmlFor="max_presentations">Maximum presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input
                onChange={handleMaximumAttendeeChange}
                placeholder="Maximum attendees"
                required value={maximumAttendee}
                type="number" name="max_attendees" id="max_attendees" className="form-control"/>
                <label htmlFor="max_attendees">Maximum attendees</label>
              </div>
              <div className="mb-3">
                <select
                onChange={handleLocationChange}
                required value={location}
                id="location" name="location" className="form-select">
                  <option value="">Choose a location</option>
                  {locations.map(location => {
                    return (
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>
                    );
                  })}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </>
    )


}

export default ConferenceForm;
