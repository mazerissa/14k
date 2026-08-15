import fs from "node:fs";
import path from "node:path";


const ROOT =
    process.cwd();


const files = [

    "index.html",

    "src/main.js",

    "src/data.js",

    "src/math.js",

    "src/style.css"

];


let total = 0;


console.log("");
console.log("14K BUILD");
console.log("─────────");
console.log("");


for (const file of files) {

    const fullPath =
        path.join(
            ROOT,
            file
        );


    if (!fs.existsSync(fullPath)) {

        console.log(
            `MISSING  ${file}`
        );

        continue;

    }


    const data =
        fs.readFileSync(
            fullPath,
            "utf8"
        );


    const bytes =
        Buffer.byteLength(
            data,
            "utf8"
        );


    total += bytes;


    console.log(
        `${String(bytes).padStart(8)} B  ${file}`
    );
}


console.log("");
console.log("─────────");


console.log(
    `${String(total).padStart(8)} B  TOTAL`
);


console.log(
    `${(total / 1024).toFixed(2)} KB`
);


console.log("");


if (total <= 14 * 1024) {

    console.log(
        "✓ UNDER 14 KB"
    );

} else {

    console.log(
        `✗ ${(total / 1024 - 14).toFixed(2)} KB OVER TARGET`
    );

}