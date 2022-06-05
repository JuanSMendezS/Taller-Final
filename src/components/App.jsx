import React, { useState } from 'react'
import Form from './Form'
import { firebase } from '../firebase'

const App = () => {
  const [pokemon, setPokemon] = useState({})
  const [listaPokemon, setListaPokemon] = useState([])

  const consulta = async () => {
    try {
      const db = firebase.firestore()
      const data = await db.collection('proyecto').get()
      const arrayData = data.docs.map(item => (
        {
          id: item.id, ...item.data()
        }
      ))
      console.log(arrayData)
      setListaPokemon(arrayData)
    } catch (err) {
      console.error(err)
    }
  }

  React.useEffect(() => {
    const savePoke = async () => {
      try {
        const db = await firebase.firestore();
        const nuevoReg =
        {
          name: pokemon.name,
          img: pokemon.img
        }
        const data = await db.collection('proyecto').add(nuevoReg)
        const newPokemon = {
          id: data.id,
          name: pokemon.name,
          img: pokemon.img
        }
        setListaPokemon([...listaPokemon, newPokemon])
        setPokemon({})
      } catch (err) {
        console.error(err)
      }
    }
    if (Object.keys(pokemon).length > 0) {
      savePoke()
    }
  }, [pokemon])

  React.useEffect(() => {
    consulta()
  }, [])

  
    const erase = id => {
      try {
        const db = firebase.firestore()
        db.collection('proyecto').doc(id).delete()
        const aux = listaPokemon.filter(item => item.id !== id)
        setListaPokemon(aux)
      } catch (err) {
        console.log(err)
      }
    }
  

  const edit = async (e) => {
    e.preventDefault()
    try {
      const db = firebase.firestore()
      const data = await db.collection('proyecto')
      await db.collection('proyecto').doc(data.id).update({
        id: data.id,
        name: pokemon.name
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='container'>
      <h1 className='text-center'>Aplicación</h1>
      <Form
        setPokemon={setPokemon}
      />
      <hr />
      {
        listaPokemon.map((item) => (
          <div key={item.id} className='d-flex flex-row bd-highlight mb-3 card '>
            <div className='col-1 align-self-center'>
              <label htmlFor={item.id}>{item.name}</label>
            </div>

            <div className='col-1 align-self-center'>
              <img src={item.img} alt={item.name} id={item.id} />
            </div>
            <div className='col-1 align-self-center'>
              <div className='row'>
                <button
                  className='btn btn-danger btn-block my-1'
                  onClick={erase}>Eliminar</button>
              </div>
              <div className='row'>
                <button
                  className='btn btn-warning btn-block my-1'
                  onClick={edit}>Editar</button>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default App