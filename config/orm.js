const connection = require(`./connection`);

const orm = {};

//Method for selecting all items from DB
orm.selectAll = (cb) => {
    const query = `SELECT * FROM burgers`;

    connection.query(query, (err, res) => {
        if (err) throw err;

        cb(res);
    });
};

//Method to the ORM to add a burger
orm.insertOne = (cb) => {
    const query = ``;

    connection.query(query, (err, res) => {
        if (err) throw err;

        cb(res);
    });
};

// Method to update a single entry
orm.updateOne = (cb) => {
    const query = ``;

    connection.query(query, (err, res) => {
        if (err) throw err;

        cb(res);
    });
};


module.exports = orm;