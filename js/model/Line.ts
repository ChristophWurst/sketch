/**
 * ownCloud - Sketch
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2015
 */

import Backbone = require('backbone');
import OC = require('OC');
import PointCollection = require('model/Point');

class Line extends Backbone.Model {
	
	public points = null;
	
	public initialize(options) {
		if (this.get('points') === null) {
			this.set('points', new PointCollection());
		}
	}
	public parse(data) {
		data.points = new PointCollection(data.points);
		return data;
	}
	public addPoint(point) {
		this.get('points').push(point);
	}
	public reset() {
		this.get('points').reset();
	}
}

export = Line;

