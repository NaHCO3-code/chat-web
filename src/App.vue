<script>
import { config } from './config.js'
import { cp } from './modules/chatp.js'
import { safe } from './modules/safe.js'
import md5 from './modules/md5.js'

export default {
    data(){
        return {
            
        }
    },
    mounted(){},
    methods: {
        register(){
            cp.sendEncrypted(
                config.socket.server.publicKey,
                'register',
                JSON.stringify({
                    username: "xiaosuda",
                    password: md5('114514')
                })
            )
        }
    }
}
</script>

<template>
    <button @click="register()">register</button>
</template>
    
<style scoped>
</style>
