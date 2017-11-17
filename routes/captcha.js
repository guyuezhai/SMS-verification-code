const Router = require('koa-router');
const CaptchaUtils = require('../utils/captcha_utils');
const SmsUtils = require('../utils/sms_utils');
const CacheUtils = require('../utils/cache_utils');
const StrUtils = require('../utils/str_utils');
const RegUtils = require('../utils/reg_utils');
const config = require( "../config");
const ResponseUtils = require('../utils/response_utils');
const ResultCode = require('../utils/result_code');
const UserTable = require('../db/user_table');
const router = new Router();

const resetPwdTemplateCode = config.sms.resetPwdTemplateCode;
const signupTemplateCode = config.sms.signupTemplateCode;
const CAPTCHA_LEN = 4;
const EXPIRE_TIME = 300;  //5分钟

const USAGE_REGISTER = 'register';
const USAGE_RESET = 'reset';
const REG_VERIFY_CODE = 'regVerifyCode';
const RES_VERIFY_CODE = 'resetVerifyCode';
const CAPTCHA_CODE = 'CapchaCode';

const HTTP_HEADER_JSON = {
    
    'Content-Type' : 'application/json', 
    'Encoding' : 'utf8',
};
const HTTP_HEADER_IMG  = {
    
    'Content-Type' : 'image/jpg', 
    'Encoding' : 'utf8',
    
};

const genSms = async function(ctx, next){

    ctx.set(HTTP_HEADER_JSON);
    let phone = ctx.request.body.phone;
    let usage = ctx.request.body.usage;
    let callback = ctx.request.body.callback;

    if(!phone || !usage){
        ctx.body = ResponseUtils.genError(ResultCode.NO_REQUIRED_PARAMS, callback);
        return;
    }

    if(!RegUtils.isPhoneNum(phone)){
        
        ctx.body = ResponseUtils.genError(ResultCode.ILLEGAL_PARAMS, callback);
        return;

    }

    let result = await UserTable.getByPhone(phone);

    if(usage == USAGE_REGISTER){
    
        if(result){
            
            ctx.body = ResponseUtils.genError(ResultCode.ALREADY_EXIST, callback);
            return;
    
        }

        let code = StrUtils.genNumCode(CAPTCHA_LEN);
        
        let success = await CacheUtils.set(REG_VERIFY_CODE+phone, code, EXPIRE_TIME);
    
        if(success){
    
            let success = await SmsUtils.sendSms(phone, signupTemplateCode ,code);
            
            if(success){
                ctx.body = ResponseUtils.genResult({phone:phone},callback);
                return;  
            }
            
        }

    } else if(usage == USAGE_RESET){
        
        if(!result){
    
            ctx.body = ResponseUtils.genError(ResultCode.NO_USER_EXIST, callback);
            return;
    
        }
    
        let captcha = StrUtils.genNumCode(CAPTCHA_LEN);
    
        let success = await CacheUtils.set(RES_VERIFY_CODE+phone, captcha, EXPIRE_TIME);
    
        if(success){
    
            let success = await SmsUtils.sendSms(phone, resetPwdTemplateCode, captcha);
       
            if(success){
                ctx.body = ResponseUtils.genResult({phone:phone},callback);
                return;  
            }
            
        }

    }

    ctx.body = ResponseUtils.genError(ResultCode.FAILED, callback);
    return; 
  
}

const genImg = async function(ctx, next){

    ctx.set(HTTP_HEADER_IMG);
    
    let captcha = StrUtils.genStrCode(CAPTCHA_LEN);

    let lowerCaseCaptcha = captcha.toLowerCase();
  
    let success = await CacheUtils.set(CAPTCHA_CODE + lowerCaseCaptcha, lowerCaseCaptcha, EXPIRE_TIME);
 
    if(success){
        ctx.response.body = CaptchaUtils.genCaptcha(captcha).getFileData();
        return;
    }
    
    ctx.body = ResponseUtils.genError(ResultCode.FAILED, callback);
    return;
}

router.post('/sms', genSms);
router.get('/img', genImg);

module.exports = router;