<template>
  <header class="header first">
    <a href="#" id="logo-lon"> LON </a>
    <div v-if="isAuth" class="menu-auth-usr">
      
      <router-link v-if="typeLon === 'THIRD'" to="/welcomeThird" class="button"
        >Welcome THIRD</router-link
      >
      <router-link v-if="typeLon === 'AGENT'" to="/welcomeAgent" class="button"
        >Welcome AGENT</router-link
      >

      <router-link v-if="typeLon !== 'THIRD'" to="/w" class="button"
        >Welcome</router-link
      >
      <mark style="margin-right:6px"
        class="username tertiary"
        v-if="elJWTParsed !== undefined && elJWTParsed !== null"
      >
        <span>{{ elJWTParsed.username }}</span>
        <span>{{ typeLon }}</span>
          </mark
      >
      <div class="rigth">
        <a href="#/vlPurchase">vl-purchase </a> 
        <span> | </span>
        <a href="#/vlSale">vl-Sale </a>

        <button class="morado" v-on:click="chatMin = !chatMin">
          Video Conferencia <small></small>
        </button>
        <button
          class="button logout"
          v-if="isAuth === true"
          @click="doLogout()"
        >
          [Logout]
        </button>
      </div>
    </div>
    <div v-if="!isAuth">
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
  <footer class="footer first">
    <div>
      <div v-show="showConfigBack">
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
@first-color: #25316d;
@second-color: #5f6f94;
@third-color: #97d2ec;
@fourth-color: #fef5ac;

@primary: #42a5f5;
@secondary: #ba68c8;
@error: #d32f2f;
@warning: #ed6c02;
@info: #0288d1;
@success: #2e7d32;
@font-size-default: 14px;

&:root {
  --first-color: @first-color;
  --second-color: @second-color;
  --third-color: @third-color;
  --fourth-color: @fourth-color;

  --primary: @primary;
  --secondary: @secondary;
  --error: @error;
  --warning: @warning;
  --warning-f: invert(@warning);
  --info: @info;
  --success: @success;

  //--table-tr-default-

  --table-oddrow-color: lighten(@third-color, 10%);
  --table-current-color: darken(@fourth-color, 2%);
  --table-thead-background: darken(@second-color, 20%);
  --table-thead-color: lighten(spin(@third-color, 120), 28%);

  --font-size-default: @font-size-default;

  --form-fld-color: lighten(@third-color, 20%);
}

.first {
  background: var(--first-color);
  color: #fff;
}

.second {
  background: var(--second-color);
  color: rgb(0, 0, 0);
}

.second-l {
  background: lighten(@third-color, 20%);
  color: rgb(0, 0, 0);
}

.third {
  background: var(--third-color);
  color: rgb(0, 0, 0);
}

.primary {
  background: var(--primary);
  color: #fff;
}

.secondary {
  background: var(--secondary);
}

.error {
  background: var(--error);
}

.warning {
  background: var(--warning);
  color: var(--warning-f);
}

.info {
  background: var(--info);
}

.success {
  background: var(--success);
}

#logo-lon {
  background: var(--primary);
  color: #fff;
  font-size:1.32em;
  padding: 6px;
  margin: 7px;
  box-shadow: -5px 4px 2px #6d2ec8;
  border-radius: 4px;
  font-family: Arial,sans;

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
  background: #d4f0ff;
  color: #1705f2;
  box-shadow: 0 0 5px #03e9f4, 2px 0 25px #03f403, 0 0 35px #831ec7,
    0 0 75px #f40303;
}
#app {
  margin: 0;
  color: #25316d;
  display: grid;
  grid-template-areas:
    "header"
    "main"
    "footer";
  grid-template-rows: 180pxfr 100vh 180px;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
}

.header {
  display: flex;
  top: 0;
  grid-area: header;
  position: sticky;
  z-index: 2000;
}
.footer {
  bottom: 0;
  z-index: 2;
  position: fixed;
  width: 100%;
  grid-area: footer;
}
.main {
  position: relative;
  z-index: 1;
  padding-bottom: 300px;
  margin-bottom: 300px;
  grid-area: main;
}
.header,
.footer {
  a {
    &:visited {
      color: lighten(@third-color, 46%);
    }
  }
}

.debug {
  background: #03e9f4;
  display: none;
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

.rigth{
  float: right;
}

.morado{
  background: #5f4ad2;
  color: yellow;
  font-family: sans;
  font-weight: bolder;
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
  width: 100%;
}
.menu-auth-usr a {
  color: #ffc;
}

@media screen and (max-width: 600px) {
  .main {
    padding-bottom: 100px;
    margin-bottom: 100px;
  }
  .hm {
    display: none;
  }
  button {
    font-size: 22;
  }
}
@media screen and (max-height: 600px) {
}
</style>


