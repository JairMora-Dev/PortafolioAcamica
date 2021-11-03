const redis = require('redis');

const clientRedis = redis.createClient(process.env.REDIS_AWSPORT);

exports.CacheProducts = (req, res, next) => {
    clientRedis.get('products', (err, GetProducts) => {
        if(err) throw err;

        if (GetProducts) {
            res.json(JSON.parse(GetProducts));
        } else {
            next();
        }
    });
}


