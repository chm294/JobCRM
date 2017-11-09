let express = require('express');
let app = express();
let path = require('path');
let pg = require('pg');
let bodyParser = require('body-parser');
// we import sequelize so we have a way to interact with our postgreSQL database
let Sequelize = require('sequelize');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(express.static(__dirname + '/../public'));

let sequelize = new Sequelize ({
dialect: 'postgres',
dialectOptions: {
  ssl: true
},
host: `ec2-23-21-220-23.compute-1.amazonaws.com`,
database: `d9kfc0g85kd1q0`,
username: `rddgghwbqbufnr`,
Port: 5432,
password: `a1a65f57d296c76218ce8910de929fa834823cb5d54a9aa4062f7b1f15db33bf`,
dialect : 'postgres'})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// var loggedInUserId = 0;
// // export to outer file for cleanliness

let User = sequelize.define('user', {
  user : {type : Sequelize.STRING, unique : true}
});

let RowEntry = sequelize.define('rowentry', {
  company: { type: Sequelize.STRING, defaultValue: "Enter Company Name" },
  location: { type: Sequelize.STRING, defaultValue: "Enter Location" },
  contact: { type: Sequelize.STRING, defaultValue: "Enter Contact Name" },
  notes: { type: Sequelize.TEXT, defaultValue: "Notes Go Here" },
  coverLetter: { type: Sequelize.BOOLEAN, defaultValue: false },
  resume: { type: Sequelize.BOOLEAN, defaultValue: false },
  firstInterview: { type: Sequelize.BOOLEAN, defaultValue: false },
  secondInterview: { type: Sequelize.BOOLEAN, defaultValue: false },
  offer: { type: Sequelize.BOOLEAN, defaultValue: false },
  rejected: { type: Sequelize.BOOLEAN, defaultValue: false },
  user_id: { type: Sequelize.INTEGER, defaultValue: null }
});

User.sync({ force: true }).then(() => {
  // Table created
  return User.create({
    user: 'example user'
  });
});


RowEntry.sync({ force: true }).then(() => {
  // Table created
  return RowEntry.create({
    company: 'example company',
    location: 'New York, NY',
    contact: 'tommy.york@gmail.com',
    notes: 'example info',
    coverLetter: true,
    resume: true,
    firstInterview: true,
    secondInterview: false,
    offer: false,
    rejected: false
  });
});


/* =========== ROUTES =============

DESC.ROUTE     METHOD    SQL ACTION
=======================================================
RECORDS     /records  get       find all  ---> prioritize
REC/SEARCH  /records  post      find some
UPDATE      /update   post      update / should update checkbox (true/false) fields on a row ----> prioritize
INSERT      /input   post      insert / should insert a new entries row ------> prioritize
LOGIN       /login    post      authentication / should allow us to set the user for all the records and such
SIGN UP     /signup   post      authentication / signup (currently just creates users, no signup)

==================================*/

app.post('/signup', (req, res)=> {
  let username = req.body.user;
  User.create({user : username})
  .then((user) => {
    loggedInUserId = user.id;
    res.send(`created a user ${username} + ${user.id} + ${loggedInUserId}`)
  })});

// app.get('/users', (req, res) =>{
//   User.findAll().then(users => {
//     res.send(users);
//   })
// })

app.post('/login', (req, res) => {
  User.findOne({
    where : {user : req.body.user}
  }).then(user => {
      loggedInUserId = user.id;
    res.send(200, user.id)
  })
})

app.get('/login', (req, res) => {
  res.send('app')
})

app.get('*', (req, res) => {
  //   res.send(__dirname + '..'+ 'public'+ 'index.html');
  res.redirect('/');
});

app.get('/input', (req, res) => {
  console.log(req.body);

  // RowEntry.create({
  //   company: 'B',
  //   location: '',
  //   contact: 'google CEO',
  //   notes: 'look up the actual info',
  //   coverLetter: true,
  //   resume: true,
  //   firstInterview: true,
  //   secondInterview: true,
  //   offer: true,
  //   rejected: false
  // });

  res.send('received some input');
})


/////////////////////////////////////INPUT PAGE SUBMIT
app.post('/input', (req, res) => {
  RowEntry.create(req.body)
  .then(()=>{res.send(201)})
})


app.get('/records', (req, res) => {
  User.findById(loggedInUserId)
  .then(user => {
    res.status(200)
    res.send(user)
  })

  // should return all records for an ID
})

app.post('/records', (req, res) => {
  // User.findById(loggedInUserId)
  //   .then(user => {
  //     res.status(201)
  //     res.send(user)
  //   })
  // should perform a search using req.body.searchKeyword or something like that
  console.log('request received')
  res.sendStatus(201)
})


app.post('/update', (req, res) => {
  console.log(req.body);
  res.send('ok');  // you _must_ close the stream. Send back anything.
})

app.listen(3001, () => {
  console.log('listening on port 3001')
})

module.exports = {
  app: app,
  User: User,
  RowEntry: RowEntry
};
