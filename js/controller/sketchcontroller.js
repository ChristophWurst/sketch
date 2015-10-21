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

	var Sketch = require('model/sketch').Model;
	var SketchCollection = require('model/sketch').Collection;
	var SketchList = require('view/sketchlist');
	var SketchCanvas = require('view/sketchcanvas');
	var LoadingView = require('view/loadingview');

	function add() {
		var sketch = new Sketch({
			title: 'sketch'
		});
		// New sketch should be shown at the top of the sketch list
		require('app').sketches.add(sketch, {
			at: 0
		});
		var savingSketch = sketch.save();
		savingSketch.done(function() {
			require('app').trigger('sketch:show', sketch.get('id'));
			require('app').trigger('sketch:edit', sketch.get('id'));
		});
	}

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
		app.sketchList.render();

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

	function update(id, data) {
		var sketches = require('app').sketches;
		var sketch = sketches.get(id);
		sketch.set('title', data.title);
		sketch.save();
	}

	function destroy(id) {
		var sketches = require('app').sketches;
		var sketch = sketches.get(id);
		sketch.destroy();

		if (sketches.length > 0) {
			show(sketches.at(0).get('id'));
		}
	}

	return {
		add: add,
		loadAll: loadAll,
		show: show,
		update: update,
		destroy: destroy
	};
});
