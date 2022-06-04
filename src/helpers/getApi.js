export const getApi = async (valorBusqueda, limit = 6) => {

    const url = `https://www.googleapis.com/customsearch/v1?key=AIzaSyAH4GNL8zzRnSmPEVYokn8RTiKVLPQiDWo&cx=017576662512468239146:omuauf_lfve&q=${valorBusqueda}&limit=${limit}`;
    const resp = await fetch(url);
    const { data } = await resp.json();

    const api = data.map(({ id, title, images }) => {
        return {
            id: id,
            title: title,
            url: images.downsized.url
        }
    })

    return api;
}