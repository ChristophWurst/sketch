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
import Point = require('model/Point');

class PointCollection extends Backbone.Collection<Point> {}

export = PointCollection;