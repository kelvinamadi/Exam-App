import Administrator from './Administrator.js';
import Registry from './Registry.js';


// Create a new administrator
let x = new Administrator(0, "John Smith", "jsmith", "Apple123");
console.log(x);

// Create a new user
let a = x.createUser("John Doe", 'm');
console.log(a)
let b = x.createUser("John Doe2", 'm');


console.log(b)
let c = x.createUser("John Doe3", 'm');
console.log(c)
let d = x.createUser("John Doe", 'a');
console.log(d)
let e = x.createUser("John Doe", 'wrong');
console.log(e)
let f = x.createUser("Joe", 't');
console.log(f)
f.registerEmail("joe@gmail.com");

a.addCourse("Maths");
let startTime = Math.floor(new Date('2023.04.12').getTime());
a.createExam(1, 24, 0, startTime, 0.2);
a.addTraineeToCourse(6,1)
a.assignExam(1,1);
let exam = Registry.instance.getExamById(1);
exam.addQuestion("This is a sample question. Answer below:",5);
exam.addQuestion("Another question here! Answer below:",5);
console.log(exam)

// Create a course


// Assign a trainee to a manager
a.addTrainee(f.getUserId());

// Add a trainee to a course
a.addTraineeToCourse(f.getUserId(), 1);

// View all users
console.table(x.viewUsers());

Registry.instance.exportRegistry();


