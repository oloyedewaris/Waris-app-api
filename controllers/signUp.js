const signUpHandler= (req, res, db, bcrypt)=> {
    const {email, name, password}= req.body;
    if (!email || !password || !name) {
        return res.json('empty credentials')
    } else if (!email.includes('@')) {
        return res.json('email error')
    } else if(password.length < 6) {
        return res.json('password error')
    } else {
        const hash= bcrypt.hashSync(password)
    db.transaction(trx=> {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then( loginEmail=> {
            return trx('users')
            .returning('*')
            .insert({
                name: name,
                email: loginEmail[0],
                joined: new Date()
            })
            .then(user=> res.json(user[0]))
            .catch(err=> res.json('unable to register').status(400))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(error=> res.status(400).json('unable to register'))
    }
}

module.exports.signUpHandler= signUpHandler;