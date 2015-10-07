/**
 * ownCloud - Sketch
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2015
 */

define(function(require) {
	'use strict';

	var SketchCollection = require('model/sketch').Collection;
	var SketchList = require('view/sketchlist');
	var SketchCanvas = require('view/sketchcanvas');
	var LoadingView = require('view/loadingview');

	/**
	 * Load all sketches
	 *
	 * @returns {undefined}
	 */
	function loadAll() {
		var app = require('app');
		app.sketches = new SketchCollection();
		app.sketchList = new SketchList({
			collection: app.sketches,
			el: '#sketch-list'
		});

		var fetchingSketches = app.sketches.fetch();

		fetchingSketches.done(function(data) {
			// Automatically load first sketch
			if (data.length > 0) {
				show(data[0].id);
			}
		});
	}

	function show(id) {
		var app = require('app');

		require('app').View.get('content').show(new LoadingView());

		var sketch = app.sketches.get(id);
		var fetchingLines = sketch.get('lines').fetch();
		fetchingLines.done(function(data) {
			require('app').View.get('content').show(new SketchCanvas({
				sketch: app.sketches.get(id)
			}));
		});

		app.trigger('sketch:active', id);
	}

	return {
		loadAll: loadAll,
		show: show
	};
});
