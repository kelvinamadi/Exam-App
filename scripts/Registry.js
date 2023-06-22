import Administrator from './Administrator.js';
import TrainingManager from './TrainingManager.js';
import Trainee from './Trainee.js';
import Course from './Course.js';
import ExamHandler from "./ExamHandler.js"
import ExamItem from './ExamItem.js';
import Exam from './Exam.js';
import Question from "./Question.js"
import Answer from './Answer.js';

class Registry {
    static instance = null;
    constructor(){
        if(Registry.instance === null){
            Registry.instance = this;
            this.admins = [];
            this.trainingManagers = [];
            this.trainees = [];
            this.courses = [];
            this.lastUserId = 0;
            this.lastCourseId = 0;
            this.lastExamId = 0;
            this.exams = [];
        }
        else{
            
            return Registry.instance;
        }
    }

    generateUserId() {
        return ++this.lastUserId;
    }

    // create a user and return the new User object
    // password: random
    // username: "ad"/"trm"/"tr" + String(n), where n is a 3-digit unique userId with leading zeroes 
    createUser(fullName, userType) {
        var userId = this.generateUserId();
        var usernameSuffix;
        if(userId < 10){
            usernameSuffix = "00" + String(userId);        
        }
        else if (userId < 100){
            usernameSuffix = "0" + String(userId);   
        }
        else{
            usernameSuffix = String(userId);
        }

        function generatePassword(length) {
            const chars ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?+-";
            var password = "";

            for (let i = 0; i < length; i++) {
              var index = Math.floor(Math.random() * chars.length);
              password += chars[index];
            }
            return password;
          }

        var createdUser;
        switch(userType){
            case 'a':
                createdUser = new Administrator(userId, fullName, ("ad"+usernameSuffix), generatePassword(8))
                this.admins.push(createdUser)
                break;
            case 'm':
                createdUser = new TrainingManager(userId, fullName, ("trm"+usernameSuffix), generatePassword(8))
                this.trainingManagers.push(createdUser)
                break;
            case 't':
                createdUser = new Trainee(userId, fullName, ("tr"+usernameSuffix), generatePassword(8))
                this.trainees.push(createdUser)
                break;
        }
        return createdUser;
    }

    getTrainingManagers() {
        return this.trainingManagers;
    }

    getTrainees() {
        return this.trainees;
        
    }

    removeUser(user) {
        const users = [this.trainees, this.admins, this.trainingManagers]
        // remove user from Registry lists
        for (let i= 0; i<3 ; i++){
            var index = users[i].indexOf(user)
            if (index > -1){
                users[i].splice(index, 1);
            }
        }
        // remove Trainees from unassignedTrainees in all TrainingManager instances and 
        // remove Trainees from all Course instances
        // if (user instanceof Trainee){
        //     for (let i = 0; i < this.trainingManagers.length; i++) {
        //         let tm = this.trainingManagers[i]
        //         let index = tm.unassignedTrainees.indexOf(user.id)
        //         if (index > -1){
        //             tm.unassignedTrainees.splice(index, 1);
        //         }
                
        //         for (let i = 0; i < tm.courses; i++) {
        //             let crs = tm.courses[i]
        //             let index = crs.trainees.indexOf(user)
        //             if (index > -1){
        //                 crs.trainees.splice(index, 1);
        //             }
        //         }
        //     }
        // }
        
    }

    getCourseById(id){
        for (let i = 0; i < this.courses.length; i++){
            if (this.courses[i].id == id) {
                return this.courses[i];
            }
        }
        return null;
    }

    getExamById(id){
        for (let i = 0; i < this.exams.length; i++){
            if (this.exams[i].id == id) {
                return this.exams[i];
            }
        }
        return null;
    }

    getUserById(id){
        var users = this.getAllUsers();
        for (let i = 0; i < users.length; i++) {
            try {
                if (users[i].id == id) {
                    return users[i];
                }

            } catch (err) {
                console.error("Custom Error : No trainee in the array with that id", err);
                return;
            }
        }
        return null;
    }   

    generateCourseId(){
        return ++this.lastCourseId;
    }
1
    generateExamId(){
        return ++this.lastExamId;
    }

    getAdmins() {
        return this.admins;
    }

    addTraineeRequest(fullName) {
        console.log("Create a request for a trainee with the given name. Returns an integer.");
        Administrator.newAddTraineeRequest(this, fullName)
        return;
    }

    changeUserInfo(user, fullname=null,email=null, username=null, password=null) {
        console.log("Change the details for the user object passed in arguments. Returns nothing.");
        if (fullname !== null ){
            user.fullname = fullname;
        }
        if (email !== null){
            user.email = email;
        }
        if (username !== null){
            user.username = username;
        }
        if (password !== null){
            user.password = password;
        }
        return;
    }

