/// <reference path="./typings/browser.d.ts" />

/**
 * ownCloud - Sketch
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2016
 */

import Marionette = require('backbone.marionette');
import LineController = require('controller/LineController')
import SketchController = require('controller/SketchController');
import AppView = require('view/AppView');

class Application extends Marionette.Application {
	public View: AppView;
	public Controller = {
		LineController: LineController,
		SketchController: SketchController
	}
}

var App = new Application();

/**
 * Set up controller events
 */
App.on('line:add', App.Controller.LineController.create);
App.on('sketch:add', App.Controller.SketchController.add);
App.on('sketch:show', App.Controller.SketchController.show);
App.on('sketch:update', App.Controller.SketchController.update);
App.on('sketch:delete', App.Controller.SketchController.destroy);

/**
 * Set up view
 */
App.View = new AppView({
	el: '#app'
});

export = App;
