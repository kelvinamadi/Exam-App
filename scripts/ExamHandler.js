

class ExamHandler {
    examId;
    startTimestamp;

    constructor(examId){
        this.examId = examId
        this.startTimestamp = new Date().getTime();
        console.log("linux timestamp: ", this.startTimestamp);
    }
    handleExamSession(exam) {
        console.log("controls the exam session currently in use");
    }
    uploadFile(filePath) {
        console.log("takes a filepath to upload a file");
    }
    submit() {
        ("allows user to submit an exam");
    }
    submitBackup(path) {
        ("allows user to submit a backup file of the exam");
    }
}

export default ExamHandler;