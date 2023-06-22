

class ExamItem {
    userId;
    result;
    examBase; // type: Exam
    answers = []; // List<Answers>

    constructor(userId, result, examBase, answers = []) {
        this.userId = userId;
        this.result = result;
        this.examBase = examBase;
        this.answers = [];
    }

    getResult() {
        console.log("This takes no arguements, and will return the result the trainnee got on the exam");
        return this.result;
    }

    isOpen() {
        console.log("This takes no arguements and will return a boolean about whether the exam isOpen or not");
        return this.examBase.isVisible;
    }

    getStartTime() {
        console.log("This takes no arguements and will return the start time for the exam");
        return this.examBase.startTime;
    }

    addAnswer(index, answer) {
        console.log("This takes the index of type number, and the answer of type answer and will add the answer to the examItem");
        return;
    }
}

export default ExamItem
