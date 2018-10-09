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
    orm.create(burger.tableName, columns, values, function(res) {
        cb(res);
    });
};

burger.update = (objectValues, condition, cb) => {
    orm.updateOne(burger.tableName, objectValues, condition, function(res) {
        cb(res);
    })
}


module.exports = burger;