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

  return (
    <div className='container'>
      <h1 className='text-center'>Aplicación</h1>
      <Form
        setPokemon={setPokemon}
      />
      <hr />
      {
        listaPokemon.map((item) => (
          <div key={item.id}>
            <label htmlFor={item.id}>{item.name}</label>
            <img src={item.img} alt={item.name} id={item.id} />
          </div>

        ))
      }
    </div>
  )
}

export default App