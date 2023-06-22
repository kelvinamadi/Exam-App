import Registry from "./Registry.js";
import Answer from "./Answer.js";

var registry = Registry.instance;
await registry.loadRegistry()
var trainee = registry.getUserById(6);
var exam = registry.getExamById(1);
var examItem = trainee.exams[0];

if(examItem.answers.length > 0){
    if (examItem.answers[0]){
        document.getElementById('q1').value = examItem.answers[0].text;
    }
    else{
        document.getElementById('q1').value = ""
    }
    if (examItem.answers[1]){
        document.getElementById('q2').value = examItem.answers[1].text;
    }
    else{
        document.getElementById('q2').value = ""
    }
}



var save = document.getElementById("save");
var submit = document.getElementById("submit");
save.addEventListener('click', saveAnswers);
submit.addEventListener('click', submitAnswers);

function saveAnswers(){
    examItem.answers = [false, false]
    if (document.getElementById('q1').value.length > 1){
        examItem.answers[0] = new Answer(document.getElementById('q1').value, "")
    }
    if (document.getElementById('q2').value.length > 1){
        examItem.answers[1] = new Answer(document.getElementById('q2').value, "")
    }
    registry.saveRegistry();
    window.location = "./traineeMainMenu.html"
}

function submitAnswers(){
    examItem.answers = [false, false]
    if (document.getElementById('q1').value.length > 1){
        examItem.answers[0] = new Answer(document.getElementById('q1').value, "")
    }
    if (document.getElementById('q2').value.length > 1){
        examItem.answers[1] = new Answer(document.getElementById('q2').value, "")
    }
    exam.isOver = true;
    trainee.ongoingExams = [];
    registry.saveRegistry()
    window.location = "./traineeMainMenu.html"
}

