# WeatherApp

Bienvenido al proyecto de WeatherApp dentro de las actividades de Push-Ups de Samuel Riveros Angarita, en este proyecto podrá ver y analizar los datos del clima y pronostico de este.

## Instalación

al descargar el repositorio en su computadora, abra la terminal y ejecute ```npm i```, de esta forma descargará las dependencias requeridas para la ejecución exitosa del proyecto, se recomienda ejecutar una vez más ```"npm i"``` para descartar que todas las dependencias se hayan descargado efectivamente.


## Compilando proyecto
Debido a que estamos consumiendo una API externa, no hay necesidad de encender el back-end , por lo tanto, para encender el Front-End ejecutarémos el comando ```npm run dev```, de esta forma Vite compilará el entorno de React, y nos devolverá una url local la cual puede visitar en su navegador

¡Felicidades!, ha abierto el proyecto, ahora podrá ver los datos del clima y demás en tiempo real.

# CONSUMO DE API

El Unico método que estamos usando para recibir los datos de la api es un Get, la ruta de este método es la siguiente

- MÉTODO GET:
```
http://api.weatherapi.com/v1/forecast.json?key=a535072b6ae44480856115549242110&q=Floridablanca&days=7&lang=es
```

Este método nos devuelve diferentes datos referentes al clima de Floridablanca, Santander, también ejecutamos la query de days y lenguaje para obtener los datos dentro de 7 días, y recibirlo en lenguaje de español, respectivamente