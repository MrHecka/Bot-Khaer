"use strict";
const axios = require("axios");
const fs = require("fs");
const fetch = require('node-fetch')
const jimp = require("jimp")
const { proto, delay, getContentType } = require('@whiskeysockets/baileys')

exports.serialize = (conn, msg) => {


    try{
        const berak = Object.keys(msg.message)[0]
        msg.type = berak
    } catch {
        msg.type = null
    }
    try{
        const context = msg.message[msg.type].contextInfo.quotedMessage
        if(context["ephemeralMessage"]){
            msg.quotedMsg = context.ephemeralMessage.message
        }else{
            msg.quotedMsg = context
        }
        msg.isQuotedMsg = true
        msg.quotedMsg.sender = msg.message[msg.type].contextInfo.participant
        msg.quotedMsg.fromMe = msg.quotedMsg.sender === conn.user.id.split(':')[0]+'@s.whatsapp.net' ? true : false
        msg.quotedMsg.type = Object.keys(msg.quotedMsg)[0]
        let ane = msg.quotedMsg
        msg.quotedMsg.chats = (ane.type === 'conversation' && ane.conversation) ? ane.conversation : (ane.type == 'imageMessage') && ane.imageMessage.caption ? ane.imageMessage.caption : (ane.type == 'documentMessage') && ane.documentMessage.caption ? ane.documentMessage.caption : (ane.type == 'videoMessage') && ane.videoMessage.caption ? ane.videoMessage.caption : (ane.type == 'extendedTextMessage') && ane.extendedTextMessage.text ? ane.extendedTextMessage.text : (ane.type == 'buttonsMessage') && ane.buttonsMessage.contentText ? ane.buttonsMessage.contentText : ""
        msg.quotedMsg.id = msg.message[msg.type].contextInfo.stanzaId
    }catch{
        msg.quotedMsg = null
        msg.isQuotedMsg = false
    }

    try{
        const mention = msg.message[msg.type].contextInfo.mentionedJid
        msg.mentioned = mention
    }catch{
        msg.mentioned = []
    }
    
    if (msg){
        msg.sender = msg.key.remoteJid
    }
    if (msg.key.fromMe){
        msg.sender = conn.user.id.split(':')[0]+'@s.whatsapp.net'
    }

    msg.from = msg.key.remoteJid
    msg.now = msg.messageTimestamp
    msg.fromMe = msg.key.fromMe

    return msg
}

exports.getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


exports.isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
    }

exports.getBuffer = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        })
        return res.data
    } catch (err) {
        return err
    }
}

exports.fetchJson = async (url, options) => {
    try {
    options ? options : {}
    const res = await axios({
    method: 'GET',
    url: url,
    headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
    },
    ...options
    })
    return res.data
    } catch (err) {
    return err
    }
    }


exports.fetchText = (url, options) => new Promise(async(resolve, reject) => {
    fetch(url, options)
        .then(response => response.text())
        .then(text => {
            resolve(text)
        })
        .catch((err) => {
            reject(err)
        })
})



exports.runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

exports.removeEmojis = (string) => {
	var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
	return string.replace(regex, '');
}

exports.calculate_age = (dob) => { // new Date("month/date/year")
    var diff_ms = Date.now() - dob.getTime();
	var age_dt = new Date(diff_ms);
	return Math.abs(age_dt.getUTCFullYear() - 1970);
}

exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.url = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
}

exports.makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

exports.smsg = (conn, m, store) => {
    if (!m) return m
    let M = proto.WebMessageInfo
    if (m.key) {
    m.id = m.key.id
    m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
    m.chat = m.key.remoteJid
    m.fromMe = m.key.fromMe
    m.isGroup = m.chat.endsWith('@g.us')
    m.sender = conn.decodeJid(m.fromMe && conn.user.id || m.participant || m.key.participant || m.chat || '')
    if (m.isGroup) m.participant = conn.decodeJid(m.key.participant) || ''
    }
    if (m.message) {
    m.mtype = getContentType(m.message)
    m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype])
    m.body = m.message.conversation || m.msg.caption || m.msg.text || (m.mtype == 'listResponseMessage') && m.msg.singleSelectReply.selectedRowId || (m.mtype == 'buttonsResponseMessage') && m.msg.selectedButtonId || (m.mtype == 'viewOnceMessage') && m.msg.caption || m.text
    let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null
    m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
    if (m.quoted) {
    let type = getContentType(quoted)
                m.quoted = m.quoted[type]
    if (['productMessage'].includes(type)) {
                    type = getContentType(m.quoted)
                    m.quoted = m.quoted[type]
                }
    if (typeof m.quoted === 'string') m.quoted = {
                    text: m.quoted
                }
    m.quoted.mtype = type
    m.quoted.id = m.msg.contextInfo.stanzaId
                m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
    m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
                m.quoted.sender = conn.decodeJid(m.msg.contextInfo.participant)
                m.quoted.fromMe = m.quoted.sender === (conn.user && conn.user.id)
    m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
                m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
    m.getQuotedObj = m.getQuotedMessage = async () => {
                if (!m.quoted.id) return false
                let q = await store.loadMessage(m.chat, m.quoted.id, conn)
                 return exports.smsg(conn, q, store)
    }
    let vM = m.quoted.fakeObj = M.fromObject({
    key: {
    remoteJid: m.quoted.chat,
    fromMe: m.quoted.fromMe,
    id: m.quoted.id
    },
    message: quoted,
    ...(m.isGroup ? { participant: m.quoted.sender } : {})
    })
    
    m.quoted.delete = () => conn.sendMessage(m.quoted.chat, { delete: vM.key })
    
    m.quoted.copyNForward = (jid, forceForward = false, options = {}) => conn.copyNForward(jid, vM, forceForward, options)
    
    m.quoted.download = () => conn.downloadMediaMessage(m.quoted)
    }
    }
    if (m.msg.url) m.download = () => conn.downloadMediaMessage(m.msg)
    m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || ''
    
        m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)))
    
        m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => conn.copyNForward(jid, m, forceForward, options)
    
    return m
    }
