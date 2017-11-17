const redis = require('redis');
const util = require('util');
const redisWrapper = require('co-redis');
const config = require('../config');

const redisConf = config.cache;

let client;

const initClient = () => {

    let redisClient = redis.createClient( redisConf.port, redisConf.host );

    client = redisWrapper( redisClient );

    redisClient.on( 'error', err => {

        console.log( 'redis创建失败' );

        return initClient();

    })

}

const set = async function ( key, value, callback ){

    if(!client) initClient();

    return await client.set( key, value );
}

const get = async function ( key, callback ){
    
    if(!client) initClient();

    return await client.get( key );

}

const expire = async function ( key ,sends ,callback ){

    if( !client ) initClient();

    return await client.expire( key ,sends );
    
}

exports.set = set;
exports.get = get;
exports.expire = expire;



