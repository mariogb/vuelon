<template>
  <h3>WebRealLon</h3>

  <div>
    {{ estado_llamada_p1 }}--
    {{ estado_llamada_p2 }}
  </div>
  <div>
    <div v-if="pcs.pc1 !== null">
      <h3>PC1</h3>
      <p>connectionState: {{ pcs.pc1.connectionState }}</p>
      <p>iceConnectionState: {{ pcs.pc1.iceConnectionState }}</p>
    </div>

    <div v-if="pcs.pc2 !== null">
      <h3>PC2</h3>
      <p>connectionState: {{ pcs.pc2.connectionState }}</p>
      <p>iceConnectionState: {{ pcs.pc2.iceConnectionState }}</p>
    </div>

    <button v-if="pcs.pc1 !== null || pcs.pc2 !== null" v-on:click="colgar()">
      Colgar
    </button>

    <button
      v-if="pcs.pc1 === null && pcs.pc2 === null && calling2 === undefined"
      v-on:click="call()"
    >
      Call
    </button>
    <span>Local</span>

    <div class="video">
      <span>Remote</span>
      <video ref="vremote" controls>s</video>
    </div>

    <div v-if="calling2 !== undefined">
      <button v-on:click="answer()">Answer</button>
      calling2
      <span
        v-if="calling2 !== undefined && calling2.from_username !== undefined"
        >{{ calling2.from_username }}</span
      >
      |
      <span
        v-if="calling2 !== undefined && calling2.description !== undefined"
        >{{ calling2.description.type }}</span
      >
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, onBeforeUnmount } from "vue";

import { simpleChatStore } from "../store/simpleChatStore";

const ss00: any = [
  { url: "stun.l.google.com:19302" },
  { url: "stun:stun01.sipphone.com" },
  { url: "stun:stun.ekiga.net" },
  { url: "stun:stun.fwdnet.net" },
  { url: "stun:stun.ideasip.com" },
  { url: "stun:stun.iptel.org" },
  { url: "stun:stun.rixtelecom.se" },
];

//let localStream = null;
//let pc1 = null;
let n_enviado = 0;
const css_console_w2rt =
  " font-weight: bold; font-size: 18px;color: #0ff; text-shadow: 3px 3px 2px #c20; background: #dcd;font-family:Mono;";

