
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define('vs/basic-languages/fillers/monaco-editor-core',[], function () {
    return self.monaco;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define('vs/basic-languages/_.contribution',["require", "exports", "./fillers/monaco-editor-core"], function (require, exports, monaco_editor_core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.registerTheme = exports.registerLanguage = exports.loadLanguage = void 0;
    var languageDefinitions = {};
    var lazyLanguageLoaders = {};
    var LazyLanguageLoader = /** @class */ (function () {
        function LazyLanguageLoader(languageId) {
            var _this = this;
            this._languageId = languageId;
            this._loadingTriggered = false;
            this._lazyLoadPromise = new Promise(function (resolve, reject) {
                _this._lazyLoadPromiseResolve = resolve;
                _this._lazyLoadPromiseReject = reject;
            });
        }
        LazyLanguageLoader.getOrCreate = function (languageId) {
            if (!lazyLanguageLoaders[languageId]) {
                lazyLanguageLoaders[languageId] = new LazyLanguageLoader(languageId);
            }
            return lazyLanguageLoaders[languageId];
        };
        LazyLanguageLoader.prototype.whenLoaded = function () {
            return this._lazyLoadPromise;
        };
        LazyLanguageLoader.prototype.load = function () {
            var _this = this;
            if (!this._loadingTriggered) {
                this._loadingTriggered = true;
                languageDefinitions[this._languageId].loader().then(function (mod) { return _this._lazyLoadPromiseResolve(mod); }, function (err) { return _this._lazyLoadPromiseReject(err); });
            }
            return this._lazyLoadPromise;
        };
        return LazyLanguageLoader;
    }());
    function loadLanguage(languageId) {
        return LazyLanguageLoader.getOrCreate(languageId).load();
    }
    exports.loadLanguage = loadLanguage;
    function registerLanguage(def) {
        var languageId = def.id;
        languageDefinitions[languageId] = def;
        monaco_editor_core_1.languages.register(def);
        var lazyLanguageLoader = LazyLanguageLoader.getOrCreate(languageId);
        monaco_editor_core_1.languages.setMonarchTokensProvider(languageId, lazyLanguageLoader.whenLoaded().then(function (mod) { return mod.language; }));
        monaco_editor_core_1.languages.onLanguage(languageId, function () {
            lazyLanguageLoader.load().then(function (mod) {
                monaco_editor_core_1.languages.setLanguageConfiguration(languageId, mod.conf);
            });
        });
    }
    exports.registerLanguage = registerLanguage;
    function registerTheme(themeName, themeData) {
        monaco_editor_core_1.editor.defineTheme(themeName, themeData);
    }
    exports.registerTheme = registerTheme;
});

define('vs/basic-languages/choicescript/choicescript.themes',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.csLight = exports.csDark = void 0;
    exports.csDark = {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: 'extra-keywords', foreground: 'DA9ED3' },
            { token: 'flow-command', foreground: '599EFF' },
            { token: 'command', foreground: 'FFA500' },
            { token: 'conditional', foreground: 'FFA500' },
            { token: 'choice-option', foreground: '92A75C' }
        ],
        colors: {}
    };
    exports.csLight = {
        base: 'vs',
        inherit: true,
        rules: [
            { token: 'extra-keywords', foreground: 'EE82EE' },
            { token: 'flow-command', foreground: 'E9692C' },
            { token: 'command', foreground: '0000FF' },
            { token: 'choice-option', foreground: 'FF0000' }
        ],
        colors: {}
    };
});

define('vs/basic-languages/choicescript/choicescript.contribution',["require", "exports", "../_.contribution", "./choicescript.themes"], function (require, exports, __contribution_1, choicescript_themes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __contribution_1.registerTheme('cs-dark', choicescript_themes_1.csDark);
    __contribution_1.registerTheme('cs-light', choicescript_themes_1.csLight);
    __contribution_1.registerLanguage({
        id: 'choicescript',
        extensions: ['.txt'],
        aliases: ['ChoiceScript', 'cs'],
        loader: function () { return new Promise(function (resolve_1, reject_1) { require(['./choicescript'], resolve_1, reject_1); }); }
    });
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define('vs/basic-languages/css/css.contribution',["require", "exports", "../_.contribution"], function (require, exports, __contribution_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __contribution_1.registerLanguage({
        id: 'css',
        extensions: ['.css'],
        aliases: ['CSS', 'css'],
        mimetypes: ['text/css'],
        loader: function () { return new Promise(function (resolve_1, reject_1) { require(['./css'], resolve_1, reject_1); }); }
    });
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define('vs/basic-languages/markdown/markdown.contribution',["require", "exports", "../_.contribution"], function (require, exports, __contribution_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __contribution_1.registerLanguage({
        id: 'markdown',
        extensions: ['.md', '.markdown', '.mdown', '.mkdn', '.mkd', '.mdwn', '.mdtxt', '.mdtext'],
        aliases: ['Markdown', 'markdown'],
        loader: function () { return new Promise(function (resolve_1, reject_1) { require(['./markdown'], resolve_1, reject_1); }); }
    });
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define('vs/basic-languages/monaco.contribution',["require", "exports", "./choicescript/choicescript.contribution", "./css/css.contribution", "./markdown/markdown.contribution"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//import './mips/mips.contribution';
//import './msdax/msdax.contribution';
//import './mysql/mysql.contribution';
//import './objective-c/objective-c.contribution';
//import './pascal/pascal.contribution';
//import './pascaligo/pascaligo.contribution';
//import './perl/perl.contribution';
//import './pgsql/pgsql.contribution';
//import './php/php.contribution';
//import './postiats/postiats.contribution';
//import './powerquery/powerquery.contribution';
//import './powershell/powershell.contribution';
//import './pug/pug.contribution';
//import './python/python.contribution';
//import './r/r.contribution';
//import './razor/razor.contribution';
//import './redis/redis.contribution';
//import './redshift/redshift.contribution';
//import './restructuredtext/restructuredtext.contribution';
//import './ruby/ruby.contribution';
//import './rust/rust.contribution';
//import './sb/sb.contribution';
//import './scala/scala.contribution';
//import './scheme/scheme.contribution';
//import './scss/scss.contribution';
//import './shell/shell.contribution';
//import './solidity/solidity.contribution';
//import './sophia/sophia.contribution';
//import './sql/sql.contribution';
//import './st/st.contribution';
//import './swift/swift.contribution';
//import './systemverilog/systemverilog.contribution';
//import './tcl/tcl.contribution';
//import './twig/twig.contribution';
//import './typescript/typescript.contribution';
//import './vb/vb.contribution';
//import './xml/xml.contribution';
//import './yaml/yaml.contribution';

