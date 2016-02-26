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

<?php print_unescaped($this->inc('part.sketch-canvas-template')); ?>
<?php print_unescaped($this->inc('part.sketch-list-template')); ?>
<?php print_unescaped($this->inc('part.sketch-list-item-template')); ?>