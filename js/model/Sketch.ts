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
import LineCollection = require('model/line').Collection;

class Sketch extends Backbone.Model {
	/*defaults: {
		title: '',
		lines: null
	},*/

	public initialize() {
		this.set('lines', new LineCollection({
			sketchId: this.get('id')
		}));
		this.on('sync', function() {
			this.get('lines').setUrl(this.get('id'));
		});
	}

	public toJSON() {
		return {
			id: this.get('id'),
			title: this.get('title')
		};
	}
}

export = Sketch;

