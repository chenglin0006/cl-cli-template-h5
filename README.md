环境部署： <br>
本地开发环境： npm start <br>
线上开发环境： npm run dev <br>
线上测试环境： npm run test <br>
线上生产环境： npm run prod <br>

之前管理系统代码修改部分（支持IE9及以上）： <br>

 1、在项目入口src/index.js添加 import "raf/polyfill" <br>
 2、在index.template.html中导入public/reset/IE.js <br>
 	在IE.js中自定义
 3、在index.template.html中导入public/reset/IE9.css <br>
 4、localStorage支持IE8以上（线上环境支持），IE9中不支持replaceState，IE9中不支持H5<br>模式，因此对于IE10以上中fetch请求数据成功之后，无状态刷新更改URL，IE9中，处理是把搜<br>索参数保存到cookies中(不放在localStorage中由于本地开发时，window.localStorage为undefined，只<br>是在线上时，才有值)<br>
 修改位置： util/index.js 