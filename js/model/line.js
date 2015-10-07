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
	var OC = require('OC');
	var PointCollection = require('model/point').Collection;

	var Line = Backbone.Model.extend({
		defaults: {
			points: null
		},
		initialize: function() {
			if (this.get('points') === null) {
				this.set('points', new PointCollection());
			}
		},
		parse: function(data) {
			data.points = new PointCollection(data.points);
			return data;
		},
		addPoint: function(point) {
			this.get('points').push(point);
		},
		reset: function() {
			this.get('points').reset();
		}
	});

	var LineCollection = Backbone.Collection.extend({
		model: Line,
		initialize: function(options) {
			this.url = OC.generateUrl('apps/sketch/sketches/{sketchId}/lines', {
				sketchId: options.sketchId
			});

			this.on('add', function(model) {
				model.set('sketchId', options.sketchId);
			});
		}
	});

	return {
		Model: Line,
		Collection: LineCollection
	};
});
