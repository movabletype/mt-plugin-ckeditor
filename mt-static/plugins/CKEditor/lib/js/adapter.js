/*
 * Movable Type (r) Open Source (C) 2001-2012 Six Apart, Ltd.
 * This program is distributed under the terms of the
 * GNU General Public License, version 2.
 *
 * $Id$
 */
;(function($) {

MT.Editor.CKEditor = function() { MT.Editor.apply(this, arguments) };

$.extend(MT.Editor.CKEditor, MT.Editor, {
    isMobileOSWYSIWYGSupported: function() {
        return false;
    },

    formats: function() {
        return ['wysiwyg'];
    },

    config: {
        language: $('html').attr('lang'),
        resize_minWidth: 0,
        resize_dir: 'vertical',
        plugins: 'list,table,tabletools,mt,maximize,elementspath,basicstyles,sourcearea,removeformat,liststyle,link,button,format,contextmenu,justify,tab,horizontalrule,resize,blockquote,undo,image,enterkey,wysiwygarea,font,toolbar,indent,colordialog,colorbutton',
        skin: 'mt',
        toolbar_mt: [
            ['Bold', 'Italic', 'Underline', 'Strike'],
            ['Blockquote', 'BulletedList', 'NumberedList', 'HorizontalRule'],
            ['Link', 'Unlink', 'mt_insert_image', 'mt_insert_file'],
            ['Source'],
            '/',
            ['Undo', 'Redo'],
            ['TextColor', 'BGColor', 'RemoveFormat'],
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'Indent', 'Outdent'],
            ['Table', 'ShowBlocks'],
            ['Format'],
            ['Maximize']
        ],
        toolbar: 'mt',
        on: {
            instanceReady: function(ev) {}
        },
        content_css: '',
        body_class: '',
        body_id: ''
    }
});

$.extend(MT.Editor.CKEditor.prototype, MT.Editor.prototype, {
    initEditor: function(format) {
        this.show();
    },

    getContent: function(content) {
        return this.editor ? this.editor.getData() : null;
    },

    setContent: function(content) {
        this.editor.setData(content);
    },

    hide: function() {
        this.editor.destroy();
        this.editor = null;
    },

    show: function() {
        var adapter = this;

        var config = $.extend({}, this.constructor.config);
        config.on = $.extend({}, config.on);

        var instanceReady = config.on['instanceReady'];
        config.on['instanceReady'] = function(ev) {
            instanceReady.apply(this, arguments);
            adapter.editor = this;

            this.on('key', function(ev) {
                adapter.setDirty({
                    target: adapter.editor.element['$']
                });
            });

            this.on('resize', function(ev) {
                adapter.editor.container.$.style.width = '';
            });
        };

        config['contentsCss'] =
            config['content_css'].split(',').concat(adapter.commonOptions['content_css_list']);
        config['bodyClass'] =
            config['body_class'] + ' ' + adapter.commonOptions['body_class_list'].join(' ')
        config['bodyId'] = config['body_id'] || adapter.id;

        $('#' + this.id).ckeditor(config);
    },

    save: function() {
        if (this.editor) {
            this.editor.updateElement();
        }
    },

    insertContent: function(value) {
        this.editor.insertHtml(value);
    },

    clearDirty: function() {
        this.editor.isNotDirty = 1;
    },

    getHeight: function() {
        return this.editor ? this.editor.getResizable().$.offsetHeight : null;
    },

    setHeight: function(height) {
        this.editor.resize(this.editor.getResizable().$.offsetWidth, height-3);
    }
});

MT.EditorManager.register('ckeditor', MT.Editor.CKEditor);

})(jQuery);
