const readlineSync = require('readline-sync');
const { default: chalk } = require('chalk');

module.exports = () => {
    let name = readlineSync.question(`
    ${chalk.bold('Block name:')}
    ${chalk.dim('(String) A unique name that identifies the block (without namespace). For example ‘testimonial’. Note: A block name can only contain lowercase alphanumeric characters and dashes, and must begin with a letter.')}
    `);

    let title = readlineSync.question(`
    ${chalk.bold('Block title:')}
    ${chalk.dim('(String) The display title for your block. For example ‘Testimonial’.')}
    `);

    let description = readlineSync.question(`
    ${chalk.bold('Block description:')}
    ${chalk.dim('(String) (Optional) This is a short description for your block.')}
    `);

    let category = readlineSync.question(`
    ${chalk.bold('Block category:')}
    ${chalk.dim('(String) Blocks are grouped into categories to help users browse and discover them. The core provided categories are [ common | formatting | layout | widgets | embed ]. Plugins and Themes can also register custom block categories.')}
    `);

    let mode = readlineSync.question(`
    ${chalk.bold('Block mode:')}
    ${chalk.dim('(String) (Optional) The display mode for your block. Available settings are “auto”, “preview” and “edit”. Defaults to “preview”. auto: Preview is shown by default but changes to edit form when block is selected. preview: Preview is always shown. Edit form appears in sidebar when block is selected. edit: Edit form is always shown.')}
    `);

    let align = readlineSync.question(`
    ${chalk.bold('Block alignment:')}
    ${chalk.dim('(String) (Optional) The default block alignment. Available settings are “left”, “center”, “right”, “wide” and “full”. Defaults to an empty string.')}
    `);

    return {
       name: name, 
       title: title, 
       description: description,
       category: category, 
       mode: mode, 
       align: align
    };
};