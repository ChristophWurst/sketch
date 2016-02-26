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

class Point extends Backbone.Model.extend {
	/*defaults: {
		x: 0,
		y: 0
	},*/
	public equals(other: Point) {
		return this.get('x') === other.get('x')
			&& this.get('y') === other.get('y');
	}
}

export Point;