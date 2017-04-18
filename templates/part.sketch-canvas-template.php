<?php
/**
 * ownCloud - Sketch
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2016
 */
?>
<script id="sketch-canvas-template" type="text/html">
	<div id="canvas-tool-chooser">
		<a href="#" class="button pencil">
			<span class="icon icon-rename"></span>
		</a>
		<a href="#" class="button active erasor">
			<span class="icon icon-delete"></span>
		</a>
	</div>
	<div id="canvas-container">
		<canvas id="sketch-background" width="100" height="100">
			<p>Your browser doesn't support canvas.</p>
		</canvas>
		<canvas id="sketch-canvas" width="100" height="100">
		</canvas>
	</div>
</script>