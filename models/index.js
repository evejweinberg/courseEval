const low = require('lowdb');
const uuidV4 = require('uuid/v4');

const db = low('db.json');


module.exports = collection => data => ({
            save: (cb) => {
                data.id = uuidV4();
                db.get(collection).push(data).write();
                cb();
            },
            findAll: (cb) => {
                const d = db.get(collection);
                cb(null, d);
            },
        });

