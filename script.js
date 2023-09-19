const BuscadorPokemon=document.getElementById("PokemonID")
const EspacioInfo=document.getElementById("infoPokemon")
const pokemonId=BuscadorPokemon.value; //Obtener el valor ingresado por el usuario en el campo de entrada de texto
const BotonBuscador=document.getElementById("btn")
const BotonPokemonRandom=document.getElementById("btnRandom")

function PokemonAPI (url){ //Función para realizar una solicitud a una api y mostrar la información de un pokemon
fetch (url) 
.then ((res) => {
    if (!res.ok){
        if (res.status===404){
            alert("Ingresaste una ID de un pokemon que aun no existe. Introduce un número valido")
        }
        throw new Error ("Hubo un error");
    }
    return res.json();
})

.then ((data)=>{
    //Asigna los valores a ciertos atributos de "data" (info de la API)
    const IDPokemon= data.id //acceder al dato de la ID del pokemon
    const NamePokemon=data.name //acceder al dato del nombre del pokemon
    const ExperienciePokemon=data.base_experience //acceder al dato la experiencia base del pokemon
    const HeightPokemon=data.height //acceder al dato de la altura del pokemon
    const ImgPokemon=data.sprites.front_default; //acceder al dato de la imagen pokemon

    //Esta parte del código permite tomar los datos indicados de la API (id, name, img...) y los muestra en el div vacio indicado (infoPokemon)
    infoPokemon.innerHTML= `
    <h2>${NamePokemon}</h2>
    <p>ID: ${IDPokemon}</p>
    <p>Altura: ${HeightPokemon} dm</p>
    <p>Experiencia base: ${ExperienciePokemon} </p>
    <img src="${ImgPokemon}">`; 
});
}


BotonBuscador.addEventListener("click", function(){ //Evento del boton de busqueda, que lo que hace es acceder a los datos de la API mediante la ID del Pokemon
    const pokemonId=BuscadorPokemon.value;
    const APIPokemon=`https://pokeapi.co/api/v2/pokemon/${pokemonId}`; //API, con la indicacion que se acceda al pokemon mediante su ID
    PokemonAPI(APIPokemon);
});


BotonPokemonRandom.addEventListener("click", function(){ //Evento del boton para generar un pokemon random
    const PokemonRandomID=Math.floor(Math.random() * 1010) + 1; //Generar número aleatorio. "Math.floor()" redondea hacia abajo un número decimal y lo convierte en un número entero.
    const APIPokemonRandom=`https://pokeapi.co/api/v2/pokemon/${PokemonRandomID}`
    PokemonAPI(APIPokemonRandom);
});
