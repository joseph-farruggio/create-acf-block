const fs = require('fs');
const Conf = require('conf');
const config = new Conf();
const getDirName = require('path').dirname;

function writeFile(path, contents, cb) {
  fs.mkdir(getDirName(path), { recursive: true}, function (err) {
    if (err) return cb(err);

    fs.writeFile(path, contents, cb);
  });
}

module.exports = (responses) => {
  // Optional JSX
  const innerBlocks = (responses.jsx) ? `<InnerBlocks allowedBlocks="' . esc_attr( wp_json_encode( $allowed_blocks ) ) . '" template="' . esc_attr( wp_json_encode( $template ) ) . '"/>'` : '';
  const props = (responses.jsx) ? 
    `$allowed_blocks = array( 'core/image', 'core/paragraph' );
    $template = array(
      array( 'core/paragraph', array(
        'placeholder' => 'Add a root-level paragraph',
      ) 
    ));` : '';

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
    ${innerBlocks}
  </div>
  `;

  /**
   * Question: 
   * Should I be creating this directory if it does not exist or throw an error?
  **/
  
  if (config.get('groupAssets') === true) {
    writeFile(`${config.get('renderTemplateFolderPath')}/${responses.name}/block.php`, 
      renderTemplateContent, 
      err => { console.log(err); });
  } else {
    writeFile(`${config.get('renderTemplateFolderPath')}/${responses.name}.php`, 
      renderTemplateContent, 
      err => { console.log(err); });
  }
}