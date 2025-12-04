//Handle GET request

import { getData } from "./getData.js";

export async function handleGet(){
    const jsonData = await getData();
    const stringData = JSON.stringify(jsonData);
    return stringData;
}

//Handle POST request