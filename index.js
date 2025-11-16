#!/usr/bin/env node
const { join } = require("node:path");
const { exec } = require("node:child_process");
const config = require("./config.json");

for (const { basePath, items } of config) {
	for (const item of items) {
		const cwd = join(
			(basePath.startsWith("/") || /^[A-Za-z]:\\/.test(basePath))
			? basePath
			: join(process.env.HOME || process.env.USERPROFILE, basePath),
		item,
		);
		exec("git stash && git pull && git stash pop; git stash drop", { cwd }, (err, out) =>
			console.log(`=== ${item} ===\n${out || err}`),
		);
	}
}
