# Sketch

[![Build Status](https://travis-ci.org/ChristophWurst/sketch.svg?branch=master)](https://travis-ci.org/ChristophWurst/sketch)
[![Code Coverage](https://scrutinizer-ci.com/g/ChristophWurst/sketch/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/ChristophWurst/sketch/?branch=master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/ChristophWurst/sketch/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/ChristophWurst/sketch/?branch=master)
[![Dependency Status](https://www.versioneye.com/user/projects/56cf639a6b21e500355b1350/badge.svg?style=flat)](https://www.versioneye.com/user/projects/56cf639a6b21e500355b1350)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ChristophWurst/sketch?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Dependencies
* Nextcloud 10 or 11
* ownCloud 9.1 or 9.2
* PHP >= 5.5

## Supported Browsers
* Newest Firefox (Desktop, Android)

## Supported Databases
* MySQL/MariaDB
* Sqlite (discouraged)

## Installation
This app is available on the ownCloud app store. [Link](https://apps.owncloud.com/content/show.php/Sketch?content=174146)

## Developer setup
Before you start hacking on this app, make sure ``npm`` and ``bower`` are installed
on your development machine. For installing ``npm``, use your Linux distribution's
package manager. ``bower`` can then be installed with
```bash
npm install -g bower
```

To download all JavaScript dependencies, run
```bash
bower install
```
inside this directory.

That's it. Now you're ready to start contributing to this app ;-)

## Running tests
After [Installing PHPUnit](http://phpunit.de/getting-started.html) run:

    phpunit -c phpunit.xml
