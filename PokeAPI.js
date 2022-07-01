

const api_url = "https://pokeapi.co/api/v2/pokemon/";
const info_url = "https://pokeapi.co/api/v2/pokedex/national/";
let pokemon = "1";
let id = 1;

// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url + pokemon);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    show(data);

    // Storing response
    const response2 = await fetch(info_url);

    // Storing data in form of JSON
    var data2 = await response2.json();
    console.log(data2);
    if (response2) {
        hideloader();
    }
    var finalURL = data2.pokemon_entries[+id - 1].pokemon_species.url;
    
    const response3 = await fetch(finalURL);

    // Storing data in form of JSON
    var data3 = await response3.json();
    var langCount = 0;
    console.log(data3);

    while(data3.flavor_text_entries[langCount].language.name !== 'en'){
        langCount++;
        console.log(langCount);
    }
    if (response2) {
        hideloader();
    }
    document.getElementById("dex").innerHTML = data3.flavor_text_entries[langCount].flavor_text;
}

// Calling that async function
getapi(api_url);
  
// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

// Function to define innerHTML for HTML table
function show(data) {
    id = data.id;
    if (id < 10){
        id = "00" + id;
    }
    else if(id < 100){
        id = "0" + id;
    }

    let name = data.name.toUpperCase();
    let type = "";
    if(data.types[1] === undefined){
        type = data.types[0].type.name.toUpperCase();
    }
    else{

        type = data.types[0].type.name.toUpperCase()
            + " " + data.types[1].type.name.toUpperCase();
    }
    let ht1 = Math.floor(data.height * 0.1 * 3.2808399);
    let ht2 = ((data.height * 0.1 * 39.3700787) % 12 ).toFixed(0);
    if(ht2 == 12){
        ht1 += 1;
        ht2 = "00";
    }
    else if(ht2 < 10){
        ht2 = "0" + ht2;
    }
    ht1 = "     " + ht1;
    let wt = "     " + (data.weight * 0.1 * 2.20462262).toFixed(1);
    let url = data.sprites.front_default;

    let tab = 
        `<tr>
          <br>${name}</br>
          <br>TYPE:
          ${type}<br>
          <br>HT ${ht1}'${ht2}"</br>
         </tr>`;
    let tab2 = 
        `<tr>
          WT${wt} lb<br>
         </tr>`;
    
    // Setting innerHTML as tab variable
    document.getElementById("display").innerHTML = tab;
    document.getElementById("display2").innerHTML = "No." + id;
    document.getElementById("display3").innerHTML = tab2;
    document.getElementById("display3")

    document.getElementById("pic").src = url;

}

function buttonPress(button){
    //checks for various buttons
    if(button === 'l'){
        pokemon = +id - 1;
    }
    else{
        pokemon = +id + 1;
    }
    getapi(api_url);
}
//keyboard listener
document.getElementById("in").addEventListener('keydown', (event) => {
    //finds the key pressed and the code for that key (code is useless)
    var name = event.key;
    var code = event.code;

    //if enter is pressed
    if (name === 'Enter') {
        pokemon = document.getElementById("in").value;
        document.getElementById("in").value = '';
        getapi(api_url);
    }
}, false);