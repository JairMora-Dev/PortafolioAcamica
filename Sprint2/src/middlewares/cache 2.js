const redis = require('redis');

const clientRedis = redis.createClient(6379);

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


