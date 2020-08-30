const { tokenize } = require('./tokenize');
const { parser } = require('./parser');

module.exports = function(json) {
    return parser(tokenize(json));
}