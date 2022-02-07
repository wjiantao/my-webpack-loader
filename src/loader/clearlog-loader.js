const parser = require('@babel/parser') //将源代码解析成AST
const traverse = require('@babel/traverse').default  //对AST节点进行递归遍历，生成一个便于操作、转换的path对象
const generator = require('@babel/generator').default //将AST解码生成js代码
const bableTypes = require('@babel/types')  //对具体的AST节点进行增删改查

module.exports = function (source) {
    const ast = parser.parse(source, { sourceType: 'module' })
    traverse(ast, {
        CallExpression (path) {
            // 删除console
            // 使用bableTypes 来对node节点的类型做判断,如果节点的整体类型为MemberExpression,并且子节点object的类型为Identifier,同时节点中的name又为console
            if (bableTypes.isMemberExpression(path.node.callee) && bableTypes.isIdentifier(path.node.callee.object, { name: "console" })) {
                path.remove() // 那么将这个节点删除掉
            }
        }
    })
    let output = generator(ast, {}); // 通过@babel/generator将AST重新解码回js
    return output.code // 最后将解码好的代码返回,给下一个loader使用
}
