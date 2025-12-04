//Handle GET request

import { getData } from "./getData.js";

async function handleGet(){
    const jsonData = await getData();
    const stringData = JSON.stringify(jsonData);
    return stringData;
}

//Handle POST request   //Sanitizing remains

async function handlePost(data){
    const jsonData = await getData();

    jsonData.push(JSON.parse(data));
    return jsonData;
}

export {handleGet, handlePost};
