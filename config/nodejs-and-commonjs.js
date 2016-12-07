'use strict';

module.exports = {
  // require error handling in callbacks
  'handle-callback-err': 'error',

  // disallow require calls to be mixed with regular variable declarations
  'no-mixed-requires': 'error',

  // disallow new operators with calls to require
  'no-new-require': 'error'
};
