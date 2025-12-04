import path from "node:path";
import fs from "node:fs/promises";

export async function addData(data){
    try{
        const pathJSON = path.join('./data.json');
        const newData = await fs.writeFile(pathJSON,JSON.stringify(data, null, 2),'utf8');
        return;

    }catch(err){
        console.log(err)
        return;
    }
    
}