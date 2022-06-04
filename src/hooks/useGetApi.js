import {useEffect, useState} from 'react'
import {getApi} from '../helpers/getApi'

export const useGetApi = (valorBusqueda) => {

    const [estado, setEstado] = useState({
        api: [],
        cargando: true
    })

    useEffect(()=>{
        setTimeout(()=>
            getApi(valorBusqueda)
            .then(api =>{
                setEstado({
                    api: api,
                    cargando: false
                });
            }), 6)
    },[valorBusqueda])

    return estado;
  
}