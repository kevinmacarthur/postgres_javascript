
const settings = require("./settings"); // settings.json

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


const arg = process.argv[2]

function findName (name, callback){
  if (!name) {
    console.log("Please enter a First or Last name to search by")
    knex.destroy()
    process.exit()
  }
  knex.select().from('famous_people')
    .where('first_name', '=', name)
    .orWhere('last_name', '=', name)
    .asCallback((err, result) => {
      if (err) {
        return console.error("Something went wrong", err);
      } else {
        callback(err, result)
      }
    });
};

function formatResults(data) {
  console.log(`Searching ... \n Found ${data.length} by the name '${arg}' :`)
  data.forEach(function(result, index) {
    let dobstring = result.birthdate.toString()
    let dob = dobstring.slice(4,16)
    console.log(`- ${index+1} : ${result.first_name} ${result.last_name}, born ${dob}` )
  })
}

findName(arg, function(err, result) {
  formatResults(result)
  knex.destroy()
})
