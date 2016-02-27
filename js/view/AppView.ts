///<reference path="../typings/browser.d.ts"/>

/**
 * ownCloud - Sketch
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2015
 */

import $ = require('jquery');
import Marionette = require('backbone.marionette');
import App = require('App');

class AppView extends Marionette.RegionManager {
	
	public regions = {
		content: '#app-content-wrapper'
	}
	
	public initialize() {
		$(document).on('click', function(e) {
			if (!e.isDefaultPrevented()) {
				App.trigger('view:click', e);
			}
		});
	}
	
}

export = AppView;