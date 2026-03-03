/* =====================================================
   FUNCIÓN: horaEspejo
   Calcula la hora real a partir de la hora vista
   en un espejo analógico
===================================================== */
function horaEspejo(horaOriginal) {

    // 🔹 Separar horas y minutos
    let partes = horaOriginal.split(":");

    if (partes.length !== 2) {
        return "ERROR: Formato inválido";
    }

    // 🔹 Convertir a números
    let horas = parseInt(partes[0], 10);
    let minutos = parseInt(partes[1], 10);

    if (isNaN(horas) || isNaN(minutos)) {
        return "ERROR: Ingrese números válidos";
    }

    // 🔹 Validar rangos
    if ((horas < 0 || horas > 12) || minutos < 0 || minutos > 59) {
        return "ERROR: Hora inválida";
    }

    // 🔹 Ajuste especial 00:00 → 12:00
    if (horas === 0 && minutos === 0) {
        horas = 12;
    }

    // 🔹 Calcular minutos reales
    let minutosReales = (60 - minutos) % 60;

    // 🔹 Calcular horas reales
    let horasReales;

    if (minutos === 0) {
        horasReales = (12 - horas) % 12;
    } else {
        horasReales = (12 - horas - 1) % 12;
    }

    // 🔹 Ajustar hora 0 → 12
    if (horasReales <= 0) {
        horasReales += 12;
    }

    // 🔹 Formatear salida HH:MM
    let horaFormateada = horasReales.toString().padStart(2, '0');
    let minutosFormateados = minutosReales.toString().padStart(2, '0');

    return `${horaFormateada}:${minutosFormateados}`;
}

/* =====================================================
   FUNCIÓN: calcularHoraReal
   Se ejecuta al presionar el botón o Enter
===================================================== */
function calcularHoraReal() {

    let input = document.getElementById('horaInput');
    let resultadoDiv = document.getElementById('resultado');
    let horaIngresada = input.value.trim();

    // 🔹 Validar campo vacío
    if (horaIngresada === "") {
        resultadoDiv.innerHTML =
            '<span class="error">⚠️ Por favor ingresa una hora</span>';
        return;
    }

    // 🔹 Validar formato HH:MM
    let formatoValido = /^\d{1,2}:\d{2}$/;

    if (!formatoValido.test(horaIngresada)) {
        resultadoDiv.innerHTML =
            '<span class="error">⚠️ Formato inválido. Use HH:MM</span>';
        return;
    }

    // 🔹 Calcular hora real
    let horaReal = horaEspejo(horaIngresada);

    // 🔹 Construir resultado HTML
    let html = `
        <div class="hora-pequena">🪞 Hora en el espejo:</div>
        <div class="hora-pequena" style="font-size:24px;">
            ${horaIngresada}
        </div>
    `;

    if (horaReal.startsWith("ERROR")) {
        html += `<div class="error">⚠️ ${horaReal}</div>`;
    } else {
        html += `
            <div class="hora-pequena" style="margin-top:15px;">
                ⏰ Hora real:
            </div>
            <div class="hora-grande">${horaReal}</div>
        `;
    }

    resultadoDiv.innerHTML = html;
}

/* =====================================================
   EVENTOS AL CARGAR LA PÁGINA
===================================================== */
document.addEventListener('DOMContentLoaded', () => {

    let input = document.getElementById('horaInput');

    // 🔹 Ejecutar con Enter
    input.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            calcularHoraReal();
        }
    });

    // 🔹 Enfocar automáticamente
    input.focus();
});