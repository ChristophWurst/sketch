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
use OCA\Sketch\Db\Line;

class LineMapper extends Mapper {

	/**
	 * @param IDb $db
	 */
	public function __construct(IDb $db) {
		parent::__construct($db, 'sketch_lines', Line::class);
	}

	/**
	 * @param type $id
	 * @param type $userId
	 * @return type
	 */
	public function find($sketchId, $id, $userId) {
		$sql = 'SELECT * FROM *PREFIX*sketch_lines WHERE sketch_id = ?'
			. ' AND id = ? AND user_id = ?';
		return $this->findEntity($sql, [$sketchId, $id, $userId]);
	}

	/**
	 * @param type $userId
	 * @return type
	 */
	public function findAll($sketchId, $userId) {
		$sql = 'SELECT * FROM *PREFIX*sketch_lines WHERE sketch_id = ?'
			. ' AND user_id = ?';
		return $this->findEntities($sql, [$sketchId, $userId]);
	}

}
