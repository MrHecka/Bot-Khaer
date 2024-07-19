const moment = require("moment-timezone");
const fs = require("fs");

moment.tz.setDefault("Asia/Jakarta").locale("id");

let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Assalamualaikum👋 Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)


const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

function toCommas(x) {
	x = x.toString()
	var pattern = /(-?\d+)(\d{3})/;
     while (pattern.test(x))
	   x = x.replace(pattern, "$1,$2");
	return x;
}

exports.allmenu = (sender, prefix, isOwner, pushname) => {
  // const sections = [
  //   {
  //   title: "( ☪ ) Menu",
  //   rows: [
  //     {title: `${prefix}menu`, rowId: `${prefix}menu`, description: ">> Untuk Membuka Menu!"},
  //     {title: `${prefix}kontak`, rowId: `${prefix}kontak`, description: ">> Untuk Membuka Kontak DEV!"},
  //     {title: `${prefix}donasi`, rowId: `${prefix}donasi`, description: ">> Donasi Seikhlasnya Yang Penting Ikhlas!"},
  //   ]
  //   },
  // {
  //   title: "( 📖 ) Kitab Al-Quran",
  //   rows: [
  //     {title: `${prefix}quran`, rowId: `${prefix}quran`, description: ">> Untuk Melihat List Semua Surat Dan Ayat Al-Quran"},
  //     {title: `${prefix}surah`, rowId: `${prefix}surah`, description: ">> Untuk Membuka Surah Beserta Ayat Dan Artinya, Contoh : #surah al-ikhlas 2"},
  //     {title: `${prefix}asmaulhusna`, rowId: `${prefix}asmaulhusna`, description: ">> Untuk Membuka Asmaul Husna"},
  //     {title: `${prefix}hadits`, rowId: `${prefix}hadits`, description: ">> Untuk Membuka Hadits"},
  //   ]
  //   },
  //   {
  //     title: "( 🧎 ) Jadwal Sholat",
  //     rows: [
  //       {title: `${prefix}wilayah`, rowId: `${prefix}wilayah`, description: ">> Untuk Melihat Jadwal Sholat Sesuai Wilayahnya"},
  //       {title: `${prefix}ingatkan`, rowId: `${prefix}ingatkan`, description: ">> Untuk Mengingatkan Sholat 5 Waktu Sesuai Zona Waktu -> [WIB]"},
  //     ]
  //     },
  //     {
  //       title: "( 🎶 ) Islamic Audio",
  //       rows: [
  //         {title: `${prefix}murottal`, rowId: `${prefix}murottal`, description: ">> Untuk Mendengarkan Murottal Al-Qur'an"},
  //         {title: `${prefix}dzikir`, rowId: `${prefix}dzikir`, description: ">> Untuk Mendengarkan Bacaan Dzikir"},
  //         {title: `${prefix}musik`, rowId: `${prefix}musik`, description: ">> Untuk Mendengarkan Lagu-Lagu Islami"},
  //       ]
  //       },
  // ]

  const listPesan1 = {
text: `*── 「 👳‍♀️ BOT KHAER 🧕 」 ──*

_*${ucapanWaktu} ${pushname || 'Akhi/Ukhti'}*_

Dev : *Hamba Allah*.
Prefix : ( ${prefix} )
Status : ${isOwner ? 'Owner' : 'User'}
Tanggal Server : ${moment.tz('Asia/Jakarta').format('DD/MM/YY')}
Waktu Server : ${moment.tz('Asia/Jakarta').format('HH:mm:ss')}\n
( ☪ ) Menu
🔘 ${prefix}menu
🔘 ${prefix}kontak
🔘 ${prefix}donasi

( 📖 ) Kitab Al-Quran
🔘 ${prefix}quran
🔘 ${prefix}surah (Coming Soon)
🔘 ${prefix}asmaulhusna
🔘 ${prefix}hadits

( 🧎 ) Jadwal Sholat
🔘 ${prefix}wilayah
🔘 ${prefix}ingatkan

( 🎶 ) Islamic Audio
🔘 ${prefix}murottal
🔘 ${prefix}dzikir
🔘 ${prefix}musik

Semoga Membantu Akhi/Ukhti😇🙏
`
// footer: "Klik List Dibawah Untuk Membuka Menu Bot Khaer",
// title: "Menu Bot Khaer",
// buttonText: "Klik Untuk Membuka Menu!",
// sections
}

return listPesan1


}



