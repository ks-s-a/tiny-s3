# tiny-s3
Minimalistic Amazon S3 client with Promise support


### How to use:

```
const S3 = require('tiny-s3');

const s3 = new S3({
  endpoint: `s3.${MY_REGION}.amazonaws.com`,
  accessKeyId: 'MY_ACCESS_KEY',
  secretAccessKey: 'MY_SECRET_KEY'
});

// Delete bucket by key
await s3.deleteBucket('my-small-bucket');

// Create bucket with name 'my-small-bucket'
await s3.createBucket('my-small-bucket');

// Put 'somewhat' as new object into s3
await s3.put('my-little-key', 'somewhat');

// Get object by key
await s3.get('my-little-key');

// Delete object by key
await s3.delete('my-little-key');
```