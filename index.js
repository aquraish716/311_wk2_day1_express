
const express = require('express');
const app = express();
const port = process.env.PORT || 4000


const { users } = require('./state')
const counter = users.length + 1;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/* BEGIN - create routes here */

//get request to return all users
app.get("/users", (req, res) => {
  return res.json(users)
})

//get the information of user selected
app.get("/users/:id", (req, res) => {
let id = req.params.id;
let find = users.find(users  => users._id === Number(id));
return res.json(find)
})

//post a new user not using body parser
// app.post("/users", (req, res) => {
// let newUser =  {
//     "_id" : 6,
//     "name" : "Ahmed Quraish",
//     "occupation" :  "Programmer",
//     "avatar" :  "https://upload.wikimedia.org/wikipedia/en/5/50/AhmedQuraish.jpg"
// }
//   users.push(newUser);
//   res.json(users);

// })

//created put statement to update a user based on id selected
app.put('/users/:id', (req, res) => {
  let id = req.params.id;
  let find = users.find(users  => users._id === Number(id));
  find.occupation = "Deleted!";
  res.json(users)
})

//delete user based on id selected, message if deleted or if user is not found and return the message.
app.delete('/users/:id/', (req, res) => {
  let id = req.params.id;
  let find = users.find(users  => users._id === Number(id));
  if(find){
    let object = users.filter(users => users._id === Number(id));
    users.splice(object[0]._id - 1, 1);
    res.send({msg:"User has now been deleted!"});
    
  }else{
    res.status(404).json({msg: `This user id, ${id}, is not found.`})
  }
  //users.shift();
  //users.unshift('Deleted');
  //res.json(users);
  
})

//post a new user using body parser and postman
app.post("/users", (req, res) => {
  let newUser = {
    _id: counter,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  };
  if(!newUser.name || !newUser.occupation || !newUser.avatar){
    return res.status(400).json({msg: 'Please include a name, age, and location'})
}
  users.push(newUser)
  res.json(users);
})
  


/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))