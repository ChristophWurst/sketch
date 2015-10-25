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

	return Marionette.RegionManager.extend({
		regions: {
			content: '#app-content-wrapper'
		},
		initialize: function() {
			$(document).on('click', function(e) {
				if (!e.isDefaultPrevented()) {
					require('app').trigger('view:click', e);
				}
			});
		}
	});
});
