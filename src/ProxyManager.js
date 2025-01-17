require('colors');
const axios = require('axios');
const fs = require('fs');

async function readLines(filename) {
  try {
    const data = await fs.promises.readFile(filename, 'utf-8');
    console.log(`Download data from ${filename}`.green);
    return data.split('\n').filter(Boolean);
  } catch (error) {
    console.error(`Không đọc được ${filename}: ${error.message}`.red);
    return [];
  }
}

async function selectProxySource(inquirer) {
  const choices = ['USE PROXY', 'NO PROXY'];
  const { source } = await inquirer.prompt([
    {
      type: 'list',
      name: 'source',
      message: 'Choose proxy or no proxy:'.cyan,
      choices,
    },
  ]);

  if (source === 'USE PROXY') {
    return { 
      type: 'file', 
      source: 'proxy.txt'
    };
  } else {
    return { type: 'none' };
  }
}

module.exports = { readLines, selectProxySource };