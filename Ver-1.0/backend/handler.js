//Handle GET request

import { getData } from "./getData.js";
import sanitizeHTML from 'sanitize-html';

async function handleGet(){
    const jsonData = await getData();
    const stringData = JSON.stringify(jsonData);
    return stringData;
}

//Handle POST request   //Sanitizing remains

async function handlePost(data){
    const jsonData = await getData();

    const sanitizedData = {};   //-> sanitizing data
    
    for (const [key,value] of Object.entries(JSON.parse(data))){
        sanitizedData[key] = sanitizeHTML(value, { allowedTags: ['b'], allowedAttributes: {}})
    }

    jsonData.push(sanitizedData);
    return jsonData;
}

export {handleGet, handlePost};
