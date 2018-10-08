const orm = require(`../config/orm`);

const burger = {};


burger.all = (cb) => {
    orm.selectAll((burgers) => {
        burgers.forEach(burgers => {console.log(burgers.burger_name)});
        console.log(`-------------------------------------`);
        cb(burgers)
    });
};


module.exports = burger;