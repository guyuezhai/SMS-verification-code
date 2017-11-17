const redisUtils = require('../utils/redis_utils');

//向Redis添加用户注册手机号以及注册验证码，并设置过期时间
async function set(key, value, sends){

    let result = await redisUtils.set(key, value);

    if(result){

        let expired = await redisUtils.expire(key, sends);
        if(expired){
            return true;
        }

    }

    console.log('缓存失败！');

    return false;
    
}

async function get(key){
    
    let result = await redisUtils.get(key);

    if(result){

        return result;

    }

    return false;
    //await redisUtils.quit(); 
}


exports.set = set;
exports.get = get;
