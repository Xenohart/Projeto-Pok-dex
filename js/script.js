const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonType = document.querySelector('.pokemon_type');
const pokemonType2 = document.querySelector('.pokemon_type2');
const pokemonPeso = document.querySelector('.pokemon_weight');

const form = document.querySelector('.form');
const input= document.querySelector('.input_search');

const buttonPrev= document.querySelector('.btn-prev');
const buttonNext= document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => 
    {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        if(APIResponse.status == 200)
            {
                const data = await APIResponse.json();

                return data;
            }

    }

    const renderPokemon = async (pokemon) => 
        {

            pokemonName.innerHTML='Loading...';
            pokemonNumber.innerHTML='';

            const data= await fetchPokemon(pokemon);

            if(data)
            {

                pokemonImage.style.display='block';
                pokemonName.innerHTML = data.name;
                pokemonNumber.innerHTML = data.id;
                pokemonType.innerHTML=data['types']['0']['type']['name'];   
                pokemonPeso.innerHTML=data.weight;
                pokemonImage.src= data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
                

                if(data.id >=650)
                    {
                        //pokemonImage.src= data['sprites']['versions']['generation-vii']['ultra-sun-ultra-moon']['front_default'];

                        pokemonImage.src= data['sprites']['front_default'];
                    }

                        

                input.value='';
                searchPokemon= data.id;
            }
            else
            {
                pokemonImage.style.display='none';
                pokemonName.innerHTML='Not found';
                pokemonNumber.innerHTML="";
                input.value='';
            }

        }


        form.addEventListener('submit', (event) => 
            {
                event.preventDefault();

                renderPokemon(input.value.toLowerCase());

            });


            buttonPrev.addEventListener('click', () =>
                {
                    if(searchPokemon > 1)
                        {
                            searchPokemon -= 1;
                            renderPokemon(searchPokemon);
                        }
                });

                buttonNext.addEventListener('click', () =>
                    {
                        searchPokemon += 1;
                        renderPokemon(searchPokemon);
                    });


                    renderPokemon(searchPokemon);

                    


