const orm = require(`../config/orm`);

const burger = {};

burger.tableName = "burgers";

burger.all = (cb) => {
    orm.selectAll(burger.tableName, burgers => {
        burgers.forEach(burgers => {});
        cb(burgers)
    });
};

burger.create = (columns, values, cb) => {
    orm.create(burger.tableName, columns, values, function(createRes) {
        cb(createRes);
    });
};

burger.update = (objectValues, condition, cb) => {
    orm.updateOne(burger.tableName, objectValues, condition, function(updateRes) {
        cb(updateRes);
    })
}

burger.delete = (condition, cb) => {
    orm.delete(burger.tableName, condition, function(deleteRes) {
        cb(deleteRes)
    })
}

module.exports = burger;