module.exports = {
    
    isPhoneNum : function(phone){

        const REG_PHONE = /^1[3|5|7|8]\d{9}$/;
        return REG_PHONE.test(phone);
    
    }

}