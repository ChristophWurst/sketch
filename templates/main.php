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
	<% if (isEditing()) { %>
	<div class="app-navigation-entry-edit">
		<form class="edit-form">
			<input value="<%= title %>"
			       class="sketch-title"
			       name="sketch-title"
			       required="required"
			       type="text">
			<input value=""
			       class="action icon-checkmark"
			       type="submit">
		</form>
	</div>
	<% } else { %>
	<a href="#"><%= title %></a>
	<div class="app-navigation-entry-utils">
		<ul>
			<li class="app-navigation-entry-utils-menu-button">
				<button title="<?php p($l->t('Menu')); ?>"></button>
			</li>
		</ul>
	</div>
	<div class="app-navigation-entry-menu <%= menuOpened() ? 'open' : '' %>">
		<ul>
			<li>
				<button class="icon-rename rename-sketch"
					title="<?php p($l->t('Rename sketch')); ?>"></button>
			</li>
			<li>
				<button class="icon-delete delete-sketch"
					title="<?php p($l->t('Delete sketch')); ?>"></button>
			</li>
		</ul>
	</div>
	<% } %>
</script>
<script id="sketch-canvas-template" type="text/html">
	<canvas id="sketch-background" width="100" height="100">
		<p>Your browser doesn't support canvas.</p>
	</canvas>
	<canvas id="sketch-canvas" width="100" height="100">
	</canvas>
</script>
<script id="sketch-list-template" type="text/html">
	<div class="new-sketch">
		<ul>
			<li class="add-sketch">
				<div class="heading">
					<button class="icon-add"><?php p($l->t('Add sketch')); ?></button>
				</div>
			</li>
		</ul>
	</div>
	<div class="sketches"></div>
</script>