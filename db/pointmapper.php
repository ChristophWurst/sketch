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

use OCP\IDb;
use OCP\AppFramework\Db\Mapper;

class PointMapper extends Mapper {

	/**
	 * @param IDb $db
	 */
	public function __construct(IDb $db) {
		parent::__construct($db, 'sketch_points', Point::class);
	}

	/**
	 * @param int $lineId
	 * @param string $userId
	 * @return Point[]
	 */
	public function findAll($lineId, $userId) {
		// TODO: check user id (join sketch, line)
		$sql = 'SELECT * FROM *PREFIX*sketch_points WHERE line_id = ?';
		return $this->findEntities($sql, [$lineId]);
	}

}
