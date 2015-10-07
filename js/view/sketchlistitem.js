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

	return Marionette.ItemView.extend({
		tagName: 'li',
		active: false,
		template: '#sketch-list-item-template',
		events: {
			'click': 'onClick'
		},
		initialize: function() {
			require('app').on('sketch:active', this.setActive, this);
		},
		onBeforeDestroy: function() {
			require('app').off('sketch:active', this.setActive);
		},
		setActive: function(activeId) {
			if (activeId === this.model.get('id')) {
				this.$el.addClass('active');
			} else {
				this.$el.removeClass('active');
			}
		},
		onClick: function(e) {
			e.stopPropagation();
			e.preventDefault();
			console.log('click');
			require('app').trigger('sketch:show', this.model.get('id'));
		}
	});
});
