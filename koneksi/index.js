"use strict";
const {
	default: makeWASocket,
	BufferJSON,
	initInMemoryKeyStore,
	DisconnectReason,
	AnyMessageContent,
        makeInMemoryStore,
	useMultiFileAuthState,
	delay
} = require("@whiskeysockets/baileys")
const figlet = require('figlet');
const fs = require('fs');
const moment = require('moment')
const moments = require('moment-timezone')
const chalk = require('chalk')
const logg = require('pino')
const cron = require('node-cron')
const clui = require('clui')
const axios = require('axios')
const { Spinner } = clui
const { serialize } = require("../lib/fungsi");
const { color, mylog, infolog } = require("../lib/color");
const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')
let setting = JSON.parse(fs.readFileSync('./config.json'));
let session = `./${setting.sessionName}.json`
let welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));



function title() {
      console.clear()
	  console.log(chalk.bold.green(figlet.textSync('BOT KHAER', {
		font: 'Standard',
		horizontalLayout: 'default',
		verticalLayout: 'default',
		width: 80,
		whitespaceBreak: false,
        color: 'green'
	})))
	console.log(chalk.yellow(`\n                        ${chalk.yellow('[ BOT KHAER ]')}\n\n${chalk.red('Bot-Khaer')} : ${chalk.white('WhatsApp Bot Islami')}\n${chalk.red('Follow Insta Dev')} : ${chalk.white('@hekaa_14')}\n${chalk.red('Donasi')} : ${chalk.white('https://www.saweria.co/MrHecka ( Saweria )')}\n`))
    console.log(chalk.blue(`                 >> START <<\n`))
}

/**
* Uncache if there is file change;
* @param {string} module Module name or path;
* @param {function} cb <optional> ;
*/
function nocache(module, cb = () => { }) {
	console.log(`Module ${module} sedang diperhatikan terhadap perubahan`) 
	fs.watchFile(require.resolve(module), async () => {
		await uncache(require.resolve(module))
		cb(module)
	})
}
/**
* Uncache a module
* @param {string} module Module name or path;
*/
function uncache(module = '.') {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(module)]
			resolve()
		} catch (e) {
			reject(e)
		}
	})
}

const status = new Spinner(chalk.cyan(` Booting WhatsApp Bot`))
const starting = new Spinner(chalk.cyan(` Preparing After Connect`))
const reconnect = new Spinner(chalk.redBright(` Reconnecting WhatsApp Bot`))

const store = makeInMemoryStore({ logger: logg().child({ level: 'fatal', stream: 'store' }) })

