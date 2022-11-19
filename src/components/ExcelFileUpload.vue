<template lang="pug">
.form-imp-excel
  .form-imp-excel-head
    h3.form-imp-excel-title Importar datos para {{ dc }}
  .form-imp-excel-body
    .template-xls
      p.info Descargar archivo plantilla para importación
      button(v-on:click="getExcelTemplate()") xls tmplate    
    form.form-files(enctype="multipart/form-data")
      .the-form-box 
        input.input-file(
          type="file",
          ref="upload_file",
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
          :name="'file0'",
          v-on:change="dd()"
        )
        button(type="button", v-on:click="uploadFile()") Subir
      .the-info
        p.results - {{results}}
        p.error00-msg {{error00.ERROR}}  
        p.error00-msg {{error00.message}} 
        p.error00-msg {{error00.msg}}  
        p.error00-detail(v-show="error00.detail")
          span Detail: 
          span {{error00.detail}}  
        p.error00-table(v-show="error00.table")
          span Table: 
          span {{error00.table}}            
</template>
<script lang="ts">
import {ref, defineComponent, Ref} from "vue";
import { downLoadTemplateFile, sendFiles } from "../store/DCModelStore";

export default defineComponent({
  name: "excel-file-upload",
  emits: ["doList"],
  props: {
    dc: String,
    objKey: String,
    parentDc: String,
    parentDc2: String,
  },
  setup(props, context) {
    const upload_file:Ref<HTMLInputElement|null> = ref(null);

    const error00 = ref({});
    const results = ref("");

    const estatus = ref({ value: "ready", label: "" });
/*
    const cancel = () => {
      upload_file.value.value = "";
    };
*/
/*
    const elArch = computed(() => {
      if (upload_file.value != null && upload_file.value.value !== "") {
        return "aaa";
      }
    });
    */



    const filesUploaded:Ref<any[]> = ref([]);

    const uploadFile = () => {
      const ufv = upload_file.value
      if(!ufv){
        return
      }

      const fileList = ufv.files;
      if(!fileList){
        return
      }
      const fln = fileList.length;
      const fuu:any[] = [];

      if (!fln || fln === 0) {
        alert("No se ha seleccionado archivo");
        return;
      }
      const formData = new FormData();
      for (var k = 0; k < fln; k++) {
        const fk = fileList[k];
        formData.append("file", fk, fk.name);
        fuu.push(fk.name);
      }

      filesUploaded.value = fuu;
      const payload = { formData: formData, dc: props.dc };
      estatus.value = { value: "uploading", label: "Subiendo" };

      error00.value = {};

      sendFiles(payload)
        .then((r) => {
          console.log(r)
          const ufv = upload_file.value
          if(ufv){
            ufv.value = "";
          }          
          estatus.value = { value: "ready", label: "" };
          results.value = "Data uploaded"
          context.emit("doList");
        })
        .catch((error) => {         
          if (error.response !== undefined) {
            error00.value = error.response.data;
          }
          estatus.value = { value: "ready", label: "" };
          const ufv = upload_file.value
          if(ufv){
            ufv.value = "";
          }  
        });

      console.log(upload_file.value);
    };

    const dd = () => {
      console.log("dd");
    };

    const getExcelTemplate = () => {
      let v = props.dc// msgUI(props.dc);
      const payload = { dc: props.dc, name: v + "_UpTemplate.xlsx", params: {} };
      downLoadTemplateFile(payload)
        .then((r) => {
          //estatusDownloadExcel.value = r;
          let a = window.document.createElement("a");
          a.href = window.URL.createObjectURL(new Blob([r.data]));
          a.setAttribute("download", r.name);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch((e) => {
          alert("Error en la petición");
          console.log(e);
        });
    };




    return { upload_file, uploadFile, dd,getExcelTemplate,error00,results };
  },
});
</script> 
<style>
.the-form-box {
    z-index: 8100;
    margin-top: 6px;
    margin-right: 32px;
    margin-left: 29px;
    margin-bottom: 19px;
}
.template-xls {
  padding: 12px;
  margin: 12px;
  border: groove;
  border-radius: 7px;
  background: rgba(1, 10, 100, 0.25);
}

.info {
  font-size: 1rem;
  margin: 7px;
  padding: 4px;
  font-family: sans;
}
.form-imp-excel-title {
  background: darkturquoise;
  padding: 8px;
  margin: 8px;
  border-radius: 4px;
  border: solid 1px aqua;
}

.the-info{
margin: 12px;
padding: 24px;
background: bisque;
border-radius: 2px;
border: inset;
font-family: serif;
}
p.error00-message{
  background: peru;
  padding: 4px;
}

</style>