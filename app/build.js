import fs from "fs";

import copyFiles from "copyFiles";

import { compileSFCs } from 'plain-vue-sfc-compiler';

console.log("Build - cleaning dist");

fs.rmSync("./dist", {recursive: true, force: true});

console.log("Build - copying source app files");

await new Promise(resolve => {
	copyFiles([
		"./src/user/**/*",
		"./dist/user"
	], {up: 2, all: true, exclude: ['./**/*.vue']}, resolve);
});

console.log("Build - compiling source vue files");

await compileSFCs("./src/user/", "./dist/user/", {globalCssFile: "./dist/user/css/components.css"});

console.log("Build - copying javascript libraries");

await new Promise(resolve => {
	copyFiles([
		"./node_modules/vue/dist/vue.esm-browser.js",
		"./node_modules/vue-router/dist/vue-router.esm-browser.js",
		"./dist/user/js/libs"
	], {up: true}, resolve);
});

await new Promise(resolve => {
	copyFiles([
		"./node_modules/@vue/devtools-api/lib/esm/**/*",
		"./dist/user/js/libs/@vue/devtools-api"
	], {up: 5}, resolve);
});

console.log("Build - copying MultiversX files");

await new Promise(resolve => {
	copyFiles([
		"./node_modules/@multiversx/sdk-core/out/**/*",
		"./dist/user/js/libs/@multiversx/sdk-core"
	], {up: 4}, resolve);
});

console.log("Build - copying css libraries");

await new Promise(resolve => {
	copyFiles([
		"./node_modules/@fortawesome/fontawesome-free/css/all.min.css",
		"./dist/user/css/libs"
	], {up: true}, resolve);
});

console.log("Build - copying fonts");

await new Promise(resolve => {
	copyFiles([
		"./node_modules/@fortawesome/fontawesome-free/webfonts/*",
		"./dist/user/css/webfonts"
	], {up: true}, resolve);
});

console.log("Build - finished");