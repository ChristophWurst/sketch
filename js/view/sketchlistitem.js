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
		className: 'with-menu',
		active: false,
		menuOpened: false,
		isEditing: false,
		template: '#sketch-list-item-template',
		templateHelpers: function() {
			var that = this;
			return {
				menuOpened: function() {
					return that.menuOpened;
				},
				isEditing: function() {
					return that.isEditing;
				}
			}
		},
		events: {
			'click': 'onClick',
			'click .app-navigation-entry-utils-menu-button': 'onMenu',
			'click .rename-sketch': 'onEdit',
			'click input': 'onInput',
			'submit .edit-form': 'onEditSubmit',
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
			this.menuOpened = !this.menuOpened;
			this.render();
		},
		onEdit: function(e) {
			e.stopPropagation();
			this.menuOpened = false;
			this.isEditing = true;
			this.render();
		},
		onInput: function(e) {
			e.stopPropagation();
		},
		onEditSubmit: function(e) {
			e.preventDefault();

			require('app').trigger('sketch:update', this.model.get('id'), {
				title: this.$('input.sketch-title').val()
			});

			this.isEditing = false;
			this.render();
		},
		onDelete: function(e) {
			e.stopPropagation();
			require('app').trigger('sketch:delete', this.model.get('id'));
		}
	});
});
