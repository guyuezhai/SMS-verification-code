const AliMNS = require( "ali-mns" );
const config = require( "../config");
const RegUtils = require('../utils/reg_utils');

const accessKeyId = config.sms.accessKeyId ;
const accessKeySecret = config.sms.accessKeySecret ;
const accountId = config.sms.accountId;
const topic = config.sms.topic;
const region = config.sms.region;
const signFreeSignName = config.sms.freeSignName;

let account = new AliMNS.Account( accountId , accessKeyId, accessKeySecret);
let mnsTopic = new AliMNS.Topic(topic, account, region);

function sendSms(phone, templateCode, code){

    if(!RegUtils.isPhoneNum(phone)){

        return false;

    }

    let attribures = {

        DirectSMS: JSON.stringify({
            FreeSignName : signFreeSignName,
            TemplateCode :  templateCode, 
            Type : "singleContent" ,
            Receiver: phone,
            SmsParams : JSON.stringify({code : code })
        })

    };

  
    return  mnsTopic.publishP('welcome',true,null,attribures)
            .then(function(data){
                console.log(data);
                return true;
                
            })
            .catch(function(err){
                console.log(err);
                return false;
                
            });

}

exports.sendSms = sendSms;
