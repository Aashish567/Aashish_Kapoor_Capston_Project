const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/capston_new')
  .then(() => console.log('Connected!'))
  .catch((err)=>console.log('Error',err))

  const Schema = mongoose.Schema;
 
  const newSchema = new Schema({

  title: String,
  quantity: Number,
  totalPrice: String,
  phone: Number,
  firstName: String,
  lastName: String,
  email: String,
  address: String

  });

  const Order = mongoose.model('Order', newSchema);

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.json());

//const myname = "Aashish Kapoor";

app.post('/cart', (req, res) => {

    const newResult = new Order({

         //name: myname,
        title: req.body.title,
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice,
        phone: req.body.phone,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address

    });

    newResult.save();
    res.send(console.log("data inserted successfully!!..."));
    
  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})