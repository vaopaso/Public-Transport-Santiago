[Ver Resultado Final](http://niebla.ing.puc.cl/chiletransporte/Heatmap/)

# Transporte Público en Santiago de Chile
Demanda del Transporte público en la ciudad de Santiago, Chile

Con técnicas de minería de datos, modelos de regresión con decaimiento gaussiano fueron aplicados a datos históricos de transacciones bip, para mostrar en un mapa de calor el comportamiento de la demanda del Transantiago y Metro de Santiago, según coordenadas geográficas y hora del día.

Este *Heatmap* tiene una vista 3D creada con el framework de Uber [deck.gl](http://uber.github.io/deck.gl), y una versión 2D creada con la API de Google Maps.

## Instalación y ejemplos

Para hacer funcionar la aplicación deberás instalar algunos paquetes. Para más detalles, seguir las instrucciones dadas en el [repositorio de deck.gl](http://github.com/uber/deck.gl).

La parte 3D de esta aplicación de Transporte Público en Santiago, es una versión modificada del [ejemplo de Heatmap](github.com/uber/deck.gl/tree/master/examples/website/3d-heatmap) del github de deck.gl, por lo que también corresponde seguir las instrucciones en ese repositorio para poder correr la aplicación.

Para la parte 2D de la aplicación, creada con Google Maps API, para hacer funcionar el mapa a desplegar en la web, debes seguir las instrucciones del próximo bloque [Mapas].
Un ejemplo para crear *heatmaps* con Google Maps se encuentra en este [link](http://developers.google.com/maps/documentation/javascript/examples/layer-heatmap).

## Mapas

Es importante que para hacer funcionar los mapas tanto para la version 3D (Mapbox) como para la version 2D (Google), debes colocar el *token* o *key* que Mapbox y Google te dan, para poder desplegarlos correctamente.

Estas *key* las puedes obtener creandote una cuenta y siguiendo los pasos que indica Mapbox y Google en sus respectivas páginas.

Una vez que tengas las *key*, debes colocarlas en:

- Mapbox: *app.js*, ver líneas 10 y 11
- Google: *index.html*, ver líneas 418 y 419

## Correr app

Una vez que tengas los paquetes instalados como npm, yarn, puedes hacer:

```
npm install
npm start
```

Luego el servidor que ejecuta la aplicación se iniciará en *localhost* y lo puedes ver desde tu *browser*.
