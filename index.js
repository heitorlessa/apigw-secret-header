'use strict';

const config = {
    ssm_parameter: "/demo/hmac-shared-secret" || process.env.SSM_PARAMETER,
    aws_region: "us-east-1" || process.env.AWS_REGION
}

const crypto = require('crypto');
const AWS = require('aws-sdk');
AWS.config.update({ region: config.aws_region });
const SSM = new AWS.SSM();

// Retrieves shared secret from SSM Parameter store and returns Parameter (map) if successful
const getSecret = (callback) => {
    let params = {
        Name: config.ssm_parameter
    }

    SSM.getParameter(params, function (err, data) {
        if (err) callback(err, null);
        else callback(null, data.Parameter.Value);
    });
}

module.exports = {
    // HMAC Hex out of given data using shared secret
    sign: (data, callback) => {
        getSecret(function (err, secret) {
            if (err) {
                callback(err, null);
            } else {
                let hash = crypto.createHmac('sha512', secret)
                    .update(data)
                    .digest('hex')
                callback(null, hash);
            }
        })
    }
}

