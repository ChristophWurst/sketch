/**
 * ownCloud - Sketch
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2015
 */

class LineController {
	public create(sketchId: Number, line: any) {
		var sketches = require('app').sketches;
		var sketch = sketches.get(sketchId);
		var savingLine = line.save();
		savingLine.done(function() {
			sketch.get('lines').add(line);
		});
	}
}

export = LineController;