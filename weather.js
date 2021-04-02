const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', (req, res)=> {
  res.sendFile(__dirname +'/index.html')
});

app.post('/', (req, res)=>{
 const query =  req.body.cityName;
const appkey = "jdjasda";
const unit = "imperial";
const url ='https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+appkey+'&units='+ unit;

https.get(url, (respond)=>{
    respond.on('data', (data)=>{
       const weatherData = JSON.parse(data);
       const temp = weatherData.main.temp;
       const icon = weatherData.weather[0].icon;
      
        const weatherDescription = weatherData.weather[0].description;
        const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

        res.write("<h1>The temperature in "+query+ " is "+ temp + " degrees farenheit. </h1>");
        res.write( "<p> It is  "+ weatherDescription + " in "+ query+"</p>");
        res.write("<img src=" + imageURL+">");
        res.send();
        
    });
})

})


app.listen(3000, 'localhost', ()=> {
    console.log('server is listening on port 3000.');
})