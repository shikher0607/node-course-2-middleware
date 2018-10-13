const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return  new Date().getFullYear();
});
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));  

app.use((req, res, next) => {
   var now = new Date().toString();
   var logData = 'Time is ' + now + '-' + 'Method is ' + req.method + '-' + 'Page is ' + req.url;
   console.log(logData);
   fs.appendFile('server.log.txt', logData + "\n", (err) =>{
       if (err) {
           console.log(err);
       }else{
        console.log('The "data to append" was appended to file!');
       }
   });
    next();
});

app.use((req, res) => {
   res.render('maintenance.hbs');
});

app.get('/', (req, res) => {
  //  res.send("<h1>Hello Express!</h1>");
  /*res.send({
      name: "Shikher",
      likes: [
          'Food',
          'TV'
      ],
      age: 24
  });*/
  res.render('home.hbs', {
      pageTitle: 'This is the Home',
      welcomeMessage: 'Hi!!! Welcome Here'
  })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errrorMessage: "Couldn't Find any thing!!!!"
    });
});

// app.get('/maintenance', (req, res) => {
//     res.render('maintenance.hbs', {
//         pageTitle : 'We Will Be Back Soon !!!!!!!'
//     })
// });

app.listen(3000, () => {
    console.log("Listening to port: 3000");
});