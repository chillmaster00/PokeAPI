const api_url = "https://pokeapi.co/api/v2/pokemon/charizard/";



// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    show(data);
}

// Calling that async function
getapi(api_url);
  
// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

// Function to define innerHTML for HTML table
function show(data) {
    let id = "0" + data.id;
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
        ht2 = "0" + ht2
    }
    let wt = (data.weight * 0.1 * 2.20462262).toFixed(1);

    console.log(id + " " + name + " " + type + " " + ht1 + "'" + ht2 + '"' + " " + wt);
    let url = data.sprites.front_default;

    let tab = 
        `<tr>
          <br>      No.${id}</br>
          <br>      ${name}</br>
          <br>TYPE:  ${type}</br>
          <br>HT    ${ht1}'${ht2}"</br>
          <br>WT${wt} lb</br>
         </tr>`;
    
    // Setting innerHTML as tab variable
    document.getElementById("display").innerHTML = tab;
    console.log(url);
    document.getElementById("pic").src = url;
}