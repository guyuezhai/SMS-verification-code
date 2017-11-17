module.exports = {
    
    name: 'server-captcha',
    version: '1.0.0',
    port: 5006,

    db: {

        database: 'g-default',
        host: 'localhost',
        port: 5432,
        max: 50,
        idelTimeout: 30000,
        user: 'projx',
        password: 'sss'

    },

    cache: {

        host: 'localhost',
        port: 6379,

    },

    sms: {

        accessKeyId: '你的AccessKey',
        accessKeySecret: '你的AccessKey密码',
        accountId: '账户id',
        topic: 'sms.topic-cn-beijing',
        region: 'beijing',
        signupTemplateCode: '注册短信模板Code',
        resetPwdTemplateCode: '重置短信模板Code',
        freeSignName : "短信签名",
        
    }
   
}

    