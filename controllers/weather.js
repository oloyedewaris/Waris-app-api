const request= require('request');

const weather= (req, res)=> {
    const api= {
        key: 'bf96fbc38fea2ad0fbdcb49eefa1ad6f',
        url: `http://api.openweathermap.org/data/2.5/`
    }
    request({
        url: `${api.url}weather?q=${req.body.input}&unit=metric&APPID=${api.key}`,
        json: true
    }, (error, response, body)=>{
        res.json(body);
    })
}

module.exports.weather= weather;