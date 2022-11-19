<template>
  <h3>SimpleChat</h3>
  <div :class="{ open: skStatus === 'open' }">
    <div>
      <div class="row media-capabilites" v-if="capabilites !== undefined">
        <div>Has Video {{ capabilites.hasVideo === true }}</div>
        <div>Has Audio {{ capabilites.hasAudio === true }}</div>
      </div>

      <ul class="row l-devices">
        <li v-for="(ldvs, kind) in mDevices" :key="kind">
          {{ kind }}
          <div v-for="d in ldvs" :key="d">
            {{ d }}
          </div>
        </li>
      </ul>
      <div class="box-video-input row">
        <div class="rosw">
          <div class="colw">
            <video ref="vlocal00a" controls class="vlocal00">s</video>
            <div>
              <span>aa</span>
              <button v-on:click="doGetUserMedia00('a', 1)">Cam</button>
              <button v-on:click="doGetUserMedia00('a', 2)">Screen</button>
            </div>
          </div>

          <div class="colw">
            <video ref="vlocal00b" controls class="vlocal00">s</video>
            <div>
              <span>bb</span>
              <button v-on:click="doGetUserMedia00('b', 1)">Cam</button>
              <button v-on:click="doGetUserMedia00('b', 2)">Screen</button>
            </div>
          </div>

          <div class="colw">
            <video ref="vlocal00c" controls class="vlocal00">s</video>
            <div>
              <span>bb</span>
              <button v-on:click="doGetUserMedia00('b', 1)">Cam</button>
              <button v-on:click="doGetUserMedia00('b', 2)">Screen</button>
            </div>
          </div>
        </div>

        <div class="rosw">
          <div class="colw">
            <div class="cols">
              <canvas
                class="canvas-out"
                ref="canvasout"
                width="320"
                height="240"
              ></canvas>
              <div>Canvas 1</div>

              <button v-on:click="initCanvasDraw()">initCanvasDraw</button>
              <div>
                <input type="checkbox" v-model="cromaColorAEnable" />
                <span> cromaColorAEnable</span>
              </div>
              <div>
                <span>cromaColorA {{ cromaColorA }}</span>

                <input type="color" v-model="cromaColorA" />
              </div>
              <div>
                <span> diffGreen</span>
                <input
                  type="number"
                  min="0"
                  max="255"
                  size="3"
                  v-model="diffGreen"
                />
              </div>
            </div>
          </div>

          <div class="colw">
            <div class="cols">
              Canvas 2
              <canvas
                id="c0001"
                class="canvas-out"
                ref="canvasout2"
                width="320"
                height="240"
              ></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>WS://{{ props0.channel }}/{{ props0.channelid }}</div>
   
    <div class="msg-box">
      <div v-for="(m, idx) in losMsgs" :key="(('m_' + idx))" class="msg">
        <small class="msg-usr">{{ m.from_username }}</small> {{ m.text }}
        <div class="msg-time">{{ m.d.getHours() }}:{{ m.d.getMinutes() }}</div>
      </div>
    </div>
    <div class="msg-text">
      <textarea v-model="txt"></textarea>
      <button v-on:click="w1">S</button>
    </div>

    <template v-for="(u, uid) in losUsers">
      <template v-if="Number(uid) * 1 !== miUid() && u.close !== true">
        <div v-bind:key="('u-' + uid)">
          {{ u.from_username }}
          <web-real-lon
            v-bind:to_uid="(Number(uid) + '')"
            v-bind:channel="props0.channel"
            v-bind:channelid="props0.channelid"
          ></web-real-lon>
        </div>
      </template>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch, Ref } from "vue";
import { authStore } from "../store/AuthStore";
import {uLibLon} from "../store/ULibLon" 


import { simpleChatStore } from "../store/simpleChatStore";
import { mediaInfoStore } from "../store/MediaInfoStore";
import AutoCompleter from "./AutoCompleter.vue";
import { toRGBInts } from "../liblon/CanVidLon";

import WebRealLon from "./WebRealLon.vue";

