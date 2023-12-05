import fs from "fs";

import copyFiles from "copyFiles";

console.log("Build - cleaning dist");

fs.rmSync("./dist", {recursive: true, force: true});

console.log("Build - copying source app files");

copyFiles([
	"./src/user/**/*",
	"./dist/user"
], {up: 2, all: true}, () => {});

console.log("Build - copying javascript libraries");

copyFiles([
	"./node_modules/vue/dist/vue.esm-browser.js",
	"./node_modules/vue-router/dist/vue-router.esm-browser.js",
	"./dist/user/js/libs"
], {up: true}, () => {})

copyFiles([
	"./node_modules/@vue/devtools-api/lib/esm/**/*",
	"./dist/user/js/libs/@vue/devtools-api"
], {up: 5}, () => {});

console.log("Build - copying MultiversX files");

copyFiles([
	"./node_modules/@multiversx/sdk-core/out/**/*",
	"./dist/user/js/libs/@multiversx/sdk-core"
], {up: 4}, () => {});

console.log("Build - copying css libraries");

copyFiles([
	"./node_modules/@fortawesome/fontawesome-free/css/all.min.css",
	"./dist/user/css/libs"
], {up: true}, () => {})

console.log("Build - copying fonts");

copyFiles([
	"./node_modules/@fortawesome/fontawesome-free/webfonts/*",
	"./dist/user/css/webfonts"
], {up: true}, () => {})

console.log("Build - finished");