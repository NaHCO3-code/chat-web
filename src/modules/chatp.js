import io from 'socket.io-client'
import { config } from '../config.js'
import { safe } from './safe.js'

let socket = io(`http://${config.server.host}:${config.server.port}`)

/**
 * 添加监听器
 * @param {String} event
 * @param {Function(data)} callback
 */
function addListenr(event, callback){
    socket.on(event, (data)=>{
        if(data.encrypt == true){
            callback(safe.decrypt(data.data, config.socket.privateKey))
        }else{
            callback(data)
        }
    })
}

/**
 * （即将弃用）发送消息
 * @param {Object} event
 * @param {Object} data
 */
function emit(event, data){
    socket.emit(event, data)
}

/**
 * 加密发送
 * @param {Socket} socket socekt
 * @param {String} publicKey 公钥
 * @param {String} event 事件
 * @param {String} data 数据
 */
function sendEncrypted(publicKey, event, data){
    socket.emit(
        event,
        {
            encrypt: true,
            data: safe.encrypt(data, publicKey),
        }
    );
}

/**
 * init
 */
function socketInit(){
    addListenr('helloworld', (data)=>{
        console.log(data)
    })
    addListenr('publicKey', (data)=>{
        config.socket.server.publicKey = data.publicKey
        console.log(config.socket.server.publicKey)
    })
}

export const cp = {
    socket,
    addListenr,
    emit,
    socketInit,
    sendEncrypted,
}