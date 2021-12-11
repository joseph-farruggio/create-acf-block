# `Create ACF Bock`

> Register and scaffold your ACF blocks through a CLI

## What this CLI does
The `create-acf-block` CLI both registers your block within the acf_register_block_type() function and scaffolds a block render template.

## Usage

- Run `npm i create-acf-block`
- Create an acf-block.config.js in your project's root

```
module.exports = {
  registeration_file_path: './inc/acf-blocks.php',
  render_template_folder_path: './blocks'
}
```

- Update the `register_file_path` and `render_template_folder_path` values to match your folder structure.
- Run `create-acf-block` to use the CLI