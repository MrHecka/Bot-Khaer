const fs = require('fs')
const { youtube } = require('scrape-youtube')
const { getBuffer } = require("../lib/fungsi")

exports.dzikir = async(msg) => {
        let results = await youtube.search('dzikir', { type: 'live' })
        let hasilNya = await results.streams[[Math.floor(Math.random()*results.streams.length)]];
        let judulNya = await hasilNya.title
        let linkNya = await hasilNya.link
        let thumbnailNya = await hasilNya.thumbnail
        let channelNya = await hasilNya.channel.name
        let fThumb = await getBuffer(thumbnailNya)
        let pesanNya = {
            quoted: msg, 
            image: fThumb, 
            caption: `[ 🔴 DZIKIR LIVE STREAMING ٱلذِّكْر ]\n\n*Judul :* ${judulNya}\n\n*Link Live Streaming :* ${linkNya}\n\n*Nama Channel :* ${channelNya}`
        }
        return await pesanNya
    }




