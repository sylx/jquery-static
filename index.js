const fs = require("fs").promises;
const path = require("path");
const stream = require('stream');
const util = require('util');
const SAXParser = require('parse5-sax-parser');
const _ = require("lodash");
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

const optionDefinitions = [
    {
        name: 'help',
        alias: 'h',
        type: Boolean,
        description: 'このヘルプ'
    },
    {
        name: 'quiet',
        alias: 'q',
        defaultValue: false,
        type: Boolean,
        description: 'エラー以外の出力を抑止します'
    },
    {
        name: 'verbose',
        alias: 'v',
        defaultValue: false,
        type: Boolean
    },
    {
        name: 'dry',
        type: Boolean,
        defaultValue: false,
        description: 'ファイルを書き換えません'
    },
    {
        name: 'linkcheck',
        type: Boolean,
        defaultValue: false,
        description: '実際にリンクチェックを行い、転送先URLを取得します（trans_url.txtを使用しません)'
    },
    {
        name: 'js',
        type: String,
        defaultValue: "",
        description: 'jsファイルのパス'
    },
    {
        name: 'src',
        type: String,
        defaultOption: true,
        defaultValue: [],
        multiple: true,
        description: 'htmlファイルのパス'
    },
];
const options = commandLineArgs(optionDefinitions);

if (options.help || options.src.length == 0) {
    const usage = commandLineUsage([
        {
            header: process.argv[0],
            content: 'ast, flexible, and lean implementation of core jQuery designed specifically for the static html5 files'
        },
        {
            header: 'Options',
            optionList: optionDefinitions
        }
    ]);
    console.log(usage);
    process.exit(0);
}