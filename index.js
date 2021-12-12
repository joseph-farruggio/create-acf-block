#!/usr/bin/env node
const fs = require('fs');
const Conf = require('conf');

const schema = {
  preferencesSet: {
    type: 'boolean'
  },
  hasFlags: {
    type: 'boolean',
    default: false
  },
  registerationFilePath: {
    type: 'string',
    default: ''
  },
  renderTemplateFolderPath: {
    type: 'string',
    default: ''
  },
  createAssets: {
    type: 'boolean'
  },
  groupAssets: {
    type: 'boolean'
  },
  cssPath: {
    type: 'string',
    default: ''
  },
  jsPath: {
    type: 'string',
    default: ''
  }
}
const config = new Conf({schema});

/**  
 * Utilities
 * 1. Preferences - Only runs during the first use of the CLI, unless the --preference flag is present
 * 2. Prompts - All of the questions to populate the render template and register the block
 * 3. Creates the render template
 * 4. Registers the block
 * 5. Optionally creates CSS and JS
 * */
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
    
    let = responses = prompts(config.hasFlags);
    
    registerBlocks(responses);
    createRenderTemplate(responses);
    createAssets(responses);
  }

  init().catch(handleError);
})();
