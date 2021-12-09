#!/usr/bin/env node
const replace = require('replace-in-file');
const fs = require('fs');
const readlineSync = require('readline-sync');
const { default: chalk } = require('chalk');
const acfConfig = require('./acf-block.config.js');

(async () => {

  // Begin Prompts
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
  // End Prompts
  
  // Find and Replace options
  const options = {

    //Single file
    files: `${acfConfig.register_file_path}`,
  
    //Replacement to make (string or regex) 
    from: "// End: Create-ACF-Block",
    to: `
    acf_register_block_type(array(
      'name'				=> '${name}',
      'title'				=> '${title}',
      'description' => '${description}',
      'category'    => '${category}',
      'mode'				=> '${mode}',
      'align'       => '${align}',
      'supports'	=> array(
        'anchor' => true,
        'mode' => false,
        'jsx' => true
      ),
      'render_template'   => '${acfConfig.render_template_folder_path}/${name}.php',
    ));

    // End: Create-ACF-Block
    `,
  };
  
  replace(options)
    .then(changedFiles => {
      console.log('Modified files:', changedFiles.join(', '));
    })
    .catch(error => {
      console.error('Error occurred:', error);
    })
  
  // Block render template content
  const renderTemplateContent = `
  <?php
  /**
   * Block Name: ${title}
   *
   * Description: ${description}
   */
  
  // Dynamic block ID
  $block_id = '${name}-' . $block['id'];
  
  $alignClass = ( !empty($block['align']) ) ? ' align' . $block['align'] : "";
  
  $blockClasses = implode(' ', array( $alignClass, $visibility, $block['className'] ));
  
  ?>
  
  <div id="<?php echo $block_id; ?>" class="<?php echo $blockClasses; ?>">
    
  </div>
  `;

  if (!fs.existsSync(`${acfConfig.render_template_folder_path}`)){
    fs.mkdirSync(`${acfConfig.render_template_folder_path}`, { recursive: true });
  }
  
  fs.writeFile(`${acfConfig.render_template_folder_path}/${name}.php`, renderTemplateContent, { flag: 'a+' }, err => {})
})();
