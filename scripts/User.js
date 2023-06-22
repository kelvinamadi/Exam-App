
import Registry from './Registry.js';

class User{
    email;
    constructor(id, fullname, username, password, email=null) {
        // const { Registry } = require('./Registry.js');
        // Prevents the class from being called directly
        if (new.target === User) {
            throw new TypeError("Cannot instantiate abstract class User");
        }
        // Change to generateUserId once implemented in Registry
        this.email = email;
        this.id = id;
        this.fullname = fullname;
        // Following line uses Regex to remove all whitespace
        // username = username.replace(/\s+/g, ''); // Alireza: I think this is not needed as the username is passed in the right format from Registry
        this.username = username;
        this.password = password;
    }

    registerEmail(email){
        this.email = email; 
        return;
    }

    changeUserInfo(user, fullname, email, username, password) {
        Registry.instance.changeUserInfo(user, fullname, email, username, password)
        return;
    }

    getUserId() {
        return this.id;
    }
}


// module.exports = {User: User};
export default User;

// // Creates 2 new users
// let x = new User("John Smith", "jsmith", "Apple123");
// console.log(x);
// let y = new User("John Doe", "johnDoe", "Apple123");
// console.log(y);

// // Register an email for the user
// x.registerEmail("example@example.com");
// console.log("Register email");
// console.log(x);

// // Change the info for one of the users
// x.changeUserInfo("test@test.com", "", "");
// console.log("Change email");
// console.log(x);
// x.changeUserInfo("", "HUmbridge", "");
// console.log("Change username");
// console.log(x);
// x.changeUserInfo("", "", "Orange123");
// console.log("Change password");
// console.log(x);