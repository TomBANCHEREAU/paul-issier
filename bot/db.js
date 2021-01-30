const JSONdb = require('simple-json-db')


module.exports.start = async ()=>{
  return new JSONdb('../database.json')
}
