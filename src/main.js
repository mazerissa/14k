import{site,about,projects,links}from"./data.js";
import{d,b}from"./generated-blog.js";

const app=document.querySelector("#app");

const A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

const dec=s=>{
 if(!s)return"";

 return s.replace(
  /~([A-Za-z0-9_-]+)/g,
  (_,x)=>{
   let n=0;

   for(const c of x)
    n=n*A.length+A.indexOf(c)+1;

   return d[n-1]||"";
  }
 );
};

const md=s=>{

 const lines=s
  .replace(/\r/g,"")
  .split("\n");

 const out=[];
 let list=false;

 for(const line of lines){

  if(!line.trim()){
   if(list){
    out.push("</ul>");
    list=false;
   }
   continue;
  }

  if(line.startsWith("- ")){

   if(!list){
    out.push("<ul>");
    list=true;
   }

   out.push(
    "<li>"+inline(line.slice(2))+"</li>"
   );

   continue;
  }

  if(list){
   out.push("</ul>");
   list=false;
  }

  if(line.startsWith("### "))
   out.push("<h3>"+inline(line.slice(4))+"</h3>");
  else if(line.startsWith("## "))
   out.push("<h2>"+inline(line.slice(3))+"</h2>");
  else if(line.startsWith("# "))
   out.push("<h1>"+inline(line.slice(2))+"</h1>");
  else
   out.push("<p>"+inline(line)+"</p>");
 }

 if(list)out.push("</ul>");

 return out.join("");
};

const inline=s=>
 s
 .replace(/&/g,"&amp;")
 .replace(/</g,"&lt;")
 .replace(/>/g,"&gt;")
 .replace(
  /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
  '<a href="$2" target="_blank" rel="noopener">$1</a>'
 )
 .replace(
  /\*\*(.*?)\*\*/g,
  "<strong>$1</strong>"
 )
 .replace(
  /\*(.*?)\*/g,
  "<em>$1</em>"
 );

const link=(url,text)=>{
 const x=/^https?:\/\//.test(url)
  ?' target="_blank" rel="noopener"'
  :"";

 return `<a href="${url}"${x}>${text}</a>`;
};

const header=()=>`
<header>
<a class="logo" href="/">YE</a>
<nav>
<a href="/projects">PROJECTS</a>
<a href="/about">ABOUT</a>
<a href="/blog">BLOG</a>
</nav>
</header>
`;

const projectsPage=()=>`
<section>
<h2>PROJECTS</h2>
<div class="list">
${projects.map(p=>`
<a class="row" href="/projects/${p.id}">
<span>${p.name}</span>
<span class="muted">${p.description}</span>
<span>→</span>
</a>
`).join("")}
</div>
</section>
`;

const projectPage=id=>{

 const p=projects.find(x=>x.id===id);

 if(!p)return notFound();

 return`
<section class="project">
<h1>${p.name}</h1>
<p class="muted">${p.description}</p>
<img
 class="project-image"
 src="${p.image}"
 alt="${p.name}"
>
<p>${link(p.github,"GitHub ↗")}</p>
</section>
`;
};

const aboutPage=()=>`
<section>
<h2>ABOUT</h2>
<p>${about}</p>
</section>
`;

const blogPage=()=>`
<section>
<h2>BLOG</h2>
<div class="list">
${Object.entries(b).map(([s,p])=>`
<a class="row" href="/blog/${s}">
<span>${p[0]}</span>
<span class="muted">${p[1]}</span>
<span>→</span>
</a>
`).join("")}
</div>
</section>
`;

const postPage=slug=>{

 const p=b[slug];

 if(!p)return notFound();

 const text=
  p[2][0]==="."
   ?p[2].slice(1)
   :dec(p[2]);

 return`
<article class="post">
<div class="post-date">${p[1]}</div>
${md(text)}
</article>
`;
};

const home=()=>`
<section class="hero">
<h1>${site.name}</h1>
<p class="muted">${site.description}</p>
</section>
${projectsPage()}
${blogPage()}
`;

const notFound=()=>`
<section>
<h1 class="small-title">404</h1>
<p class="muted">Page not found.</p>
</section>
`;

const route=p=>{

 if(p==="/")return home();
 if(p==="/projects")return projectsPage();
 if(p==="/about")return aboutPage();
 if(p==="/blog")return blogPage();

 let m=p.match(/^\/projects\/([^/]+)$/);

 if(m)return projectPage(m[1]);

 m=p.match(/^\/blog\/([^/]+)$/);

 if(m)return postPage(m[1]);

 return notFound();
};

const render=()=>{

 const p=
  location.pathname
   .replace(/\/+$/,"")||"/";

 app.innerHTML=`
<main>
${header()}
${route(p)}
<footer>
<span>${site.name} / ${site.year}</span>
<div class="footer-links">
${links.map(x=>link(x.url,x.name+" ↗")).join("")}
</div>
</footer>
</main>
`;
};

document.addEventListener("click",e=>{

 const a=e.target.closest("a");

 if(
  !a||
  a.target==="_blank"||
  a.origin!==location.origin
 )return;

 e.preventDefault();

 history.pushState({},"",a.pathname);

 render();

 scrollTo(0,0);
});

addEventListener("popstate",render);

render();