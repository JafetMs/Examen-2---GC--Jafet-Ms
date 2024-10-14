# main.js

En este archivo se encuentra toda la logica que utilize para instanciar objetos asi como la de desplazar los cubos en la escena y el calculo de las posiciones.

## Cálculo de Distancias

La función `distanceTo()` en Three.js calcula la distancia entre dos puntos en un espacio tridimensional utilizando el concepto matemático de **distancia euclidiana**. La distancia euclidiana \( d \) entre dos puntos \( A(x_1, y_1, z_1) \) y \( B(x_2, y_2, z_2) \) se calcula mediante la fórmula:

\[
d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}
\]

En Three.js, cada objeto 3D tiene una propiedad `position` que es un `Vector3`. Al usar `cubos[i].position.distanceTo(cubos[j].position)`, Three.js calcula la distancia entre los cubos aplicando la fórmula de la distancia euclidiana y devolviendo un valor numérico que representa esta distancia en el espacio 3D.
