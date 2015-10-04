<?php

/**
 * ownCloud - Sketch
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2015
 */
script('sketch', 'vendor/requirejs/require');
script('sketch', 'require_config');
style('sketch', 'style');

?>

<div id="app">
	<div id="app-navigation">
		<?php print_unescaped($this->inc('part.navigation')); ?>
		<?php print_unescaped($this->inc('part.settings')); ?>
	</div>

	<div id="app-content">
		<div id="app-content-wrapper"></div>
	</div>
</div>

<script id="sketch-list-item-template" type="text/html">
	<a href="#"><%= title %></a>
</script>
<script id="sketch-canvas-template" type="text/html">
	<canvas id="sketch-background" width="100" height="100">
		<p>Your browser doesn't support canvas.</p>
	</canvas>
	<canvas id="sketch-canvas" width="100" height="100">
	</canvas>
</script>