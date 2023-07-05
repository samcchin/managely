import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './managely_logo.png';


function ConferenceColumn(props) {
  return (
    <div className="col">
      {props.list.map(data => {
        const conference = data.conference;
        return (
          <div key={conference.href} className="card mb-3 shadow">
            <img src={conference.location.picture_url} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{conference.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {conference.location.name}
              </h6>
              <p className="card-text">
                {conference.description}
              </p>
            </div>
            <div className="card-footer">
              {new Date(conference.starts).toLocaleDateString()}
              -
              {new Date(conference.ends).toLocaleDateString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MainPage({ conferences }) {
  const [conferenceColumns, setConferenceColumns] = useState([]);

  useEffect(() => {
    async function getConferenceDetails() {
      try {
          const requests = [];
          for (let conference of conferences) {
            const detailUrl = `http://localhost:8000${conference.href}`;
            requests.push(fetch(detailUrl));
          }

          const responses = await Promise.all(requests);
          const conferenceColumns = [[], [], []];

          let i = 0;
          for (const conferenceResponse of responses) {
            if (conferenceResponse.ok) {
              const details = await conferenceResponse.json();
              conferenceColumns[i].push(details);
              i = i + 1;
              if (i > 2) {
                i = 0;
              }
            } else {
              console.error(conferenceResponse);
            }
          }

          setConferenceColumns(conferenceColumns);
        } catch (e) {
        console.error(e);
      }
    }
    getConferenceDetails();
  }, [conferences])

  return (
    <>
      <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
        <img className="logo" src={Logo} alt="" width="500" height="130" />
        {/* <h1 className="display-5 fw-bold mainpage-title">managely</h1> */}
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4 mainpage-subtitle">
            The only resource you'll ever need to plan an run your in-person or
            virtual conference for thousands of attendees and presenters.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/attendees/new" className="btn btn-primary btn-lg px-4 gap-3">Attend a conference</Link>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>Upcoming conferences</h2>
        <div className="row">
          {conferenceColumns.map((conferenceList, index) => {
            return (
              <ConferenceColumn key={index} list={conferenceList} />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MainPage;
