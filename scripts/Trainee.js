import User from './User.js';
import ExamHandler from './ExamHandler.js';
import Registry from './Registry.js';
class Trainee extends User {
    
    constructor(id, fullname, username, password, email=null) {
        super(id, fullname, username, password, email);
        this.programme = null;
        this.exams = []; // List<ExamItem>
        this.ongoingExams = []; // List<ExamHandler>
    }

    // This takes no arguements, and will print out the the upcoming exams
    checkUpcomingExams() {
        console.log(this.exams)
        
        for(let i=0; i<this.exams.length;i++){
            let isVisible = Registry.instance.getExamById(this.exams[i].examBase).isVisible
            let isOver = Registry.instance.getExamById(this.exams[i].examBase).isOver
            console.log(isVisible, isOver)
            if (isOver == false){
                this.ongoingExams.push(new ExamHandler(this.exams[i].examBase.id))
            }
        }
    }

    // This takes an arguement of type string, it will print out the upcoming exams that match the keyword
    viewUpcomingExams(keyword) {
        console.log("This takes an arguement of type string, it will print out the upcoming exams that match the keyword");
        let received_exams = this.exams;
        for (let i = 0; i < this.received_exams.length; i++) {
            if (received_exams[i].examBase.questions.some(item => item.includes(keyword))){
                return received_exams[i];
            }
        }
        return;
    }

    // This takes an arguement of type ExamItem, and will add the exam to the trainee's list of exams
    addExam(exam) {
        console.log("This takes an arguement of type ExamItem, and will add the exam to the trainee's list of exams");
        let tests = this.exams;
        tests.push(exam);
        this.exams = tests;
        return;
    }

    // This takes no arguements, and will return a string containing the progress report
    createProgressReport() {
        console.log("This takes no arguements, and will return a string containing the progress report");
        return "";
    }
    
    // This takes an arguement of type ExamItem, and will start the use case of taking an exam
    takeExam(exam) {
        console.log("This takes an arguement of type ExamItem, and will start the use case of taking an exam");
        ExamHandler.handleExamSession(exam);
        return;
    }

    
}


export default Trainee;
