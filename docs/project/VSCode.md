<!--
 * @Author: your name
 * @Date: 2021-07-11 19:16:54
 * @LastEditTime: 2021-07-16 14:26:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myBlog/docs/project/VSCode.md
-->
# VSCode开发环境配置

vscode所有的设置都在其中的setting.json文件中，
快捷键：Ctrl + Shift + p，打开命令面板，输入setting搜索进入。

## ESlint
* 可以全局安装ESlint，适用于所有项目，也可以再项目根目录本地安装：npm install eslint --save-dev
* 在vscode中安装ESLint插件
* 使用eslint --init命令生成一个配置文件，自定义配置
```json
"eslint.validate": [
    "javascriptreact",
    "html",
    {"language": "javascript","autoFix": true},
    {"language": "vue","autoFix": true}
 ]
// 错误保存自动fix
"editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
}

```
