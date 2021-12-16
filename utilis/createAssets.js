import fs from 'fs';
import Conf from 'conf';
const config = new Conf();

export default (responses) => {

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