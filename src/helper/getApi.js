export const getApi = async () => {
    const [name, setName] = useState('')
    const consultarPokemon = () => {
        const resultado = await axios.get('https://pokeapi.co/api/v2/pokemon/' + name).then((result) => {
            const pokemon = {
                img: result.data.sprites.front_default,
                name
            }
            setPokemon(pokemon)
            setName('')
        }).catch((err) => {
            console.error(err)
        })
        return resultado
    }
}    