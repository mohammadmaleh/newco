var mongoose = require('mongoose');

mongoose.Promise = global.Promise ; // to make mongoose works with promises by default it works with callbacks
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI  );
module.exports = mongoose