let w0: WebSocket | null = null;
export default defineComponent({
  components: {
    WebRealLon,
    AutoCompleter,
  },

  props: {
    channel: String,
    channelid: Number,
  },
  name: "simple-chat",

  setup(props, context) {
    const txt = ref("");
    const k0 = `${props.channel}/${props.channelid}`;
    const vlocal00a: Ref<HTMLVideoElement | null> = ref(null);
    const vlocal00b: Ref<HTMLVideoElement | null> = ref(null);
    const vlocal00c: Ref<HTMLVideoElement | null> = ref(null);
    const canvasout: Ref<HTMLCanvasElement | null> = ref(null);
    const canvasout2: Ref<HTMLCanvasElement | null> = ref(null);
    const skStatus = ref("close");
    const shareScreen = ref(false);
    const isMozilla = ref(false);
    isMozilla.value = navigator["mozGetUserMedia"] !== undefined;
    const cromaColorA: Ref<string | null | undefined> = ref(null);
    const cromaColorAEnable = ref(false);
    const diffGreen = ref(20);

    const losMsgs: Ref<Array<any>> = ref([]);
    const w1 = () => {
      if (w0 !== null && w0.readyState === 1) {
        const v = txt.value;
        if (v !== undefined && v !== null && v.trim().length > 0) {
          w0.send(
            JSON.stringify({
              a: 1,
              action: "CHAT",
              payload: { text: v.trim() },
            })
          );
          txt.value = "";
        }
      }
    };
    const props0 = computed(() => {
      return props;
    });

    //const cvl = new CanVidLon();

    function draw(): void {
      const cv1: HTMLCanvasElement | null = canvasout.value;
      if (cv1 === undefined || cv1 === null) {
        return;
      }
      //const d: Date = new Date();
      const tr: number = 8; // d.getSeconds();
      const ctx: CanvasRenderingContext2D | null = cv1.getContext("2d");
      if (!ctx) {
        return;
      }
      ctx.save();
      ctx.clearRect(0, 0, 250, 220);
      const cv2: HTMLCanvasElement | null = canvasout2.value;
      if (cv2 === undefined || cv2 === null) {
        return;
      }

      const ctx2: CanvasRenderingContext2D | null = cv2.getContext("2d");
      if (!ctx2) {
        return;
      }

      const va_: HTMLVideoElement | null = vlocal00a.value;
      if (va_) {
        if (va_.srcObject !== null) {
          ctx.font = "24x serif";

          ctx.fillText("V", 10, 40);

          // ctx.rotate(0.05 * Math.PI * tr);
          ctx.drawImage(va_, 5, 5, 320, 240);
        }
      }

      // ctx.rotate(0.02 *3.14 * tr);
      ctx.fillStyle = "rgb(10,100,0)";
      ctx.fillRect(10, 100, 100, 80);

      ctx.restore();
      ctx.fillStyle = "rgb(200,2,20)";
      ctx.font = "18px serif";
      ctx.fillText(`aaa${tr}`, 80, 70);

      const frame: ImageData = ctx.getImageData(0, 0, 320, 240);

      const crClrAEnbl_v: boolean = cromaColorAEnable.value;
      if (crClrAEnbl_v === true) {
        const crClrA_v = cromaColorA.value;
        if (crClrA_v) {
          const o = toRGBInts(crClrA_v);
          if (o) {
            ctx.fillStyle = crClrA_v.substring(1);
            ctx.fillText(`rgb(${o.r},${o.g},${o.b})`, 40, 70);
          }
        }
      }
      // if (crClrAEnbl_v === true) {
      //   const crClrA_v:string = cromaColorA.value;
      //   if (crClrA_v !== undefined && crClrA_v !== null) {
      //     const colorA = crClrA_v.substring(1);
      //     const red00 = parseInt(colorA.substring(0, 2), 16);
      //     const green00 = parseInt(colorA.substring(2, 4), 16);
      //     const blue00 = parseInt(colorA.substring(4, 6), 16);

      //     ctx.fillStyle = colorA;
      //     ctx.fillText(`${colorA.substring(4, 6)} __${crClrA_v}`, 40, 70);

      //     ctx.fillText(
      //       `${red00}-${green00} - ${blue00} - :: ${crClrA_v}`,
      //       12,
      //       90
      //     );

      //     //const dGreen:number = diffGreen.value;

      //     // const objToWorker = {
      //     //   red00: red00,
      //     //   green00: green00,
      //     //   blue00: blue00,
      //     //   dGreen: dGreen,
      //     //   frame: frame,
      //     // };

      //     // if(ii00%180===0){
      //     //   myWorker.postMessage(objToWorker);
      //     // }
      //     // ii00++;

      //   }
      // }

      // myWorker.onmessage = function (oEvent) {
      //   console.log("Worker said : " + oEvent.data);
      // };

      // const vb_ = vlocal00b.value;
      // if (vb_.srcObject !== null) {
      //   //ctx.font = "24x serif";

      //   //ctx.fillText("V", 10, 40);

      //   // ctx.rotate(0.05 * Math.PI * tr);
      //   ctx2.drawImage(vb_, 5, 5, 320, 240);
      // }

      ctx2.putImageData(frame, 0, 0);

      setTimeout(() => {
        window.requestAnimationFrame(draw);
      }, 58);
    }

    const initCanvasDraw = () => {
        window.requestAnimationFrame(draw);
    };

    const doSubscribe = () => {
      skStatus.value = "toCkeckOpen";
      if (w0 !== null && w0.readyState === 1) {
        skStatus.value = "open";
        return;
      }
      const dir0 = `${uLibLon.wsSchema()}://${uLibLon.backEnd()}/${props.channel}/${props.channelid}/${authStore.getState().access_token}`;
      w0 = new WebSocket(dir0);
      w0.onopen = function () {
        skStatus.value = "open";
        //let payload = { courseOffering_id: coid };
        //     s0.$store.dispatch("setInitl_chatsMesgs", payload)
      };
      w0.onerror = function (err) {
        console.log("err en wsock", err);
      };
      w0.onclose = function (err) {
        console.log("en close", err);
        skStatus.value = "cerrada";
        w0 = null;
        //setTimeout(s0.doSubscribe, 10000);
      };

      w0.onmessage = function (mm) {
        const mjs = JSON.parse(mm.data);
        // console.log(mjs);

        const laAccion = mjs.action;
        const p0 = mjs.payload;

        if (laAccion === "POS") {
          simpleChatStore.registerUser(k0, p0);
        } else if (laAccion === "sendWRTDescription") {
          simpleChatStore.registerCalling(k0, p0);
        } else if (laAccion === "sendT1Candidate") {
          simpleChatStore.registerT1Candidate(k0, p0);
        } else if (laAccion === "sendWRTDescription2_to1") {
          simpleChatStore.recibidoWRTDescription2to1(k0, p0);
        } else if (laAccion === "CLOSE") {
          simpleChatStore.unregisterUser(k0, p0.from_uid);
        } else if (laAccion === "sendTT2Candidate") {
          simpleChatStore.sendTT2Candidate(k0, p0);
        } else if (laAccion === "CHAT") {
          const mm = mjs.payload;
          mm.d = new Date(mm.date);
          losMsgs.value.push(mjs.payload);
        }

        console.log(mjs);
      };

      simpleChatStore.registerWS({ wsid: k0, ws: w0 });

      anuncios.value = window.setInterval(function () {
        console.log("anuncio ");

        if (w0 !== null) {
          // const un = authStore.getState().username;
          // console.log("un", un);
          // if (un === undefined) {
          //   w0.send(
          //     JSON.stringify({
          //       action: "END",
          //       payload: {},
          //     })
          //   );
          // }

          let payload00 = {
            latitude: 1,
            longitude: 1,
          };
          w0.send(
            JSON.stringify({
              action: "POS",
              payload: payload00,
            })
          );
        } else {
          console.log("clearInterval(anuncios.value)", anuncios.value);
          const av = anuncios.value;
          if (av) {
            clearInterval(av);
          }
        }
      }, 50000);
    };

    watch(props, () => {
      console.log("haciendo watch", props);
    });

    const anuncios: Ref<number | null> = ref(null);

    setTimeout(() => {
      doSubscribe();
    }, 600);

    const miUid = () => {
      return authStore.getState().parsedJWT["id"];
    };

    const losUsers = computed(() => {
      return simpleChatStore.getState().users[k0];
    });

    const capabilites = computed(() => {
      return mediaInfoStore.getState().capabilites;
    });

    const lDevices = computed(() => {
      return mediaInfoStore.getState().lDevices;
    });
    const mDevices = computed(() => {
      return mediaInfoStore.getState().mDevices;
    });

    const doGetUserMedia00 = (who, tipo) => {
      let supportedConstraints =
        navigator.mediaDevices.getSupportedConstraints();

      for (let ps00 in supportedConstraints) {
        if (supportedConstraints.hasOwnProperty(ps00)) {
          console.log(ps00);
          console.log("--",supportedConstraints[ps00]);
        }
      }
      navigator.mediaDevices
        .enumerateDevices()
        .then(function (devices) {
          devices.forEach(function (device) {
            console.log(
              `${device.kind}: ${device.label} id = ${device.deviceId}`
            );
          });
        })
        .catch(function (err) {
          console.log(`${err.name}: ${err.message}`);
        });

      const parametros = {
        audio: true,
        video: { width: { exact: 320 }, height: { exact: 240 }, frameRate: 12 },
      };

      const css_console_w2rt =
        " font-weight: bold; font-size: 18px;color: #0ff; text-shadow: 3px 3px 2px #c20; background: #dcd;font-family:Mono;";

      if (tipo === 2 /*shareScreen.value === true*/) {
        parametros.video["mediaSource"] = "screen";
        parametros.video.width.exact = 640;
        parametros.video.height.exact = 480;
      }
      console.log(who, tipo);
      navigator.mediaDevices
        .getUserMedia(parametros)
        .then(function (stream) {
          let audioTracks = stream.getAudioTracks();
          console.log("%c audioTracks", css_console_w2rt);
          console.log(audioTracks);

          stream.getTracks().forEach((track) => {
            console.log("Track,", track);
          });
          if (who === "a") {
            const v__ = vlocal00a.value;
            if (v__) {
              v__["srcObject"] = stream;
            }
          } else if (who === "b") {
            const v__ = vlocal00b.value;
            if (v__) {
              v__["srcObject"] = stream;
            }
          }
        })
        .catch(function (e) {
          console.log("Error geting stream", e.message, e);
        });
    };

    // const myWorker = new Worker("workerLon.js");

    // myWorker.onmessage = function (oEvent) {
    //   console.log("Worker said : " + oEvent.data);
    // };

    //myWorker.postMessage("ali");

    return {
      props0,
      w1,
      txt,
      losUsers,
      miUid,
      skStatus,
      losMsgs,
      capabilites,
      vlocal00a,
      vlocal00b,
      vlocal00c,
      canvasout,
      canvasout2,
      doGetUserMedia00,
      lDevices,
      mDevices,
      shareScreen,
      isMozilla,
      initCanvasDraw,
      cromaColorA,
      cromaColorAEnable,
      diffGreen,
    };
  },
});
</script>
<style>

.l-devices {
  font-size: 10px;
}


.open {
  background: rgb(53, 26, 207);
  color: rgb(215, 215, 230);
}

.rosw {
  display: flex;
  flex-wrap: wrap;
}

.msg-box {
  max-height: 380px;
  max-width: 380px;
  overflow: auto;
}
.msg {
  margin: 8px;
  padding: 4px;
  background: #cda;
  color: black;
  text-shadow: 1px 1px 1px cadetblue, 2px -1px 2px red;
}

.msg-text {
  background: pink;
}

.msg-usr {
  display: block;
  color: deeppink;
  font-size: 0.8em;
  font-weight: bold;
  padding-bottom: 2px;
}
.msg-time {
  font-size: 0.76em;
  color: hsl(280, 35%, 70%);
  text-align: end;
}
.vlocal00 {
  border: 4px groove olive;
}

.canvas-out {
  border: 4px groove orangered;
}
</style>