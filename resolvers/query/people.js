const axios = require('axios');

module.exports = async (root, args, context) => {
  return await axios.get(`https://swapi.co/api/people/${args.id}`)
  .then(response => {
    return response.data;
  });
}