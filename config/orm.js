const connection = require(`./connection`);

const orm = {};

// Method for creating multipl condition values 
    // If it has 2 conditions allows below methos to do (?, ?)
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
            // if string with spaces, add quotations (Mushroom Swiss => 'Mushroom Swiss')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = `'${value}'`;
            }
            // e.g. {name: 'Mushroom Swiss'} => ["name='Mushroom Swiss'"]
            // e.g. {devoured: true} => ["devoured=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// Method for selecting all items from DB
orm.selectAll = (table, cb) => {
    const query = `SELECT * FROM ${table}`;

    connection.query(query, (selectAllErr, selectAllRes) => {
        if (selectAllErr) throw selectAllErr;

        cb(selectAllRes);
    });
};

// Method to the ORM to add a burger
orm.create = (table, columns, values, cb) => {
    const query = `INSERT INTO ${table} (${columns.toString()}) 
    VALUES (${orm.createQuestionMarkValues(values.length)})`;
    console.log(query);
    connection.query(query, values, (createError, createRes) => {
        if (createError) throw createError;

        cb(createRes);
    });
};

// Method to update a single entry
orm.updateOne = (table, objectValues, condition, cb) => {
    const query = `UPDATE ${table}
            SET ${orm.objectToSqlValues(objectValues)}
            WHERE ${condition}`;
    console.log(query);
    connection.query(query, (updateError, updateRes) => {
        if (updateError) throw updateError;

        cb(updateRes);
    });
};

// Method to delete a single entry

orm.delete = (table, condition, cb) => {
    const query = `DELETE FROM ${table} WHERE ${condition}`

    connection.query(query, function(delError, result) {
        if (delError) throw delError;

        cb(result)
    })
}


module.exports = orm;