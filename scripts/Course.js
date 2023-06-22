import Registry from "./Registry.js";

class Course {
    id;
    name;
    trainingManager;
    trainees = [];
    exams = []; // List<Exam>
    region;

    constructor(managerId, id, name) {
        this.trainingManager = managerId
        this.name = name;
        this.id = id;
    }

    createExam(hours, minutes, startTime, weight) {
        let exam = new Exam(this.generateExamId(), this, hours, minutes, startTime, weight);
        this.exams.push(exam);
        return;
    }

    generateExamId() {
        return Registry.generateExamId();
    }

    getExams(exams) {
        return this.exams;
    }

    deleteExam(examId) {
        // search through the exams array to find matching exam id
        for (let i = 0; i < this.exams.length; i++) {
            if (this.exams[i].id == examId) {
                this.exams.splice(i, 1);
            }
        }
        return;
    }

    addQuestion(questionText, marks, examId) {
        let chosenExam = exam[0];
        // search through the exams array to find matching exam id
        for (let i = 0; i < this.exams.length; i++) {
            if (this.exams[i].id == examId) {
                chosenExam = this.exams[i];
                break;
            }
        }
        chosenExam.addQuestion(questionText, marks, examId);
        return;
    }

    changeExamTiming(hours, minutes, startTime, examId) {
        let chosenExam = exam[0];
        // search through the exams array to find matching exam id
        for (let i = 0; i < this.exams.length; i++) {
            if (this.exams[i].id == examId) {
                chosenExam = this.exams[i];
                break;
            }
        }
        chosenExam.changeDuration(hours, minutes, startTime);
        return;
    }

    assignExamToTrainees(examId) {
        let chosenExam = exam[0];
        // search through the exams array to find matching exam id
        for (let i = 0; i < this.exams.length; i++) {
            if (this.exams[i].id == examId) {
                chosenExam = this.exams[i];
                break;
            }
        }
        // traverse through list of trainees and add the exam to their exams list
        for (let i = 0; i < this.trainees.length; i++) {
            this.trainees[i].exams.push(chosenExam);
        }
        return;
    }

    emailAllTrainees(title, message) {
        // add all trainees' emails to an array
        let traineeEmails = [];
        for (let i = 0; i < this.trainees.length; i++) {
            traineeEmails.push(this.trainees[i].email);
        }
        const mailtoLink = `mailto:${traineeEmails}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(message)}`;
        windows.open(mailtoLink);
        return;
    }

    emailTrainee(title, message, traineeId) {
        const traineeEmail = "";
        // search through the trainees array to find matching trainees id
        for (let i = 0; i < this.trainees.length; i++) {
            if (this.trainees[i].id == traineeId) {
                traineeEmail = this.trainees[i].email;
                break;
            }
        }
        const mailtoLink = `mailto:${traineeEmail}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(message)}`;
        windows.open(mailtoLink);
        return;
    }

    getTrainees() {
        let traineeList = [];
        for (let i=0; i < this.trainees; i++){
            traineeList.push(Registry.instance.getUserById(this.trainees));
        }
        return traineeList;
    }
}


// module.exports = {Course: Course}
export default Course;