import Question from "./Question.js";

class Exam {
  // This can be an alternative for assigning unique exam id:
  // id
  // static lastExamId = 0;
  id;
  course;
  examItems = []; // List<ExamItem>
  questions = []; // List<Question>
  duration;
  startTime;
  examWeight;
  isOver;
  isVisible;

  constructor(id, course, minutes, hours, startTime, weight) {
    this.id = id
    this.course = course;
    this.examItems = [];
    this.questions = [];
    this.duration = new Duration(minutes, hours);
    this.startTime = startTime;
    this.examWeight = weight;
    this.isOver = false;
    this.isVisible = false;
  }

  addQuestion(questionText, marks) {
    console.log(`called -> Exam: addQuestion`);
    const question = new Question(questionText, marks);
    this.questions.push(question);
    return;
  }

  changeDuration(hours, minutes, startTime) {
    console.log(`called -> Exam: changeDuration`);
    this.duration = new Duration(minutes, hours);
    this.startTime = startTime;
    return;
  }
}



class Duration {
  constructor(minutes, hours) {
    this.minutes = minutes;
    this.hours = hours;
  }
}

// testing:
/*
x = new Exam("course", 3, 30, "dateTime", 0.1);
x.addQuestion("question 1", 5);
x.addQuestion("question 2", 95);
x.addQuestion("question 3", 0);
console.log("duration: ", x.duration.hours, "h ", x.duration.minutes, "m");
console.log(x.questions);
x.changeDuration(2,30);
console.log("duration: ", x.duration.hours, "h ", x.duration.minutes, "m");
*/

export default Exam