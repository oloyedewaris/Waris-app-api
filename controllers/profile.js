const profileHandler= (req, res, db)=> {
    let found= false;
    db/select('*').from('users').where({id: id})
    .then(user=> {
        if(user.length) {
            res.json(user[0])
        } else {
            res.json(user[0])
        }
    })    
}

module.exports= profileHandler;