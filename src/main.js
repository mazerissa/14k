import{site,about,projects,links}from"./data.js";
import{D,B}from"./generated-blog.js";

const app=document.querySelector("#app");

const dec=s=>s?s.replace(/~(\d+)~/g,(_,i)=>D[i]??""):"";

const md=s=>s
 .replace(/&/g,"&amp;")
 .replace(/</g,"&lt;")
 .replace(/>/g,"&gt;")
 .replace(/^### (.*)$/gm,"<h3>$1</h3>")
 .replace(/^## (.*)$/gm,"<h2>$1</h2>")
 .replace(/^# (.*)$/gm,"<h1>$1</h1>")
 .replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")
 .replace(/\*(.*?)\*/g,"<em>$1</em>")
 .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
  '<a href="$2" target="_blank" rel="noopener">$1</a>')
 .replace(/\n\n+/g,"</p><p>")
 .replace(/^(.+)$/gm,"<p>$1</p>");

const ext=(u,t)=>`<a href="${u}"${/^https?:/.test(u)?' target="_blank" rel="noopener"':""}>${t}</a>`;

const header=()=>`
<header>
<a class="logo" href="/">YE</a>
<nav>
<a href="/projects">PROJECTS</a>
<a href="/about">ABOUT</a>
<a href="/blog">BLOG</a>
</nav>
</header>`;

const projectsPage=()=>`
<section>
<h2>PROJECTS</h2>
<div class="list">
${projects.map(p=>`
<a class="row" href="/projects/${p.id}">
<span>${p.name}</span>
<span class="muted">${p.description}</span>
<span>→</span>
</a>`).join("")}
</div>
</section>`;

const projectPage=id=>{
 const p=projects.find(x=>x.id===id);
 return p?`
<section class="project">
<h1>${p.name}</h1>
<p class="muted">${p.description}</p>
<img class="project-image" src="${p.image}" alt="${p.name}">
<p>${ext(p.github,"GitHub ↗")}</p>
</section>`:nf();
};

const aboutPage=()=>`
<section>
<h2>ABOUT</h2>
<p>${about}</p>
</section>`;

const blogPage=()=>`
<section>
<h2>BLOG</h2>
<div class="list">
${Object.entries(B).map(([s,p])=>`
<a class="row" href="/blog/${s}">
<span>${p.title}</span>
<span class="muted">${p.date}</span>
<span>→</span>
</a>`).join("")}
</div>
</section>`;

const postPage=s=>{
 const p=B[s];
 if(!p)return nf();
 return`
<article class="post">
<div class="post-date">${p.date}</div>
${md(p.c!==null?dec(p.c):p.u)}
</article>`;
};

const home=()=>`
<section class="hero">
<h1>${site.name}</h1>
<p class="muted">${site.description}</p>
</section>
${projectsPage()}
${blogPage()}`;

const nf=()=>`
<section>
<h1 class="small-title">404</h1>
<p class="muted">Page not found.</p>
</section>`;

const route=p=>{
 if(p==="/")return home();
 if(p==="/projects")return projectsPage();
 if(p==="/about")return aboutPage();
 if(p==="/blog")return blogPage();

 let m=p.match(/^\/projects\/([^/]+)$/);
 if(m)return projectPage(m[1]);

 m=p.match(/^\/blog\/([^/]+)$/);
 if(m)return postPage(m[1]);

 return nf();
};

const render=()=>{
 const p=location.pathname.replace(/\/+$/,"")||"/";
 app.innerHTML=`
<main>
${header()}
${route(p)}
<footer>
<span>${site.name} / ${site.year}</span>
<div class="footer-links">
${links.map(x=>ext(x.url,x.name+" ↗")).join("")}
</div>
</footer>
</main>`;
};

document.addEventListener("click",e=>{
 const a=e.target.closest("a");
 if(!a||a.target==="_blank"||a.origin!==location.origin)return;
 e.preventDefault();
 history.pushState({},"",a.pathname);
 render();
 scrollTo(0,0);
});

addEventListener("popstate",render);
render();