export default defineComponent({
  props: {
    to_uid: String,
    channel: String,
    channelid: Number,
  },
  setup(props, context) {
    const vremote = ref();
    const pcs: {
      value: {
        pc1: RTCPeerConnection | null;
        pc2: RTCPeerConnection | null;
        candidate1: RTCIceCandidate | null;
      };
    } = ref({ pc1: null, pc2: null, candidate1: null });

    const k0 = `${props.channel}/${props.channelid}`;

    const estado_llamada_p1 = ref("");
    const estado_llamada_p2 = ref("");

    const props0 = computed(() => {
      return props;
    });

    onBeforeUnmount(() => {
      // console.trace()
      console.log("onBeforeUnmount");
    });

    const call = () => {
      n_enviado = 0; //número de candidatos proporcionados. Se obtiene mas de uno y se executa

      const offerOptions = {
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      };

      const parametros = {
        audio: true,
        /* video: { width: { exact: 320 }, height: { exact: 240 }, frameRate: 12 },*/
      };

      pcs.value.pc1 = new RTCPeerConnection(<any>ss00);

      const apply00 = () => {
        const pc1 = pcs.value.pc1;
        if (pc1 === null) {
          return;
        }
        pc1.onicecandidate = (e) => {
          if (
            n_enviado === 0 &&
            e.candidate !== undefined &&
            e.candidate !== null
          ) {
            pcs.value.candidate1 = e.candidate;
            let pp = {
              candidate: e.candidate,
              to_uid: props.to_uid + "",
              offerOptions: offerOptions,
              channel: props.channel,
              channelid: props.channelid,
            };
            simpleChatStore.sendTT1Candidate(pp);
            // estado_llamada_p1.value = "ONCALL";
            n_enviado++;
          }
        }; //end  ONICECANDIDATE

        pc1.ontrack = (e) => {
          vremote.value["onloadedmetadata"] = (vmd: any) => {
            console.log("1vmd", vmd);
          };

          try {
            //const vv = document.getElementById("vv0_" + props.channelid + "_" + props.to_uid);
            const vv = vremote.value;

            //vremote.value["srcObject"] = e.streams[0];
            if (vv !== e.streams[0]) {
              vv["srcObject"] = e.streams[0];
              let playPromise = vv.play();
              if (playPromise !== undefined) {
                playPromise
                  .then((ee: any) => {
                    console.log("play !! ", ee);
                  })
                  .catch((errp: any) => {
                    console.log("Err Play", errp);
                  });
              }
            }
          } catch (err) {
            console.log("eeee", err);
          }
        }; // end ontrack

        pc1.oniceconnectionstatechange = (event) => {
          if (!pc1) {
            return;
          }
          estado_llamada_p1.value = pc1.iceConnectionState;
          if (
            pc1.iceConnectionState === "failed" ||
            pc1.iceConnectionState === "disconnected" ||
            pc1.iceConnectionState === "closed"
          ) {
            //pc1.close();
            colgar();
          }
          //  s0.iceConnectionState_p1 = s0.pc1.iceConnectionState
        }; // end oniceconnectionstatechange

        pc1.onconnectionstatechange = (event) => {}; //end onconnectionstatechange

        pc1.createOffer(offerOptions).then(
          (desc1) => {
            if (pc1) {
              pc1.setLocalDescription(desc1).then(
                () => {
                  let payload = {
                    description: desc1,
                    channel: props.channel,
                    channelid: props.channelid,
                    to_uid: props.to_uid + "",
                  };
                  const elPc1 = pcs.value.pc1;
                  simpleChatStore
                    .registerWebRealLon(k0, {
                      to_uid: props.to_uid,
                      pc1: elPc1,
                    })
                    .then((rs1) => {
                      console.log("RS1 ", rs1);
                      simpleChatStore.sendWRTDescription(k0, payload);
                      // estado_llamada_p1.value = "CALLING";
                    });
                },
                (esld) => {
                  console.log("Error en poner description", esld);
                }
              );
            }
          },
          (eco) => {
            console.log("Error en createOffer", eco);
          }
        );
      };

      function doGetUserMedia1() {
        navigator.mediaDevices
          .getUserMedia(parametros)
          .then(function (stream) {
            //localStream = stream;
            let audioTracks = stream.getAudioTracks();
            console.log("%c audioTracks", css_console_w2rt);
            console.log(audioTracks);

            if (audioTracks.length > 0) {
              console.log("%c Using Audio device: ", css_console_w2rt);
              console.log(audioTracks[0]);
            }

            let videoTracks = stream.getVideoTracks();
            console.log("%c videoTracks", css_console_w2rt);
            console.log(videoTracks);

            apply00();

            const pc1 = pcs.value.pc1;
            if (pc1) {
              const a: HTMLCanvasElement | null = <HTMLCanvasElement>(
                document.getElementById("c0001")
              );
              if (a !== null) {
                const v = a.captureStream(25);

                v.getTracks().forEach((track) => {
                  pc1.addTrack(track, stream);
                });
              }

              //stream.
              stream.getAudioTracks().forEach((track) => {
                pc1.addTrack(track, stream);
              });
            }
          })
          .catch(function (e) {
            console.log("Error geting stream", e.message, e);
          });
      }

      doGetUserMedia1();
    }; //end connect

    const calling2 = computed(() => {
      const to_uid = props.to_uid;
      if (to_uid) {
        return simpleChatStore.getState().callings[k0][to_uid];
      }
    });

    const answer = () => {
      pcs.value.pc2 = new RTCPeerConnection(ss00);
      let pc2 = pcs.value.pc2;
      let numEnviado2 = 0;
      pc2.onicecandidate = (e) => {
        if (
          e.candidate !== undefined &&
          e.candidate !== null &&
          numEnviado2 === 0
        ) {
          let pp = {
            channel: props.channel,
            channelid: props.channelid,
            candidate: e.candidate,
            answer_to: calling2.value.from_uid + "",
            wsid: k0,
          };
          const candidates = simpleChatStore.getState().candidates[k0];
          const cand0 = candidates[calling2.value.from_uid];
          numEnviado2++;
          pc2.addIceCandidate(cand0.candidate);
          simpleChatStore.sendResponseTT2Candidate(k0, pp);
          estado_llamada_p2.value = "IN";
        }
      }; //end onicecandidate

      pc2.ontrack = (e) => {
        const vv = vremote.value;
        if (vv["srcObject"] !== e.streams[0]) {
          vv["onloadedmetadata"] = (vmd: any) => {
            console.log("2vmd", vmd);
          };

          vv["srcObject"] = e.streams[0];
          vv.play();
        }
      }; //end onaddstream

      pc2.oniceconnectionstatechange = (event) => {
        estado_llamada_p2.value = pc2.iceConnectionState;
        if (
          pc2.iceConnectionState === "failed" ||
          pc2.iceConnectionState === "disconnected" ||
          pc2.iceConnectionState === "closed"
        ) {
          colgar();
          // estado_llamada_p2.value = "COLGADO";
        } else {
          //estado_llamada_p2.value = "ONCALL";
        }
      }; //end oniceconnectionstatechange

      function doGetUserMedia() {
        const parametros2 = {
          audio: true,
          /*,
          video: {
            width: { exact: 320 },
            height: { exact: 240 },
            frameRate: 12
          },*/
        };

        navigator.mediaDevices
          .getUserMedia(parametros2)
          .then((stream) => {
            estado_llamada_p2.value = "ANSWERING_GET_MD [2]";

            const a: HTMLCanvasElement | null = <HTMLCanvasElement>(
              document.getElementById("c0001")
            );
            if (a !== null) {
              const v = a.captureStream(25);
              v.getTracks().forEach((track) => {
                pc2.addTrack(track, stream);
              });
            }

            stream.getAudioTracks().forEach(function (track) {
              pc2.addTrack(track, stream);
            });

            simpleChatStore
              .putOnPc2RemoteDescription(pc2, k0, props.to_uid)
              .then(() => {
                estado_llamada_p2.value = "ANSWERING_SRD";
                let answerOptions = {
                  offerToReceiveAudio: 1,
                  offerToReceiveVideo: 1,
                };

                pc2.createAnswer(answerOptions).then(
                  function (desc2) {
                    estado_llamada_p2.value = "ANSWERING_A [2]";
                    pc2.setLocalDescription(desc2).then(function () {
                      let pp = {
                        answer_to: calling2.value.from_uid + "",
                        description: desc2,
                      };
                      simpleChatStore.sendWRTDescription2_to1(k0, pp);
                      //s0.$store.dispatch("sendWRTDescription2_to1", pp)
                      estado_llamada_p2.value = "ANSWERING_SLD";
                    });
                  },
                  function (e) {
                    console.log("Error in createAnswer", e);
                  }
                );
              })
              .catch((err22) => {
                console.log(err22);
              })
              .catch((eeeee) => {
                console.log(eeeee);
              });
          })
          .catch((err000) => {
            console.log("XXXXX");
            console.log(err000);
          }); //end doGetUserMedia()
      }
      doGetUserMedia();
    }; //end answer

    const colgar = () => {
      if (pcs.value.pc1 !== null) {
        pcs.value.pc1.close();
        pcs.value.pc1 = null;
      }
      if (pcs.value.pc2 !== null) {
        pcs.value.pc2.close();
        pcs.value.pc2 = null;
      }

      if (calling2.value !== undefined) {
        simpleChatStore.unregisterCalling(k0, props.to_uid);
      }
    };

    return {
      call,
      answer,
      vremote,
      calling2,
      props0,
      pcs,
      colgar,
      estado_llamada_p1,
      estado_llamada_p2,
    };
  },
});
</script>