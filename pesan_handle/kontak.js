const fs = require('fs')

exports.kontakOwner = (prefix,msg) => {
    let pesanNya = {
        quoted: msg, 
        image: fs.readFileSync('./img/developer.jpeg'), 
        caption: `[📞] *Kontak Developer BOT KHAER* [📱]\n\n*Nama : Hamba Allah*\n*No HP : 082143012823*\n*IG : @anone14_*\n*Github :* https://github.com/MrHecka`
    }
    return pesanNya
}




