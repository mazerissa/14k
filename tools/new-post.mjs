import fs from"node:fs";
import path from"node:path";

const t=process.argv.slice(2).join(" ");

if(!t){
 console.log('Usage: npm run new-post "Title"');
 process.exit(1);
}

const s=t.toLowerCase()
 .trim()
 .replace(/[^a-z0-9]+/g,"-")
 .replace(/^-|-$/g,"");

const dir="content/blog";
const file=path.join(dir,s+".md");

fs.mkdirSync(dir,{recursive:true});

if(fs.existsSync(file)){
 console.log("Already exists:",file);
 process.exit(1);
}

fs.writeFileSync(file,`---
title: ${t}
date: ${new Date().toISOString().slice(0,10)}
---

# ${t}

Write your article here.

## Section

Write something interesting.

`);

console.log("Created:",file);