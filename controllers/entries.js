const entriesHandler= (req, res, db)=> {
    const {id}= req.body;
    db('users').where('id', '=', id)
    .increment('entries')
    .then(entries=> res.json(entries[0]))
    .catch(err=> res.json('unable to get count').status(400))
}

module.exports= entriesHandler;