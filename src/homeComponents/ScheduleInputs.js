import { useState } from "react";
import EditManager from "../JsModules/EditManager";

// pass decreaseNumCourses as props too
function ScheduleInputs(props) {
  const [name, setName] = useState(props.course.courseName);
  const [code, setCode] = useState(props.course.courseCode);
  const [number, setNumber] = useState(props.course.sectionNumber);
  const [credits, setCredits] = useState(props.course.creditHours);
  const [days, setDays] = useState(props.course.meetFrequencies);
  const [time, setTime] = useState(props.course.meetTime);
  const [room, setRoom] = useState(props.course.meetRoom);
  const [professor, setProfessor] = useState(props.course.professor);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "courseName") {
      setName(value);
    } else if (name === "courseCode") {
      setCode(value);
    } else if (name === "sectionNumber") {
      setNumber(value);
    } else if (name === "creditHours") {
      setCredits(value);
    } else if (name === "meetFrequencies") {
      setDays(value);
    } else if (name === "meetTime") {
      setTime(value);
    } else if (name === "meetRoom") {
      setRoom(value);
    } else if (name === "professor") {
      setProfessor(value);
    }
  };

  return (
    <div className="course-edit-container">
      <div className="name-delete-container">
        <h3>{name}</h3>
        <i
          className="fa-regular fa-trash-can"
          onClick={() => {
            // need to change
            props.remove(props.course.id);
          }}
        ></i>
      </div>
      <div className="course-boxes">
        <div className="box box-1">
          <label htmlFor="">Course Name</label>
          <input
            id="courseName"
            type="text"
            name={`courseName-${props.index}`}
            defaultValue={name}
            onChange={handleInputChange}
            className={props.course.id}
          />

          <label htmlFor="">Course Code</label>
          <input
            type="text"
            defaultValue={code}
            id="courseCode"
            name={`courseCode-${props.index}`}
            onChange={handleInputChange}
            className={props.course.id}
          />

          <label htmlFor="">Section Number</label>
          <input
            type="text"
            defaultValue={number}
            id="sectionNumber"
            name={`sectionNumber-${props.index}`}
            className={props.course.id}
            onChange={handleInputChange}
          />

          <label htmlFor="">Credit Hours</label>
          <input
            type="text"
            defaultValue={credits}
            id="creditHours"
            name={`creditHours-${props.index}`}
            onChange={handleInputChange}
            className={props.course.id}
          />
        </div>
        <div className="box box-2">
          <label htmlFor="">Meet Days</label>
          <input
            type="text"
            defaultValue={days}
            id="meetFrequencies"
            name={`meetFrequencies-${props.index}`}
            onChange={handleInputChange}
            className={props.course.id}
          />

          <label htmlFor="">Meet Time</label>
          <input
            type="text"
            defaultValue={time}
            id="meetTime"
            name={`meetTime-${props.index}`}
            className={props.course.id}
            onChange={handleInputChange}
          />

          <label htmlFor="">Meet Room</label>
          <input
            type="text"
            defaultValue={room}
            id="meetRoom"
            name={`meetRoom-${props.index}`}
            className={props.course.id}
            onChange={handleInputChange}
          />

          <label htmlFor="">Professor</label>
          <input
            type="text"
            defaultValue={professor}
            id="professor"
            name={`professor-${props.index}`}
            className={props.course.id}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <span className="divider"></span>
    </div>
  );
}

export default ScheduleInputs;
