import Nav from './Nav';
import AttendeesList from './AttendeesList.js'
import LocationForm from './LocationForm.js'
import ConferenceForm from './ConferenceForm.js'
import AttendeeForm from './AttendeeForm.js'


function App(props) {
  if (props.attendees === undefined){
    return null
  }
  return (
  <>
  <Nav />
  <div className="container">
    <AttendeeForm />
    {/* <ConferenceForm /> */}
    {/* <LocationForm /> */}
  {/* <AttendeesList attendees={props.attendees} /> */}
  </div>
  </>
  );
}

export default App;
