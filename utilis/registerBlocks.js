const acfConfig = require('../acf-block.config.js');
const replace = require('replace-in-file');

module.exports = (response) => {
  // Find and Replace options
  const options = {

    //Single file
    files: `${acfConfig.registeration_file_path}`,
  
    //Replacement to make (string or regex) 
    from: "// End Create-ACF-Block",
    to: `
    acf_register_block_type(array(
      'name'				=> '${response.name}',
      'title'				=> '${response.title}',
      'description' => '${response.description}',
      'category'    => '${response.category}',
      'mode'				=> '${response.mode}',
      'align'       => '${response.align}',
      'supports'	=> array(
        'anchor' => true,
        'mode' => false,
        'jsx' => true
      ),
      'render_template'   => '${acfConfig.render_template_folder_path}/${response.name}.php',
    ));
    // End Create-ACF-Block
    `,
  };

  replace(options)
    .then(changedFiles => {
      console.log('Modified files:', changedFiles.join(', '));
    })
    .catch(error => {
      console.error('Error occurred:', error);
    })
}