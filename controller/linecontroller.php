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

namespace OCA\Sketch\Controller;

use Exception;
use OCP\IRequest;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCA\Sketch\Db\Line;
use OCA\Sketch\Db\LineMapper;
use OCA\Sketch\Db\Point;
use OCA\Sketch\Db\PointMapper;

class LineController extends Controller {

	/**
	 * @var LineMapper
	 */
	private $lineMapper;

	/**
	 * @var PointMapper
	 */
	private $pointMapper;

	/**
	 * @var string
	 */
	private $userId;

	/**
	 * @param string $AppName
	 * @param IRequest $request
	 * @param LineMapper $mapper
	 * @param string $UserId
	 */
	public function __construct($AppName, IRequest $request,
		LineMapper $lineMapper, PointMapper $pointMapper, $UserId) {
		parent::__construct($AppName, $request);
		$this->lineMapper = $lineMapper;
		$this->pointMapper = $pointMapper;
		$this->userId = $UserId;
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param type $sketchId
	 * @return DataResponse
	 */
	public function index($sketchId) {
		return new DataResponse($this->lineMapper->findAll($sketchId, $this->userId));
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param int $sketchId
	 * @param int $id
	 * @return DataResponse
	 */
	public function show($sketchId, $id) {
		try {
			return new DataResponse($this->lineMapper->find($sketchId, $id, $this->userId));
		} catch (Exception $e) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param int $sketchId
	 * @return DataResponse
	 */
	public function create($sketchId, $points) {
		$line = new Line();
		$line->setSketchId($sketchId);
		$result = $this->lineMapper->insert($line);
		foreach ($points as $point) {
			$p = new Point();
			$p->setLineId($result->getId());
			$p->setX($point['x']);
			$p->setY($point['y']);
			$this->pointMapper->insert($p);
		}
		return new DataResponse($result);
	}

	/**
	 * @NoAdminRequired
	 *
	 * @return DataResponse
	 */
	public function update() {
		return new DataResponse([], Http::STATUS_METHOD_NOT_ALLOWED);
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param int $sketchId
	 * @param int $id
	 * @return DataResponse
	 */
	public function destroy($sketchId, $id) {
		try {
			$line = $this->lineMapper->find($sketchId, $id, $this->userId);
		} catch (Exception $e) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}
		$this->lineMapper->delete($line);
		return new DataResponse($line);
	}

}
