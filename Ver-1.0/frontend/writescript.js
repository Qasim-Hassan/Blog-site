async function initApp(){
    const publish = document.getElementById("publish-btn");
    const title = document.getElementById("story-title");
    const text = document.getElementById("story-textarea");

    publish.classList.add("disabled");

    title.addEventListener("input",()=>{
        if (text.value.trim()!=="" && title.value.trim()!==""){
            publish.classList.remove("disabled");
        }else{
            publish.classList.add("disabled")
        }

    });

    text.addEventListener("input",()=>{
        if (text.value.trim()!=="" && title.value.trim()!==""){
            publish.classList.remove("disabled");
        }else{
            publish.classList.add("disabled")
        }

    });

    publish.addEventListener("click",async ()=>{
        if (text.value.trim() ==="" || title.value.trim()===""){
            return;
        }

        const data = {
            title: title.value.trim(),
            text: text.value.trim()
        }

        const upload = await fetch("/api",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        } );

        if (upload.ok){
            title.value = "";
            text.value = "";
            window.location.href = "index.html";
        }else{
            window.location.href = "404.html"
        }

        
    });


    window.app = {}
}

initApp()