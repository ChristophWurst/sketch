<?php

/**
 * ownCloud - sketch
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2015
 */
return [
	'routes' => [
		['name' => 'page#index', 'url' => '/', 'verb' => 'GET'],
	],
	'resources' => [
		'sketch' => ['url' => '/sketches'],
		'line' => ['url' => '/sketches/{sketchId}/lines'],
	]
];
