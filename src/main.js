import{site,about,projects,links}from"./data.js";

const $=document.querySelector("#app"),
 A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

const a=(u,t)=>`<a href="${u}"${/^https?:/.test(u)?' target="_blank" rel="noopener"':""}>${t}</a>`;

const nav=`
<header>
<a class=logo href="/">YE</a>
<nav>
<a href="/projects">PROJECTS</a>
<a href="/about">ABOUT</a>
<a href="/blog">BLOG</a>
</nav>
</header>`;

const list=x=>`<div class=list>${x.map(p=>`
<a class=row href="${p[0]}">
<span>${p[1]}</span>
<span class=muted>${p[2]||""}</span>
<span>→</span>
</a>`).join("")}</div>`;

const projectsPage=()=>`
<section><h2>PROJECTS</h2>${list(projects.map(p=>[
 `/projects/${p[0]}`,p[1],p[2]
]))}</section>`;

const projectPage=id=>{
 const p=projects.find(x=>x[0]===id);
 return p?`
<section class=project>
<h1>${p[1]}</h1>
<p class=muted>${p[2]}</p>
<img class=project-image loading=lazy src="${p[3]}" alt="${p[1]}">
<p>${a(p[4],"GitHub ↗")}</p>
</section>`:nf();
};

const aboutPage=()=>`
<section><h2>ABOUT</h2><p>${about}</p></section>`;

const home=()=>`
<section class=hero>
<h1>${site[0]}</h1>
<p class=muted>${site[1]}</p>
</section>
${projectsPage()}`;

const nf=()=>`
<section>
<h1 class=small-title>404</h1>
<p class=muted>Page not found.</p>
</section>`;

const blog=async(id)=>{
 const{d,b}=await import("./generated-blog.js");

 const dec=s=>s.replace(/~([A-Za-z0-9_-]+)/g,(_,x)=>{
  let n=0;
  for(const c of x)n=n*64+A.indexOf(c)+1;
  return d[n-1]||"";
 });

 const md=s=>s.split(/\n+/).map(x=>{
  if(!x)return"";

  const m=x.match(/^(#{1,3})\s+(.+)/);

  if(m){
   const n=m[1].length;
   return`<h${n}>${m[2]}</h${n}>`;
  }

  if(x.startsWith("- "))
   return`<li>${x.slice(2)}</li>`;

  return`<p>${x}</p>`;
 }).join("")
 .replace(/(<li>.*?<\/li>)+/g,"<ul>$&</ul>")
 .replace(/\*\*(.+?)\*\*/g,"<b>$1</b>")
 .replace(/\*(.+?)\*/g,"<i>$1</i>")
 .replace(
  /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
  '<a href="$2" target="_blank" rel="noopener">$1</a>'
 );

 if(!id)
  return`
<section>
<h2>BLOG</h2>
${list(Object.entries(b).map(([s,p])=>[
 `/blog/${s}`,p[0],p[1]
]))}
</section>`;

 const p=b[id];

 if(!p)return nf();

 const text=p[2][0]=="."
  ?p[2].slice(1)
  :dec(p[2]);

 return`
<article class=post>
<div class=post-date>${p[1]}</div>
${md(text)}
</article>`;
};

const footer=`
<footer>
<span>${site[0]} / ${site[2]}</span>
<div class=footer-links>
${links.map(x=>a(x[1],x[0]+" ↗")).join("")}
</div>
</footer>`;

const render=async()=>{
 const p=location.pathname.replace(/\/+$/,"")||"/";

 let page;

 if(p==="/")
  page=home();
 else if(p==="/projects")
  page=projectsPage();
 else if(p==="/about")
  page=aboutPage();
 else if(p==="/blog")
  page=await blog();
 else if(p.startsWith("/projects/"))
  page=projectPage(p.slice(10));
 else if(p.startsWith("/blog/"))
  page=await blog(p.slice(6));
 else
  page=nf();

 $.innerHTML=`<main>${nav}${page}${footer}</main>`;
};

document.addEventListener("click",e=>{
 const x=e.target.closest("a");

 if(!x||x.target||x.origin!==location.origin)
  return;

 e.preventDefault();

 history.pushState(0,"",x.pathname);
 render();
 scrollTo(0,0);
});

onpopstate=render;

render();