const appDir = path.dirname(require.main.filename);
const acfConfig = require(appDir+'/acf-block.config.js');
const fs = require('fs');

module.exports = (responses) => {
  // Block render template content
  const renderTemplateContent = `
  <?php
  /**
   * Block Name: ${responses.title}
   *
   * Description: ${responses.description}
   */
  
  // Dynamic block ID
  $block_id = '${responses.name}-' . $block['id'];
  
  $alignClass = ( !empty($block['align']) ) ? ' align' . $block['align'] : "";
  
  $blockClasses = implode(' ', array( $alignClass, $visibility, $block['className'] ));
  
  ?>
  
  <div id="<?php echo $block_id; ?>" class="<?php echo $blockClasses; ?>">
    
  </div>
  `;

  /**
   * Question: 
   * Should I be creating this directory if it does not exist or throw an error?
  **/
  if (!fs.existsSync(`${acfConfig.render_template_folder_path}`)){
    fs.mkdirSync(`${acfConfig.render_template_folder_path}`, { recursive: true });
  }
  
  fs.writeFile(`${acfConfig.render_template_folder_path}/${responses.name}.php`, renderTemplateContent, { flag: 'a+' }, err => {})
}