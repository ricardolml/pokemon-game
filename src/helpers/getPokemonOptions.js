import pokemosApi from '../api/pokemonApi';

const getPokemons = () => {
    const pokemonsArr = Array.from( Array(650) );
    return pokemonsArr.map( ( num , index ) => index + 1  );
}

const getPokemonOptions = async () => {

    const mixdPokemon = getPokemons().sort( () => Math.random() - 0.5 );
    const pokemons = await getPokemonNames( mixdPokemon.splice(0 , 4) );
    return pokemons;
    // console.table(pokemons);
}

const getPokemonNames = async( [ a , b ,c ,d ] = [] ) => {
    // const resp = await pokemosApi.get(`/${a}`);
    const promiseArr = [
        pokemosApi.get(`/${a}`),
        pokemosApi.get(`/${b}`),
        pokemosApi.get(`/${c}`),
        pokemosApi.get(`/${d}`)
    ];
    const [ p1, p2 ,p3 , p4] = await Promise.all( promiseArr );

    return [
        { name : p1.data.name , id: p1.data.id },
        { name : p2.data.name , id: p2.data.id },
        { name : p3.data.name , id: p3.data.id },
        { name : p4.data.name , id: p4.data.id }
    ]
}

export default getPokemonOptions;