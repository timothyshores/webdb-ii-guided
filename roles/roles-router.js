const knex = require('knex');
const router = require('express').Router();

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/rolex.db3'
    },
    useNullAsDefault: true
};
const db = knex(knexConfig);

router.get('/', (req, res) => {
    // return all roles from the database
    db('roles')
        .then(roles => res.status(200).json(roles))
        .catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
    // retrieve a role by id
    db('roles')
        .where({ id: req.params.id })
        .then(role => res.status(200).json(role[0]))
        .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
    // add a role to the database
    db('roles')
        .insert(req.body, 'id')
        .then(results => res.status(200).json(results))
        .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
    // update roles
    res.send('Write code to modify a role');
});

router.delete('/:id', (req, res) => {
    // remove roles (inactivate the role)
    res.send('Write code to remove a role');
});

module.exports = router;
