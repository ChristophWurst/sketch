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

class Line extends Entity implements JsonSerializable {

	/**
	 * @var int
	 */
	protected $sketchId;

	/**
	 * @var Point[]
	 */
	protected $points;

	/**
	 * @param Point[] $points
	 */
	public function setPoints($points) {
		$this->points = $points;
	}

	/**
	 * @return array
	 */
	public function jsonSerialize() {
		return [
			'id' => $this->getId(),
			'sketchId' => $this->getSketchId(),
			'points' => $this->points,
		];
	}

}
