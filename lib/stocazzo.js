var request =  require('request');

module.exports = (function(request) {
  var URL = "http://stocazzo.io/";

  var wrapper = function(method, route, query, cb) {
    var obj = {
      method: method,
      url: URL+route,
      json: true
    };
    if (typeof query !== "function") {
      obj.form = { q: query };
    } else {
      cb = query;
    }
    request(obj, function (err, res, body) {
      if(!err) {
        cb(null, body);
      } else {
        cb(err, res.statusCode);
      }
    });
  };


  return {
    /**
     * '/' Will return a "stocazzo".
     */
    get: function(cb) {
      wrapper('GET', '', cb);
    },

    /**
     * '/caps' Will return a 'stocazzo', but caps. So, "STOCAZZO".
     */
    caps: function(cb) {
      wrapper('GET', 'caps', cb);
    },

    /**
     * '/camel' Camelcase can always be useful. Will return a "StoCazzo".
     */
    camel: function(cb) {
      wrapper('GET', 'camel', cb);
    },

    /**
     * '/ascii' You want a translation in your language and you don't like text
     *          or you want print it more nerdly?
     *          No problem, will return "8====D".
     */
    ascii: function(cb) {
      wrapper('GET', 'ascii', cb);
    },

    /**
     * '/:query' Will return a JSON-form response with your query as a question
     *          and "stocazzo" as the answer.
     */
    query: function(query, cb) {
      wrapper('get', '', query, cb);
    },

    /**
     * '/caps/:query' Will return a JSON-form response with your query as a
     *                question and "stocazzo" as the answer. But caps-locked.
     */
    bigQuery: function(query, cb) {
      wrapper('get', 'caps', query, cb);
    }
  };
}(request));
