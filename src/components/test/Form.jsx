import React, { useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { firebase } from '../firebase'
import 'animate.css'

const Form = ({ setPokemon, modoEdicion, setModoEdicion, pokeEdit, listaPokemon, setListaPokemon }) => {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [img,setImg]=useState('')

    const consultarPokemon = () => {
        axios.get('https://pokeapi.co/api/v2/pokemon/' + name).then((result) => {
            const pokemon = {
                img: result.data.sprites.front_default,
                name,
                descripcion
            }
            setPokemon(pokemon)
            setName('')
            setDescripcion('')
        }).catch((err) => {
            console.error(err)
        })
    }

    React.useEffect(() => {
        if (modoEdicion) {
            const cargarDatos = () => {
                setId(pokeEdit.id)
                setName(pokeEdit.name)
                setDescripcion(pokeEdit.descripcion)
                setImg(pokeEdit.img)
            }
            cargarDatos()
        }
    }, [modoEdicion,pokeEdit])

    const edit = async (e) => {
        e.preventDefault()
        try {
            const db = firebase.firestore()
            await db.collection('proyecto').doc(id).update({
                name,
                descripcion,
                img
            })
            const regEdit = listaPokemon.map(item => item.id === id ? {
                id,
                name,
                descripcion,
                img
            } : item)

            setListaPokemon(regEdit)
            setModoEdicion(false)
            setId('')
            setName('')
            setDescripcion('')
        } catch (err) {
            console.error(err)
        }
    }
    const cancelar = (e) => {
        e.preventDefault()
        setModoEdicion(false)
        setId('')
        setName('')
        setDescripcion('')
    }

    return (
        <form>
            <label htmlFor="name" className='forn-label'>Nombre del pokemon:</label>
            <input type="text" id='name' className='form-control my-2' value={name} onChange={(e) => { setName(e.target.value) }} />

            <label htmlFor="name" className='forn-label'>Descripción:</label>
            <input type="text" id='name' className='form-control my-2' value={descripcion} onChange={(e) => { setDescripcion(e.target.value) }} />
            {
                modoEdicion ? (
                    <>
                        <Button onClick={(e) => { edit(e) }} className='mx-2'>editar</Button>
                        <Button onClick={cancelar}>Cancelar</Button>
                    </>
                ) : <Button onClick={consultarPokemon}>Buscar Pokemon</Button>
            }
        </form>
    )
}

export default Form