export const consulta = async () => {
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