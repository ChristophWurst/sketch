/**
 * ownCloud - Sketch
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2016
 */

import Backbone = require('backbone');
import OC = require('OC');
import SketchModel = require('model/Sketch');

class SketchCollection extends Backbone.Collection<SketchModel> {
	public url = OC.generateUrl('apps/sketch/sketches');
}

export = SketchCollection;