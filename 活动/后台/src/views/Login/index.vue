<template>
    <div class="layout">
        <div class="login">
        <img class="logo" src="../../../public/images/icon_dasun.png" alt="">
        <div class="loginBox">
            <div class="inputBox">
                <img src="../../../public/images/user.png" alt="">
                <input type="text" v-model="username" @keydown.enter="handleLogin">
            </div>
            <div class="inputBox">
                <img src="../../../public/images/password.png" alt="">
                <input type="password" v-model="password"  @keydown.enter="handleLogin">
            </div>
        </div>
        <img class="loginBtn" @click="handleLogin" src="../../../public/images/login.png" >
    </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import top from '@/components/header/index.vue';
import {handleSign} from '@/api/login';
@Component({
    name: 'Login',
    components: {
        top,
    },
})
export default class Login extends Vue {
    // 用户名
    public username: string = '';
    // 密码
    public password: string = '';
    // 登录
    public handleLogin(): void {
       if (!this.username || !this.password) {
           this.$layerd.handleAlert({
               content: '用户名或者密码不能为空',
           });
           return;
       }
       // 发送请求
       handleSign({
           mapStr: JSON.stringify({
               zh_zhm: this.username, // 用户名 
               zh_zhmm: this.password, // 密码
           }),
       }).then( (res: any) => {
            if (!Number(res.data.state)) {
                // 登录失败
                this.$layerd.handleAlert({
                    content: res.data.infoError,
                });
            } else {
                // 保存用户名
                sessionStorage.setItem('userName', res.data.infoSuccess);
                // 登录成功
                this.$layerd.handleAlert({
                    content: '登录成功',
                    time: 800,
                });
                // 跳转
                setTimeout(() => {
                    this.$router.push({
                        path: '/ExamineList',
                    });
                }, 1000);
            }
       });
    }
}
</script>

<style lang="scss" scoped>
    @import './css/style.scss';
</style>