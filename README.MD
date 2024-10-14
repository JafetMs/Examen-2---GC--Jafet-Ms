# main.js

En este archivo se encuentra toda la logica que utilize para instanciar objetos asi como la de desplazar los cubos en la escena y el calculo de las posiciones.

## Creando el objeto cubo y sus instancias

Esta función define cómo se construye cada cubo y se utiliza dentro de la función

## Cálculo de Distancias

La función `distanceTo()` en Three.js calcula la distancia entre dos puntos en un espacio tridimensional utilizando el concepto matemático de **distancia euclidiana**. 

En Three.js, cada objeto 3D tiene una propiedad `position` que es un `Vector3`. Al usar `cubos[i].position.distanceTo(cubos[j].position)`, Three.js calcula la distancia entre los cubos aplicando la fórmula de la distancia euclidiana y devolviendo un valor numérico que representa esta distancia en el espacio 3D.


