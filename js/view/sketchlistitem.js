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
			};
		},
		ui: {
			'menuButton': '.app-navigation-entry-utils-menu-button',
			'renameButton': '.rename-sketch',
			'nameInput': 'input[type=text]',
			'form': '.edit-form',
			'submitButton': 'input[type=submit]',
			'deleteButton': '.delete-sketch'
		},
		events: {
			'click': 'onClick',
			'click @ui.menuButton': 'onClickMenu',
			'click @ui.renameButton': 'onClickEdit',
			'click @ui.nameInput': 'onClickInput',
			'submit @ui.form': 'onEditSubmit',
			'click @ui.submitButton': 'onEditSubmit',
			'click @ui.deleteButton': 'onDelete'
		},
		initialize: function() {
			this.listenTo(require('app'), 'sketch:active', this.setActive);
			this.listenTo(require('app'), 'sketch:edit', this.onEdit);
		},
		onBeforeDestroy: function() {
			this.stopListening();
		},
		setActive: function(activeId) {
			if (activeId === this.model.get('id')) {
				this.$el.addClass('active');
			} else {
				this.$el.removeClass('active');
				this.menuOpened = false;
				this.isEditing = false;
				this.render();
			}
		},
		onClick: function(e) {
			e.stopPropagation();
			e.preventDefault();
			require('app').trigger('sketch:show', this.model.get('id'));
		},
		onClickMenu: function(e) {
			e.stopPropagation();
			this.menuOpened = !this.menuOpened;
			this.render();
		},
		onClickEdit: function(e) {
			e.stopPropagation();
			this.menuOpened = false;
			this.isEditing = true;
			this.render();
			this.ui.nameInput.select();
		},
		onClickInput: function(e) {
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
		onEdit: function(vehicleId) {
			if (vehicleId === this.model.get('id')) {
				this.menuOpened = false;
				this.isEditing = true;
				this.render();
				this.ui.nameInput.select();
			}
		},
		onDelete: function(e) {
			e.stopPropagation();
			require('app').trigger('sketch:delete', this.model.get('id'));
		}
	});
});
