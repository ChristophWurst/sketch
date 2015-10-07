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

namespace OCA\Sketch\Db;

use JsonSerializable;
use OCP\AppFramework\Db\Entity;

class Point extends Entity implements JsonSerializable {

	protected $lineId;
	protected $x;
	protected $y;

	public function jsonSerialize() {
		return [
			'x' => $this->getX(),
			'y' => $this->getY(),
		];
	}

}
