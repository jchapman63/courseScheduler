class EditManager {
  constructor(course, scheduleCourses) {
    this.course = course;
    // array of all other courses
    this.scheduleCourses = scheduleCourses;
  }

  // return false if no violation
  _checkEmpty() {
    for (const key in this.course) {
      if (
        this.course[key] === "" ||
        this.course[key] === null ||
        this.course[key] === undefined
      ) {
        return true;
      }
    }
    return false;
  }

  // return false if no violation
  _checkDaysFormatViolation() {
    // meetFrequencies ex = [M, W, F]
    // implement, there must be a space between and one of M, T, W, Th, F
    function capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const validDays = ["M", "T", "W", "Th", "F"];
    var meetFrequencies = this.course.meetFrequencies.split(" ");
    for (var i = 0; i < meetFrequencies.length; i++) {
      let capLetter = capitalize(meetFrequencies[i]);

      if (validDays.includes(capLetter) === false) {
        // violation found
        return true;
      }
    }
    // no violations
    return false;
  }

  // return false if no violation
  _checkTimeFormatViolation() {
    // get start and end in 24 hour int
    const start = this.course.startTimeToInt24();
    const end = this.course.endTimeToInt24();

    // check start > end
    if (start > end) {
      // console.log("condition violated " + start + " > " + end);
      return true;
    } else if (start < 6 || end < 6) {
      // console.log("one is less than 6, start:" + start + " end: " + end);
      return true;
    } else if (start > 18 || end > 18) {
      // console.log("one is over 18, start:" + start + " end: " + end);
      return true;
    }

    return false;
  }

  _findDayOverlaps() {
    let selectedDays = this.course.meetFrequencies.split(" ");
    let overlaps = [];
    for (var i = 0; i < this.scheduleCourses.length; i++) {
      const schedCourse = this.scheduleCourses[i];
      if (schedCourse.id !== this.course.id) {
        const schedCourseDays = schedCourse.meetFrequencies.split(" ");
        selectedDays.forEach((day) => {
          if (schedCourseDays.includes(day)) {
            overlaps.push(day);
          }
        });
      } else {
        console.log("id was equal");
      }
    }
    return overlaps;
  }

  _findTimeOverlaps() {
    const courseStart = this.course.startTimeToInt24();
    const courseEnd = this.course.endTimeToInt24();

    // accumulate errors
    let timeOverlappers = [];
    // loop through each course in schedule
    for (var i = 0; i < this.scheduleCourses.length; i++) {
      const schedCourse = this.scheduleCourses[i];
      if (schedCourse.id !== this.course.id) {
        const schedCourseStart = schedCourse.startTimeToInt24();
        const schedCourseEnd = schedCourse.endTimeToInt24();

        if (
          courseStart <= schedCourseStart <= courseEnd ||
          schedCourseStart <= courseStart <= schedCourseEnd
        ) {
          timeOverlappers.push(schedCourse);
        }
      }
    }
    return timeOverlappers;
  }

  _findRoomOverlap() {
    let roomOverlappers = [];
    for (var i = 0; i < this.scheduleCourses.length; i++) {
      const schedCourse = this.scheduleCourses[i];
      if (schedCourse.id !== this.course.id) {
        if (schedCourse.meetRoom === this.course.meetRoom) {
          roomOverlappers.push(schedCourse);
        }
      }
    }
    return roomOverlappers;
  }

  _findProfessorOverlap() {
    let professorOverlappers = [];
    for (var i = 0; i < this.scheduleCourses.length; i++) {
      const schedCourse = this.scheduleCourses[i];
      if (schedCourse.id !== this.course.id) {
        if (schedCourse.professor === this.course.professor) {
          professorOverlappers.push(schedCourse);
        }
      }
    }
    return professorOverlappers;
  }

  _findOverlappers() {
    const courseStart = this.course.startTimeToInt24();
    const courseEnd = this.course.endTimeToInt24();
    let selectedDays = this.course.meetFrequencies.split(" ");

    let overlappers = [];
    for (var i = 0; i < this.scheduleCourses.length; i++) {
      const schedCourse = this.scheduleCourses[i];
      if (schedCourse.id !== this.course.id) {
        if (
          schedCourse.professor === this.course.professor ||
          schedCourse.meetRoom === this.course.meetRoom
        ) {
          const schedCourseDays = schedCourse.meetFrequencies.split(" ");
          selectedDays.forEach((day) => {
            if (schedCourseDays.includes(day)) {
              const schedCourseStart = schedCourse.startTimeToInt24();
              const schedCourseEnd = schedCourse.endTimeToInt24();

              if (
                Math.max(schedCourseStart, courseStart) <=
                Math.min(schedCourseEnd, courseEnd)
              ) {
                var overlapString =
                  this.course.courseName +
                  " overlaps with " +
                  schedCourse.courseName +
                  " on Day: " +
                  day +
                  " at times: " +
                  schedCourse.meetTime +
                  ". Please select another room, time, or professor.";
                overlappers.push(overlapString);
              }
            }
          });
        }
      }
    }
    return overlappers;
  }

  // checks for overlaps in days and times
  findOverlapViolations() {
    const overlaps = this._findOverlappers();
    if (overlaps.length !== 0) {
      alert(overlaps.join("\n"));
      return true;
    }
    return false;
  }

  // checks if the inputs are valid
  isValid() {
    const isEmpty = this._checkEmpty();
    const wrongDays = this._checkDaysFormatViolation();
    const wrongTimes = this._checkTimeFormatViolation();

    // console.log("course", this.course);
    // console.log("is empty", isEmpty);
    // console.log("wrong day", wrongDays);
    // console.log("wrong times", wrongTimes);

    if (isEmpty === true || wrongDays === true || wrongTimes === true) {
      return false;
    }
    // console.log("reached true");
    return true;
  }
}

export default EditManager;
