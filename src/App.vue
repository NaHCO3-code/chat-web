<script setup>
import SpaceVue from './components/Space.vue'

import { config } from './config.js'
import { cp } from './modules/chatp.js'
import { safe } from './modules/safe.js'
import md5 from './modules/md5.js'

function register() {
    cp.sendEncrypted(
        config.socket.server.publicKey,
        'register',
        JSON.stringify({
            username: "xiaosuda",
            password: md5('114514')
        })
    )
}
</script>

<template>
    <space-vue/>
    <div class="container">
        <button @click="register()">register</button>
    </div>
</template>
    
<style>
.container{
    display: flex;
    height: 100px;
    align-items: center;
    justify-content: center;
}
</style>
