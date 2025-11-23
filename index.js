#!/usr/bin/env node
const { join } = require("node:path");
const { exec } = require("node:child_process");

/** @type {{ basePath: string, items: string[] }[] } */
const config = require("./config.json");

/**
 * Check whether a path starts either with a slash (*nix) or drive letter (Windows)
 * @author Evorp, mullak99
 * @param {string} path
*/
const isAbsolute = (path) => path.startsWith("/") || /^[A-Za-z]:\\/.test(path);
const userHome = process.env.HOME || process.env.USERPROFILE;

for (const { basePath, items } of config) {
	const path = join(isAbsolute(basePath) ? basePath : join(userHome, basePath));
	for (const item of items) {
		const cwd = join(path, item);
		exec("git stash && git pull && git stash pop; git stash drop", { cwd }, (err, out) =>
			console.log(`=== ${item} ===\n${out || err}`),
		);
	}
}
