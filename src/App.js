import React, { Fragment, useState, useEffect } from "react";
import Header from "./componentes/Header";
import Formulario from "./componentes/Formulario";
import Clima from "./componentes/Clima";
import Error from "./componentes/Error";

function App() {
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: ""
  });
  //State para no llamar a la api cada vez que ingresas un caracter
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  //state para verificar si se encontraron los datos
  const [error, guardarError] = useState(false);
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarApi = async () => {
      if (consultar) {
        const appid = "72efdce9db5ecd57c0346f7f300c1217";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        guardarResultado(resultado);
        guardarConsultar(false);
        if (resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    };
    consultarApi();
    // eslint-disable-next-line
  }, [consultar]);
  let componente;
  if (error) {
    componente = <Error mensaje="No se encontraron resultados" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }

  return (
    <Fragment>
      <Header titulo="Clima App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
