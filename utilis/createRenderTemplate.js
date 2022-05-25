import fs from "fs";
import Conf from "conf";
const config = new Conf();
import Path from "path";

function writeFile(path, contents, cb) {
	fs.mkdir(Path.dirname(path), { recursive: true }, function (err) {
		if (err) {
			return cb(err);
		}

		fs.writeFile(path, contents, cb);
	});
}

export default (responses) => {
	// Optional JSX
	const innerBlocks = responses.jsx ? `<InnerBlocks allowedBlocks="' . esc_attr( wp_json_encode( $allowed_blocks ) ) . '" template="' . esc_attr( wp_json_encode( $template ) ) . '"/>'` : "";
	const props = responses.jsx
		? `$allowed_blocks = array( 'core/image', 'core/paragraph' );
    $template = array(
      array( 'core/paragraph', array(
        'placeholder' => 'Add a root-level paragraph',
      ) 
    ));`
		: "";

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
  if( !empty($block['anchor']) ) {
    $block_id = $block['anchor'];
  }
  
  
  // Create class attribute allowing for custom "className" and "align" values.
  $className = '${responses.name}';
  if( !empty($block['className']) ) {
      $className .= ' ' . $block['className'];
  }
  if( !empty($block['align']) ) {
      $className .= ' align' . $block['align'];
  }

  
  ?>
  
  <div id="<?php echo $block_id; ?>" class="<?php echo $className; ?>">
    ${innerBlocks}
  </div>
  `;

	/**
	 * Question:
	 * Should I be creating this directory if it does not exist or throw an error?
	 **/

	if (config.get("groupAssets") === true) {
		writeFile(`${config.get("renderTemplateFolderPath")}/${responses.name}/block.php`, renderTemplateContent, function (err) {
			if (err) throw err;
		});
	} else {
		writeFile(`${config.get("renderTemplateFolderPath")}/${responses.name}.php`, renderTemplateContent, function (err) {
			if (err) throw err;
		});
	}
};
