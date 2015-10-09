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

	var Marionette = require('marionette');
	var AppView = require('view/appview');

	var Application = Marionette.Application.extend({
		Controller: {
			LineController: require('controller/linecontroller'),
			SketchController: require('controller/sketchcontroller')
		}
	});

	var app = new Application();

	/**
	 * Set up controller events
	 */
	app.on('line:add', app.Controller.LineController.create);
	app.on('sketch:add', app.Controller.SketchController.add);
	app.on('sketch:show', app.Controller.SketchController.show);
	app.on('sketch:delete', app.Controller.SketchController.destroy);

	/**
	 * Set up view
	 */
	app.View = new AppView({
		el: '#app'
	});

	return app;
});
