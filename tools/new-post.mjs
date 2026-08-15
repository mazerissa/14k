import fs from"node:fs";
import path from"node:path";

const t=process.argv.slice(2).join(" ");

if(!t)process.exit(1);

const s=t.toLowerCase()
 .replace(/[^a-z0-9]+/g,"-")
 .replace(/^-|-$/g,"");

const d="content/blog",f=path.join(d,s+".md");

fs.mkdirSync(d,{recursive:true});

if(fs.existsSync(f))process.exit(1);

fs.writeFileSync(f,`---
title: ${t}
date: ${new Date().toISOString().slice(0,10)}
---

# ${t}

Write here.

## Section

Write here.
`);

console.log(f);