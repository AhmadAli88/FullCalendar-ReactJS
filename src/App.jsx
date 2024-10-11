import "./App.css";
import CalendarWithDropdown from "./components/FullCalendarWithDropdown/CalendarWithDropdown";

// import Calendar from './components/FullCalendar'

function App() {
  return (
    <div style={{ width: "550px" }}>
      {/* <Calendar/> */}
      <CalendarWithDropdown />
    </div>
  );
}

export default App;
