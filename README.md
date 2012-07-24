# CKEditor for Movable Type

Enable to use the [CKEditor](http://ckeditor.com/) as a WYSIWYG editor.

![Screenshot](https://github.com/movabletype/mt-plugin-ckeditor/raw/master/artwork/screenshot.png)


## Requirements

* Movable Type 5.2


## Installation

1. Unpack the `CKEditor` archive.
1. Upload the contents to the MT `plugins` directory.
Should look like this when installed:
```
$MT_HOME/
    plugins/
        CKEditor/
    mt-static/
        plugins/
            CKEditor/
```

1. Add the following setting to `mt-config.cgi`
```
Editor CKEditor
```


## License

This library is free software released under the GPL.
 
 
## Copyright

The following copyright notice applies to all the files provided in this
distribution, including binary files, unless explicitly noted otherwise.

Copyright 2012 Six Apart, Ltd.


### Except `mt-static/plugins/CKEditor/ckeditor`

Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see `mt-static/plugins/CKEditor/ckeditor/LICENSE.html` or http://ckeditor.com/license
