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
	<ul class="sketches"></ul>
</script>