export function element(tag, className = "") {
    const el = document.createElement(tag); // el means element,I can't come up with something else

    if (className) {
        el.className = className;
    }

    return el;
}


export function text(tag, content, className = "") {
    const el = element(tag, className);

    el.textContent = content;

    return el;
}


export function append(parent, ...children) {
    parent.append(...children);

    return parent;
}