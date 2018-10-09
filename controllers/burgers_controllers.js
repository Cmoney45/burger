const express = require(`express`);
const burger = require(`../models/burger`);

const router = express.Router();

router.get(`/`, function (req, res) {
    burger.all(function (data) {
        let hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    })
})

router.post(`/api/burgers`, function (req, res) {
    burger.create(
        [
            `burger_name`, `devoured`
        ],
        [
            req.body.name, req.body.devoured
        ], function (result) {
            res.json({ id: result.insertId })
        })
});

router.put(`/api/burgers/:id`, function (req, res) {
    let condtion = `id = ${req.params.id}`;
    console.log(`condition:${condtion}`);

    burger.update({
        devoured: req.body.devoured
    }, condtion, function (result) {
        if (result.changedRows == 0) {
            return res.status(404), end();
        } else {
            res.status(200).end();
        };
    });
});


module.exports = router;