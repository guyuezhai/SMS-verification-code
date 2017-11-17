const BMP24 = require('gd-bmp').BMP24;
//仿PHP的rand函数
function rand(min, max) {
    return Math.random()*(max-min+1) + min | 0; //特殊的技巧，|0可以强制转换为整数
}
//制造验证码图片
function genCaptcha(str) {
    let img = new BMP24(100, 40);
  
    //边框
    img.fillRect(rand(0, 0), rand(0, 0), rand(100, 100), rand(40, 40), rand(0xFFFFFF, 0xFFFFE0));
    img.drawRect(0, 0, img.w-1, img.h-1, rand(0, 0xffffff));
    img.drawCircle(rand(0, 100), rand(0, 40), rand(30 , 40), rand(0, 0xffffff));
    img.drawLine(rand(0, 100), rand(0, 40), rand(0, 100), rand(0, 40), rand(0, 0xffffff));
    //return img;

    //画曲线
    let w=img.w/2;
    let h=img.h;
    let color = rand(0, 0xffffff);
    let y1=rand(-5,5); //Y轴位置调整
    let w2=rand(10,15); //数值越小频率越高
    let h3=rand(10,12); //数值越小幅度越大
    let bl = rand(1,2);
    for(let i=-w; i<w; i+=0.1) {
        let y = Math.floor(h/h3*Math.sin(i/w2)+h/2+y1);
        let x = Math.floor(i+w);
        for(let j=0; j<bl; j++){
            img.drawPoint(x, y+j, color);
        }
    }

    let fonts = [BMP24.font8x16, BMP24.font12x24, BMP24.font16x32];
    let x = 15, y=8;
    for(let i=0; i<str.length; i++){
        let f = fonts[Math.random() * fonts.length |0];
        y = 8 + rand(-8, 8);
        img.drawChar(str[i], x, y, f, rand(0, 0xffffff));
        x += f.w + rand(3, 5);
    }
    return img;
}

exports.genCaptcha = genCaptcha;