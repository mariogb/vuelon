<template>
<div class="register-box">
  <h3>Forma de registro</h3>
  localErrors{{ localErrors }}
  <button v-on:click="rr()">rr</button>
  <form class="register-form" ref="registerForm">
    registerError{{ registerError }}
    <div class="username">
      <label for="username">
        Username
        <input
          type="text"
          class="username"
          name="username"
          v-model="registerUser.username"
          minlength="6"
          required
          pattern="^\s*([0-9a-zA-Z]*)\s*$"
        />
      </label>
      <span class="is-valid">isUsernameValid {{ isUsernameValid }}</span>
      <div class="instruction">[min 6 caractéres. Solo letras y números]</div>
    </div>

    <div class="password">
      <label for="password"
        ><span>{{ ui.password_label }}</span>
        <input
          type="password"
          class="password"
          name="password"
          v-model="registerUser.password"
          pattern="[a-zA-Z0-9].{6,}"
          required
          minlength="6"
        />
      </label>
      <span class="is-valid">isPasswordValid{{isPasswordValid}}</span>
    </div>
    <div class="password2">
      <label for="password2"
        ><span>{{ ui.password2_label }}</span>
        <input
          type="password"
          class="password"
          name="password2"
          v-model="registerUser.password2"
          pattern="[a-zA-Z0-9].{6,}"
          required
          minlength="6"
        />
      </label>

      <span class="is-valid">isPasswordsEquals{{ isPasswordsEquals }}</span>
    </div>
    <div class="email">
      <label for="email" class="register-form-label"
        ><span>{{ ui.email_label }}</span>
        <input
          type="email"
          class="email"
          name="email"
          v-model="registerUser.email"
      /></label>
      <span>isEmailValid{{isEmailValid}}</span>
    </div>

    <div class="buttons">
      isValidForm{{ isValidForm }}
      <button
        type="button"
        v-bind:disabled="!isValidForm === true"
        v-on:click="doRegister()"
      >
        {{ ui.register_button_label }}
      </button>
    </div>
  </form>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, Ref, ref } from "vue";

import { registerStore } from "../store/RegisterStore";

export default defineComponent({
  name: "register",
  setup(props, context) {
    const registerUser: Ref<{
      username?: string | undefined;
      password?: string | undefined;
      password2?: string | undefined;
      email?: string | undefined;
      d?: Date | undefined;
    }> = ref({
      username: "",
      password: "",
      password2: "",
      email: "",
    });

    const registerForm: Ref<HTMLFormElement | null> = ref(null);

    const patterMismatch = (ee) => {
      return ee["validity"]["patternMismatch"];
    };

    const isUsernameValid = computed(() => {
      const ru = registerUser.value;
      if (ru.username === null) {
        return false;
      }
      if (ru.username !== undefined && ru.username.length < 6) {
        return false;
      }
      const rf = registerForm.value;
      if (rf) {
        // const v_ = rf.elements["username"]["validity"];
        if (patterMismatch(rf.elements["username"])) {
          return false;
        }
      }

      return true;
    });

    const isPasswordValid = computed(() => {
      const ru = registerUser.value;
      if (ru.password === undefined || ru.password.length < 6) {
        return false;
      }
      const rf: HTMLFormElement | null = registerForm.value;
      if (rf) {
        if (patterMismatch(rf.elements["password"])) {
          return false;
        }
      }

      return true;
    });

    const isEmailValid = computed(() => {
      const ru = registerUser.value;
      if (ru.email === undefined || ru.email.length < 6) {
        return false;
      }
      return true;
    });

    const isPasswordsEquals = computed(() => {
      const ru = registerUser.value;
      return ru.password === ru.password2;
    });

    const localErrors = ref({ errUs: "" });

    const ui = ref({
      username_label: "Clave de usuario",
      password_label: "Contraseña",
      password2_label: "Repetir contraseña",
      email_label: "Correo",
      register_button_label: "Registrar",
      USERNAME_EXISTS: "Ya existe la clave de usuario. Intente otra",
      BAD_USERNAME: "Esta mal la clave de usuario",
      BAD_PASSWD: "Esta mal el password",
      PASSWORD_MISMATCH: "Las contraseñas no coinciden",
      register_good: "Has sido registrado",
    });

    const doRegister = () => {
      const ru = registerUser.value;
      ru["pname"] = "ddddddd";
      console.log(ru);
      ru.d = new Date();
      registerStore.doRegister(ru);
    };

    const registerError = computed(() => {
      return registerStore.getState().registerUserError;
    });

    const rr = () => {
      console.log(registerForm);
      const rf = registerForm.value;
      if (rf) {
        console.log(rf.elements["email"]["validity"]);
      }
    };

    const isValidForm = computed(() => {
      return (
        isUsernameValid.value &&
        isPasswordValid.value &&
        isPasswordsEquals.value &&
        isEmailValid.value
      );
    });

    return {
      registerUser,
      doRegister,
      ui,
      registerError,
      registerForm,
      rr,
      isValidForm,
      localErrors,
      isUsernameValid,
      isPasswordsEquals,
      isEmailValid,
      isPasswordValid,
    };
  },
});
</script> 
<style>
.register-form {
 
  padding: 24px;
  background: rgba(170, 17, 17, 0.144);
}

span.is-valid {
  display: block;
  color: aquamarine;
}
div.instruction {
  color: orange;
  background: black;
}

.register-box {
  display: flex;
  flex-direction: column;
   position: absolute;
  z-index: 4;
}

.register-box label {
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
</style>