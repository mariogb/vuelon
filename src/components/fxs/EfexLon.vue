<template>
  <div class="efex first">
    <div style="--i: 0">

      <p style="--i: 5">Registrar, medir, conocer: Lugar x Tiempo x Evento</p>

      <div style="--i: 1">
        <span>Iput/Output Software, código</span>
        <div style="--i: 2">
          <span>Modelos, fabrica</span>
          <div style="--i: 3">
            <p style="--i: 3">Transformación, Evolución</p>
            <div style="--i: 4">
              <span>Conocimiento, automatización</span>
              <div style="--i: 5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script  lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
<style>
.efex div {
  --h: 18;
  border: 3vmin double hsl(var(--h), 100%, 50%);
  border-radius: 2.5vmin;
  margin: 2.5vmin;
  min-height: 15vmin;
  min-width: 15vmin;
  max-width: 100vmin;
  transform-style: preserve-3d;
  --prefix-transform: scale(0.85);

  animation: spinner 60000ms calc(var(--i) * -7200ms - 2000ms) infinite
    alternate ease-in-out backwards;
  animation-play-state: paused;

  background: radial-gradient(
    circle,
    hsl(var(--h) 80% 20% / 0.6),
    hsl(var(--h) 95% 30% / 0.18),
    hsl(var(--h) 100% 50% / 0.5)
  );
}

@keyframes spinner {
  0% {
    transform: var(--prefix-transform) rotateZ(1turn) rotateY(1turn);
  }
  100% {
    transform: var(--prefix-transform) rotateZ(0.25turn) rotateX(0turn);
  }
}

.efex > div > div {
  --prefix-transform: ;
  --h: 343;
}
.efex > div > div > div {
  --h: 123;
}
.efex > div > div > div > div {
  --h: 143;
}
.efex > div > div > div > div > div {
  --h: 103;
}
.efex > div > div > div > div > div > div {
  --h: 183;
}

@media all and (prefers-reduced-motion: no-preference) {
  .efex > div {
    animation-delay: calc(var(--i) * 1000ms);
    animation-play-state: running;
  }
  /**/
  .efex > div > div::before,
  .efex > div > div::after {
    background: hsl(var(--h, 303), 10%, 50%);
    content: "";
    position: absolute;
    left: 0;
    width: 2.5vmin;
    height: 0.5vmin;
    top: 50%;
    transform: translate(-5.5vmin, -50%);
  }
  .efex > div > div::after {
    left: initial;
    right: 0;
    transform: translate(5.5vmin, -50%);
  }
  /**/
}

div.efex {
  display: flex;
  justify-content: center;

  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 2;
}
</style>
