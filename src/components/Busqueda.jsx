import React, { useState } from 'react'

const Busqueda = ({ setCatBusqueda }) => {
    const [valorBusqueda, setValorBusqueda] = useState('')

    const cambiarBusqueda = (e) => {
        setValorBusqueda(e.target.value)
    }

    const buscar = (e) => {
        e.preventDefault()
        if (valorBusqueda.trim().length > 0){
            setCatBusqueda(valores => [valorBusqueda, ...valores])
            setValorBusqueda('')
        }
    }

    return (
        <>
        <form onSubmit={buscar}>
        <input
        type='text'
        value={valorBusqueda}
        onChange={cambiarBusqueda}
        />
        </form>
        <p>
            {valorBusqueda}
        </p>
        </>
    )
}

export default Busqueda