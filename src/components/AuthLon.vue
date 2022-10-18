<template lang="pug">
.auth-box
  .usrname
    label(for="username") username
    input(type="text", name="username", v-model="username")
    p.err(v-if="preSendError.username") {{ preSendError.username }}
  .password
    label(for="password") password
    input(type="password", name="password", v-model="password")
    p.err(v-if="preSendError.password") {{ preSendError.password }}
  .buttons 
    button.btn-login(role="button", @click="doLogin()") Login

  p.login_error {{ loginError }}
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { authStore } from "../store/AuthStore";

export default {
  setup() {
    const username = ref("admin");
    const password = ref("1234");

    const preSendError = ref({});

    const doLogin = () => {
      preSendError.value = {};
      const u = username.value;
      const p = password.value;
      if (!u || u.length < 3) {
        preSendError.value["username"] = "Too short";
        return;
      }
      if (!p || p.length < 3) {
        preSendError.value["password"] = "Too short";
        return;
      }
      authStore
        .doLogin(username.value, password.value)
        .then((bv) => {
          
        })
        .catch((eL) => {
          
        });
    };

    const isAuth = computed(() => authStore.isAuth());

    return {
      username,
      password,
      doLogin,
      isAuth,
      loginError: computed(() => authStore.getState().error),
      preSendError,
    };
  },
};
</script>
<style>
.auth-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: absolute;
  z-index: 4;
  top: 48px;
}
.auth-box label {
  width: 96px;
  display: inline-block;
  font-size: 1.12rem;
  margin-right: 22px;
  color: azure;
  text-shadow: 2px 2px 2px black;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  text-transform: uppercase;
}
.auth-box input {
  width: 100px;
}
.auth-box input {
  margin: 2px;
}

.btn-login {
  width: 132px;
  margin-top: 12px;
  margin-left: 12px;
  margin-bottom: 16px;
}
</style>