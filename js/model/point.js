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

	var Backbone = require('backbone');

	var Point = Backbone.Model.extend({
		defaults: {
			x: 0,
			y: 0
		},
		equals: function(other) {
			return this.get('x') === other.get('x')
				&& this.get('y') === other.get('y');
		}
	});

	var PointCollection = Backbone.Collection.extend({
		model: Point
	});

	return {
		Model: Point,
		Collection: PointCollection
	};
});
