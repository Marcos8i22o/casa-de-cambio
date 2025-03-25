const ultimasCotizacionesURL = 'https://api.frankfurter.dev/v1/latest';
obtenerTiposDeCambio();
configurarFecha();

const $botonBuscarCambios = $('#buscar-btn');
const $botonBorrarLista = $('#borrar-btn');

$botonBuscarCambios.on('click', () => {
  $('#mensaje').text('Cargando tipos de cambio... ');
  obtenerFechaYBase();
});

$botonBorrarLista.on('click', () => {
  $('#mensaje').text('');
  $('#lista-cambios').html('');
  $('#tipos-cambio').val('optionSelected');
  $('#fecha-input').val('');

  URL = '';

  $('#buscar-btn').attr('disabled', false);
});

function obtenerTiposDeCambio() {
  fetch(ultimasCotizacionesURL)
    .then((respuesta) => {
      if (!respuesta.ok) {
        console.error(`Error: ${respuesta.status}`);
      }
      return respuesta.json();
    })
    .then((data) => {
      const keys = Object.keys(data.rates);
      keys.forEach((moneda) => {
        const opcion = $('<option>');
        opcion.text(moneda);

        $('#tipos-cambio').append(opcion);
      });
    });
}

function obtenerFechaYBase() {

  const fecha = $('#fecha-input').val();
  const base = $('#tipos-cambio').val();

  let URL = `https://api.frankfurter.dev/v1/${fecha}?base=${base}`;

  if(!fecha){
    URL = ultimasCotizacionesURL;
    $('#mensaje').text("Obteniendo la última cotización disponible...")

  }
  fetch(URL)
    .then((respuesta) => {
      if (!respuesta.ok) {
        console.error(`Error: ${respuesta.status}`);
      }
      return respuesta.json();
    })

    .then((data) => {
      for (const key in data) {
        if (typeof data[key] === 'object') {
          const denominacionDeMonedas = Object.keys(data[key]);
          const cotizacionesDeMonedas = Object.values(data[key]);

          denominacionDeMonedas.forEach((moneda, index) => {
            $('#lista-cambios').append(
              $('<li>').text(`${moneda} : ${cotizacionesDeMonedas[index]}`),
            );
          });
        }
      }
      $('#mensaje').text('');
    })

    .catch((error) => {
      console.error(`Ocurrió un error: ${error}`);
    });

  $('#buscar-btn').attr('disabled', true);
}

function configurarFecha ()  {
  const hoy = new Date().toISOString().split('T')[0];
  $('#fecha-input').attr('max', hoy);
}