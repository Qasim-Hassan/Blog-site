import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {getExt} from './utils/serveStatic.js'
import { getData } from './getData.js';
import { handleGet, handlePost } from './handler.js';
import {fetchUnsplashImage} from './getImage.js';
import {addData} from './setData.js';

const __dirname = import.meta.dirname;  //-> abs path of server.js
const PORT = 5000;
const FEdir = path.join(__dirname,"../frontend");

const server = http.createServer(async(req,res)=>{

    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.url==='/api'){
        if (req.method === 'GET'){
            const content =  await handleGet();
            res.statusCode = 200;
            res.setHeader('Content-type','application/json');
            res.end(content)
        }else if (req.method === 'POST'){
            let packets = '';

            for await(const chunk of req){
                packets += chunk;               //Node seperates headers, methods, etc. from req under the hood, leaving only the "BODY"
            }

            try{
                const alterData = await handlePost(packets);
                
                await addData( await alterData);

                res.statusCode = 201;
                res.end();
            }catch(err){
                res.statusCode = 400;
                console.log(err);
                res.end()
            }
        }
    }else if (url.pathname === '/api/image'){
        const title = url.searchParams.get("title");
        const imgurl = await fetchUnsplashImage(title);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(imgurl))

    }else if(!req.url.startsWith('/api')){
        const filePath = path.join(FEdir, req.url === "/"? "index.html" : req.url === "/favicon.svg?v=1" ? "favicon.svg": req.url);

        const ext = path.extname(filePath);
        const contentType = getExt(ext);
    
        try{
            const content = await fs.readFile(filePath);
            res.statusCode = 200;
            res.setHeader('Content-type',contentType);
            // res.writeHead(200, {'Content-Type':contentType});
            res.end(content)
        }catch(err){
            if(err.code==="ENOENT"){
                const content = await fs.readFile(path.join(FEdir,"404.html"));
                res.statusCode = 404;
                res.setHeader('Content-type','text/html');
                res.end(content);
            }
        }
    }
});

server.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`))