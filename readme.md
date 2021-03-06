# `Create ACF Block`

> Register and scaffold your ACF blocks through a CLI

Read my blog post on why and how I created the [create-acf-block CLI](https://joeyfarruggio.com/wordpress/acf-block-cli/).

## What this CLI does

The `create-acf-block` CLI registers your block within the acf_register_block_type() function, scaffolds a block render template, and optionally preps CSS and JS.

### Usage

---

1. Run `npm i --save-dev create-acf-block`

2. Add these comments as markers in your block registration file. The CLI will register blocks only between these two comments.

```php
// Begin Create-ACF-Block
// End Create-ACF-Block
```

Example:

```php
function register_my_blocks() {

  // check function exists
  if( function_exists('acf_register_block_type') ) {
    // Begin Create-ACF-Block
    // End Create-ACF-Block

    // ... Other blocks you might have registered manually
  }
}
```

3. Run `npx create-acf-block`

### Preferences

---

When you first run the CLI, you'll set some basic preferences:

**Block registration file path**  
The path to our ACF block registration file (where your _acf_register_block_type()_ functions live.)  
Example: `./inc/acf-blocks.php`.

**Render template folder path**  
The path to the folder where your ACF block render templates live.
Example: `./blocks`.

**Create block specific CSS and JS files**  
Whether the CLI should scaffold CSS and JS files for your blocks.

**Group block CSS and JS files with the render template**
Whether the CLI should place your CS and JS files in the same directory as your render template.

If no, your blocks will look something like:

```
./blocks
│   hero.php
│   quote.php
│
./css
│   hero.css
│   quote.css
./js
│   hero.js
│   quote.js
```

If yes, you'll provide the paths to your CSS and JS directories and your blocks will look something like:

```
./blocks
│
└───hero
│    │   block.php
│    │   block.css
│    │   block.js
└───quote
      │   block.php
      │   block.css
      │   block.js
```

### General Flags

---

`--preferences` - Clear your preferences and set them again.

### Block Detail Flags

---

When block flags are used, you will only be prompted to provide details for those flags.
Note: `name` and `title` fields are required and will always be included in prompts.

`--simple`  
_Only prompts for the block name and title_

`--description`  
_The block description_

`--category`  
_The block category as seen in the editor_

`--mode`  
_The default mode: [edit/preview/auto]_

`--align`  
_The default block alignment_

`--jsx`  
_Whether the block will use innerBlocks_
