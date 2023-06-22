import Administrator from "./Administrator.js";
import Registry from "./Registry.js";
import Trainee from "./Trainee.js";
import TrainingManager from "./TrainingManager.js";


if (window.sessionStorage.getItem('registry')){
    Registry.instance.loadRegistry();
}
else{
    await Registry.instance.importRegistry();
}


class GuestSession {
    registryInstance;
    constructor(registryInstance) {

        this.registryInstance = registryInstance;

        async function verifyLogin(username, password) {
            const existingUser = Registry.instance.getUserByUsername(username);

            if (existingUser != null) {
                if (existingUser.password === password) {
                    window.sessionStorage.setItem('userId', existingUser.id)
                    window.sessionStorage.setItem('isLogged', true)
                    console.log("username ", username, " with password: ", password, " validated.");
                    await Registry.instance.saveRegistry()
                    window.location.href = "index.html";
                    return;
                }
            }
            window.alert("We could not validate the given username and password.")
        }

        async function handleLogin(e) {
            e.preventDefault(); // prevent the form from submitting
            const username = document.getElementById('username').value; // get the value of the name input field
            const password = document.getElementById('password').value; // get the value of the email input field
            await verifyLogin(username, password);
        }

        const loginForm = document.getElementById('login-form'); // get the form element by ID
        loginForm.addEventListener('submit', handleLogin); // attach the function to the form's submit event
    }

    requestChangePassword(email) {
        console.log("UserSession: requestChangePassword");
        return;
    }

    emailAdmin(message) {
        console.log("UserSession: emailAdmin");
        return;
    }
}

let isLogged = JSON.parse(sessionStorage.getItem('isLogged'));

if (isLogged) {

    var user = Registry.instance.getUserById(parseInt(sessionStorage.getItem('userId')));

    if (user.constructor === Administrator) {
        await Registry.instance.saveRegistry()
        window.location = './adminMainMenu.html';
    }
    else if (user.constructor === Trainee) {
        await Registry.instance.saveRegistry()
        window.location = './traineeMainMenu.html';
    }
    else if (user.constructor === TrainingManager) {
        await Registry.instance.saveRegistry()
        window.location = './managerMainMenu.html';
    }
    else {
        console.error("invalid session user")
    }
}

else {
    new GuestSession(new Registry());
}

// print user credentials for testing
console.table(Registry.instance.getAllUsers())

