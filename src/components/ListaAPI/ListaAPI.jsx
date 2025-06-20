import React, { useEffect, useState } from 'react';
import "../../styles/global.css";
import "../Card/Card.css";
import './ListaAPI.css';

const ListaAPI = () => {
  const [feriados, setFeriados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [anioSeleccionado, setAnioSeleccionado] = useState("2025");
  const [mesSeleccionado, setMesSeleccionado] = useState("todos");

  
  const [paginaActual, setPaginaActual] = useState(1);
  const cantidadPorPagina = 5; // Por ejemplo, 6 tarjetas por página


  const fetchFeriados = async (anio) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.argentinadatos.com/v1/feriados/${anio}`);
      if (!res.ok) throw new Error('Error al obtener los feriados');
      const data = await res.json();
      setFeriados(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeriados(anioSeleccionado);
  }, [anioSeleccionado]);



  useEffect(() => {
    setPaginaActual(1);
  }, [anioSeleccionado, mesSeleccionado]);



  const getFecha = (fechaString) => {
    if (!fechaString || !fechaString.includes('-')) return 'Fecha no disponible';
    const [anio, mes, dia] = fechaString.split('-');
    return `${dia}/${mes}/${anio}`;
  };

  const feriadosFiltrados = feriados.filter((f) => {
    if (mesSeleccionado === "todos") return true;
    const [, mes] = f.fecha.split("-");
    return mes === mesSeleccionado;
  });


    const indiceInicial = (paginaActual - 1) * cantidadPorPagina;
    const indiceFinal = indiceInicial + cantidadPorPagina;
    const feriadosEnPagina = feriadosFiltrados.slice(indiceInicial, indiceFinal);

    const totalPaginas = Math.ceil(feriadosFiltrados.length / cantidadPorPagina);

    const paginaSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
    };

    const paginaAnterior = () => {
      if (paginaActual > 1) setPaginaActual(paginaActual - 1);
    };


  return (
    <div className="lista-api">
      <h1>Feriados en Argentina</h1>

      <div className="filtros">
        <label>
          Año:
          <select value={anioSeleccionado} onChange={(e) => setAnioSeleccionado(e.target.value)}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </label>

        <label>
          Mes:
          <select value={mesSeleccionado} onChange={(e) => setMesSeleccionado(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="01">Enero</option>
            <option value="02">Febrero</option>
            <option value="03">Marzo</option>
            <option value="04">Abril</option>
            <option value="05">Mayo</option>
            <option value="06">Junio</option>
            <option value="07">Julio</option>
            <option value="08">Agosto</option>
            <option value="09">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </label>
      </div>

      {loading && <p>Cargando feriados...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="tarjetas-container">
        {feriadosEnPagina.length === 0 ? (
          <p>No hay feriados para este mes.</p>
        ) : (
          feriadosEnPagina.map((feriado) => (
            <div key={`${feriado.fecha}-${feriado.nombre}`} className="card api-card">
              <div className="card-body">
                <h3 className="card-title">{feriado.nombre}</h3>
                <p className="card-description">
                  <strong>Fecha:</strong> {getFecha(feriado.fecha)}
                </p>
                <p className="card-description">
                  <strong>Tipo:</strong> {feriado.tipo.charAt(0).toUpperCase() + feriado.tipo.slice(1)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>


      <div className="paginacion">
        <button onClick={paginaAnterior} disabled={paginaActual === 1}>Anterior</button>
        <span>Página {paginaActual} de {totalPaginas}</span>
        <button onClick={paginaSiguiente} disabled={paginaActual === totalPaginas}>Siguiente</button>
      </div>


    </div>
  );
};

export default ListaAPI;