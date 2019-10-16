const Promise = require('bluebird');
const AWS = require('aws-sdk');

AWS.config.apiVersions = {
  s3: '2006-03-01'
};

module.exports = class S3 {
  constructor (params) {
    if (!params.endpoint) {
      throw new Error('The endpoint was not defined');
    }

    if (!params.accessKeyId) {
      throw new Error('The access key was not defined');
    }

    if (!params.secretAccessKey) {
      throw new Error('The secret key was not defined');
    }

    this.client = Promise.promisifyAll(new AWS.S3(params), { context: this.client, suffix: 'Fxd' });
  }

  get (key, bucket) {
    return this.client.getObjectFxd({
      Bucket: bucket,
      Key: key
    });
  }

  put (key, value, bucket) {
    return this.client.putObjectFxd({
      Body: value,
      Bucket: bucket,
      Key: key
    });
  }

  delete (key, bucket) {
    return this.client.deleteObjectFxd({
      Bucket: bucket,
      Key: key
    });
  }

  createBucket (name) {
    return this.client.createBucketFxd({
      Bucket: name,
      CreateBucketConfiguration: {
        LocationConstraint: this.getRegion()
      }
    });
  }

  deleteBucket (name) {
    return this.client.deleteBucketFxd({
      Bucket: name
    });
  }

  getRegion () {
    return this.client.config.endpoint.match(/\w\w-\w+-\d+/)[0];
  }
};
