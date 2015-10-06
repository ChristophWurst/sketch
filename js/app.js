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

	var Application = Marionette.Application.extend({
		Service: {}
	});

	var app = new Application();

	/**
	 * Set up services and register event handlers
	 */
	app.Service.LineService = require('service/lineservice');
	app.on('line:add', app.Service.LineService.create);

	return app;
});
