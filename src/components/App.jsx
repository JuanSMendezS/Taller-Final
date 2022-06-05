import React, { useState } from 'react'
import Busqueda from './Busqueda'
import Contenedor from './Contenedor'

const App = (categorias) => {

  const [catBusqueda, setCatBusqueda] = useState(categorias)

  return (
    <>
      <div>Aplicación</div>
      <Busqueda setCatBusqueda={setCatBusqueda} />
      <hr />
      <ol>
        {
          catBusqueda.map(catBusqueda => (
            <Contenedor
              key={catBusqueda}
              valorBusqueda={catBusqueda}
            />
          ))
        }
      </ol>
    </>
  )
}

export default App