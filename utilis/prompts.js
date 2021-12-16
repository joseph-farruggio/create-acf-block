import readlineSync from 'readline-sync';
import chalk from 'chalk';
const args = process.argv.slice(2);

export default () => {
    /** 
     * If no args, show all prompts. 
     * Otherwise only show required prompts and prompts for present flags
     */
    function allowPrompt(flag) {
        if ( args.length === 0 ) {
            return true;
        } else if ( args.indexOf('--simple') != -1 ) {
            return false;
        } else {
            return (args.indexOf(flag) != -1);
        }
    }

    const prompt = {};
    
    prompt.name = readlineSync.question(`
    ${chalk.bold('Block name:')}
    ${chalk.dim('(String) A unique name that identifies the block (without namespace). For example ‘testimonial’. Note: A block name can only contain lowercase alphanumeric characters and dashes, and must begin with a letter.')}
    `);
    
    prompt.title = readlineSync.question(`
    ${chalk.bold('Block title:')}
    ${chalk.dim('(String) The display title for your block. For example ‘Testimonial’.')}
    `);
    
    if (allowPrompt('--description')) {
        prompt.description = readlineSync.question(`
        ${chalk.bold('Block description:')}
        ${chalk.dim('(String) (Optional) This is a short description for your block.')}
        `);
    }

    if (allowPrompt('--jsx')) {
        prompt.jsx = readlineSync.keyInYN(`${chalk.bold('Use inner blocks:')} `);
    }

    if (allowPrompt('--category')) {
        prompt.category = readlineSync.question(`
        ${chalk.bold('Block category:')}
        ${chalk.dim('(String) Blocks are grouped into categories to help users browse and discover them. The core provided categories are [ common | formatting | layout | widgets | embed ]. Plugins and Themes can also register custom block categories.')}
        `);
    }

    if (allowPrompt('--mode')) {
        prompt.mode = readlineSync.question(`
        ${chalk.bold('Block mode:')}
        ${chalk.dim('(String) (Optional) The display mode for your block. Available settings are “auto”, “preview” and “edit”. Defaults to “preview”. auto: Preview is shown by default but changes to edit form when block is selected. preview: Preview is always shown. Edit form appears in sidebar when block is selected. edit: Edit form is always shown.')}
        `);
    }

    if (allowPrompt('--align')) {
        prompt.align = readlineSync.question(`
        ${chalk.bold('Block alignment:')}
        ${chalk.dim('(String) (Optional) The default block alignment. Available settings are “left”, “center”, “right”, “wide” and “full”. Defaults to an empty string.')}
        `);
    }

    return {
       name: prompt.name, 
       title: prompt.title, 
       description: prompt.description || '',
       category: prompt.category || '',
       mode: prompt.mode || '',
       align: prompt.align || '',
       jsx: prompt.jsx || '',
    };
};