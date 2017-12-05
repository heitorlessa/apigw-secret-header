'use strict';

const crypto = require('crypto');
const config = require('./config.js')
const AWS = require('aws-sdk');

AWS.config.update({ region: config.aws_region });
const SSM = new AWS.SSM();

// Retrieves shared secret from SSM Parameter store and returns Parameter (map) if successful
const getSecret = (callback) => {
    let params = {
        Name: config.ssm_parameter
    }

    let shared_secret = SSM.getParameter(params, function (err, data) {
        if (err) callback(err, null);
        else callback(null, data);
    });
}

module.exports = {
    // HMAC Hex out of given data using shared secret
    sign: (data, callback) => {
        getSecret(function (err, secret) {
            if (err) {
                callback(err, null);
            } else {
                let hash = crypto.createHmac('sha512', secret.Parameter.Value)
                    .update(data)
                    .digest('hex')
                callback(null, hash);
            }
        })
    }
}

