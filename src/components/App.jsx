import React, { useState } from 'react'
import Busqueda from './Busqueda'

const App = () => {

  const [catBusqueda, setCatBusqueda] = useState(categorias)

  return (
    <>
      <div>Aplicación</div>
      <Busqueda setCatBusqueda={setCatBusqueda} />
      <hr />
      <ol>
        {
          catBusqueda.map(catbusqueda => (
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