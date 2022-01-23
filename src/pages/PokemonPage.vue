<template>
    <h1 v-if="!pokemon"> Espere por favor... </h1>

    <div v-else>
        <h1>¿Quién es este pokémon?</h1>

        <!-- Picture -->
        <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />

        <!-- Options -->
        <PokemonOptions
          :pokemons="pokemonsArr"
          @selection-pokemon="checkAnswer" 
        />
        <template v-if="showMessage">
            <h2  class="fade-in" > {{ message }} </h2>
            <button @click="newGame" >Nuevo Juego</button>
        </template>
        
    </div>
</template>

<script>
import PokemonOptions from "@/components/PokemonOptions.vue";
import PokemonPicture from "@/components/PokemonPicture.vue";

import getPokemonOptions from "@/helpers/getPokemonOptions";

export default {
    components: {
        PokemonPicture,
        PokemonOptions,
    },
    data() {
        return {
            pokemonsArr: [],
            pokemon: null,
            showPokemon: false,
            showMessage: false,
            message: ''
        };
    },

    methods: {
        async mixPokemonArray() {
            this.pokemonsArr = await getPokemonOptions();
            const rndInt = Math.floor( Math.random() * 4 );
            this.pokemon = this.pokemonsArr[rndInt];
        },
        checkAnswer( pokemonId ){
            this.showPokemon = true;
            this.message = ( pokemonId === this.pokemon.id  ) ? 'Correcto, ' +  this.pokemon.name : 'Ops, era ' + this.pokemon.name;
            this.showMessage = true;
            console.log('Pokenmon page' , pokemonId);
        },
        newGame(){
            this.showPokemon =  false;
            this.showMessage = false;
            this.pokemon = null;
            this.pokemonsArr = [];
            this.mixPokemonArray();
        }
    },

    mounted() {
        this.mixPokemonArray();
    },
};
</script>