# Autopull

A small tool to automatically pull GitHub repositories on a given interval using cron or Windows Task Scheduler. Uncommitted changes are preserved and merged as possible.

## Setup

This tool requires [Node.js](https://nodejs.org) (any reasonably recent version should be fine). It also requires git (obviously).

First, place the repository contents (either cloned or unzipped) somewhere it won't move (I recommend creating a folder inside `$HOME/.config`).

Rename the `config.example.json` file to `config.json` to fit your cloned GitHub repository paths. You can add multiple GitHub repositories inside a single base directory using the `basePath` and `items` keys, and any number of base folders by adding more items to the array. See [`config.example.json`](./config.example.json) for a more comprehensive example of the schema.

### \*nix Scheduling

To add the script to your crontab, run this command in any shell:

```sh
crontab -e
```

Paste `0 * * * * /usr/local/bin/node /path/to/autopull/index.js > /dev/null` in the file and save its contents.

### Windows Scheduling

Create a new task in the Task Scheduler that runs at your desired interval. Set the action to run `wscript.exe` with the argument being the full path to the `runScript.vbs` file.

## Configuration

### \*nix

By default, your repositories will be pulled every hour. If you want to adjust this interval, change the schedule expression at the start of the line to whatever interval you want (you can access the schedule by running `crontab -e` again). [This website](https://crontab.guru/) is a handy tool for generating cron intervals.

### Windows

To match the cron schedule, set the Trigger to "Daily" and repeat the task every 1 hour for a duration of "Indefinitely".
