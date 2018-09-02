
define('vs/css', [], {
	load: function (name, req, load) {
		load({});
	}
});

define('vs/nls', [], {
	create: function () {
		return {
			localize: function () {
				return 'NO_LOCALIZATION_FOR_YOU';
			}
		};
	},
	localize: function () {
		return 'NO_LOCALIZATION_FOR_YOU';
	},
	load: function (name, req, load) {
		load({});
	}
});

define(['require'], function (require) {
	requirejs([
		'vs/editor/editor.main'
	], function () {
		requirejs([
			'release/dev/choicescript/choicescript.test',
			'release/dev/markdown/markdown.test',
			'release/dev/xml/xml.test',
			'release/dev/yaml/yaml.test',
		], function () {
			run(); // We can launch the tests!
		}, function (err) {
			console.log(err);
		});
	}, function (err) {
		console.log(err);
	});
});
