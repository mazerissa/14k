// ============================================================
// MATHEMATICAL SVG GENERATOR
// ============================================================
//
// Instead of storing an image:
//
//     equation.svg
//
// we generate the SVG directly.
//
// This is useful for the 14 KB project because simple graphics
// can sometimes be represented more efficiently as mathematics.
// ============================================================


export function maxEquation({
    size = 32
} = {}) {

    return `

        <svg
            width="620"
            height="120"
            viewBox="0 0 620 120"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Maximum of three linear functions is less than or equal to zero"
        >

            <text
                x="310"
                y="70"
                text-anchor="middle"
                fill="currentColor"
                font-family="Georgia, serif"
                font-size="${size}px"
            >
                max(L₁(x,y), L₂(x,y), L₃(x,y)) ≤ 0
            </text>

        </svg>

    `;
}


// ============================================================
// PROCEDURAL GRID
// ============================================================

export function grid({
    width = 400,
    height = 400,
    spacing = 40
} = {}) {

    let lines = "";

    for (
        let x = 0;
        x <= width;
        x += spacing
    ) {

        lines += `
            <line
                x1="${x}"
                y1="0"
                x2="${x}"
                y2="${height}"
            />
        `;
    }


    for (
        let y = 0;
        y <= height;
        y += spacing
    ) {

        lines += `
            <line
                x1="0"
                y1="${y}"
                x2="${width}"
                y2="${y}"
            />
        `;
    }


    return `

        <svg
            width="${width}"
            height="${height}"
            viewBox="0 0 ${width} ${height}"
            xmlns="http://www.w3.org/2000/svg"
        >

            <g
                stroke="currentColor"
                stroke-opacity=".12"
            >

                ${lines}

            </g>

        </svg>

    `;
}