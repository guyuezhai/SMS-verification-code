module.exports = {

    genNumCode: function(len){

        let maxNum = Math.pow(10,len);
    
        let code = parseInt( Math.random()* maxNum ).toString(); 

        let length = len - code.length;

        if(length != 0){

            let str = '';

            for(i=0;i<length;i++){

                str += '0'

            }

            str = `${str}${code}`;

            return str;
            
        }
        
        return code;

    },

    genStrCode: function(len){

        let str = '';

        let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';

        for(i=0;i<len;i++){

            str +=chars.charAt(Math.floor(Math.random()*chars.length));

        }

        return str;

    }

}

    