function AttendeesList(props) {
    if (!props.attendees || !Array.isArray(props.attendees)) {
      return null; 
    }

    return (
      <>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Conference</th>
            </tr>
          </thead>
          <tbody>
            {props.attendees.map((attendee) => {
              return (
                <tr key={attendee.href}>
                  <td>{attendee.name}</td>
                  <td>{attendee.conference}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }

  export default AttendeesList;
