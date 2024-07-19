const axios = require("axios")

exports.hadits = (args,prefix) => {

    // const sections = [
    //     {
    //     title: "( 📄 ) Hadits",
    //     rows: [
    //       {title: `${prefix}hadits muslim`, rowId: `${prefix}hadits muslim`, description: ">> Untuk Membuka Hadits Muslim!"},
    //       {title: `${prefix}hadits bukhari`, rowId: `${prefix}hadits bukhari`, description: ">> Untuk Membuka Hadits Bukhari!"},
    //       {title: `${prefix}hadits tirmidzi`, rowId: `${prefix}hadits tirmidzi`, description: ">> Untuk Membuka Hadits Tirmidzi!"},
    //       {title: `${prefix}hadits nasai`, rowId: `${prefix}hadits nasai`, description: ">> Untuk Membuka Hadits Nasai!"},
    //       {title: `${prefix}hadits abu-daud`, rowId: `${prefix}hadits abu-daud`, description: ">> Untuk Membuka Hadits Abu Daud!"},
    //       {title: `${prefix}hadits ibnu-majah`, rowId: `${prefix}hadits ibnu-majah`, description: ">> Untuk Membuka Hadits Ibnu Majah!"},
    //       {title: `${prefix}hadits ahmad`, rowId: `${prefix}hadits ahmad`, description: ">> Untuk Membuka Hadits Ahmad!"},
    //       {title: `${prefix}hadits darimi`, rowId: `${prefix}hadits darimi`, description: ">> Untuk Membuka Hadits Darimi!"},
    //       {title: `${prefix}hadits malik`, rowId: `${prefix}hadits malik`, description: ">> Untuk Membuka Hadits Malik!"},
    //     ]
    //     },
    //   ]

      const listHadits = { text: `( 📄 ) Hadits\n\n${prefix}hadits muslim\n${prefix}hadits bukhari\n${prefix}hadits tirmidzi\n${prefix}hadits nasai\n${prefix}hadits abu-daud\n${prefix}hadits ibnu-majah\n${prefix}hadits ahmad\n${prefix}hadits darimi\n${prefix}hadits malik\n\nPenjelasan : Hadis, disebut juga sunnah, adalah perkataan, perbuatan, ketetapan dan persetujuan dari Muhammad yang dijadikan landasan syariat Islam. Hadis dijadikan sumber hukum Islam selain al-Qur'an, dalam hal ini kedudukan hadis merupakan sumber hukum kedua setelah al-Qur'an.\n\nContoh Perintah:\n${prefix + "hadits"} [hadits] [nomor]\n${prefix+"hadits"} bukhari 24` }

  return listHadits

}



