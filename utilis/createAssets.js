const fs = require('fs');
const Conf = require('conf');
const config = new Conf();
const getDirName = require('path').dirname;

module.exports = (responses) => {

  if (config.get('createAssets') === true) {
    if (config.get('groupAssets') === true) {
      
      fs.writeFile(`${config.get('renderTemplateFolderPath')}/${responses.name}/block.css`, `// CSS for ${responses.title}`, { flag: 'a+' }, function (err) {
        if (err) return console.log(err);
      });
      fs.writeFile(`${config.get('renderTemplateFolderPath')}/${responses.name}/block.js`, `// JS for ${responses.title}`, { flag: 'a+' }, function (err) {
        if (err) return console.log(err);
      });
    } else {

      fs.writeFile(`${config.get('cssPath')}/${responses.name}.css`, `// CSS for ${responses.title}`, function (err) {
        if (err) return console.log(err);
      });
      fs.writeFile(`${config.get('jsPath')}/${responses.name}.js`, `// JS for ${responses.title}`, function (err) {
        if (err) return console.log(err);
      });
    }
  }
}