// const { User } = require('./User.js');
import User from './User.js';
import Registry from './Registry.js';


class Request{
    constructor(trainingManager, fullName){
        this.trainingManager = trainingManager
        this.fullName = fullName
    }

    approve(){
        var newTrainee = Registry.instance.createUser(this.fullName, 't');
        this.trainingManager.unassignedTrainees.push(newTrainee)
    }

    deny(){
        // To Do
    }
}

class Administrator extends User {
    static requests = [];

    createUser(fullName, userType) {
        return Registry.instance.createUser(fullName, userType);
    }

    // Searches through the entire trainingManager array within the registry and removes the user with the given username
    removeTrainingManager(username) {
        for (let i = 0; i < Registry.instance.trainingManagers.length; i++) {
            const currentIndex = Registry.instance.trainingManagers[i];
            if (Registry.instance.trainingManagers[i].username == username) {
                Registry.instance.trainingManagers.splice(i, 1);
            }
        }
        return;
    }

    // Searches through the entire trainee array within the registry and removes the user with the given username
    removeTrainee(username) {
        for (let i = 0; i < Registry.instance.trainees.length; i++) {
            const currentIndex = Registry.instance.trainees[i];
            if (Registry.instance.trainees[i].username == username) {
                Registry.instance.trainees.splice(i, 1);
            }
        }
        return;
    }

    static addTraineeRequest(trainingManager, fullName){
        Administrator.requests.push(new Request(trainingManager, fullName))
    }

    async createBackup() {
        let currentDate = new Date();
        Registry.instance.exportRegistry("Backup-" + currentDate.getUTCDate() + "_" + (currentDate.getUTCMonth() + 1) + "_" + currentDate.getUTCFullYear() + "_" + currentDate.getUTCHours() + ":" + currentDate.getUTCMinutes() + ".json")
        return;
    }

    viewUsers(){
        return Registry.instance.getAllUsers();
    }
}


// module.exports = {Administrator: Administrator};
export default Administrator;


