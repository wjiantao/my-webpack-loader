const fs = require("fs");
const loaderUtils = require("loader-utils");

function imgLoader(buffer) {
    // 这个source是二进制, 用buffer表示

    var src;
    if ( loaderUtils.getOptions(this)?.limit > buffer.byteLength) { //图片文件尺寸小于limit
        src = getBase64(buffer);
    } else {
        src = getFilePath.call(this, buffer);
    }

    return `module.exports=\`${src}\``;//注意, 这一步让我对loader有了更深入的了解, 这个return的内容, 是需要执行的,webpack的函数函数内本身没有执行的;

}

imgLoader.raw = true; //处理的是原始数据, source是一个buffer

function getFilePath(buffer) {//生成一个新的图片, 添加到最终资源中, 并返回路径
    var filename = loaderUtils.interpolateName(this, "[contenthash:5].[ext]", {
        content: buffer
    })
    this.emitFile(filename, buffer)
    return filename;
}

function getBase64(buffer) { //将图片转换成base64编码
    return 'data:image/png;base64,' + buffer.toString("base64")
}

module.exports = imgLoader;