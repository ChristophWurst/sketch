///<reference path="../typings/browser.d.ts"/>

/**
 * ownCloud - Sketch
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2015
 */

import Marionette = require('backbone.marionette');
import Sketch = require('model/Sketch');

class SketchListItem extends Marionette.ItemView<Sketch> {
	public tagName = 'li';
	className = 'with-menu';
	menuOpened = false;
	isEditing = false;
	template = '#sketch-list-item-template';
	
	protected templateHelpers() {
		var that = this;
		return {
			menuOpened: function() {
				return that.menuOpened;
			},
			isEditing: function() {
				return that.isEditing;
			}
		};
	}
	
	ui = {
		'menuButton': '.app-navigation-entry-utils-menu-button',
		'renameButton': '.rename-sketch',
		'nameInput': 'input[type=text]',
		'form': '.edit-form',
		'submitButton': 'input[type=submit]',
		'deleteButton': '.delete-sketch'
	}
	
	private events = {
		'click': 'onClick',
		'click @ui.menuButton': 'onClickMenu',
		'click @ui.renameButton': 'onClickEdit',
		'click @ui.nameInput': 'onClickInput',
		'submit @ui.form': 'onEditSubmit',
		'click @ui.submitButton': 'onEditSubmit',
		'click @ui.deleteButton': 'onDelete'
	}
	
	protected initialize() {
		this.listenTo(require('App'), 'sketch:active', this.setActive);
		this.listenTo(require('App'), 'sketch:edit', this.onEdit);
		this.listenTo(require('App'), 'view:click', this.onClickOtherElement);
	}
	
	protected onBeforeDestroy() {
		this.stopListening();
	}
	
	private setActive(activeId) {
		if (activeId === this.model.get('id')) {
			this.$el.addClass('active');
		} else {
			this.$el.removeClass('active');
			this.menuOpened = false;
			this.isEditing = false;
			this.render();
		}
	}
	
	private onClick(e) {
		if (e.isDefaultPrevented()) {
			return;
		}
		e.preventDefault();
		require('App').trigger('sketch:show', this.model.get('id'));
	}
	
	private onClickOtherElement(e) {
		this.menuOpened = false;
		this.isEditing = false;
		this.render();
	}
	
	private onClickMenu(e) {
		e.preventDefault();
		this.menuOpened = !this.menuOpened;
		this.render();
	}
	
	private onClickEdit(e) {
		e.preventDefault();
		this.menuOpened = false;
		this.isEditing = true;
		this.render();
		this.ui.nameInput.select();
	}
	
	private onClickInput(e) {
		e.preventDefault();
	}
	
	private onEditSubmit(e) {
		e.preventDefault();

		require('App').trigger('sketch:update', this.model.get('id'), {
			title: this.$('input.sketch-title').val()
		});

		this.isEditing = false;
		this.render();
	}
	
	privateonEdit(vehicleId) {
		if (vehicleId === this.model.get('id')) {
			this.menuOpened = false;
			this.isEditing = true;
			this.render();
			this.ui.nameInput.select();
		}
	}
	
	private onDelete(e) {
		e.preventDefault();
		require('App').trigger('sketch:delete', this.model.get('id'));
	}
}
