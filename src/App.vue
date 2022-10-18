<template>
  <header class="header">
    <a href="#" class="logo logolon">VXLON</a>
    <div v-if="isAuth" class="menu-auth-usr">
      {{ typeLon }}
      <router-link v-if="typeLon === 'THIRD'" to="/welcomeThird" class="button"
        >Welcome THIRD</router-link
      >|
      <router-link v-if="typeLon === 'AGENT'" to="/welcomeAgent" class="button"
        >Welcome AGENT</router-link
      >|

      <router-link v-if="typeLon !== 'THIRD'" to="/w" class="button"
        >Welcome</router-link
      >|
      <mark
        class="username tertiary"
        v-if="elJWTParsed !== undefined && elJWTParsed !== null"
      >
        {{ typeLon }} {{ elJWTParsed.username }}</mark
      >
      <a href="#/docCom1"> | Comprar</a>

      <button v-on:click="chatMin = !chatMin">VC {{ chatMin }}</button>
      <button class="button logout" v-if="isAuth === true" @click="doLogout()">
        [Logout]
      </button>
    </div>
    <div v-if="!isAuth" class="btn-grp-lon">
      <button v-on:click="showRegOLog = 'REGISTER'">REGISTER</button>
      <button v-on:click="showRegOLog = 'LOGIN'">LOGIN</button>
    </div>
  </header>
  <main class="main">
    <section v-if="isAuth" class="wel-auth-cont">
      <router-view></router-view>
    </section>

    <section v-if="!isAuth" class="cont-noauth">
      <efex-lon />
      <auth-lon v-show="showRegOLog === 'LOGIN'" />
      <register v-show="showRegOLog === 'REGISTER'"></register>
    </section>
  </main>
  <div v-if="isAuth" class="chats0" v-bind:class="{ 'chats-min': chatMin }">
    <simple-chat v-bind:channel="'wrtc'" v-bind:channelid="1"></simple-chat>
  </div>
  <footer class="footer">
    <div>
      <div v-show="showConfigBack" class="conf-back">
        <button v-on:click="enableHttpSchema(true)">HTTPS</button>
        <button v-on:click="enableHttpSchema(false)">HTTP</button>
        <label for="server">server</label>
        <input type="text" v-model="server2" name="server" />
        <button @click="putBackeEnd()">putBackeEnd</button>
      </div>
      <button v-on:click="showConfigBack = !showConfigBack">BackEnd</button>
      <p>
        <small
          >Backend
          <a v-bind:href="`${httpSchema}://${server2}/t`" target="_nww"
            >{{ httpSchema }}://{{ server2 }}/t</a
          ></small
        >
      </p>
      <small style="display: none">Parsed jwt {{ elJWTParsed }}</small>
    </div>
  </footer>
</template>
<script  lang="ts">
import { ref, computed, defineComponent, defineAsyncComponent } from "vue";

import { authStore } from "./store/AuthStore";
import AuthLon from "./components/AuthLon.vue";
import Register from "./components/Register.vue";
import { uLibLon } from "./store/ULibLon";

const SimpleChat = defineAsyncComponent(
  () => import("./components/SimpleChat.vue")
);
const EfexLon = defineAsyncComponent(
  () => import("./components/fxs/EfexLon.vue")
);
export default defineComponent({
  components: { AuthLon, Register, SimpleChat, EfexLon },
  setup() {
    const putBackeEnd = () => {
      uLibLon.putBackEnd(server2.value);
    };
    const enableHttpSchema = (v: boolean) => {
      uLibLon.setHttpSchema(v);
      httpSchema.value = uLibLon.httpSchema();
    };
    const httpSchema = ref(uLibLon.httpSchema());

    const server2 = ref(uLibLon.backEnd());

    const username = computed(() => {
      return authStore.getState().username;
    });

    const doLogout = () => {
      authStore.doLogout();
      //const loc0 = window.location;
      //location.hash = "";
      //loc0.href = loc0.origin;
    };

    const showRegOLog = ref("LOGIN");
    const chatMin = ref(true);
    const showConfigBack = ref(false);

    const typeLon = computed(() => {
      return authStore.getState().parsedJWT["typeLon"];
    });

    return {
      doLogout,
      isAuth: computed(() => {
        return authStore.isAuth();
      }),
      elJWTParsed: computed(() => {
        return authStore.getState().parsedJWT;
      }),
      username,
      server2,
      putBackeEnd,
      showRegOLog,
      chatMin,
      typeLon,
      enableHttpSchema,
      httpSchema,
      showConfigBack,
    };
  },
});
</script>

<style lang="less">


html,body{
  margin: 0;
  padding: 0;
}

@first-color: #4e1728;
@second-color: #fa8383;
@third-color: #6b866a;
@fourth-color: #ffe4b3;

@main-background: darkcyan;
@main-color: brown;

@primary: #42a5f5;
@secondary: #ba68c8;
@error: #d32f2f;
@warning: #ed6c02;
@info: #0288d1;
@success: #2e7d32;
@font-size-default: 16px;


