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

namespace OCA\Sketch\Service;

use OCP\Files\File;
use OCP\Files\NotFoundException;
use OCP\ILogger;

class SketchService {

	const DATA_DIRECTORY = 'Sketches';

	/**
	 * @var OCP\Files\Folder
	 */
	private $dataDir;	

	/**
	 * @var ILogger
	 */
	private $logger;

	/**
	 * 
	 * @param bool $create
	 * @return \OCP\Files\Folder
	 */
	private function getDataDirectory($create = false) {
		try {
			$dir = $this->dataDir->get(self::DATA_DIRECTORY);
		} catch (NotFoundException $e) {
			if ($create) {
				$this->logger->debug("creating sketches data directory");
				$dir = $this->dataDir->newFolder(self::DATA_DIRECTORY);
			} else {
				$this->logger->debug("no sketches data directory found");
				return null;
			}
		}
		return $dir;
	}

	public function __construct($DataFolder, ILogger $logger) {
		$this->dataDir = $DataFolder;
		$this->logger = $logger;
	}

	public function findAll() {
		$sketches = [];

		$dir = $this->getDataDirectory();
		if (!is_null($dir)) {
			foreach ($dir->getDirectoryListing() as $node) {
				if ($node instanceof File && $node->getMimetype() === 'application/json') {
					$content = json_decode($node->getContent());
					$sketches[] = $content;
				}
			}
		}

		return $sketches;
	}

	public function find($id) {
		
	}

	public function create($title, $content) {
		
	}

	public function update($id, $title, $content) {
		
	}

	public function delete($id) {
		
	}

}
