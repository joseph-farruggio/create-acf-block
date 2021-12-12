#!/usr/bin/env node
const fs = require('fs');
const Conf = require('conf');

const schema = {
  preferencesSet: {
    type: 'boolean'
  },
  registerationFilePath: {
    type: 'string'
  },
  renderTemplateFolderPath: {
    type: 'string'
  },
  createAssets: {
    type: 'string'
  },
  groupAssets: {
    type: 'boolean'
  },
  cssPath: {
    type: 'string'
  },
  jsPath: {
    type: 'string'
  }
}
const config = new Conf({schema});

// Utilities
const preferences = require('./utilis/preferences');
const prompts = require('./utilis/prompts');
const createRenderTemplate = require('./utilis/createRenderTemplate');
const registerBlocks = require('./utilis/registerBlocks');
const createAssets = require('./utilis/createAssets');

(async () => {
  
  /**
   *  1. Check if registration file exists
   *  2. Check if registration file has comment markers
   *  3. Prompts
   *  4. Register block
   *  4. Create render template
   */
  
  function checkRegistrationFile(path) {
    return new Promise(function(resolve, regect) {
      if (fs.existsSync(path) === false) {
        regect(`Registration file path does not exist at: ${path}`);
      }
      resolve();
    });
  }

  function checkCommentMarkers(path) {
    return new Promise(function(resolve, regect) {
      fs.readFile(path, function (err, data) {
        if (err) {
          console.log(err);
        }
        if(data.includes('// End Create-ACF-Block') === false){
            regect(`Please add these comment markers to your registration file where you want to register future blocks:\n` +
            `// Begin Create-ACF-Block\n`+
            `// End Create-ACF-Block`);
        }
        resolve();
      });
    });
  }

  function handleError(err) {
    console.log(err);
  }

  async function init() {
    preferences();
    await checkRegistrationFile(config.get('registerationFilePath'));
    await checkCommentMarkers(config.get('registerationFilePath'));
    let responses = prompts();
    registerBlocks(responses);
    createRenderTemplate(responses);
    createAssets(responses);
  }

  init().catch(handleError);
})();
