#!/usr/bin/env node
const fs = require('fs');
const initPrompts = require('./utilis/prompts');
const createRenderTemplate = require('./utilis/createRenderTemplate');
const registerBlocks = require('./utilis/registerBlocks');
const path = require('path');
const appDir = path.dirname(require.main.filename);
const acfConfig = require(appDir+'/acf-block.config.js');

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

  function checkCommentMarkers() {
    return new Promise(function(resolve, regect) {
      fs.readFile(acfConfig.registeration_file_path, function (err, data) {
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
    await checkRegistrationFile(acfConfig.registeration_file_path);
    await checkCommentMarkers();
    let responses = initPrompts();
    registerBlocks(responses);
    createRenderTemplate(responses);
  }

  init().catch(handleError);
})();
