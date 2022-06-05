import React from 'react'
import ApiItem from './Item'
import { useGetApi } from '../hooks/useGetApi'

const Contenedor = ({ valorBusqueda }) => {
    const { res, cargando } = useGetApi(valorBusqueda)
    return (
        <>
            <h2>
                {valorBusqueda}
            </h2>
            {cargando && <p>Cargando</p>}
            <div>{
                res.map((api) =>
                    <ApiItem
                        key={api.id}
                        {...api} />
                )
            }</div>
        </>
    )
}

export default Contenedor