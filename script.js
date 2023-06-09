// Variables para almacenar los datos de los alumnos
var alumnos = [];

// Obtener referencias a elementos HTML
var cedulaInput = document.getElementById('cedula');
var nombreInput = document.getElementById('nombre');
var matematicaInput = document.getElementById('matematica');
var fisicaInput = document.getElementById('fisica');
var programacionInput = document.getElementById('programacion');
var alumnosTable = document.getElementById('alumnos-table');
var promedioMatematica = document.getElementById('promedio-matematica');
var promedioFisica = document.getElementById('promedio-fisica');
var promedioProgramacion = document.getElementById('promedio-programacion');
var aprobadosMatematica = document.getElementById('aprobados-matematica');
var aprobadosFisica = document.getElementById('aprobados-fisica');
var aprobadosProgramacion = document.getElementById('aprobados-programacion');
var aplazadosMatematica = document.getElementById('aplazados-matematica');
var aplazadosFisica = document.getElementById('aplazados-fisica');
var aplazadosProgramacion = document.getElementById('aplazados-programacion');
var aprobadosTodas = document.getElementById('aprobados-todas');
var aprobadosUna = document.getElementById('aprobados-una');
var aprobadosDos = document.getElementById('aprobados-dos');

// Función para agregar un alumno a la lista
function agregarAlumno() {
    // Obtener los valores de los inputs
    var cedula = cedulaInput.value;
    var nombre = nombreInput.value;
    var matematica = parseFloat(matematicaInput.value);
    var fisica = parseFloat(fisicaInput.value);
    var programacion = parseFloat(programacionInput.value);

    // Validar que se hayan ingresado todos los datos
    if (cedula && nombre && !isNaN(matematica) && !isNaN(fisica) && !isNaN(programacion)) {
        // Crear objeto alumno
        var alumno = {
            cedula: cedula,
            nombre: nombre,
            matematica: matematica,
            fisica: fisica,
            programacion: programacion
        };

        // Agregar alumno a la lista
        alumnos.push(alumno);

        // Limpiar los campos de input
        cedulaInput.value = '';
        nombreInput.value = '';
        matematicaInput.value = '';
        fisicaInput.value = '';
        programacionInput.value = '';

        // Actualizar la tabla de alumnos
        actualizarTablaAlumnos();

        // Calcular y mostrar los resultados
        calcularResultados();
    }
}

// Función para actualizar la tabla de alumnos
function actualizarTablaAlumnos() {
    // Limpiar la tabla
    while (alumnosTable.rows.length > 1) {
        alumnosTable.deleteRow(1);
    }

    // Agregar filas a la tabla con los alumnos
    for (var i = 0; i < alumnos.length; i++) {
        var alumno = alumnos[i];
        var row = alumnosTable.insertRow();

        var cedulaCell = row.insertCell();
        cedulaCell.textContent = alumno.cedula;

        var nombreCell = row.insertCell();
        nombreCell.textContent = alumno.nombre;

        var matematicaCell = row.insertCell();
        matematicaCell.textContent = alumno.matematica;

        var fisicaCell = row.insertCell();
        fisicaCell.textContent = alumno.fisica;

        var programacionCell = row.insertCell();
        programacionCell.textContent = alumno.programacion;
    }
}

// Función para calcular y mostrar los resultados
function calcularResultados() {
    // Calcular promedios
    var promedioMat = calcularPromedio('matematica');
    var promedioFis = calcularPromedio('fisica');
    var promedioProg = calcularPromedio('programacion');

    // Calcular aprobados y aplazados
    var aprobadosMat = calcularAprobados('matematica');
    var aprobadosFis = calcularAprobados('fisica');
    var aprobadosProg = calcularAprobados('programacion');

    var aplazadosMat = alumnos.length - aprobadosMat;
    var aplazadosFis = alumnos.length - aprobadosFis;
    var aplazadosProg = alumnos.length - aprobadosProg;

    // Mostrar promedios
    promedioMatematica.textContent = promedioMat.toFixed(2);
    promedioFisica.textContent = promedioFis.toFixed(2);
    promedioProgramacion.textContent = promedioProg.toFixed(2);

    // Mostrar aprobados y aplazados
    aprobadosMatematica.textContent = aprobadosMat;
    aprobadosFisica.textContent = aprobadosFis;
    aprobadosProgramacion.textContent = aprobadosProg;

    aplazadosMatematica.textContent = aplazadosMat;
    aplazadosFisica.textContent = aplazadosFis;
    aplazadosProgramacion.textContent = aplazadosProg;

    // Calcular y mostrar información adicional
    var aprobadosTodasCount = calcularAprobadosTodas();
    var aprobadosUnaCount = calcularAprobadosUna();
    var aprobadosDosCount = calcularAprobadosDos();

    aprobadosTodas.textContent = 'Alumnos que aprobaron todas las materias: ' + aprobadosTodasCount;
    aprobadosUna.textContent = 'Alumnos que aprobaron al menos una materia: ' + aprobadosUnaCount;
    aprobadosDos.textContent = 'Alumnos que aprobaron exactamente dos materias: ' + aprobadosDosCount;
}

// Función para calcular el promedio de una materia
function calcularPromedio(materia) {
    var sum = 0;
    var count = 0;

    for (var i = 0; i < alumnos.length; i++) {
        var alumno = alumnos[i];
        sum += alumno[materia];
        count++;
    }

    if (count === 0) {
        return 0;
    }

    return sum / count;
}

// Función para calcular el número de aprobados en una materia
function calcularAprobados(materia) {
    var count = 0;

    for (var i = 0; i < alumnos.length; i++) {
        var alumno = alumnos[i];
        if (alumno[materia] >= 6) {
            count++;
        }
    }

    return count;
}

// Función para calcular el número de alumnos que aprobaron todas las materias
function calcularAprobadosTodas() {
    var count = 0;

    for (var i = 0; i < alumnos.length; i++) {
        var alumno = alumnos[i];
        if (alumno.matematica >= 6 && alumno.fisica >= 6 && alumno.programacion >= 6) {
            count++;
        }
    }

    return count;
}

// Función para calcular el número de alumnos que aprobaron al menos una materia
function calcularAprobadosUna() {
    var count = 0;

    for (var i = 0; i < alumnos.length; i++) {
        var alumno = alumnos[i];
        if (alumno.matematica >= 6 || alumno.fisica >= 6 || alumno.programacion >= 6) {
            count++;
        }
    }

    return count;
}

// Función para calcular el número de alumnos que aprobaron exactamente dos materias
function calcularAprobadosDos() {
    var count = 0;

    for (var i = 0; i < alumnos.length; i++) {
        var alumno = alumnos[i];
        var countMateriasAprobadas = 0;

        if (alumno.matematica >= 6) {
            countMateriasAprobadas++;
        }

        if (alumno.fisica >= 6) {
            countMateriasAprobadas++;
        }

        if (alumno.programacion >= 6) {
            countMateriasAprobadas++;
        }

        if (countMateriasAprobadas === 2) {
            count++;
        }
    }

    return count;
}