///<reference path="./typings/browser.d.ts"/>

/**
 * ownCloud - Sketch
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2016
 */

require.config({
	baseUrl: './../../../apps/sketch/js',
	paths: {
		/**
		 * Libraries
		 */
		backbone: 'vendor/backbone/backbone',
		marionette: 'vendor/backbone.marionette/lib/backbone.marionette',
		underscore: 'vendor/underscore/underscore'
	}
});

require([
	'start'
]);