&:root {
  --first-color: @first-color;
  --second-color: @second-color;
  --third-color: @third-color;

  --fourth-color: @fourth-color;
  --main-background: @main-background;
  --main-color: @main-color;

  --primary-ligth: lighten(@primary, 15%);;
  --primary: @primary
  --primary-dark: darken(@primary, 30%);

  --secondary-ligth: lighten(@secondary, 15%);
  --secondary: @secondary;
  --secondary-dark: darken(@secondary, 30%);

  --error-light:lighten(@error, 15%);
  --error: @error
  --error-dark: darken(@error, 30%);

  --warning-light:lighten(@warning, 15%);
  --warning: @warning;
  --warning-dark: darken(@warning, 30%);

  --info-light: lighten(@info, 15%);;
  --info: @info;
  --info-dark: darken(@info,30%);
    
  --success-light: lighten(@success,15%);
  --success: @success;
  --success-dark: darken(@success,20%);

  //--table-tr-default-
  --table-background:lighten(@third-color, 46%);
  --table-oddrow-color: spin(lighten(@third-color, 55%),45%);
  --table-current-color: spin(lighten(@third-color, 28%),38);
  --table-thead-background: spin(darken(@third-color,20%), 120);
  --table-thead-color: lighten(spin(@third-color, 120),28%);

  --font-size-default:@font-size-default;
}

.primary {
  background: var(--primary);
}
.primary-main {
  background: var(--primary-main);
}
.primary-dark {
  background: var(--primary-dark);
}
.secondary {
  background: var(--secondary);
}
.secondary-main {
  background: var(--secondary-main);
}
.secondary-dark {
  background: var(--secondary-dark);
}
.error-light {
  background: var(--error-light);
}
.error-main {
  background: var(--error-main);
}
.error-dark {
  background: var(--error-dark);
}
.warning-light {
  background: var(--warning-light);
}
.warning-main {
  background: var(--warning-main);
}
.warning-dark {
  background: var(--warning-dark);
}
.info-light {
  background: var(--info-light);
}
.info-main {
  background: var(--info-main);
}
.info-dark {
  background: var(--info-dark);
}
.success-light {
  background: var(--success-light);
}
.success-main {
  background: var(--success-main);
}
.success-dark {
  background: var(--success-dark);
}

h1 {
  font-size: 24px;
}
h2 {
  font-size: 22px;
}
h3 {
  font-size: 20px;
}
h4 {
  font-size: 18px;
}
small {
  font-size: 10px;
}
option {
  &:checked {
    text-decoration-color: #6721ff;
    text-decoration-line: underline;
    word-spacing: 0.5rem;
    letter-spacing: 0.12rem;
    &::before {
      background: #0e390f;
      color: #f5fd04;
      content: " ✔";
      border-radius: 6px;
      padding-right: 3px;
      margin-right: 6px;
      padding-left: 3px;
      box-shadow: 2px 3px 2px orange;
    }
  }
}
&:focus {
  background: var(--info-light);
  color: #173000;
  box-shadow: 0 0 5px #03e9f4, 2px 0 25px #03f403, 0 0 35px #831ec7,
    0 0 75px #f40303;
}
#app {
  margin: 0;   
  font-size: var(--font-size-default);
  display: grid;
  grid-template-areas: 
  'header'
  'main'
  'footer';
   grid-template-rows: 180pxfr 100vh 180px;
   font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
}

.header{
  display: flex;
  top: 0;
  grid-area: header;
  position: sticky;
  z-index: 2000;
}
.footer{
  bottom: 0;
  z-index:2; 
  position: fixed;
  width: 100%;
  grid-area: footer;
}
.main{
  position: relative;
  z-index: 1;
  padding-bottom: 300px;
  margin-bottom: 300px;
  grid-area: main;
}
.header,.footer {
  background: @first-color;  
  color: lighten(@third-color, 46%);
 
  a{
    &:visited{
      color: lighten(@third-color, 46%);
    }
    
  }
}



.chats {
  border: 1px solid var(--m2-bg-color);
  padding: 8px;
  background: var(--m2-bg-color);
  color: var(--m2-color);
  margin: 20px;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 20;
}
.hover-lon-p {
  z-index: 200;
  display: inline-block;
  &:hover {
    background: rgba(1, 1, 1, 0.25);
  }
  .hover-lon-ch-sh {
    display: block;
    position: absolute;
    z-index: 10;
    background: #ccc;
    margin: auto;
    list-style: none;
    padding: 8px;
    left: 0px;
    text-align: left;
  }
}
.hover-lon-ch {
  display: none;
}
.hover-lon-ch-sh {
  li {
    border-bottom: 1px solid #9bb8ff;
    
  }
}


.chats0 {
  position: fixed;
  top: 10%;
  bottom: 10%;
  left: 1rem;
  right: 1rem;
  background: #0ff;
  padding: 0.75rem;
  box-shadow: 2px 2px 3px #0d7e03;
  overflow: auto;
  border-top-width: 3px;
  border-top-style: solid;
  border-right-width: 4px;
  border-right-style: solid;
  border-left-width: 6px;
  border-left-style: solid;
  z-index: 15000;
}
.chats-min {
  opacity: 0.75;
  z-index: 3000;
  transform: translateX(42%) translateY(46%) scale(18%);
  background: rgba(1, 1, 2, 0.5);
  overflow: auto;
}


.menu-auth-usr {
  display: inline-block;
  background: var(--pri);
  width: 100%;
}
.logolon {
  background: var(--second-color);
  
}

.conf-back{
  background: #03e9f4;
}

@media screen and (max-width: 600px) {
    .main{
      padding-bottom:100px ;
      margin-bottom: 100px;
    }
    .hm{
      display: none;
    }

}
@media screen and (max-height: 600px) {

}

</style>


