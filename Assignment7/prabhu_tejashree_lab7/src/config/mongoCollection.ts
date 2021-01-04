/*-----Author:Tejashree Prabhu----References:CS546 Lecture 6 Codebase, CS546 Lecture 10 Codebase, cs554 lecture 11 codebase,stackoverflow-----*/
import {dbConnection} from "./mongoConnection";

let getCollectionFn:any = (collection: any) => {
    let _col:String = undefined;

    return async () =>{
        if(!_col) {

            let db: any = await dbConnection();
            _col = await db.collection(collection);
        }

        return _col;
    };
};

export default { moviesCollection: getCollectionFn('movies')};