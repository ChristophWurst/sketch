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
use OCP\AppFramework\Db\Entity;
use OCP\AppFramework\Db\Mapper;

class LineMapper extends Mapper {

	/**
	 * @var PointMapper
	 */
	private $pointMapper;

	/**
	 * @param IDb $db
	 */
	public function __construct(IDb $db, PointMapper $pointmapper) {
		parent::__construct($db, 'sketch_lines', Line::class);
		$this->pointMapper = $pointmapper;
	}

	/**
	 * @param Line $line
	 * @param string $userId
	 */
	public function addPoints(Line $line, $userId) {
		$line->setPoints($this->pointMapper->findAll($line->getId(), $userId));
	}

	/**
	 * @param int $id
	 * @param string $userId
	 * @return Line
	 */
	public function find($sketchId, $id, $userId) {
		// TODO: check user id (join sketch)
		$sql = 'SELECT * FROM *PREFIX*sketch_lines WHERE sketch_id = ?'
			. ' AND id = ?';
		$line = $this->findEntity($sql, [$sketchId, $id]);
		$this->addPoints($line, $userId);
		return $line;
	}

	/**
	 * @param string $userId
	 * @return Line[]
	 */
	public function findAll($sketchId, $userId) {
		// TODO: check user id (join sketch)
		$sql = 'SELECT * FROM *PREFIX*sketch_lines WHERE sketch_id = ?';
		$lines = $this->findEntities($sql, [$sketchId]);
		array_walk($lines,
			function($line) use ($userId) {
			$this->addPoints($line, $userId);
		});
		return $lines;
	}

}
