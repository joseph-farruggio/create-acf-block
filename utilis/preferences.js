const Conf = require('conf');
const config = new Conf();
const readlineSync = require('readline-sync');
const { default: chalk } = require('chalk');

const args = process.argv.slice(2);
const resetPreferences = (args.indexOf('--preferences') === -1) ? false : true;

module.exports = () => {
  /**
   *  Preferences
   *  Create block assets?
   *    -- yes
   *    Group block assets with render template?
   *      -- no
   *      cssPath
   *      jsPath
   */
  if (config.get('preferencesSet') != true || resetPreferences === true) {
    // Preferences not yet set or flag is present
    
    console.log(chalk.bold.bgGreen.white(` Preferences: \n`));

    config.set('registerationFilePath', 
      readlineSync.questionPath(
        `${chalk.bold('Block registration file path:')}\n` +
        `${chalk.dim('You can "cd" and "pwd"')}\n`, {
        isDirectory: false,
        exists: true,
      })
    );

    config.set('renderTemplateFolderPath', 
      readlineSync.questionPath(
        `${chalk.bold('\nBlock render template folder path: \n')}` +
        `${chalk.dim('This is where your block render templates will be created.\n')}` +
        `${chalk.dim('You can "cd" and "pwd"')}\n`, {
        isDirectory: true,
        exists: true,
      })
    );

    // Create block assets?
    if ( readlineSync.keyInYN(`${chalk.bold('\nCreate block specific CSS and JS files?')}`) ) {
      config.set('createAssets', true);
      
      // Group block assets with render template?
      if ( readlineSync.keyInYN(`${chalk.bold('Group block CSS and JS files with the render template?')}`) ) {
        config.set('groupAssets', true);
      } else {
        config.set('groupAssets', false);
        // Set asset paths
        console.log('\n');
        console.log(chalk.bold.bgGreen.white(` Block asset paths:`));
        console.log(chalk.dim(`If the given directory doesn't exist, it will be created.\n`));
        
        config.set('cssPath', 
          readlineSync.questionPath(`${chalk.bold('Block CSS path: ')}`, {
            isDirectory: true,
            exists: null,
            create: true
          })
        ); 
        config.set('jsPath', 
          readlineSync.questionPath(`${chalk.bold('Block JS path: ')}`, {
            isDirectory: true,
            exists: null,
            create: true
          })
        ); 
      }
    }

    config.set('preferencesSet', true);
  }
}