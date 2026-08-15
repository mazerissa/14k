import fs from"node:fs";
import path from"node:path";

const DIR="content/blog";
const OUT="src/generated-blog.js";
const A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

const enc=n=>{
 let s="";
 do{
  s=A[n%A.length]+s;
  n=Math.floor(n/A.length)-1;
 }while(n>=0);
 return s;
};

const files=fs.existsSync(DIR)
 ?fs.readdirSync(DIR).filter(x=>x.endsWith(".md"))
 :[];

const posts=[];

for(const file of files){
 const s=fs.readFileSync(path.join(DIR,file),"utf8");
 const m=s.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
 if(!m)continue;

 const meta={};

 for(const line of m[1].split("\n")){
  const i=line.indexOf(":");
  if(i>0)
   meta[line.slice(0,i).trim()]=line.slice(i+1).trim();
 }

 posts.push({
  slug:file.slice(0,-3),
  title:meta.title||file.slice(0,-3),
  date:meta.date||"",
  body:m[2].trim()
 });
}

const count=new Map();

for(const p of posts){
 const words=p.body.match(/[A-Za-zÀ-ÿ0-9_]{5,}/g)||[];

 for(const w of words){
  const x=w.toLowerCase();
  count.set(x,(count.get(x)||0)+1);
 }
}

const dict=[...count.entries()]
 .filter(([,n])=>n>1)
 .sort((a,b)=>b[0].length*b[1]-a[0].length*a[1])
 .map(([w])=>w);

const ids=new Map(
 dict.map((w,i)=>[w,enc(i)])
);

const compress=s=>
 s.replace(
  /[A-Za-zÀ-ÿ0-9_]{5,}/g,
  w=>{
   const id=ids.get(w.toLowerCase());
   return id===undefined?w:"~"+id;
  }
 );

const b={};

for(const p of posts){
 const c=compress(p.body);

 b[p.slug]=[
  p.title,
  p.date,
  c.length<p.body.length?c:"."+p.body
 ];
}

const out=
 `export const d=${JSON.stringify(dict)};export const b=${JSON.stringify(b)};`;

fs.writeFileSync(OUT,out);

const raw=posts.reduce(
 (n,p)=>n+Buffer.byteLength(p.body),
 0
);

const size=Buffer.byteLength(out);

console.log("");
console.log("14K BLOG");
console.log("--------");
console.log("posts:",posts.length);
console.log("dictionary:",dict.length);
console.log("original:",raw,"bytes");
console.log("generated:",size,"bytes");

if(raw)
 console.log("ratio:",(size/raw*100).toFixed(1)+"%");

console.log("");
console.log("generated",OUT);