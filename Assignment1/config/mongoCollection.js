/*-----Author:Tejashree Prabhu----References:CS546 Lecture 6 Codebase, CS546 Lecture 10 Codebase,stackoverflow-----*/

const dbConnection = require('./mongoConnection');
const getCollectionFn = (collection) => {
    let _col = undefined;

    return async () =>{
        if(!_col) {

            const db = await dbConnection();
            _col = await db.collection(collection);
        }

        return _col;
    };
};

module.exports = {
    movies: getCollectionFn('movies')
};