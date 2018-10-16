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
  client.end()
})



