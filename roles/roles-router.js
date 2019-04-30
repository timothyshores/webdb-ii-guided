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
    db('roles')
        .then(roles => res.status(200).json(roles))
        .catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
    const message404 = { message: 'Role not found' }

    db('roles')
        .where({ id: req.params.id })
        .first()
        .then(role => {
            role === undefined
                ? res.status(404).json(message404)
                : res.status(200).json(role)
        })
        .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
    db('roles')
        .insert(req.body, 'id')
        .then(results => res.status(200).json(results))
        .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
    db('roles')
        .where({ id: req.params.id })
        .update(req.body)
        .then(count => {
            if (count > 0) {
                res.status(200).json({
                    message: `${count} ${count > 1 ? 'records' : 'record'} updated`,
                });
            } else {
                res.status(404).json({ message: 'Role does not exist' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    db('roles')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if (count > 0) {
                res.status(200).json({
                    message: `${count} ${count > 1 ? 'records' : 'record'} deleted`,
                });
            } else {
                res.status(404).json({ message: 'Role does not exist' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;
