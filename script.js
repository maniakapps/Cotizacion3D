function validarCampos() {
    const campos = [
        'coste-plastico',
        'coste-luz',
        'consumo-medio',
        'coste-impresora',
        'tiempo-amortizacion',
        'dias-activa',
        'horas-dia',
        'tasa-fallos',
        'coste-operador',
        'tiempo-preparacion',
        'tiempo-postproduccion',
        'masa-pieza',
        'tiempo-impresion'
    ];
    const camposVacios = campos.filter(campo => !document.getElementById(campo).value);
    if (camposVacios.length > 0) {
        alert(`Faltan datos en los siguientes campos: ${camposVacios.join(', ')}`);
        return false;
    }
    return true;
}
function calcularCostes() {
    if (!validarCampos()) {
        return;
    }

    // Obtener los valores de los campos
    let masaPieza = Number(document.getElementById("masa-pieza").value);
    let costePlastico = Number(document.getElementById("coste-plastico").value);
    let costeLuz = Number(document.getElementById("coste-luz").value);
    let consumoMedio = Number(document.getElementById("consumo-medio").value);
    let costeImpresora = Number(document.getElementById("coste-impresora").value);
    let tiempoAmortizacion = Number(document.getElementById("tiempo-amortizacion").value);
    let diasActivos = Number(document.getElementById("dias-activa").value);
    let horasDia = Number(document.getElementById("horas-dia").value);
    let tasaFallos = Number(document.getElementById("tasa-fallos").value);
    let costeOperador = Number(document.getElementById("coste-operador").value);
    let tiempoPreparacion = Number(document.getElementById("tiempo-preparacion").value);
    let tiempoPostproduccion = Number(document.getElementById("tiempo-postproduccion").value);
    let tiempoImpresion = Number(document.getElementById("tiempo-impresion").value);

    // Calcular el coste por hora de luz
    let costeHoraLuz = costeLuz * consumoMedio;

    // Calcular el coste de amortización por hora
    let costeAmortizacionHora = costeImpresora / (tiempoAmortizacion * diasActivos * horasDia);

    // Calcular el coste de preparación y postproducción
    let costePreparacion = tiempoPreparacion * costeOperador;
    let costePostproduccion = tiempoPostproduccion * costeOperador;

    // Calcular el coste del material y la electricidad
    let costeMaterialPlastico = costePlastico * masaPieza;
    let costeElectricidad = costeHoraLuz * tiempoImpresion;

    // amortizacion total
    let amortizacionTotal = costeAmortizacionHora * tiempoImpresion;

        // Calcular el coste total de fallos
    let costeFallos = (costeMaterialPlastico + costeElectricidad + costePreparacion + costePostproduccion + amortizacionTotal) * (tasaFallos/100);


    let costeTotal = (costeMaterialPlastico + costeElectricidad + costePreparacion + costePostproduccion + amortizacionTotal) + costeFallos;

    // Mostrar los resultados en los campos correspondientes
    document.getElementById("coste-hora-luz").innerText = costeHoraLuz.toFixed(3);
    document.getElementById("coste-amortizacion").innerText = costeAmortizacionHora.toFixed(3);
    document.getElementById("coste-material").innerText = costeMaterialPlastico.toFixed(3);
    document.getElementById("coste-electricidad").innerText = costeElectricidad.toFixed(3);
    document.getElementById("coste-preparacion").innerText = costePreparacion.toFixed(3);
    document.getElementById("coste-postproduccion").innerText = costePostproduccion.toFixed(3);
    document.getElementById("coste-amortizacion-total").innerText = amortizacionTotal.toFixed(3);
    document.getElementById("coste-fallos").innerText = costeFallos.toFixed(3);
    document.getElementById("coste-pieza").innerText = costeTotal.toFixed(3);

    // tabla secundaria
    // Obtener la tabla por su ID
    let costesTable = document.getElementById("costes-table");

// Establecer el contenido de cada celda de la tabla
    document.getElementById("coste-material-td").innerHTML = "€" + costeMaterialPlastico.toFixed(2);
    document.getElementById("coste-electricidad-td").innerHTML = "€" + costeElectricidad.toFixed(2);
    document.getElementById("coste-operario-td").innerHTML = "€" + (costePreparacion + costePostproduccion).toFixed(2);
    document.getElementById("coste-amortizacion-td").innerHTML = "€" + amortizacionTotal.toFixed(2);

// Mostrar la tabla solo si los cálculos están completos
    costesTable.style.display = validarCampos() ? "table" : "none";
    // Obtener el contexto del canvas
    const ctx = document.getElementById('myChart').getContext('2d');
    const data = {
        labels: ['Plástico', 'Electricidad', 'Coste operario', 'Coste amortización'],
        datasets: [
            {
                label: 'Componentes del precio',
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
                data: [costeMaterialPlastico, costeElectricidad, (costePreparacion + costePostproduccion), amortizacionTotal],
            },
        ],
    };

    const options = {
        title: {
            display: true,
            text: 'Componentes del precio',
        },
    };

    const myChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options,
        responsive: false,
        width: 400,
        height: 400
    });


}
