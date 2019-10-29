import React, {useState, useEffect, Fragment} from 'react';
import Formulario from './Components/Formulario';
import axios from 'axios';
import Cancion from './Components/Cancion';

function App() {
  const [artista, agregarArtista] = useState('');
  const [letra, agregarLetra] = useState([]);
  const [info, agregarInfo] = useState({});

  const consultarAPILetra = async busqueda => {
    const {artista, cancion} = busqueda;

    const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

    const resultado = await axios(url);

    agregarLetra(resultado.data.lyrics)
  }

  const consultarAPIInfo = async () => {
    const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

    const resultado = await axios(url);

    agregarInfo(resultado.data.artist[0]);
  }

  useEffect (() => {
    consultarAPIInfo()
  }, [artista])


  return (
    <Fragment>
      <Formulario 
        consultarAPILetra={consultarAPILetra}/>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">

            </div>
            <div className="col-md-6">
              <Cancion letra={letra}/>
            </div>
          </div>
        </div>
    </Fragment>
  );
}

export default App;
