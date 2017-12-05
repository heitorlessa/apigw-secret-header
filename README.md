# apigw-secret-header

> **Demo only usage....!**

Creates HMAC out of a secret stored in SSM Parameter Store with input data it receives.

It requires a parameter to be present at SSM Parameter Store - Create one easily by running:

```bash
aws ssm put-parameter --name "/demo/hmac-shared-secret" --type "String" --value "<shared-secret>" --region us-east-1
```

Using it:

```javascript
const hmac = require('apigw-secret-header');
    hmac.sign(data (err, digest) => {
        if (err) cb(err, null);
        else {
            console.log("Computed Hash: ", digest);
            cb(null, digest)
        }
    });
```

