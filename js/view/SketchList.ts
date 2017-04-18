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
import SketchListItem = require('view/SketchListItem');

class SketchList extends Marionette.CompositeView<Sketch, SketchListItem> {

	public template = '#sketch-list-template';
	public tagName = 'ul';
	public childView = SketchListItem;
	public childViewContainer = '.sketches';

	public events = {
		'click .add-sketch': 'onAdd'
	}

	public initialize() {
		//this.listenTo(this.collection, 'sync', this.render);
	}

	public onAdd(e) {
		require('App').trigger('sketch:add')
	}
	
}
