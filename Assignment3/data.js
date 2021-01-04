

var exports = module.exports = {};

const axios = require('axios');

(async () => {
  try {
    const response = await axios.get('http://api.tvmaze.com/shows')
    console.log(response.data.url);
    console.log(response.data.explanation);
  } catch (error) {
    console.log(error.response.body);
  }
})();



exports.getById = function(id) {
    if (id === null || id === undefined)
        return Promise.reject('You must provide id!');
    if (typeof(id) !== 'number' || isNaN(id) || id < 0)
        return Promise.reject('Invalid value for id!');

    let shows =response.data
    let show = null
    for (let i = 0; i < shows.length; i++) {
        if (shows[i]['id'] == id) {
            show = shows[i];
            break;
        }
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (show) {
                resolve(show);
            } else {
                reject({ error: 'Show Not Found' });
            }
        }, 5000);
    });
};

