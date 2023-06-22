//const { User } = require('./User.js');
//const { Course } = require('./Course.js');

import User from './User.js';
import Course from './Course.js';
import Registry from './Registry.js';
import Trainee from './Trainee.js';
import ExamItem from "./ExamItem.js";
import Exam from "./Exam.js"
class TrainingManager extends User {
    constructor(id, fullName, username, password, email = null){
        super(id, fullName, username, password, email);
        this.exams = [];
        this.unassignedTrainees = [];
        this.courses = [];
    }

    //Takes course name as string and adds the course to the training manager and registry course lists
    addCourse(name){
        let newCourse = new Course(this.id ,(Registry.instance.generateCourseId()), name)
        this.courses.push(newCourse.id);
        Registry.instance.courses.push(newCourse);
        console.log(Registry.instance)
        return;
    }

    //Takes course id and removes course from the training manager and registry course lists
    removeCourse(courseId) {
        console.log("Takes course name as a string and removes course from the training manager rota");
        // remove course from TrainingManager
        for (let i = 0; i < this.courses.length; i++) {
            let index = this.courses.indexOf(courseId)
            if (index > -1) {
                this.courses.splice(index, 1);
                break;
            }
        }

        // remove course from Registry
        for (let i = 0; i < Registry.instance.courses.length; i++) {
            if (Registry.instance.courses[i].id == courseId) {
                Registry.instance.courses.splice(i, 1);
                break;
            }
        }
        return;
    }

    // returns list of courses
    getCourses() {
        console.log("Returns list of courses");
        
    }

    // adds a trainee to a course
    addTraineeToCourse(traineeId, courseId){
        // search through the trainees array to find matching trainees id
        let user = Registry.instance.getUserById(traineeId);
        if( !(user instanceof Trainee)){
            console.error("User does not exist or tried to add non-trainee user to a course!", user)
            return
        }

        
        let course;
        course = Registry.instance.getCourseById(courseId);
        if(course == null){
            console.error("Course does not exist!", course)
            return
        }
        course.trainees.push(user.id);
    }

    // creates exam
    createExam(given_courseId, given_minutes, given_hours, given_startTime, given_weight) {
        console.log("creating an exam");
        let test = new Exam(Registry.instance.generateExamId(), given_courseId, given_minutes, given_hours, given_startTime, given_weight);
        this.exams.push(test.id);
        Registry.instance.exams.push(test)
        return;
    }

    //takes course id as argument and returns list of trainees
    getTrainees(courseId) {
        console.log("takes course id as argument and returns list of trainees");
        return Registry.getCourseById(courseId).getTrainees();    
    }

    // Takes a trainee as argument such that only a specific trainee is messaged
    emailTrainee(title, message, traineeId) {
        console.log("Takes a trainee as argument such that only a specific trainee is messaged");
        return;
    }

    //Takes in a title, message and course object as arguments and sends a message to course trainees
    emailAllTrainees(title, message, courseId){
        console.log("Takes in a title, message and course id as arguments and sends a message to course trainees");
        Registry.instance.getCourseById(courseId).emailAllTrainees(title, message);
        return;
    }

    // retrieves exams within a course by using the course object
    getExams(courseId) {
        console.log("retrieves exams within a course by using the courseId");
        return Registry.getCourseById(courseId).getExams();
    }

    // adds a question to a specific exam
    addQuestion(questionText, marks, examId) {
        console.log("add questions to an exams and assigns it a mark as well");
        let tests = this.exams;
        for (let i = 0; i < tests.length; i++) {
            if (tests[i].examId == examId) {
                tests[i].addQuestion(questionText, marks);
                return;
            }
        }
        return;
    }


    // changes the exam timing by taking the id of the exam and assigning new time and date of exam
    // duration is an array with hours and mins in index 0 and 1 respectively
    changeExamTiming(duration, startTime, examId) {
        console.log("changes the exam timing by taking the id of the exam and assigning new time and date of exam");
        let tests = this.exams;
        for (let i = 0; i < tests.length; i++) {
            if (tests[i].examId == examId) {
                tests[i].changeDuration(duration[0], duration[1], startTime)
                return;
            }
        }
        return;
    }

    // assigns trainees in a course an exams
    assignExam(given_course, given_examId) {
        console.log("assigns trainees in a course an exams");
        
        let course = Registry.instance.getCourseById(given_course);
        course.exams.push(Registry.instance.getExamById(given_examId))
        for (let i = 0; i<course.trainees.length; i++){
            console.log(course.trainees[i])
            Registry.instance.getUserById(course.trainees[i]).exams.push(new ExamItem(course.trainees[i].id, null, given_examId, []));
        }
        return;
    }

    // deletes an exam by filtering examId and course object
    deleteExam(given_course, examId) {
        console.log("deletes an exam by filtering examId and courseId");
        given_course.deleteExam(examId);
        return;
    }

    // returns progress report of a given trainee
    viewProgressReport(trainee_object) {
        console.log("returns progress report of a given trainee");
        return trainee_object.createProgressReport();
    }

    // adds a trainee
    addTrainee(traineeId) {
        console.log("adds a trainee");
        // search through the trainees array in registry to find matching trainees id
        for (let i = 0; i < Registry.instance.trainees.length; i++) {
            try {
                if (Registry.instance.trainees[i].id == traineeId) {
                    this.unassignedTrainees.push(Registry.instance.trainees[i]);
                }
            }
            catch (err) {
                console.error("Custom Error : Could not add trainee", err);
            }
        }
        return;
    }

    // Sends progress report to all trainees within the given course
    sendProgressReport(given_course) {
        console.log("Sends progress report to all trainees within the given course");
        let students = given_course.getTrainees()
        for (let i = 0; i < this.students.length; i++) {
            this.emailTrainee("Progress Report", students[i].createProgressReport(),
                students[i], given_course)
        }
        return;
    }
}


//module.exports = {TrainingManager: TrainingManager };
export default TrainingManager;