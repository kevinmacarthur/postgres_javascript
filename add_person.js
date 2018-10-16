const settings = require("./settings"); // settings.json

const firstName = process.argv[2]
const lastName = process.argv[3]
const dob = process.argv[4]

const options = {
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
};

var knex = require('knex')(options);

function addPerson (firstName, lastName, dob){
  knex('famous_people')
  .insert({
        first_name: firstName,
        last_name: lastName,
        birthdate: dob
      })
  .finally(() => {
        knex.destroy()
      });
}

addPerson(firstName, lastName, dob)
