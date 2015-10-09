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

namespace OCA\Sketch\Controller;

use Exception;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http;
use OCP\IRequest;
use OCA\Sketch\Db\Sketch;
use OCA\Sketch\Db\SketchMapper;

class sketchcontroller extends Controller {

	/**
	 * @var SketchService
	 */
	private $mapper;

	/**
	 * @var string
	 */
	private $userId;

	/**
	 * @param string $AppName
	 * @param IRequest $request
	 * @param SketchMapper $mapper
	 * @param string $UserId
	 */
	public function __construct($AppName, IRequest $request, SketchMapper $mapper,
		$UserId) {
		parent::__construct($AppName, $request);
		$this->mapper = $mapper;
		$this->userId = $UserId;
	}

	/**
	 * @NoAdminRequired
	 */
	public function index() {
		return new DataResponse($this->mapper->findAll($this->userId));
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param string $id
	 */
	public function show($id) {
		try {
			return new DataResponse($this->mapper->find($id, $this->userId));
		} catch (Exception $e) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param string $title
	 */
	public function create($title) {
		$sketch = new Sketch();
		$sketch->setTitle($title);
		$sketch->setUserId($this->userId);
		return new DataResponse($this->mapper->insert($sketch));
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param string $id
	 * @param string $title
	 */
	public function update($id, $title) {
		try {
			$sketch = $this->mapper->find($id, $this->userId);
		} catch (Exception $e) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}
		$sketch->setTitle($title);
		return new DataResponse($this->mapper->update($sketch));
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param string $id
	 */
	public function destroy($id) {
		try {
			$sketch = $this->mapper->find($id, $this->userId);
		} catch (Exception $e) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}
		$this->mapper->delete($sketch);
		return new DataResponse($sketch);
	}

}
