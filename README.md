# Visual-A
datasets VA
## README

## Tarea 5 (Oct 30, 2018)
## Redes y Fuerzas.
Autor: 
## Carlos Moreno Ibarguen  

La visualización se encuentra disponible en Github en el siguiente enlace:

- https://cuntaquinte.github.io/tarea5/index.html

Requisitos
-https://d3js.org/d3.v5.min.js


# Contexto
## Ecoturismo en Colombia

Esta capa geográfica de información contiene los límites territoriales establecidos por el Ministerio de Ambiente para los Parques Nacionales Naturales de Colombia la cual está disponible también desde http://sig.anla.gov.co:8083/ y ha sido enriquecida con información contenida en el documento "Actualización del cobro de los derechos de ingreso a los Parques Naturales Nacionales de Colombia 2015", con el fin que los usuarios conozcan información acerca de los parques y zonas protegidas del país. 

Para mayor información relacionada con los atributos ingrese a:
https://ags.esri.co/server/rest/services/DA_DatosAbiertos/Parques_Nacionales_Naturales_de_Colombia/MapServer/0


La presente visualización pretende mostrar la diversidad de opciones para escoger entre los parques naturales de Colombia como opción de ecoturismo, brindándonos información de ubicación, tipo de parque, posibilidad de alojamiento entre otros.
Asi que

## ¿Qué tal si escogemos un parque para visitar?


Los datos originales estan disponibles en:

-  http://datosabiertos.esri.co/datasets/parques-nacionales-naturales-de-colombia

PreProcesados:  
- https://github.com/Cuntaquinte/tarea5/tree/master/data

# Objetivos de la tarea y tecnologías usadas:
El objetivo del proyecto es generar una visualización  que permita tener elementos de juicio para escoger un parque natural en Colombia para practicar ecoturismo.

- La técnologia utilizada fue html, css,javascript + libreria D3 V5. Los datos se manipularon en los formatos csv y json.


# Tareas Secundarias:
- Determinar donde hay la mayor variedad de ofertas de parques naturales.


# Analisis de los datos
## Preprocesamiento de datos. 
Se organizaron los datos por para generar nodos y links

## What?
Los datos se obtuvieron de un Dataset tipo : Network. Tabla-Red: nodos de red como claves, estado de enlace entre dos nodos como valores. Derived: jerarquía de clústeres sobre la red original.
### Tipos de atributos

Atributos

- id	- Ordinal -secuencial
- nombre	- Categorico
- no_Res_Vi	- Categorico
- area_Res	- Ordinal- secuencial
- región	- Categorico
- categoría	- Categorico
- cos_Adulto	- Ordinal - secuencial
- cos_Ninos	- Ordinal - secuencial
- alojamiento	- Categorico
- camping	- Categorico


## Why?
- Explore topology
- Locate paths
- Locate clusters
- Enjoy

## How?

### Idiom: Force-Directed Placement Marcas:

### Marcas 
- puntos, (para representar los nodos)
- marcas de conexión, (para representar los links)

### Canales:
- puntos, (para representar los nodos)
- colores, (mostrar la asociación de categorías)


## Licencia MIT
[MIT Licence] https://github.com/Cuntaquinte/midterm-bonus/blob/master/LICENSE

