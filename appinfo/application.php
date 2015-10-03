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

namespace OCA\Sketch\AppInfo;

use OCP\AppFramework\App;

class Application extends App {

	public function __construct($urlParams = []) {
		parent::__construct('sketch', $urlParams);
		
		$container = $this->getContainer();

		$container->registerService('DataFolder',
			function($c) {
			return $c->getServer()->getUserFolder();
		});
	}
}
