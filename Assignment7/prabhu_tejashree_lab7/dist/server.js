"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*-----Author:Tejashree Prabhu----References:CS546 Lecture 6 Codebase, CS546 Lecture 10 Codebase, cs554 lecture 11 codebase,stackoverflow-----*/
const app_1 = require("./app");
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});
