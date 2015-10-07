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
			SketchController: require('controller/sketchcontroller')
		},
		Service: {
			LineService: require('service/lineservice')
		}
	});

	var app = new Application();

	/**
	 * Set up controller events
	 */
	app.on('sketch:show', app.Controller.SketchController.show);

	/**
	 * Set up services events
	 */
	app.on('line:add', app.Service.LineService.create);

	/**
	 * Set up view
	 */
	app.View = new AppView({
		el: '#app'
	});

	return app;
});
