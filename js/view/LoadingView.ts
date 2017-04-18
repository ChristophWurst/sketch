/**
 * ownCloud - Sketch
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2015
 */

import Marionette = require('marionette');

class LoadingView extends Marionette.ItemView {
	public template = false;
	public className = 'loading-view icon-loading';
}

export = LoadingView;