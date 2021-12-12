const replace = require('replace-in-file');
const Conf = require('conf');
const config = new Conf();

module.exports = (response) => {
  // Find and Replace options
  const options = {

    //Single file
    files: `${config.get('registerationFilePath')}`,
  
    //Replacement to make (string or regex) 
    from: "// End Create-ACF-Block",
    to: 
    `acf_register_block_type(array(
      'name'				=> '${response.name}',
      'title'				=> '${response.title}',
      'description' => '${response.description}',
      'category'    => '${response.category}',
      'mode'				=> '${response.mode}',
      'align'       => '${response.align}',
      'supports'	=> array(
        'anchor' => true
      ),
      'render_template'   => '${config.get('renderTemplateFolderPath')}/${response.name}.php',
    ));
    // End Create-ACF-Block`,
  };

  replace(options)
    .then(changedFiles => {
      console.log('Modified files:', changedFiles.join(', '));
    })
    .catch(error => {
      console.error('Error occurred:', error);
    })
}