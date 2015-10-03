<?php

namespace OCA\Sketch\Controller;

/**
 * ownCloud - sketch
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2015
 */
use OCP\IRequest;
use OCP\AppFramework\Controller;
use OCA\Sketch\Service\SketchService;

class sketchcontroller extends Controller {

	/**
	 * @var SketchService
	 */
	private $sketchService;

	/**
	 * @param string $AppName
	 * @param IRequest $request
	 * @param SketchService $service
	 */
	public function __construct($AppName, IRequest $request, SketchService $service) {
		parent::__construct($AppName, $request);
		$this->sketchService = $service;
	}

	/**
	 * @NoAdminRequired
	 */
	public function index() {
		return $this->sketchService->findAll();
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param string $id
	 */
	public function show($id) {
		return $this->sketchService->find($id);
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param string $title
	 * @param json $content
	 */
	public function create($title, $content) {
		return $this->sketchService->create($title, $content);
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param string $id
	 * @param string $title
	 * @param json $content
	 */
	public function update($id, $title, $content) {
		return $this->sketchService->update($id, $title, $content);
	}

	/**
	 * @NoAdminRequired
	 *
	 * @param string $id
	 */
	public function destroy($id) {
		return $this->sketchService->delete($id);
	}

}
