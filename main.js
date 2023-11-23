
document.addEventListener("DOMContentLoaded", function () {
    const conversorForm = document.getElementById("conversorForm");
    const opcionesConvertir = document.getElementById("opcionesConvertir");
    const montoInput = document.getElementById("montoInput");
    const convertirButton = document.getElementById("convertirButton");
    const historialDiv = document.getElementById("historialDiv");


// Función para actualizar y guardar el historial en LocalStorage
function actualizarHistorial(resultadoTexto) {
    const historialResultados = JSON.parse(localStorage.getItem("historialResultados")) || [];
    historialResultados.push(resultadoTexto);
    localStorage.setItem("historialResultados", JSON.stringify(historialResultados));

// Función para mostrar el historial
function mostrarHistorial() {
    obtenerHistorialResultados().then((historialResultados) => {
        const historialDiv = document.getElementById("historialDiv");
        historialDiv.innerHTML = "";

    // Agregar cada monto como un párrafo
        historialResultados.forEach(resultadoTexto => {
            const p = document.createElement("p");
            p.textContent =  resultadoTexto;
            historialDiv.appendChild(p);
    });

    }).catch(error => {
        console.error("Error al obtener el historial:", error);
    });
}
// Función asincronica para obtener resultados del storage
function obtenerHistorialResultados() {
    return new Promise((resolve, reject) => {
        const historialResultados = JSON.parse(localStorage.getItem("historialResultados")) || [];
        resolve(historialResultados);
    });
}

// Llamar a la función para mostrar el historial
mostrarHistorial();

// Configurar un intervalo para mostrar el historial cada 5 segundos
setInterval(mostrarHistorial, 5000);


    // Limpiar el contenido del div
    historialDiv.innerHTML = "";
}

        /// Dolar Oficial a Pesos ///
    function convertirDolarOficialAPesos(monto) {
        return monto * 365; 
    }
        /// Dolar Blue a Pesos ///
    function convertirDolarBlueAPesos(monto) {
        return monto * 925; 
    }
        /// Pesos a Dólares ///
    function convertirPesosADolarOficial(monto) {
        return monto / 100; 
    }

    conversorForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        const seleccion = opcionesConvertir.value;
        const monto = parseFloat(montoInput.value);

        if (!isNaN(monto)) {
            let resultadoTexto = "";

            if (seleccion === "1") {
                resultadoTexto = `${monto} Dólares Oficiales son aproximadamente ${convertirDolarOficialAPesos(monto).toFixed(2)} Pesos.`;
            } else if (seleccion === "2") {
                resultadoTexto = `${monto} Dólares Blue son aproximadamente ${convertirDolarBlueAPesos(monto).toFixed(2)} Pesos.`;
            } else if (seleccion === "3") {
                resultadoTexto = `${monto} Pesos son aproximadamente ${convertirPesosADolarOficial(monto).toFixed(2)} Dólares Oficiales.`;
            }

            /// Resultado ///

            var resultadoTextoElement = document.getElementById("resultadoTexto");
            var resultado = "resultadoTexto"; 
            resultadoTextoElement.innerHTML = "Resultado de la conversión es: " + resultadoTexto;
        }
    });


    convertirButton.addEventListener("click", function () {

        const seleccion = opcionesConvertir.value;
        const monto = parseFloat(montoInput.value);

        if (!isNaN(monto)) {
            let resultadoTexto = "";

            if (seleccion === "1") {
                resultadoTexto = `${monto} Dólares Oficiales son aproximadamente ${convertirDolarOficialAPesos(monto).toFixed(2)} Pesos.`;
            } else if (seleccion === "2") {
                resultadoTexto = `${monto} Dólares Blue son aproximadamente ${convertirDolarBlueAPesos(monto).toFixed(2)} Pesos.`;
            } else if (seleccion === "3") {
                resultadoTexto = `${monto} Pesos son aproximadamente ${convertirPesosADolarOficial(monto).toFixed(2)} Dólares Oficiales.`;
            }



            var resultadoTextoElement = document.getElementById("resultadoTexto");
            var resultado = "resultadoTexto"; 
            Swal.fire({
                title: "Resultado de la conversión es:" + resultadoTexto,
                icon: "success"
                });
            // Actualizar el historial de resultados
            actualizarHistorial(resultadoTexto);

        } 
        else{
                var ingresonoValidoElement = document.getElementById("ingresonoValido");
                var ingresono = "Por favor utilice números para realizar la operación";
                
            Swal.fire({
            title: "Por favor utilice números para realizar la operación",
            text: "Clickeá para salir!",
            icon: "error"
});
        
    }
    });
});
////////////// API ///////////////////

fetch("https://dolarapi.com/v1/dolares")
    .then(response => response.json())
    .then(data => {

    // Seleccionar el elemento donde mostrar los resultados
    const resultadosElement = document.getElementById("resultados");

    // Limpiar el contenido actual del elemento
    resultadosElement.innerHTML = "";

    data.forEach((resultado, index) => {

    const divResultado = document.createElement("div");
    divResultado.classList.add("resultado");

      // Construir el contenido HTML del div
      divResultado.innerHTML = `
        <p>Tipo de dolar ${resultado.nombre}:</p>

        <ul>
            <li>Moneda: ${resultado.moneda}</li>
            <li>Compra: ${resultado.compra}</li>
            <li>Venta: ${resultado.venta}</li>
        </ul>`;

      // Agregar el nuevo div al contenedor de resultados
        resultadosElement.appendChild(divResultado);
    });
    })
    .catch(error => {
        console.error("Error al obtener datos:", error);
    });

////////////////////////////////////////////////
