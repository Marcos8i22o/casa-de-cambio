$("body").addClass("fondo");

const ultimasCotizacionesURL = "https://api.frankfurter.dev/v1/latest";
obtenerTiposDeCambio();

const $botonBuscarCambios = $("#buscar-btn");

$botonBuscarCambios.on("click", () => {
  obtenerFechaYBase();
});

function obtenerTiposDeCambio() {
  fetch(ultimasCotizacionesURL)
    .then((respuesta) => respuesta.json())
    .then((data) => {
      const keys = Object.keys(data.rates);
      keys.forEach((moneda) => {
        const opcion = $("<option>");
        opcion.text(moneda);

        $("#tipos-cambio").append(opcion);
      });
    });
}

function obtenerFechaYBase() {
  $("#mensaje").text("Cargando tipos de cambio... ");

  const fecha = $("#fecha-input").val();
  const base = $("#tipos-cambio").val();


  const URL = `https://api.frankfurter.dev/v1/${fecha}?base=${base}`;

  fetch(URL)
    .then((respuesta) => {
      if (!respuesta.ok) {
        console.error(`Error: ${respuesta.status}`);
      }
      return respuesta.json();
    })
    
    .then((data) => {
      for (const key in data) {
        if (typeof data[key] === "object") {
          const denominacionDeMonedas = Object.keys(data[key]);
          const cotizacionesDeMonedas = Object.values(data[key]);

          denominacionDeMonedas.forEach((moneda, index) => {
            $("#lista-cambios").append(
              $("<li>").text(`${moneda} : ${cotizacionesDeMonedas[index]}`)
            );
          });
        }
      }
    })

    .catch((error) => {
      console.log(`Ocurrió un error: ${error}`);
    });

  $("#mensaje").text("");
}
