//Anywhere in the app if we need our data, this function is called!

import path from "node:path";
import fs from "node:fs/promises";

export async function getData(){
    try{
        const pathJSON = path.join('./data.json');
        const data = await fs.readFile(pathJSON,'utf8');  //-> we want string
        const parsedData = JSON.parse(data);
        return parsedData;
    }catch(err){
        console.log(err);
        return [];
    }
    
     
}