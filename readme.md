# `Create ACF Bock`

> Register and scaffold your ACF blocks through a CLI

## Usage

- Run `npm i create-acf-block`
- Create an acf-block.config.js in your project's root

```
module.exports = {
  register_file_path: './inc/acf-blocks.php',
  render_template_folder_path: './blocks'
}
```

- Update the `register_file_path` and `render_template_folder_path` values to match your folder structure.
- Run `create-acf-block` to use the CLI