///<reference path="../typings/browser.d.ts"/>

/**
 * ownCloud - Sketch
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2016
 */

import Backbone = require('backbone');
import OC = require('OC');
import Line = require('model/Line');

class LineCollection extends Backbone.Collection<Line> {

	public url:string = null;

	public initialize(options) {
		this.setUrl(options.sketchId);
		this.on('add', function(model) {
			model.set('sketchId', options.sketchId);
		});
	}

	public setUrl(sketchId) {
		this.url = OC.generateUrl('apps/sketch/sketches/{sketchId}/lines', {
			sketchId: sketchId
		});
	}
}

export = LineCollection;