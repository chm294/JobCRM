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
    console.log('Connection to database has been established successfully.');
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

User.belongsTo(RowEntry, {as : 'mainRowEntry', constraints : false})
RowEntry.sync({ force: true }).then(() => {
  // Table created
  RowEntry.bulkCreate([{
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
  },{
    company: 'another example',
    location: 'Brooklyn, NY',
    contact: 'hipsterland@gmail.com',
    notes: 'more example info',
    coverLetter: false,
    resume: false,
    firstInterview: true,
    secondInterview: true,
    offer: true,
    rejected: false
  }]);
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

app.post('/login', (req, res) => {
  User.findOne({
    where : {user : req.body.user}
  }).then(user => {
      loggedInUserId = user.id;
    res.send(200, user.id)
  })
})

//There shouldn't be an app.get('/login'... path
// app.get('/login', (req, res) => {
//   res.send('app')
// })

app.get('/records', (req, res) => {
  RowEntry.findAll()
    .then((records) => {
      res.status(200)
      // console.log(records); --> see all the records you're returning.
      res.send(records)
    })
  // should return all records for an ID
})

// app.post('/records', (req, res) => {
//   User.findById(loggedInUserId)
//     .then(user => {
//       res.status(200)
//       res.send(user)
//     })

  // should perform a search using req.body.searchKeyword or something like that
// })

app.post('/update', (req, res) => {
  console.log(req.body);

  RowEntry.findOne({
    where: {
      id: req.body.id
    }
  }).then(results => {
    let stateUpdate = {};
    stateUpdate[req.body.stateName] = req.body.value;
    console.log(stateUpdate);
    results.update(stateUpdate)
    .then(() => {
      res.status(200)
      res.send(results)
    })
  })
  //res.send(req.body);  // you _must_ close the stream. Send back anything.
})

app.listen(3001, () => {
  console.log('listening on port 3001')
})

app.post('/login', (req, res)=> {
  console.log(req.body);
  let username = req.body.username;
  res.send('created a user')
})

app.get('/users', (req, res) =>{
  User.findAll().then(users => {
    res.send(users);
  })
})

app.post('/login', (req, res) => {
  User.findOne({
    where : {user : req.body.user}
  }).then(user => {
      loggedInUserId = user.id;
    res.send(200, user.id)
  })
})

app.post('/insert', (req, res) => {
  //console.log(req.body);
  console.log(req.body.coverLetter);
  RowEntry.create({
    company : req.body.companyValue,
    location : req.body.locationValue,
    contact : req.body.contactValue,
    notes : req.body.notesValue,
    coverLetter : req.body.coverLetter,
    resume : req.body.resume,
    firstInterview : req.body.firstInterview,
    secondInterview : req.body.secondInterview,
    offer : req.body.offer,
    rejected : req.body.rejected
  })
})

///////////////////
app.post('/deleteRecord', (req, res) => {
  console.log(req.body)
  RowEntry.findOne({
    where: {
      id: req.body.id
    }
  }).then(id => {
    console.log(id)
    id.destroy();
    res.status(201)
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })
})
//////////////////

app.post('/search', (req, res) => {
  console.log(req.body);
  RowEntry.findAll({
    where: {
      $or: [
        {company: {like: '%' + req.body.searchValue + '%'}},
        {location: { like: '%' + req.body.searchValue + '%'}},
        {contact: { like: '%' + req.body.searchValue + '%'}},
        {notes: {like: '%' + req.body.searchValue + '%'}}
      ]
    }
  })
  .then(results => {
    res.status(200)
    console.log(results);
    res.send(results)
  })
})

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, '../react-client/dist/', 'index.html'));
 });

app.listen(3002, () => {
  console.log('listening on port 3001')
})

module.exports = {
  app: app,
  User: User,
  RowEntry: RowEntry
};
