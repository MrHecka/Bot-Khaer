

"use strict";
const { BufferJSON, Mimetype, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, downloadContentFromMessage, areJidsSameUser, getContentType, downloadMediaMessage  } = require("@whiskeysockets/baileys");

const { getBuffer, fetchJson, fetchText, getRandom, runtime, sleep, makeid } = require("../lib/fungsi");
const fs = require ("fs");
const moment = require("moment-timezone");
const util = require("util");
const { exec, spawn } = require("child_process");
const axios = require("axios");
const speed = require("performance-now");
const request = require("request");
const cron = require('node-cron');
const ffmpeg = require("fluent-ffmpeg");
const sharp = require('sharp');
const { writeFile, unlink } = require('fs/promises');
const { Sticker } = require('wa-sticker-formatter')


// DB
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let DBingatkan = JSON.parse(fs.readFileSync('./database/ingatkan.json'))
let DBUser = JSON.parse(fs.readFileSync('./database/user.json'))

moment.tz.setDefault("Asia/Jakarta").locale("id");


module.exports = async(conn ,msg, m, setting, store, welcome) => {
	try {
        let ownerNumber = ["6282143012823@s.whatsapp.net"]
        let botName = "BOT KHAER"
		let { allmenu } = require('./bantuan')
		let { kontakOwner } = require('./kontak')
		let { asmaulHusna } = require('../islamCMD/asmaulhusna')
		let { hadits } = require('../islamCMD/hadits')
		let { dzikir } = require('../islamCMD/dzikir')
		let { wilayahSholat } = require('../islamCMD/wilayah')
		let { quran } = require('../islamCMD/alquran')
		let { musik } = require('../islamCMD/musik')
		let { murottal } = require('../islamCMD/murottal')
		const { type, quotedMsg, mentioned, now, fromMe } = msg
		if (msg.isBaileys) return
		const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
		let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		const ucapanWaktu = "Assalamualaikum👋 Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
		const content = JSON.stringify(msg.message)
		const from = msg.key.remoteJid
		const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
                const toJSON = j => JSON.stringify(j, null,'\t')
		if (conn.multi) {
			var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
		} else {
			if (conn.nopref) {
				prefix = '#'
			} else {
				prefix = conn.prefa
			}
		}
		const command = chats.toLowerCase().split(' ')[0] || ''
		const isCmd = command.startsWith(prefix)
		const isGroup = msg.key.remoteJid.endsWith('@g.us')
		const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
		const isOwner = ownerNumber == sender ? true : ["6282143012823@s.whatsapp.net"].includes(sender) ? true : false
		const pushname = msg.pushName
		const q = chats.slice(command.length + 1, chats.length)
		const body = chats.startsWith(prefix) ? chats : ''
		const args = body.trim().split(/ +/).slice(1)
		const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
		const isUser = pendaftar.includes(sender)
		const isIngatkan = DBingatkan.some(e => e.nomor === sender)
		const quoted = msg.quoted ? msg.quoted : msg


		const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
                const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
                const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
                mention != undefined ? mention.push(mentionByReply) : []
                const mentionUser = mention != undefined ? mention.filter(n => n) : []
		
		async function downloadAndSaveMediaMessage (type_file, path_file) {
			if (type_file === 'image') {
				var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'video') {
				var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'sticker') {
				var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'audio') {
				var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			}
		}
		const sendFileFromUrl = async (from, url, caption, options = {}) => {
		    let mime = '';
		    let res = await axios.head(url)
		    mime = res.headerd["content-type"]
		    let type = mime.split("/")[0]+"Message"
		    if (mime.split("/")[0] === "image") {
		       var img = await getBuffer(url)
		       return conn.sendMessage(from, { image: img, caption: caption }, options)
		    } else if (mime.split("/")[0] === "video") {
		       var vid = await getBuffer(url)
		       return conn.sendMessage(from, { video: vid, caption: caption }, options)
		    } else if (mime.split("/")[0] === "audio") {
		       var aud = await getBuffer(url)
		       return conn.sendMessage(from, { audio: aud, mimetype: 'audio/mp3' }, options)
		    } else {
		       var doc = await getBuffer(url)
		       return conn.sendMessage(from, { document: doc, mimetype: mime, caption: caption }, options)
		    }
		}

		const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
		}

		function removeById(arr, nomor) {
			const requiredIndex = arr.findIndex(el => {
			   return el.nomor === String(nomor);
			});
			if(requiredIndex === -1){
			   return false;
			};
			return !!arr.splice(requiredIndex, 1);
		};

		function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
		function monospace(string) {
            return '```' + string + '```'
        }
		function randomNomor(min, max = null) {
		  if (max !== null) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		  } else {
			return Math.floor(Math.random() * min) + 1
		  }
		}
		const pickRandom = (arr) => {
			return arr[Math.floor(Math.random() * arr.length)]
		}
		function mentions(teks, mems = [], id) {
			if (id == null || id == undefined || id == false) {
			  let res = conn.sendMessage(from, { text: teks, mentions: mems })
			  return res
			} else {
		      let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
		      return res
 		    }
		}
		const reply = (teks) => {
			conn.sendMessage(from, { text: teks }, { quoted: msg })
		}
		const textImg = (teks) => {
			return conn.sendMessage(from, { text: teks, jpegThumbnail: fs.readFileSync(setting.pathimg) }, { quoted: msg })
		}
		const sendMess = (hehe, teks) => {
			conn.sendMessage(hehe, { text, teks })
		}
		const buttonWithText = (from, text, footer, buttons) => {
			return conn.sendMessage(from, { text: text, footer: footer, templateButtons: buttons })
		}
		const sendContact = (jid, numbers, name, quoted, mn) => {
			let number = numbers.replace(/[^0-9]/g, '')
			const vcard = 'BEGIN:VCARD\n' 
			+ 'VERSION:3.0\n' 
			+ 'FN:' + name + '\n'
			+ 'ORG:;\n'
			+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
			+ 'END:VCARD'
			return conn.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
		}
		
		const buttonsDefault = [
			{index:1, callButton: { displayText: `Hubungi Owner!`, phoneNumber: `+6282143012823` } },
			{index:2, urlButton: { displayText: `Instagram!`, url : `https://www.instagram.com/anone14_/` } },
			{index:3, quickReplyButton: { displayText: `🧑 Owner`, id: `${prefix}owner` } },
			{index:4, quickReplyButton: { displayText: `💰 Donasi`, id: `${prefix}donate` } }
		]
        
		const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isSticker = (type == 'stickerMessage')
		const isQuotedMsg = (type == 'extendedTextMessage')
		const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
		const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
		const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
		const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
		const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false





		// Auto Read & Presence Online
		conn.readMessages([msg.key])
		conn.sendPresenceUpdate('available', from)
		
		if (conn.mode === 'self') {
                  if (!isOwner && !fromMe) return
                  if (fromMe && isBaileys) return
                }
		
		// Auto Registrasi
		if (isCmd && !isUser) {
		  pendaftar.push(sender)
		  fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
		}

		// RETURN GROUP MSG
		if(isGroup) return;

        // MESSAGE RESP
        let mess = {
            "OnlyOwner": "Perintah ini hanya boleh digunakan oleh owner!"
        }

		let salam = ["assalamualaikum","assalamualaikum warahmatullahi wabarakatuh","اَلسَّلَامُ عَلَيْكُمْ","اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَا تُهُ"]
		if(salam.includes(chats.toLowerCase())) return conn.sendMessage(from, {quoted: msg , image: fs.readFileSync(setting.pathWaalaikumsalam), caption: "Waalaikumsalam Warahmatullahi Wabarakatuh🙏" })
		

        // DEFAULT SEND TEXT WITHOUT PREFIX
        if(!isCmd) {
            return conn.sendMessage(from, {quoted: msg , image: fs.readFileSync(setting.pathAssalamualaikum), caption: `[Assalamualaikum ${pushname || `Akhi/Ukhti`}👳‍♀️🧕👋]\n\nSelamat Datang Di Bot Khaer, Kirimkan Perintah *#menu* Untuk Menampilkan List Menu Yang Ada Di Bot Khaer🙏`})
            // console.log(`==> ${pushname} | ${chats}`)
        } else {
            // console.log(`==> ${pushname} | ${chats}`)
        }





		switch(command) {
			// Main Menu
			case prefix+'menu':
			case prefix+'help':
			    var teks = allmenu(sender, prefix, isOwner, pushname)
				await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
			    await conn.sendMessage(from, teks, { quoted: msg })
				break
			case prefix+'runtime':
			    reply(runtime(process.uptime()))
			    break
			case prefix+'speed':
			    let timestamp = speed();
                            let latensi = speed() - timestamp
                            textImg(`${latensi.toFixed(4)} Second`)
		            break

			case prefix+'donate':
			case prefix+'donasi':
				await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
			    await conn.sendMessage(from, {quoted: msg , image:  fs.readFileSync('./img/donasiQRIS.jpeg'), caption: `──「 DONASI 」──\n\nAssalamualaikum Akhi/Ukhti ${pushname} 👳‍♀️👋🏻\n\n\`\`\`GOPAY/OVO/SHOPEEPAY/PULSA : 082143012823\`\`\`\n\n\`\`\`SAWERIA : \`\`\`https://saweria.co/MrHecka\n\nBarakallah fii umrik akhi/ukhti sudah donasi ke bot ini, semoga akhi/ukhti dilancarkan urusannya di dunia, rezeki nya dan selamat dunia akhirat, amiinn ya rabbal alamain🤲\n\n──「 BARAKALLAH FII UMRIK BANYAK INSYA ALLAH BERKAH😇 」──`})
			    break

			case prefix+'owner':
				await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
			    for (let x of ownerNumber) {
			      sendContact(from, x.split('@s.whatsapp.net')[0], 'Owner', msg)
			    }
			    break

			case prefix+'bc': case prefix+'broadcast':
				if (!isOwner) return reply(mess.OnlyOwner)
					if (args.length === 0) return reply(`Masukkan isi pesannya`)
							var data = await store.chats.all()
							for (let i of DBUser) {
								conn.sendMessage(i, { text: `${q}\n\n_*BROADCAST MESSAGE*_` })
								await sleep(1000)
							}
			break
			

			case prefix+'kontak':
				var teks = await kontakOwner(prefix,msg)
				await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
				await conn.sendMessage(from, teks)
				await sendContact(from, '6282143012823', 'Hamba Allah', msg)
			break


			case prefix+'setpp': case prefix+'setppbot':
		        if (!isOwner) return reply(mess.OnlyOwner)
		        if (isImage || isQuotedImage) {
				  var media = await downloadAndSaveMediaMessage('image', 'ppbot.jpeg')
				  var data =  await conn.updateProfilePicture(botNumber, { url: media })
			      fs.unlinkSync(media)
				  reply(`Sukses`)
				} else {
				  reply(`Kirim/balas gambar dengan caption ${command} untuk mengubah foto profil bot`)
				}
				break

			case prefix+'self':
                           if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                           conn.mode = 'self'
                           reply(`Berhasil berubah ke mode Self!`)
                           break
			case prefix+'public': case prefix+'publik':
                           if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                           conn.mode = 'public'
			reply(`Berhasil berubah ke mode Public!`)
                   break


			// ISLAM COMMAND
			case prefix+'asmaul':
			case prefix+'asmaulhusna':
				var teks = asmaulHusna(args,prefix)
				await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
				await reply(teks)
			break

			case prefix+'hadits':
				var teks = hadits(args,prefix)
				if(args.length > 2 || args.length === 0) return conn.sendMessage(from, teks)
				if (isNaN(args[1])) return conn.sendMessage(from, teks)
				let arghadits = ["muslim", "bukhari", "tirmidzi", "nasai", "abu-daud", "ibnu-majah", "ahmad","darimi","malik"]
				if (!arghadits.includes(args[0])) return conn.sendMessage(from, teks)
				if(args.length === 2) {
						axios.get(`https://api.hadith.gading.dev/books/${args[0].toLowerCase()}/${args[1]}`).then(async(res)=> {
							if(parseInt(args[1]) > 0 && parseInt(args[1]) < parseInt(res.data.data.available)+1) {
								let judulHadits = await res.data.data.name
								let noHadits = await res.data.data.contents.number
								let arabHadits = await res.data.data.contents.arab
								let terjemahanHadits = await res.data.data.contents.id
								let sukses = await { text: `[ ${judulHadits} ]\n\nHadits Ke : ${noHadits}\nArab : ${arabHadits}\nTerjemahan Bahasa : ${terjemahanHadits}` }
								await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
								return await conn.sendMessage(from, sukses, { quoted: msg })
							} else {
								let gagal = { text : `Mohon Maaf Akhi/Ukhti, Data Yang Dimasukkan Salah, Silahkan Masukkan Kembali Dengan Format Yang Sesuai🙏, MAX NOMOR : ${res.data.data.available}` }
								await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
								return await conn.sendMessage(from, gagal, { quoted: msg })
							}
						}).catch(async(error) => {
							console.log(error)
							await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
							return await reply("Terdapat Error Pada Perintah, Tolong Hubungi Dev/Owner🙏")
						})
				  }
				
			break


			case prefix+'wilayah':
			case prefix+'jadwalsholat':

				var teks = wilayahSholat(q,prefix)
				if(!isNaN(teks)) {
				let tahunS = moment.tz('asia/jakarta').format('YYYY')
				let bulanS = moment.tz('asia/jakarta').format('MM')
				let hariS = moment.tz('asia/jakarta').format('DD')
				let tglSkrng = tahunS + "/" + bulanS + "/" + hariS
				axios.get(`https://api.myquran.com/v2/sholat/jadwal/${teks}/${tglSkrng}`).then(async(res)=> {
					let jadwalnya = res.data.data.jadwal
					let lokasi = res.data.data.lokasi
					let daerah = res.data.data.daerah
					await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
					await reply(`[ 🧎 ] Jadwal Sholat ${lokasi} Daerah ${daerah} [ 🤲 ]\n\nTanggal : ${jadwalnya.tanggal}\n\n-- Jadwal --\n__________\nImsak : ${jadwalnya.imsak}\nSubuh : ${jadwalnya.subuh}\nTerbit : ${jadwalnya.terbit}\nDhuha : ${jadwalnya.dhuha}\nDzuhur : ${jadwalnya.dzuhur}\nAshar : ${jadwalnya.ashar}\nMaghrib : ${jadwalnya.maghrib}\nIsya : ${jadwalnya.isya}\n__________\n\nJangan Lupa Sholat 5 Waktu Akhi/Ukhti😇🙏`)
				})
			
					// reply(teks)
				} else {
					await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
					await reply(teks)
				}

			break


			case prefix+'quran':
			case prefix+'alquran':
				var teks = quran(prefix, parseInt(q)-1)
				if(!teks)
					{
						teks = `Penjelasan : Al-Qur'an atau Qur'an, adalah sebuah kitab suci utama dalam agama Islam, yang dipercayai Muslim bahwa kitab ini diturunkan oleh Allah Subhanahu wa Ta'ala, yang diturunkan kepada Nabi Muhammad SAW. Kitab ini terbagi ke dalam beberapa surah dan setiap surahnya terbagi ke dalam beberapa ayat.\n\nContoh Perintah:\n${prefix}quran 3\n${prefix}alquran 3`
						await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
						return await conn.sendMessage(from, {text: teks})
					}
					await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
					await conn.sendMessage(from, {text: teks})
			break

			
			case prefix+'musik':
				let audioLink = await musik()
				let playlistMusik = `[ 🎶 PLAYLIST ISLAMIC MUSIC 🪕 ]\n\n1. Maher Zain - Rahmatun LilAlameen\n2. 3 DAQAT ثلاث دقات - ABU feat YUSRO)\n3. Maher Zain  Allahi Allah Kiya Karo\n4. Maher Zain  Number One For Me\n5. ALLAHUL KAAFI  COVER KELUARGA NAHLA\n6. Maher Zain  Baraka Allahu Lakuma\n7. Ya Maulana - Opick`
				if(args.length === 1) {
					await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
					if (args[0].toLowerCase() === "list") return reply(playlistMusik)
				}
				if (args.length === 0) {
					await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
					await reply("Harap Bersabar Akhi/Ukhti, Musik Sedang Dikirim...😇🙏")
					await conn.sendMessage(from, { audio: { url : audioLink }, mimetype: 'audio/mp4', ptt:true })
					await reply("Selamat Menikmati Musiknya Akhi/Ukhti🕺🎤🎶") 
				}
			break

			case prefix+'ingatkan':
				if(args.length === 0 || args.length === 1 && args[0] !== "off") return reply(`Assalamualaikum Akhi/Ukhti, Ini Adalah Fitur Untuk Mengingatkan Anda Sholat 5 Waktu, Dan Termasuk Mengingatkan Sholat Imsak, Matahari Terbit Dan Dhuha☺\n\nContoh Perintah :\n${prefix}ingatkan wib surabaya\n(Untuk Mengingatkan Anda Sholat Dan Bergantung Pada Waktu Wilayah Sesuai Yang Akhi/Ukhti Pilih😇🙏)`)
				if(isIngatkan && args[0] === "off") {
					removeById(DBingatkan, sender);
					fs.writeFileSync('./database/ingatkan.json', JSON.stringify(DBingatkan,null,2));
					await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
					return await reply(`[🧎] NOTIFIKASI SHOLAT DIMATIKAN [🔔]\n\nSekarang Akhi/Ukhti Tidak Menerima Notifikasi Ingatkan Sholat, Silahkan Masukkan Wilayah Kota Anda Untuk Mengaktifkan Kembali Fitur Ini, Ketik Perintah ${prefix}ingatkan\n\n😇🙏`)
				} else if (!isIngatkan && args[0] === "off") {
					await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
					return await reply(`Halo Akhi/Ukhti, Mohon Maaf Sebelumnya Nomor Anda Belum Pernah Terdaftar Di Database Ingatkan, Silahkan Ketikan Contoh Perintah Berikut Untuk Mengaktifkan Mode Ingatkan\n\nContoh Perintah:\n${prefix}ingatkan wib surabaya\n\n😇🙏`)
				}

				if(args.length > 1 && !isIngatkan) {
					var wilayahIngat = wilayahSholat(chats.slice(chats.split(" ")[0].length+1 + chats.split(" ")[1].length+1), prefix)
					let zonawaktu = 0
					if(!isNaN(wilayahIngat)) {
						if(args[0].toLowerCase() === "wib" || args[0].toLowerCase() === "wita" || args[0].toLowerCase() === "wit") {
							if(args[0].toLowerCase() === "wib") {
								zonawaktu = 0
							}
							if(args[0].toLowerCase() === "wita") {
								zonawaktu = -1
							}
							if(args[0].toLowerCase() === "wit") {
								zonawaktu = -2
							}
							let tahunS = moment.tz('asia/jakarta').format('YYYY')
							let bulanS = moment.tz('asia/jakarta').format('MM')
							let hariS = moment.tz('asia/jakarta').format('DD')
							let tglSkrng = tahunS + "/" + bulanS + "/" + hariS
							let res = await axios.get(`https://api.myquran.com/v2/sholat/jadwal/${wilayahIngat}/${tglSkrng}`)
								let jadwalnya = res.data.data.jadwal
								let lokasis = res.data.data.lokasi
								let daerahs = res.data.data.daerah
								let idLok = res.data.data.id
								let tanggals = jadwalnya.tanggal
								let wimsak = moment(jadwalnya.imsak,'HH:mm').add(zonawaktu, 'hours').format('HH:mm')
								let wsubuh = moment(jadwalnya.subuh,'HH:mm').add(zonawaktu, 'hours').format('HH:mm')
								let wterbit = moment(jadwalnya.terbit,'HH:mm').add(zonawaktu, 'hours').format('HH:mm')
								let wdhuha = moment(jadwalnya.dhuha,'HH:mm').add(zonawaktu, 'hours').format('HH:mm')
								let wdzuhur = moment(jadwalnya.dzuhur,'HH:mm').add(zonawaktu, 'hours').format('HH:mm')
								let washar = moment(jadwalnya.ashar,'HH:mm').add(zonawaktu, 'hours').format('HH:mm')
								let wmaghrib = moment(jadwalnya.maghrib,'HH:mm').add(zonawaktu, 'hours').format('HH:mm')
								let wisya = moment(jadwalnya.isya,'HH:mm').add(zonawaktu, 'hours').format('HH:mm')
								DBingatkan.push({nama: pushname, nomor:sender, lokasi: lokasis, daerah: daerahs, IDL: idLok, tanggal: tanggals, zona: zonawaktu, imsak : wimsak, subuh: wsubuh, terbit: wterbit, dhuha: wdhuha, dzuhur: wdzuhur, ashar: washar, maghrib: wmaghrib, isya: wisya})
								await fs.writeFileSync('./database/ingatkan.json', JSON.stringify(DBingatkan, null, 2))
								await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
								return await reply(`[🔔] INGATKAN SHOLAT AKTIF [🧎]\n\nLokasi : ${lokasis}\nDaerah : ${daerahs}\nID Lokasi : ${idLok}\nTanggal : ${tglSkrng}\nZona Waktu : ${args[0].toUpperCase()}\n\nFitur Ini Akan Mengingatkan Anda Setiap Hari Berdasarkan Wilayah Yang Anda Daftarkan, Berikut Daftar Notifikasi Nya :\n\n=🔔 Imsak [${jadwalnya.imsak}]\n=🔔 Subuh [${jadwalnya.subuh}]\n=🔔 Terbit [${jadwalnya.terbit}]\n=🔔 Dhuha [${jadwalnya.dhuha}]\n=🔔 Dzuhur [${jadwalnya.dzuhur}]\n=🔔 Ashar [${jadwalnya.ashar}]\n=🔔 Maghrib [${jadwalnya.maghrib}]\n=🔔 Isya [${jadwalnya.isya}]\n\nNote : Nomor Diatas Dikirim Tergantung Pada Waktu WIB, Dan Pasti Dikirimkan Sesuai Jam Dan Zona Waktu Yang Sudah Ditentukan☺🙏\n\nJangan Lupa Untuk Sholat 5 Waktu Yaa Akhi/Ukhti, Semoga Membantu😇🙏`)
								} else { 
									return reply(`Mohon Maaf Akhi/Ukhti, Masukkan Format Zona Waktu Terlebih Dahulu [wib, wita, wit]\n\nContoh Perintah :\n${prefix}ingatkan wib surabaya\n\n😇🙏`)
								}
					} else if (wilayahIngat === "Mohon Maaf Akhi/Ukhti, Data Wilayah Tidak Ditemukan😣🙏") {
						return reply(wilayahIngat)
					} else if (wilayahIngat.includes("Wilayah Yang Tercantum, Silahkan Ketik Detail Wilayah Lebih Spesifik Lagi Akhi/Ukhti")) {
						return reply(wilayahIngat)	
					}


					
				} else if (isIngatkan) {
					await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
					return await reply(`Mohon Maaf Akhi/Ukhti, Nomor Akhi/Ukhti Sudah Pernah Terdaftar Ingatkan Sebelumnya, Silahkan Hapus Data Wilayah Terlebih Dahulu Untuk Mengganti Data Wilayah Ingatkan Sholat!\n\nContoh Perintah :\n${prefix}ingatkan off`)
				}
			break

				case prefix+'sticker': case prefix+'stiker': case prefix+'s':
					if (msg.message.imageMessage || isQuotedImage) {
						const outputSticker = './sticker/output.jpg'
						let buffer;
						// return console.log(quoted.quotedMsg)
						if(isQuotedImage)
						{
							buffer = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
						} else {
							buffer = await downloadMediaMessage(msg);
						}
						await writeFile(outputSticker, buffer);
						const image = await sharp(outputSticker).resize(200, 200).webp().toBuffer();
						const sticker = new Sticker(image)
						await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
						await conn.sendMessage(from, await sticker.toMessage());
						await unlink(outputSticker);
					} else {
						await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
					    await reply(`Kirim gambar dengan caption ${command} atau balas gambar yang sudah dikirim!`)
					}
			break

			case prefix+'murottal':
				let audioMurottal = await murottal()
				await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
				await reply("Harap Bersabar Akhi/Ukhti, Murottal Al-Qur'an Sedang Dikirim...😇🙏")
				await conn.sendMessage(from, { audio: { url : audioMurottal }, mimetype: 'audio/mp4', ptt:true })
				await reply("Selamat Mendengarkan Murottal Al-Qur'an Akhi/Ukhti😇🙏") 
			break

			case prefix+'dzikir':
				var teks = await dzikir(msg)
				await conn.sendMessage(from, {react: { text: '🕒', key: msg.key}})
				await conn.sendMessage(from, teks)
			break
			

			default:
			if (!isGroup && isCmd) {
				await conn.sendMessage(from, {react: { text: '❔', key: msg.key}})
				await reply(`Assalamualaikum Akhi/Ukhti👳‍♀️🧕 Mohon Maaf Perintah Ini Belum Ada Atau Tidak Tersedia, Silahkan Kirimkan Perintah *#menu* Untuk Melihat List Menu Dari Bot Khaer🙏`)
			}
		}
	} catch (err) {
		console.log('[ERROR] -> ', err)
	}
}


