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

use OCP\AppFramework\Db\Mapper;
use OCP\IDb;
use OCA\Sketch\Db\Sketch;

class SketchMapper extends Mapper {

	/**
	 * @param IDb $db
	 */
	public function __construct(IDb $db) {
		parent::__construct($db, 'sketch_sketches', Sketch::class);
	}

	/**
	 * @param int $id
	 * @param string $userId
	 * @return Sketch
	 */
	public function find($id, $userId) {
		$sql = 'SELECT * FROM *PREFIX*sketch_sketches WHERE id = ? AND user_id = ?';
		return $this->findEntity($sql, [$id, $userId]);
	}

	/**
	 * @param string $userId
	 * @return Sketch[]
	 */
	public function findAll($userId) {
		$sql = 'SELECT * FROM *PREFIX*sketch_sketches WHERE user_id = ?';
		return $this->findEntities($sql, [$userId]);
	}

}
