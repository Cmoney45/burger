const express = require(`express`);
const burger = require(`../models/burger`);
const router = express.Router();

router.get('/', (req, res) => {
    burger.all(data => {
        let hbsObject = {
            burgers: data
        };
        // console.log(hbsObject);
        res.render("index", hbsObject);
    })
})

router.post(`/api/burgers`, (req, res) => {
    burger.create(
        [
            `burger_name`, `devoured`, `burger_pic`
        ],
        [
            req.body.name, req.body.devoured, req.body.picture
        ], 
        (result) => {
            res.json({ id: result.insertId });
        });
});

router.put('/api/burgers/:id', (req, res) => {
    const condtion = `id = ${req.params.id}`;
    console.log(`condition:${condtion}`);

    burger.update({
        devoured: req.body.devoured
    }, condtion, result => {
        if (result.changedRows == 0) {
            return res.status(404), end();
        } else {
            res.status(200).end();
        };
    });
});

router.delete('/api/burgers/:id', (req, res) => {
    const deletCondition = `id = ${req.params.id}`
    console.log(`condition:${deletCondition}`);

    burger.delete(deletCondition, result => {
        if(result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        };
    });
});

module.exports = router;