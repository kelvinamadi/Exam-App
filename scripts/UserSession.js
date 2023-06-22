import Administrator from "./Administrator.js";
import Registry from "./Registry.js";
import Trainee from "./Trainee.js";
import TrainingManager from "./TrainingManager.js";

if (window.sessionStorage.getItem('registry')){
    await Registry.instance.loadRegistry();

}

class UserSession {
    registryInstance;
    userInstance;

    constructor(registryInstance, userInstance) {
        this.registryInstance = registryInstance;
        this.userInstance = userInstance;

        if (user.constructor === Administrator) {
            console.log("implementing respective event listeners for Admin")
            // add event listeners

            const logout = document.getElementById('logout'); 
            logout.addEventListener('click', this.logout);
            
            let backupLink = document.getElementById('backup-link');
            backupLink.addEventListener('click', (event) => {
                event.preventDefault();
                let currentDate = new Date();
                Registry.instance.exportRegistry("Backup-" + currentDate.getUTCDate() + "_" + (currentDate.getUTCMonth() + 1) + "_" + currentDate.getUTCFullYear() + "_" + currentDate.getUTCHours() + ":" + currentDate.getUTCMinutes() + ".json")
            })
        }
        else if (user.constructor === Trainee) {
            console.log("implementing respective event listeners for Trainee")
            // add event listeners

            let chooseExam = document.getElementById('chooseCourse');
            chooseExam.addEventListener('click', (event) => {
                event.preventDefault();
                this.userInstance.checkUpcomingExams();
                if (this.userInstance.ongoingExams.length < 1){
                    window.alert("There are no active exams on your account.")
                    return;
                }
                let message = "Which exam do you want to start attempt for? Enter only the number:\n\n1- course: sample course name";
                let exam = prompt(message);
                if (exam == null){
                    return;
                }
                else if (exam != '1'){
                    return
                }
                console.log(exam)
                Registry.instance.saveRegistry();
                window.location.href="/takeExam.html";
            })

            
            const logout = document.getElementById('logout'); 
            logout.addEventListener('click', this.logout); 

        }
        else if (user.constructor === TrainingManager) {
            console.log("implementing respective event listeners for TrainingManager")
            // add event listeners
            
            const logout = document.getElementById('logout'); 
            logout.addEventListener('click', this.logout); 

        }
        else {
            console.error("invalid session user")
        }
    }

    async logout() {
        console.log('logging out')
        window.sessionStorage.setItem('isLogged', false);
        await Registry.instance.saveRegistry()
        window.location = './index.html'
        return;
    }

}

let isLogged = JSON.parse(sessionStorage.getItem('isLogged'));

if (isLogged == true){
    var user = Registry.instance.getUserById(parseInt(sessionStorage.getItem('userId')));
    new UserSession(Registry.instance, user)
}

else {
    await Registry.instance.saveRegistry()
    window.location = "./index.html"
}

