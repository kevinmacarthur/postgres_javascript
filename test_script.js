const pg = require("pg");
const settings = require("./settings"); // settings.json

const arg = process.argv[2]
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


// console.log(client)
client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
});


function findName (name, callback){
  client.query(`SELECT * from famous_people where first_name=$1::text OR last_name=$1::text`, [name], (err, result) => {
    if (err) {
      return console.error("Something went wrong", err);
    } else {
      callback(err, result.rows)
    }
  });
};

findName(arg, function(err, result) {

  //This is all data formating
  console.log(`Searching ... \n Found ${result.length} by the name '${arg}' :`)
  result.forEach(function(result) {
    let dobstring = result.birthdate.toString()
    let dob = dobstring.slice(4,16)
    console.log(`- ${result.id} : ${result.first_name} ${result.last_name}, born ${dob}` )
  })
  client.end()
})



