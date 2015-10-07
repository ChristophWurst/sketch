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
	var SketchView = require('view/sketchlistitem');

	return Marionette.CollectionView.extend({
		tagName: 'ul',
		childView: SketchView,
		initialize: function() {
			this.listenTo(this.collection, 'sync', this.render);
		}
	});
});
