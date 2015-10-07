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
		menuOpened: false,
		template: '#sketch-list-item-template',
		templateHelpers: function() {
			var that = this;
			return {
				menuOpened: function() {
					return that.menuOpened;
				}
			}
		},
		events: {
			'click': 'onClick',
			'click .app-navigation-entry-utils-menu-button': 'onMenu',
			'click .delete-sketch': 'onDelete'
		},
		initialize: function() {
			this.listenTo(require('app'), 'sketch:active', this.setActive);
		},
		onBeforeDestroy: function() {
			this.stopListening();
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
			require('app').trigger('sketch:show', this.model.get('id'));
		},
		onMenu: function(e) {
			e.stopPropagation();
			e.preventDefault();
			this.menuOpened = !this.menuOpened;
			this.render();
		},
		onDelete: function(e) {
			e.stopPropagation();
			e.preventDefault();
			require('app').trigger('sketch:delete', this.model.get('id'));
		}
	});
});
