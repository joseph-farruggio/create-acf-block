<?php
add_action('acf/init', 'register_my_blocks');

function register_my_blocks() {

	// check function exists
	if( function_exists('acf_register_block_type') ) {
    // Start: Create-ACF-Blocks
    // End: Create-ACF-Block
  }
}