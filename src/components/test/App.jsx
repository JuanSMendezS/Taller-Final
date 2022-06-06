import React, { useState } from 'react'
import Form from './Form'
import { firebase } from '../firebase'


const App = () => {

  const [pokemon, setPokemon] = useState({})
  const [pokeEdit, setPokeEdit] = useState({})
  const [listaPokemon, setListaPokemon] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false)


  const consulta = async () => {
    try {
      const db = firebase.firestore()
      const data = await db.collection('proyecto').get()
      const arrayData = data.docs.map(item => (
        {
          id: item.id, ...item.data()
        }
      ))
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
          img: pokemon.img,
          descripcion: pokemon.descripcion
        }
        await db.collection('proyecto').add(nuevoReg)

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
  }, [pokemon])


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

  const editar = item => {
    setPokeEdit({
      id: item.id,
      name: item.name,
      descripcion: item.descripcion,
      img: item.img
    })
    setModoEdicion(true)
  }


  return (
    <div className='container'>
      <h1 className='text-center animate__heartBeat'>Aplicación</h1>
      <Form
        setPokemon={setPokemon}
        modoEdicion={modoEdicion}
        setModoEdicion={setModoEdicion}
        pokeEdit={pokeEdit}
        setListaPokemon={setListaPokemon}
        listaPokemon={listaPokemon}
      />
      <hr />
      {
        listaPokemon.map((item) => (
          <div key={item.id} className='d-flex flex-row bd-highlight mb-3 card animate__backInLeft'>
            <div className='col-1 align-self-center animate__backInLeft mx-2'>
              <label htmlFor="Name">{item.name}</label>
            </div>
            <div className='col-1 align-self-center animate__backInLeft'>
              <label htmlFor="Descripcion">{item.descripcion}</label>
            </div>
            <div className='col-1 align-self-center animate__backInLeft'>
              <img src={item.img} alt={item.id} />
            </div>
            <div className='col-1 align-self-center animate__backInLeft'>
              <div className='row animate__backInLeft'>
                <button
                  className='btn btn-warning btn-block my-1 animate__backInLeft'
                  onClick={() => { editar(item) }}>Editar</button>
              </div>
              <div className='row'>
                <button
                  className='btn btn-danger btn-block my-1 animate__backInLeft' onClick={()=>{erase(item.id)}}
                >Eliminar</button>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default App