    emailAdmin(message) {
        console.log("Send an email to administrators. Returns nothing.");
        return;
    }
    
    getUserByUsername(username){
        var users = this.getAllUsers();
        for (let i = 0; i < users.length; i++) {
            try {
                if (users[i].username == username) {
                    return users[i];
                }

            } catch (err) {
                console.error(err);
            }
        }
        return null;
    }   

    // Returns a list of all users in the registry
    getAllUsers() {
        var listOfUsers = [];
        for (let i = 0; i < this.trainees.length; i++) {
            listOfUsers.push(this.trainees[i]);
        }
        for (let i = 0; i < this.trainingManagers.length; i++) {
            listOfUsers.push(this.trainingManagers[i]);
        }
        for (let i = 0; i < this.admins.length; i++) {
            listOfUsers.push(this.admins[i]);
        }
        return listOfUsers;
    }

    async exportRegistry(name="exportedRegistry.json"){
        // This puts all the users into JSON format
        try { var obj = await JSON.stringify(this); } catch (err) { console.error("Custom Error : Something went wrong with the JSON.stringify", err); }
        // This creates a new file and writes the JSON to it
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(new Blob([obj], { type: "application/json" }));
        a.download = name;
        a.click();

        console.log("backup file exported successfully")
    }

    async importRegistry(path="scripts/SampleDataset.json"){
        let parsed;

        await fetch('./'+path)
        .then((response) => response.json())
        .then((json) =>parsed = json);
        
        let admins = [];
        for(let i=0; i<parsed.admins.length; i++){
            admins.push(new Administrator(parsed.admins[i].id, parsed.admins[i].fullname, parsed.admins[i].username, parsed.admins[i].password, parsed.admins[i].email));
        }

        let trainingManagers = [];
        for(let i=0; i<parsed.trainingManagers.length; i++){
            let newManager = new TrainingManager(parsed.trainingManagers[i].id, parsed.trainingManagers[i].fullname, parsed.trainingManagers[i].username, parsed.trainingManagers[i].password, parsed.trainingManagers[i].email)
            newManager.exams = parsed.trainingManagers[i].exams;
            newManager.unassignedTrainees = parsed.trainingManagers[i].unassignedTrainees;
            newManager.courses = parsed.trainingManagers[i].courses;
            trainingManagers.push(newManager);

        }

        window.sessionStorage.setItem('now', 789)

        let trainees = [];
        for(let i=0; i<parsed.trainees.length; i++){
            let trainee = parsed.trainees[i]
            let newTrainee = new Trainee(trainee.id, trainee.fullname, trainee.username, trainee.password, trainee.email)
            newTrainee.programme = trainee.programme;

            
            let examItems = []
            for(let j=0; j<trainee.exams.length; j++){
                let newItem = new ExamItem(trainee.exams[j].userId, trainee.exams[j].result, trainee.exams[j].examBase, [])
                for (let g=0; g<trainee.exams[j].answers.length; g++){
                    newItem.answers.push(new Answer(trainee.exams[j].answers[g].text, trainee.exams[j].answers[g].file));
                }
                examItems.push(newItem);
            }
            newTrainee.exams = examItems;

            var ongoingExams = [];
            for (let k = 0; k<trainee.ongoingExams.length; k++){
                let tmp = new ExamHandler(trainee.ongoingExams[k].examId)
                tmp.startTimestamp = trainee.ongoingExams[k].startTimestamp;
                ongoingExams.push(tmp)
            }
            newTrainee.ongoingExams = ongoingExams;

            trainees.push(newTrainee);
        }

        let courses = [];
        for(let i=0; i<parsed.courses.length; i++){
            let course = parsed.courses[i];
            let newCourse = new Course(course.trainingManager,course.id,course.name);
            newCourse.exams = course.exams;
            newCourse.trainees = course.trainees;
            newCourse.region = course.region;
            courses.push(newCourse);
        }

        let exams = []
        for(let i=0; i<parsed.exams.length; i++){
            let exam = parsed.exams[i];
            let newExam = new Exam(exam.id, exam.course, exam.duration.minutes, exam.duration.hours, exam.startTime, exam.examWeight);
            
            let examItems = []
            for(let j=0; j<exam.examItems.length; j++){

                let newItem = new ExamItem(exam.examItems[j].userId, exam.examItems[j].result, exam.examItems[j].examBase, [])
                for (let g=0; g<exam.examItems[j].answers.length; g++){
                    newItem.answers.push(new Answer(exam.examItems[j].answers[g].text, exam.examItems[j].answers[g].file));
                }
                examItems.push(newItem);
            }
            newExam.examItems = examItems;
            
            var questions = []
            for(let k=0; k<exam.questions.length; k++){
                questions.push(new Question(exam.questions[k].questionText, exam.questions[k].totalMarks));
            }
            newExam.questions = questions;


            newExam.isOver = exam.isOver;
            newExam.isVisible = exam.isVisible;

            exams.push(newExam);
        }

        this.admins = admins;
        this.trainingManagers = trainingManagers;
        this.trainees = trainees;
        this.courses = courses;
        this.lastUserId = parsed.lastUserId;
        this.lastCourseId = parsed.lastCourseId;
        this.lastExamId = parsed.lastExamId;
        this.exams = exams;
        console.log("new Regisrty records imported successfully")
        console.table(this)
    }

