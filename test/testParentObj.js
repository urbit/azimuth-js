'use strict';

var http = require('http');
http.post = require('http-post');

var globalFuncs = require('../scripts/globalFuncs');

const options = {
  hostname: 'localhost',
  port: 8545,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
};

var getEthCall = function (txobj, callback) {
    // var parentObj = this;
    if (!ethCallArr.calls.length) {
        ethCallArr.timer = setTimeout(function () {
            parentObj.rawPost(ethCallArr.calls, function (data) {
                ethCallArr.calls = [];
                var _callbacks = ethCallArr.callbacks.slice();
                ethCallArr.callbacks = [];
                for (var i in data) {
                    if (data[i].error) _callbacks[i]({ error: true, msg: data[i].error.message, data: '' });
                    else _callbacks[i]({ error: false, msg: '', data: data[i].result });
                }
            });
        }, 500);
    }
    ethCallArr.calls.push({ "id": parentObj.getRandomID(), "jsonrpc": "2.0", "method": "eth_call", "params": [{ to: txobj.to, data: txobj.data }, 'pending'] });
    ethCallArr.callbacks.push(callback);
}

var rawPost = function (data, callback) {
    console.log("RAWPOST");
    http.post(options, JSON.stringify(data), function(res) {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];

      let error;
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
                      `Expected application/json but received ${contentType}`);
      }
      if (error) {
        console.error(error.message);
        // consume response data to free up memory
        res.resume();
        return;
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          console.log(parsedData);
        } catch (e) {
          console.error(e.message);
        }
      });
    }).on('error', (e) => {
      console.error('Got error: ' + e.message);
    });
}

var getRandomID = function () {
    return globalFuncs.getRandomBytes(16).toString('hex');
}

var type = "ETH";

module.exports = {
  getEthCall: getEthCall,
  type: type,
  getRandomID: getRandomID,
  rawPost: rawPost
}