async function fanStart() {
const connectToWhatsApp = async () => {
	const { state, saveCreds } = await useMultiFileAuthState('KhaerAuth')
	const conn = makeWASocket({
            printQRInTerminal: true,
            logger: logg({ level: 'fatal' }),
            auth: state,
            browser: ["Bot Khaer", "Safari", "3.0"],
	    getMessage: async key => {
              return {
                
              }
          }
        })
	title()
        store.bind(conn.ev)
	

		// UPDATE DATABASE INGATKAN
		cron.schedule(`01 00 * * *`, async() => {
			// DATABASE INGATKAN SHOLAT
			let DBingatkan = JSON.parse(fs.readFileSync('./database/ingatkan.json'))
			for (var i = 0; i < DBingatkan.length; i++) {
				let tahunS = await moments.tz('asia/jakarta').format('YYYY')
				let bulanS = await moments.tz('asia/jakarta').format('MM')
				let hariS = await moments.tz('asia/jakarta').format('DD')
				let tglSkrng = await tahunS + "/" + bulanS + "/" + hariS
				idWilayahUser = await DBingatkan[i].IDL
				let res = await axios.get(`https://api.myquran.com/v2/sholat/jadwal/${idWilayahUser}/${tglSkrng}`)
					let jadwalnya = await res.data.data.jadwal
					let lokasi = await res.data.data.lokasi
					let daerah = await res.data.data.daerah
					let idLok = await res.data.data.id
					let tanggal = await jadwalnya.tanggal
					let imsak = await jadwalnya.imsak
					let subuh = await jadwalnya.subuh
					let terbit = await jadwalnya.terbit
					let dhuha = await jadwalnya.dhuha
					let dzuhur = await jadwalnya.dzuhur
					let ashar = await jadwalnya.ashar
					let maghrib = await jadwalnya.maghrib
					let isya = await jadwalnya.isya
					DBingatkan[i].tanggal = await tanggal
					DBingatkan[i].imsak = await moments(imsak,'HH:mm').add(DBingatkan[i].zona, 'hours').format('HH:mm')
					DBingatkan[i].subuh = await moments(subuh,'HH:mm').add(DBingatkan[i].zona, 'hours').format('HH:mm')
					DBingatkan[i].terbit = await moments(terbit,'HH:mm').add(DBingatkan[i].zona, 'hours').format('HH:mm')
					DBingatkan[i].dhuha = await moments(dhuha,'HH:mm').add(DBingatkan[i].zona, 'hours').format('HH:mm')
					DBingatkan[i].dzuhur = await moments(dzuhur,'HH:mm').add(DBingatkan[i].zona, 'hours').format('HH:mm')
					DBingatkan[i].ashar = await moments(ashar,'HH:mm').add(DBingatkan[i].zona, 'hours').format('HH:mm')
					DBingatkan[i].maghrib = await moments(maghrib,'HH:mm').add(DBingatkan[i].zona, 'hours').format('HH:mm')
					DBingatkan[i].isya = await moments(isya,'HH:mm').add(DBingatkan[i].zona, 'hours').format('HH:mm')
					await fs.writeFileSync('./database/ingatkan.json', JSON.stringify(DBingatkan,null,2));
			}
		})
		// UPDATE DATABASE INGATKAN


		// FITUR INGATKAN SHOLAT
		cron.schedule(`* * * * *`, async() => {
			// DATABASE INGATKAN SHOLAT
			let DBingatkan = JSON.parse(fs.readFileSync('./database/ingatkan.json'))
			for(let x =0; x < DBingatkan.length; x++) {
				let wimsakz = await DBingatkan[x].imsak
				let wfimsak = await wimsakz.split(":")

				let wsubuhz = await DBingatkan[x].subuh
				let wfsubuh = await wsubuhz.split(":")
				
				let wterbitz = await DBingatkan[x].terbit
				let wfterbit = await wterbitz.split(":")

				let wdhuhaz = await DBingatkan[x].dhuha
				let wfdhuha = await wdhuhaz.split(":")

				let wdzuhurz = await DBingatkan[x].dzuhur
				let wfdzuhur = await wdzuhurz.split(":")

				let washarz = await DBingatkan[x].ashar
				let wfashar = await washarz.split(":")

				let wmaghribz = await DBingatkan[x].maghrib
				let wfmaghrib = await wmaghribz.split(":")
				
				let wisyaz = await DBingatkan[x].isya
				let wfisya = await wisyaz.split(":")
			
				let WJAMS = await moments.tz('asia/jakarta').format('HH')
				let WMENITS = await moments.tz('asia/jakarta').format('mm')
				let WHARIS = await moments().locale('id').tz('asia/jakarta').format('dddd')
				
				// INGATKAN IMSAK
				if(WJAMS === wfimsak[0] && WMENITS === wfimsak[1]) {
					await conn.sendMessage(DBingatkan[x].nomor, { text: `[🔔] WAKTUNYA IMSYAK [🔔]\n\nAssalamualaikum Akhi/Ukhti😇🙏 Waktu Sudah Menunjukkan Pukul ${wimsakz} Di Wilayah ${DBingatkan[x].lokasi}` })
				}

				// INGATKAN SHOLAT SUBUH
				if(WJAMS === wfsubuh[0] && WMENITS === wfsubuh[1]) {
					await conn.sendMessage(DBingatkan[x].nomor, { text : `[🧎] WAKTUNYA SHOLAT SUBUH [🔔]\n\nAssalamualaikum Akhi/Ukhti😇🙏 Waktu Sudah Menunjukkan Pukul ${wsubuhz} Di Wilayah ${DBingatkan[x].lokasi}` })
				}

				// INGATKAN MATAHARI TERBIT
				if(WJAMS === wfterbit[0] && WMENITS === wfterbit[1]) {
					await conn.sendMessage(DBingatkan[x].nomor, { text: `[☀] WAKTUNYA MATAHARI TERBIT [🔔]\n\nAssalamualaikum Akhi/Ukhti😇🙏 Waktu Sudah Menunjukkan Pukul ${wterbitz} Di Wilayah ${DBingatkan[x].lokasi}` })
				}

				// INGATKAN SHOLAT DHUHA
				if(WJAMS === wfdhuha[0] && WMENITS === wfdhuha[1]) {
					await conn.sendMessage(DBingatkan[x].nomor, { text: `[🧎] WAKTUNYA SHOLAT DHUHA [🔔]\n\nAssalamualaikum Akhi/Ukhti😇🙏 Waktu Sudah Menunjukkan Pukul ${wdhuhaz} Di Wilayah ${DBingatkan[x].lokasi}` })
				}

				// INGATKAN SHOLAT DZUHUR/JUMATAN
				if(WJAMS === wfdzuhur[0] && WMENITS === wfdzuhur[1]) {
					 await conn.sendMessage(DBingatkan[x].nomor, { text: `[🧎] WAKTUNYA SHOLAT DZUHUR [🔔]\n\nAssalamualaikum Akhi/Ukhti😇🙏 Waktu Sudah Menunjukkan Pukul ${wdzuhurz} Di Wilayah ${DBingatkan[x].lokasi}` })
				} else if (WJAMS === wfdzuhur[0] && WMENITS === wfdzuhur[1] && WHARIS == "Jumat") {
					await conn.sendMessage(DBingatkan[x].nomor, { text: `[🧎] WAKTUNYA SHOLAT JUMAT/DZUHUR [🔔]\n\nAssalamualaikum Akhi/Ukhti😇🙏 Waktu Sudah Menunjukkan Pukul ${wdzuhurz} Di Wilayah ${DBingatkan[x].lokasi}` })
				}

				// INGATKAN SHOLAT ASHAR
				if(WJAMS === wfashar[0] && WMENITS === wfashar[1]) {
					 await conn.sendMessage(DBingatkan[x].nomor, { text: `[🧎] WAKTUNYA SHOLAT ASHAR [🔔]\n\nAssalamualaikum Akhi/Ukhti😇🙏 Waktu Sudah Menunjukkan Pukul ${washarz} Di Wilayah ${DBingatkan[x].lokasi}` })
				}

				//   INGATKAN SHOLAT MAGHRIB
				if(WJAMS === wfmaghrib[0] && WMENITS === wfmaghrib[1]) {
					await conn.sendMessage(DBingatkan[x].nomor, { text: `[🧎] WAKTUNYA SHOLAT MAGHRIB [🔔]\n\nAssalamualaikum Akhi/Ukhti😇🙏 Waktu Sudah Menunjukkan Pukul ${wmaghribz} Di Wilayah ${DBingatkan[x].lokasi}` })
				}

				//   INGATKAN SHOLAT ISYA
				if(WJAMS === wfisya[0] && WMENITS === wfisya[1]) {
					await conn.sendMessage(DBingatkan[x].nomor, { text: `[🧎] WAKTUNYA SHOLAT ISYA [🔔]\n\nAssalamualaikum Akhi/Ukhti😇🙏 Waktu Sudah Menunjukkan Pukul ${wisyaz} Di Wilayah ${DBingatkan[x].lokasi}` })
					
				}
			}
		  }, { scheduled: true, timezone:"Asia/Jakarta" })
		

		//   FITUR INGATKAN SHOLAT

	/* Auto Update */
	require('../pesan_handle/bantuan')
	require('../lib/fungsi')
	require('../pesan_handle/pesan')
	nocache('../pesan_handle/bantuan', module => console.log(chalk.greenBright('[ BOT KHAER ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	nocache('../lib/fungsi', module => console.log(chalk.greenBright('[ BOT KHAER ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	nocache('../pesan_handle/pesan', module => console.log(chalk.greenBright('[ BOT KHAER ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	
	conn.multi = true
	conn.nopref = false
	conn.prefa = ''
	conn.mode = 'public'
	conn.ev.on('messages.upsert', async m => {
		if (!m.messages) return;
		var msg = m.messages[0]
		msg = serialize(conn, msg)
		msg.isBaileys = msg.key.id.startsWith('BAE5') || msg.key.id.startsWith('3EB0')
		require('../pesan_handle/pesan')(conn, msg, m, setting, store, welcome)
	})
	conn.ev.on('connection.update', (update) => {
          if (global.qr !== update.qr) {
           global.qr = update.qr
          }
          const { connection, lastDisconnect } = update
            if (connection === 'close') {
                lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? connectToWhatsApp() : console.log('connection logged out...')
            }
        })
	conn.ev.on('creds.update', await saveCreds)
	
    conn.ev.on('groups.upsert', async gr => {
        await conn.sendMessage(gr[0].id, { text: 'Assalamualaikum, Mohon Maaf Bot Khaer Hanya Bisa Diggunakan Via DM Saja🙏'})
        await conn.groupLeave(gr[0].id)
    })

	conn.reply = (from, content, msg) => conn.sendMessage(from, { text: content }, { quoted: msg })

	return conn
}

connectToWhatsApp()
.catch(err => console.log(err))
}

fanStart()


