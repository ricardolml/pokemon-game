import axios from "axios";

const pokemosApi = axios.create({
    baseURL:'https://pokeapi.co/api/v2/pokemon'
});

export default pokemosApi;