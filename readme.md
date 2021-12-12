# `Create ACF Block`

> Register and scaffold your ACF blocks through a CLI

## What this CLI does
The `create-acf-block` CLI registers your block within the acf_register_block_type() function, scaffolds a block render template, and optionally preps CSS and JS..

### Usage
---
1. Run `npm i create-acf-block`

2. Add these comments as markers in your block registration file. The CLI will register blocks only between these two comments.

``` php
// Begin Create-ACF-Block
// End Create-ACF-Block
```

Example:

``` php
function register_my_blocks() {

  // check function exists
  if( function_exists('acf_register_block_type') ) {
    // Begin Create-ACF-Block
    // End Create-ACF-Block

    // ... Other blocks you might have registered manually
  }
}
```

3. Run `create-acf-block` from your project's root direactory to use the CLI.

### Preferences
---
When you first run the CLI, you'll set some basic preferences:

`registerationFilePath`  
The path to our ACF block registration file (where your *acf_register_block_type()* functions live.)

`renderTemplateFolderPath`  
The path to the folder where your ACF block render templates live.

`createAssets`  
Whether the CLI should scaffold CSS and JS files for your blocks.

`groupAssets`  
Whether the CLI should place your CS and JS files in the same directory as your render.

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

`cssPath`  
The path to your CSS directory.

`jsPath`  
The path to your JS directory.

If yes, your blocks will look something like:

```
./blocks
│
└───hero
│    │   block.php
│    │   block.css
│    │   block.php
└───quote
      │   block.php
      │   block.css
      │   block.php
```

### General Flags
___
`--preferences` - Clear your preferences and set them again.


### Block Detail Flags 
___
When block flags are used, you will only be prompted to provide details for those flags.
Note: `name` and `title` fields are required and will always be included in prompts.

`--simple`  
*Only prompts for the block name and title*

`--description`  
*The block description*

`--category`  
*The block category as seen in the editor*

`--mode`  
*The default mode: [edit/view]*

`--align`  
*The default block aligment*

`--jsx`  
*Whether the block will use innerBlocks*  

