import Registry from "./Registry.js";

await Registry.instance.loadRegistry();

var text = document.getElementById("text");

var button = document.getElementById("button")
button.addEventListener("click", show);

function show(){
    var report = "";
    var examQ = [Registry.instance.getExamById(1).questions[0], Registry.instance.getExamById(1).questions[1]];
    console.log(Registry.instance.getUserById(6))
    var examA = [Registry.instance.getUserById(6).exams[0].answers[0].text, Registry.instance.getUserById(6).exams[0].answers[1].text]
    console.log(examA)
    var user = Registry.instance.getUserById(6)

    var report = report + "Progress Report for the following Trainee:\nName: " + user.fullname + "\nUsername: " + user.username + "\nEmail: " + user.email + "\nCourse: " + "Sample Course" + "\n\n\n\n"
    for (let i=0;i<examQ.length;i++){
        report = report + "Question "+ (i+1) + ": " + examQ[i].questionText + " (" + examQ[i].totalMarks + " marks)\n\nAnswer:" + examA[i] + "\n\nresult: (4/5)\n\n\n";
    }
    
    text.value = report + "\nTotal marks: 8/10"
}
    