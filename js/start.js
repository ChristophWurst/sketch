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

	var app = require('app');
	var SketchCollection = require('model/sketch').Collection;
	var SketchList = require('view/sketchlist');
	var SketchCanvas = require('view/sketchcanvas');

	app.on('start', function() {
		app.sketches = new SketchCollection();

		app.sketchList = new SketchList({
			collection: app.sketches,
			el: '#sketch-list'
		});

		app.canvas = new SketchCanvas({
			el: '#app-content-wrapper'
		});
		app.canvas.render();

		app.sketches.fetch();
	});

	app.start();
});
