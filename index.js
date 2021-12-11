#!/usr/bin/env node
const fs = require('fs');
const acfConfig = require('./acf-block.config.js');
const initPrompts = require('./utilis/prompts');
const registerBlocks = require('./utilis/registerBlocks');
const createRenderTemplate = require('./utilis/createRenderTemplate');

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
            regect(`Please add the comment markers to your registration file where you want to register future blocks:\n` +
            `// Begin Create-ACF-Block\n`+
            `// End Create-ACF-Block`);
        }
        resolve();
      });
    });
  }

  checkRegistrationFile(acfConfig.registeration_file_path)
    .then(() => {
      checkCommentMarkers()
      .then(() => {
        let responses = initPrompts();
        registerBlocks(responses);
        createRenderTemplate(responses);
      })
      .catch(err => {
        console.log(err);
      });
    })
    .catch(err => {
      console.log(err);
    });
})();
