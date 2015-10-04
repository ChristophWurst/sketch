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

	var SketchModel = Backbone.Model.extend({
		defaults: {
			id: null,
			title: ''
		}
	});

	var SketchCollection = Backbone.Collection.extend({
		model: SketchModel,
		url: OC.generateUrl('apps/sketch/sketches')
	});

	return {
		Model: SketchModel,
		Collection: SketchCollection
	};
})