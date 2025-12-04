async function initApp (){

  async function getreq(){
    try{
      const data = await fetch("/api");
      return await data.json();
    }catch(err){
      console.log(err)
    }
  }

  const posts = await getreq();
  console.log(JSON.stringify(posts,null,2));
  const homeView = document.getElementById("home-view");
  const readerView = document.getElementById("reader-view");
  const article = document.getElementById("article-content");
  const postgrid = document.getElementById("posts-grid");
  const sidebarList = document.getElementById("sidebar-list");

  // Populate sidebar list except the opened post
  function populateSidebar(activeIndex) {
    sidebarList.innerHTML = ""; // clear old items

    posts.forEach((post, index) => {
      if (index === activeIndex) return; // skip current

      const item = document.createElement("div");
      item.className = "sidebar-item";
      item.textContent = post.title;

      item.onclick = () => openPost(index); // clicking opens reader for that

      sidebarList.appendChild(item);
    });
  }

  function showHome() {
    readerView.style.display = "none";
    homeView.style.display = "block";
  }

  function openPost(index) {
    const post = posts[index];

    // fill article area
    article.innerHTML = `
      <h1>${post.title}</h1>
      ${post.text}
    `;

    populateSidebar(index);

    homeView.style.display = "none";
    readerView.style.display = "flex";
  }

  async function getImage(query){
    try{
      const url = await fetch(`/api/image?title=${query}`);
      return url;
    }catch(err){
      console.log(err)
    }
  }

  posts.forEach(async (blog,index)=>{
    const imgsource = await getImage(blog.title)
    const dataImg = await imgsource.json();
    const article = document.createElement("div")
    article.innerHTML = `
    <article class="post-card" onclick="window.app.openPost(${index})">
        <img src="${dataImg}" alt="Mock ${index+1}">
        <h2>${blog.title}</h2>
    </article>
    `;
    postgrid.appendChild(article)
  });

  window.app = {showHome, openPost};

};


initApp();


            // <article class="post-card" onclick="window.app.openPost(0)">
            //   <img src="https://picsum.photos/400/250?random=1" alt="Mock 1">
            //   <h2>The Serenity of Early Mornings</h2>
            //   <p>A reflection on calm beginnings...</p>
            // </article>