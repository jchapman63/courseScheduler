import "./componentStyles/editSchedule.css";

import EditManager from "../JsModules/EditManager";
import { useState } from "react";
import ScheduleInputs from "./ScheduleInputs";
import Course from "../JsModules/Course";

// what's in props?
// props.app : the app model responsible for creating, updating, and deleting scheduels
// contains:
// currentSchedule: the schedule currently being shown by the UI
// app.updateSchedule(id, schedule)
// updateEditor: gives ability to close display

function EditSchedule(props) {
  // update when new course added
  const [numCourses, setNumCourses] = useState(
    props.currentSchedule.courses.length
  );

  const increaseNumCourses = () => {
    setNumCourses(numCourses + 1);
  };

  const decreaseNumCourses = () => {
    setNumCourses(numCourses - 1);
  };

  const addCourse = () => {
    var newCourse = new Course("", "", "", "", "", "", "", "");
    props.currentSchedule.addCourse(newCourse);
  };

  const removeCourse = (id) => {
    // decrement count (done from EditSchedule)
    // remove from this.currentSchedule
    props.currentSchedule.courses.forEach((course) => {
      if (course.id === id) {
        props.currentSchedule.removeCourse(course);
      }
    });

    // update schedule
    props.updateSchedule(props.currentSchedule.id, props.currentSchedule);

    // decrease count
    decreaseNumCourses();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let shouldUpdate = true;
    for (var i = 0; i < props.currentSchedule.courses.length; i++) {
      const course = props.currentSchedule.courses[i];

      // grab all form data
      const courseName = formData.get(`courseName-${i}`);
      const courseCode = formData.get(`courseCode-${i}`);
      const sectionNumber = formData.get(`sectionNumber-${i}`);
      const creditHours = formData.get(`creditHours-${i}`);
      const meetFrequencies = formData.get(`meetFrequencies-${i}`);
      const meetTime = formData.get(`meetTime-${i}`);
      const meetRoom = formData.get(`meetRoom-${i}`);
      const professor = formData.get(`professor-${i}`);

      const tempCourse = new Course(
        courseName,
        courseCode,
        sectionNumber,
        creditHours,
        meetFrequencies,
        meetTime,
        meetRoom,
        professor,
        course.id
      );

      console.log("temp course ID", tempCourse.id);

      let editManager = new EditManager(
        tempCourse,
        props.currentSchedule.courses
      );
      console.log(tempCourse.courseName, editManager.isValid());
      if (editManager.isValid() === true) {
        var overlaps = editManager.findOverlapViolations();
        if (overlaps === false) {
          props.currentSchedule.courses[i] = tempCourse;
        } else {
          shouldUpdate = false;
        }
      } else {
        shouldUpdate = false;
      }
    }
    if (shouldUpdate === true) {
      props.updateSchedule(props.currentSchedule.id, props.currentSchedule);
      props.updateEditor();
    }
  };

  return (
    <form action="" className="editor-container" onSubmit={handleSubmit}>
      <div>
        {props.currentSchedule ? (
          <div className="inputs-holder">
            <h2>{props.currentSchedule.name}</h2>
            <ul className="schedules-list">
              {props.currentSchedule.courses.map((course, index) => (
                <ScheduleInputs
                  course={course}
                  index={index}
                  remove={removeCourse}
                />
              ))}
            </ul>
            <div className="schedule-options">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addCourse();
                  increaseNumCourses();
                }}
                className="schedule-edit-btn"
              >
                Add
              </button>
              <button type="submit" className="schedule-edit-btn">
                Done
              </button>
            </div>
          </div>
        ) : (
          <p>No Schedule Found.</p>
        )}
      </div>
    </form>
  );
}

export default EditSchedule;
