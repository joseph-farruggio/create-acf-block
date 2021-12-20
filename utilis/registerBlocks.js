import replace from 'replace-in-file';
import Conf from 'conf';
const config = new Conf();


export default (response) => {
  // Find and Replace options
  const jsx = (response.jsx) ? `'jsx' => true,` : '';
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
        'anchor' => true,
        ${jsx}
      ),
      'render_template'   => '${config.get('renderTemplateFolderPath')}/${response.name}.php',
    ));
    // End Create-ACF-Block`,
  };

  replace(options)
    .then(changedFiles => {
      // console.log('Modified files:', changedFiles.join(', '));
    })
    .catch(error => {
      console.error('Error occurred:', error);
    })
}