// style-loader
module.exports = function styleLoader(source) {
    // js 字符串，生成style标签插入到模板文件中
    let code = `
        let styleEl = document.createElement("style");
        styleEl.innerHTML = ${JSON.stringify(source)};
        document.head.appendChild(styleEl);
    `;
    return code.replace(/\/n/, "");
}