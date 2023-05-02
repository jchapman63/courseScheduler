import { v4 as uuidv4 } from "uuid";

class Course {
  constructor(
    courseName,
    courseCode,
    sectionNumber,
    creditHours,
    meetFrequencies,
    meetTime,
    meetRoom,
    professor,
    id
  ) {
    this.courseName = courseName;
    this.courseCode = courseCode;
    this.sectionNumber = sectionNumber;
    this.creditHours = creditHours;
    this.meetFrequencies = meetFrequencies;
    this.meetTime = meetTime;
    this.meetRoom = meetRoom;
    this.professor = professor;
    if (id) {
      this.id = id;
    } else {
      this.id = uuidv4();
    }
  }

  updateCourseName(name) {
    this.courseName = name;
  }

  updateCourseCode(code) {
    this.courseCode = code;
  }

  updateSectionNumber(number) {
    this.sectionNumber = number;
  }

  updateCreditHours(credits) {
    this.creditHours = credits;
  }

  updateMeetFrequencies(frequency) {
    this.meetFrequencies = frequency;
  }

  updateMeetTime(time) {
    this.meetTime = time;
  }

  updateMeetRoom(room) {
    this.meetRoom = room;
  }

  updateProfessor(professor) {
    this.professor = professor;
  }

  startTimeToInt24 = () => {
    // add conditional to check length and wrap it
    if (this.meetTime[0] === "0") {
      var timeHour = parseInt(this.meetTime[1]);
    } else {
      timeHour = parseInt(this.meetTime.slice(0, 2));
    }

    if (this.meetTime[3] === "0") {
      var timeMinutes = parseInt(this.meetTime[4]);
    } else {
      timeMinutes = parseInt(this.meetTime.slice(3, 5));
    }

    // convert 24 hour if needed
    if (timeHour !== 12 && this.meetTime.slice(5, 6) === "P") {
      timeHour += 12;
    }

    // make minutes a fraction of an hour
    timeMinutes /= 60;

    return timeHour + timeMinutes;
  };

  endTimeToInt24 = () => {
    // add conditional to check length and wrap it
    if (this.meetTime[8] === "0") {
      var timeHour = parseInt(this.meetTime[9]);
    } else {
      timeHour = parseInt(this.meetTime.slice(8, 10));
    }

    if (this.meetTime[11] === "0") {
      var timeMinutes = parseInt(this.meetTime[12]);
    } else {
      timeMinutes = parseInt(this.meetTime.slice(11, 13));
    }

    // convert 24 hour if needed
    if (timeHour !== 12 && this.meetTime.slice(13, 14) === "P") {
      timeHour += 12;
    }

    // make minutes a fraction of an hour
    timeMinutes /= 60;

    return timeHour + timeMinutes;
  };

  toObject() {
    return {
      courseName: this.courseName,
      courseCode: this.courseCode,
      sectionNumber: this.sectionNumber,
      creditHours: this.creditHours,
      meetFrequencies: this.meetFrequencies,
      meetTime: this.meetTime,
      meetRoom: this.meetRoom,
      professor: this.professor,
      id: this.id,
    };
  }
}
export default Course;

// this is a reference type, so only one copy exists, according to the internet so we will check out the behavior with some console logging
