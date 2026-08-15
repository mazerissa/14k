import fs from"node:fs";
import path from"node:path";

const d="content/blog",o="src/generated-blog.js";
const f=fs.existsSync(d)?fs.readdirSync(d).filter(x=>x.endsWith(".md")):[];

const p=s=>{
 const m=s.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
 if(!m)return;
 const h={};
 for(const x of m[1].split("\n")){
  const i=x.indexOf(":");
  if(i>0)h[x.slice(0,i).trim()]=x.slice(i+1).trim();
 }
 return{title:h.title||"",date:h.date||"",body:m[2].trim()};
};

const a=f.map(x=>({s:x.slice(0,-3),...p(fs.readFileSync(path.join(d,x),"utf8"))}));
const all=a.map(x=>x.body).join("\n");
const c={};

for(const x of all.match(/[A-Za-zÀ-ÿ0-9_]{5,}/g)||[])
 c[x.toLowerCase()]=(c[x.toLowerCase()]||0)+1;

const D=Object.entries(c)
 .filter(([,n])=>n>1)
 .sort((a,b)=>b[1]-a[1])
 .map(x=>x[0]);

const I=new Map(D.map((x,i)=>[x,i]));

const e=s=>s.replace(
 /[A-Za-zÀ-ÿ0-9_]+|[^A-Za-zÀ-ÿ0-9_]+/g,
 x=>I.has(x.toLowerCase())?`~${I.get(x.toLowerCase())}~`:x
);

const B={};

for(const x of a){
 const z=e(x.body);
 B[x.s]={
  title:x.title,
  date:x.date,
  c:z.length<x.body.length?z:null,
  u:z.length<x.body.length?null:x.body
 };
}

fs.writeFileSync(
 o,
 `export const D=${JSON.stringify(D)};export const B=${JSON.stringify(B)};`
);

console.log(`${f.length} posts | ${D.length} dictionary words`);