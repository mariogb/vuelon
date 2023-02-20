<template lang="pug">
.wel-main 
  h2 LON
  p LON es una infraestructura base de código para implementar de manera simple una aplicación lista para la nube y con capacidad de cluster  
  p Se compone de un backend rest en java y un frontend con vue que interactua con el backend. 
  p Contiene los script para ejecutarse con docker composer y balanceado utilizando Nginx.
  p Permite Videoconferencia P2P utilizando WebRTC.
  
  p El repositorio para el backend en github es
    a(href="https://github.com/mariogb/vxlon") VXLON 
    
  p 
    span Gran parte del código esta generado a partir de scripts que automatizan y estandarizan las partes repetitivas de código
  
  p  
    span El repositorio para el frontend en github es 
    a(href="https://github.com/mariogb/vuelon") VUELON  
  p  
    span El frontend implementa componentes reusables para entidades de dominio y configurables de acuerdo a sus relaciones

  div 
    p El propósito es contruir una solución web base automatizada para realizar:

    ul 
      li Listado con capacidad de paginación, filtrado y ordenamiento
      li Agregar, editar y borrar
      li Importar desde plantilla en Excel
      li Descargar en excel
      li Autorización utilizando JWT (Sessionless)

    p
     img(src="https://sketchviz.com/@mariogb/3521333e92e7a7913b749f02a37665d8/3a26c07d9af48ed15abd101d84d6265a16c49499.sketchy.png")  


hr

.wel-main 
  h3 Front end
  ul
    li El frontend utiliza Vue3
    li Implemeta componentes reusables y configurables de manera jerarquica en sus relaciónes    

    li 
      p Esquema de componentes
      img(src="https://sketchviz.com/@mariogb/70a85df9fe84ca733dfcece825846bc0/cad238c5f84ed4cf99bc089e4a616e28992629c5.png" )

.wel-main 
  h3 Backend
  ul
    li El backend utiliza
      a(href="https://vertx.io/") Vertx
    li Es reactivo y no bloquea las operacions I/O (Base de datos, acceso a archivos, acceso a web services)
    li Listo para funcionar en cluster
    li Listo para funcionar en nube
    li Listo para funcinar Docker y con Docker-Composer balanceado con NGINX
    li Backend demo hospedado en DigitalOcean
    li Utiliza como base de datos postgres
    li Tiene EventBus para intercomunicacion entre servicios e instancias funcionando en el cluster
    li Api para webservices. Para cada uno de las entidades consideradas existe un
      | "end point" estandarizado para listar con paginado translate e integrados parametros de consulta y filtrado por los campos de las entidades,
      | crear, actualizar y borrar.
    li Importar y exportar a Excel
    li Transmisión de datos utilizando HTTP2/GZIP, lo que permite transmisiones de datos
          
     

.wel-main 
  p Para obtener el token ejecutar
    code curl 'https://lonpe.com.mx/login' -X POST -H 'Content-Type: application/json' --data-raw '{"username":"admin","password":"1234"}'
      | Lo cual deb de devolver el token de autorización
  p Para generar un
    b Alumno
    code
      | curl 'https://lonpe.com.mx/crud/alumno/s' -X PUT -H 'Content-Type: application/json;charset=UTF-8' -H 'Authorization: Bearer elToken' --data-raw '{"pkey":"asdasd","pname":"sadasd","activo":1,"primer_apellido":"dsaas","segundo_apellido":"adasdas"}'
  p Para generar una
    b Materia
    code 
      | curl 'https://lonpe.com.mx/crud/materia/s' -X PUT -H 'Content-Type: application/json;charset=UTF-8' -H 'Authorization: Bearer elToken' --data-raw '{"pkey":"sadas","pname":"asdasd"}'
  p Para generar una
    b Calificación
    code 
      | curl 'https://lonpe.com.mx/crud/calificacion/s' -X PUT -H 'Content-Type: application/json;charset=UTF-8' -H 'Authorization: Bearer elToken' --data-raw '{"pkey":"clave_calificacion","alumno_id":8 , "materia_id":9, "calificacion":8, "fecha":"2022-11-16"}'

  p Para listar las Calificaciones para el alumno con id = 1
    code
      | curl 'https://lonpe.com.mx/crud/calificacion/l?max=8&offset=0&withCount=1&alumno_id=1' -H 'Authorization: Bearer elToken'
  p Para obtener las estadisticas el la calificacion del alumno con id = 1
    code
      | curl 'https://lonpe.com.mx/crud/calificacion/lztat?alumno_id=1' -H 'Authorization: Bearer elToken'
  p Para borrar la calificación con id =1
    code 
      | curl 'https://lonpe.com.mx/crud/calificacion/delete?id=1' -X DELETE -H 'Authorization: Bearer elToken'

</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "welcome-resume",
  setup(props, context) {
    return {};
  },
});
</script> 
<style>
.wel-main {
  font-size: 12px;
  margin: 18px;
  background: #ddd;
  padding: 8px;
}

.wel-main code {
  display: block;
  margin: 2px;
  font-size: 12px;
  background: black;
  color: rgb(14, 224, 14);
  padding: 12px;
}
</style>