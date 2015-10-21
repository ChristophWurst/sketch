# Sketch

[![Build Status](https://travis-ci.org/ChristophWurst/sketch.svg?branch=master)](https://travis-ci.org/ChristophWurst/sketch)
[![Code Coverage](https://scrutinizer-ci.com/g/ChristophWurst/sketch/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/ChristophWurst/sketch/?branch=master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/ChristophWurst/sketch/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/ChristophWurst/sketch/?branch=master)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ChristophWurst/sketch?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Dependencies
* owncloud >= 8.1
* PHP >= 5.5

## Supported Browsers
* Newest Firefox (Desktop)

## Supported Databases
* MySQL/MariaDB
* Sqlite (discouraged)

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
