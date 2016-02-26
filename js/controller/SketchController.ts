/**
 * ownCloud - Sketch
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2015
 */

import DateUtil = require('util/dateutil');
import Sketch = require('model/sketch').Model;
import SketchCollection = require('model/sketch').Collection;
import SketchList = require('view/sketchlist');
import SketchCanvas = require('view/sketchcanvas');
import LoadingView = require('view/loadingview');

class SketchController {
	public add() {
		var sketch = new Sketch({
			title: DateUtil.now()
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
	public loadAll() {
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

	public show(id) {
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

	public update(id, data) {
		var sketches = require('app').sketches;
		var sketch = sketches.get(id);
		sketch.set('title', data.title);
		sketch.save();
	}

	public destroy(id) {
		var sketches = require('app').sketches;
		var sketch = sketches.get(id);
		sketch.destroy();

		if (sketches.length > 0) {
			show(sketches.at(0).get('id'));
		}
	}
}

export = SketchController;