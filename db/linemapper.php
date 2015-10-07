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
	 * @return Line
	 */
	public function find($sketchId, $id, $userId) {
		// TODO: check user id (join sketch)
		$sql = 'SELECT * FROM *PREFIX*sketch_lines WHERE sketch_id = ?'
			. ' AND id = ?';
		return $this->findEntity($sql, [$sketchId, $id]);
	}

	/**
	 * @param type $userId
	 * @return Line[]
	 */
	public function findAll($sketchId, $userId) {
		// TODO: check user id (join sketch)
		$sql = 'SELECT * FROM *PREFIX*sketch_lines WHERE sketch_id = ?';
		return $this->findEntities($sql, [$sketchId]);
	}

}
