const { Registry } = require('../scripts/Registry.js');

var x = new Registry();
x.createUser("name0", 'a');
x.createUser("name1", 'a');
x.createUser("name2", 'm');
x.createUser("name3", 'm');
x.createUser("name4", 't');
x.createUser("name5", 't');
console.log(x.admins);
console.log(x.trainingManagers);
console.log(x.trainees);
  
x.removeUser(x.trainees[0])
x.removeUser(x.admins[0])
console.log(x.admins);
console.log(x.trainees);