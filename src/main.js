import { createApp } from 'vue'
import { safe } from './modules/safe.js'
import { config } from './config.js'
import Socketio from './plugins/Socket.io.js'
import { cp } from './modules/chatp.js'

import './style.css'
import App from './App.vue'


new Promise((res, rej) => {
    /* safe初始化配置 */
    safe.getRsaKeys((privateKey, publicKey) => {
        config.socket.privateKey = privateKey
        config.socket.publicKey = publicKey
        res(void 0)
    })
})
.then(val => new Promise((res, rej)=>{
    cp.emit('publicKey', {
        publicKey: config.socket.publicKey
    })
    res(void 0)
}))
.then(val => new Promise((res, rej) => {
    cp.socketInit()
    res(void 0)
}))
.then(val=>{
    let app = createApp(App)

    app.mount('#app')    
})
// .catch(err => {})


