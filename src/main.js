import{site,about,projects,links}from"./data.js";
import{d,b}from"./generated-blog.js";
const app=document.querySelector("#app"),
 A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
const dec=s=>s.replace(/~([A-Za-z0-9_-]+)/g,(_,x)=>{
 let n=0;
 for(const c of x)n=n*64+A.indexOf(c)+1;
 return d[n-1]||"";
});
const inl=s=>s
 .replace(/&/g,"&amp;")
 .replace(/</g,"&lt;")
 .replace(/>/g,"&gt;")
 .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
  '<a href="$2" target="_blank" rel="noopener">$1</a>')
 .replace(/\*\*(.*?)\*\*/g,"<b>$1</b>")
 .replace(/\*(.*?)\*/g,"<i>$1</i>");
const md=s=>s
 .split(/\n+/)
 .map(x=>{
  if(x[0]==="#")return`<h${x.match(/^#+/)[0].length}>${inl(x.replace(/^#+\s*/,""))}</h${x.match(/^#+/)[0].length}>`;
  if(x.startsWith("- "))return`<li>${inl(x.slice(2))}</li>`;
  return`<p>${inl(x)}</p>`;
 })
 .join("")
 .replace(/(<li>.*?<\/li>)+/g,x=>`<ul>${x}</ul>`);
const ext=(u,t)=>`<a href="${u}"${/^https?:/.test(u)?' target="_blank" rel="noopener"':""}>${t}</a>`;
const header=`
<header>
<a class="logo" href="/">YE</a>
<nav>
<a href="/projects">PROJECTS</a>
<a href="/about">ABOUT</a>
<a href="/blog">BLOG</a>
</nav>
</header>`;
const rows=a=>`
<div class="list">
${a.map(x=>`
<a class="row" href="${x[0]}">
<span>${x[1]}</span>
<span class="muted">${x[2]||""}</span>
<span>→</span>
</a>`).join("")}
</div>`;
const projectsPage=()=>`
<section>
<h2>PROJECTS</h2>
${rows(projects.map(p=>[
 `/projects/${p.id}`,
 p.name,
 p.description
]))}
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
const blogPage=()=>`
<section>
<h2>BLOG</h2>
${rows(Object.entries(b).map(([s,p])=>[
 `/blog/${s}`,
 p[0],
 p[1]
]))}
</section>`;
const postPage=id=>{
 const p=b[id];
 if(!p)return nf();
 const s=p[2][0]==="."?p[2].slice(1):dec(p[2]);
 return`
<article class="post">
<div class="post-date">${p[1]}</div>
${md(s)}
</article>`;
};
const aboutPage=()=>`
<section>
<h2>ABOUT</h2>
<p>${about}</p>
</section>`;
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
 let m=p.match(/^\/projects\/(.+)$/);
 if(m)return projectPage(m[1]);
 m=p.match(/^\/blog\/(.+)$/);
 if(m)return postPage(m[1]);
 return nf();
};
const footer=`
<footer>
<span>${site.name} / ${site.year}</span>
<div class="footer-links">
${links.map(x=>ext(x.url,x.name+" ↗")).join("")}
</div>
</footer>`;
const render=()=>{
 const p=location.pathname.replace(/\/+$/,"")||"/";
 app.innerHTML=`<main>${header}${route(p)}${footer}</main>`;
};
document.addEventListener("click",e=>{
 const a=e.target.closest("a");
 if(!a||a.target==="_blank"||a.origin!==location.origin)return;
 e.preventDefault();
 history.pushState(0,"",a.pathname);
 render();
 scrollTo(0,0);
});
addEventListener("popstate",render);
render();