    async saveRegistry() {
        try {
          const json = JSON.stringify(this);
          window.sessionStorage.setItem('registry', json);
        } catch (err) {
          console.error("Custom Error : Something went wrong with the JSON.stringify", err);
        }
      }

    async loadRegistry(){

        let parsed = JSON.parse(window.sessionStorage.getItem('registry'));
        
        let admins = [];
        for(let i=0; i<parsed.admins.length; i++){
            admins.push(new Administrator(parsed.admins[i].id, parsed.admins[i].fullname, parsed.admins[i].username, parsed.admins[i].password, parsed.admins[i].email));
        }

        let trainingManagers = [];
        for(let i=0; i<parsed.trainingManagers.length; i++){
            let newManager = new TrainingManager(parsed.trainingManagers[i].id, parsed.trainingManagers[i].fullname, parsed.trainingManagers[i].username, parsed.trainingManagers[i].password, parsed.trainingManagers[i].email)
            newManager.exams = parsed.trainingManagers[i].exams;
            newManager.unassignedTrainees = parsed.trainingManagers[i].unassignedTrainees;
            newManager.courses = parsed.trainingManagers[i].courses;
            trainingManagers.push(newManager);

        }

        let trainees = [];
        for(let i=0; i<parsed.trainees.length; i++){
            let trainee = parsed.trainees[i]
            let newTrainee = new Trainee(trainee.id, trainee.fullname, trainee.username, trainee.password, trainee.email)
            newTrainee.programme = trainee.programme;

            let examItems = []
            
            for(let j=0; j<trainee.exams.length; j++){
                let newItem = new ExamItem(trainee.exams[j].userId, trainee.exams[j].result, trainee.exams[j].examBase, [])
                for (let g=0; g<trainee.exams[j].answers.length; g++){
                    newItem.answers.push(new Answer(trainee.exams[j].answers[g].text, trainee.exams[j].answers[g].file));
                }
                examItems.push(newItem);
            }
            newTrainee.exams = examItems;

            var ongoingExams = [];
            for (let k = 0; k<trainee.ongoingExams.length; k++){
                let tmp = new ExamHandler(trainee.ongoingExams[k].examId)
                tmp.startTimestamp = trainee.ongoingExams[k].startTimestamp;
                ongoingExams.push(tmp)
            }
            newTrainee.ongoingExams = ongoingExams;

            trainees.push(newTrainee);
        }

        let courses = [];
        for(let i=0; i<parsed.courses.length; i++){
            let course = parsed.courses[i];
            let newCourse = new Course(course.trainingManager,course.id,course.name);
            newCourse.exams = course.exams;
            newCourse.trainees = course.trainees;
            newCourse.region = course.region;
            courses.push(newCourse);
        }

        let exams = []
        for(let i=0; i<parsed.exams.length; i++){
            let exam = parsed.exams[i];
            let newExam = new Exam(exam.id, exam.course, exam.duration.minutes, exam.duration.hours, exam.startTime, exam.examWeight);
            
            let examItems = []
            for(let j=0; j<exam.examItems.length; j++){

                let newItem = new ExamItem(exam.examItems[j].userId, exam.examItems[j].result, exam.examItems[j].examBase, [])
                for (let g=0; g<exam.examItems[j].answers.length; g++){
                    newItem.answers.push(new Answer(exam.examItems[j].answers[g].text, exam.examItems[j].answers[g].file));
                }
                examItems.push(newItem);
            }
            newExam.examItems = examItems;
            
            var questions = []
            for(let k=0; k<exam.questions.length; k++){
                questions.push(new Question(exam.questions[k].questionText, exam.questions[k].totalMarks));
            }
            newExam.questions = questions;


            newExam.isOver = exam.isOver;
            newExam.isVisible = exam.isVisible;

            exams.push(newExam);
        }

        this.admins = admins;
        this.trainingManagers = trainingManagers;
        this.trainees = trainees;
        this.courses = courses;
        this.lastUserId = parsed.lastUserId;
        this.lastCourseId = parsed.lastCourseId;
        this.lastExamId = parsed.lastExamId;
        this.exams = exams;
        console.log("new Regisrty records loaded successfully") 
        console.table(this)
    }
}

new Registry();

export default Registry;