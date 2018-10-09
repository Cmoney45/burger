const connection = require(`./connection`);

const orm = {};

orm.createQuestionMarkValues = (number) => {
    let arr = [];

    for(let i = 1; i <= number; i++) {
        arr.push(`?`);
    };

    return arr.toString();
};

orm.objectToSqlValues = (object) => {
    let arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (let key in object) {
        let value = object[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(object, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

//Method for selecting all items from DB
orm.selectAll = (table, cb) => {
    const query = `SELECT * FROM ${table}`;

    connection.query(query, (err, res) => {
        if (err) throw err;

        cb(res);
    });
};

//Method to the ORM to add a burger
orm.create = (table, columns, values, cb) => {
    const query = `INSERT INTO ${table} (${columns.toString()}) 
    VALUES (${orm.createQuestionMarkValues(values.length)})`;
    console.log(query);
    connection.query(query, values, (err, res) => {
        if (err) throw err;

        cb(res);
    });
};

// Method to update a single entry
orm.updateOne = (table, objectValues, condition, cb) => {
    const query = `UPDATE ${table}
            SET ${orm.objectToSqlValues(objectValues)}
            WHERE ${condition}`;
    console.log(query);
    connection.query(query, (err, res) => {
        if (err) throw err;

        cb(res);
    });
};


module.exports = orm;