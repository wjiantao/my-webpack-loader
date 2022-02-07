module.exports = function (source) {
    console.log(source, 'source');
    return `
    var style = document.createElement("style");
    style.innerHTML = \`${source}\`;
    document.head.appendChild(style);
    `;
}