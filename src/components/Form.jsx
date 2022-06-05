import React, { useState } from 'react'
import axios from 'axios'
import {Button} from 'react-bootstrap'
const Form = ({ setPokemon }) => {
    const [name,setName]=useState('')
    const consultarPokemon = () => {
        axios.get('https://pokeapi.co/api/v2/pokemon/'+name).then((result) => {
            const pokemon = {
                img: result.data.sprites.front_default,
                name
            }
            setPokemon(pokemon)
            setName('')
        }).catch((err) => {
            console.error(err)
        })
    }
    return (
        <form>
            <label htmlFor="name" className='forn-label'>Nombre del pokemon:</label>
            <input type="text" id='name' className='form-control my-2' value={name} onChange={(e)=>{setName(e.target.value)}}  />
            <Button onClick={consultarPokemon}>Buscar Pokemon</Button>
        </form>
    )
}

export default Form