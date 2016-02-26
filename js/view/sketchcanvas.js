/**
 * ownCloud - Sketch
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2015
 */

define(function(require) {
	'use strict';

	var Marionette = require('marionette');
	var _ = require('underscore');
	var $ = require('jquery');
	var Point = require('model/point').Model;
	var Line = require('model/line').Model;

	return Marionette.ItemView.extend({
		template: '#sketch-canvas-template',
		className: 'content',
		lastPosition: null,
		ui: {
			'background': '#sketch-background',
			'canvas': '#sketch-canvas'
		},
		events: {
			'mousedown @ui.canvas': 'startLine',
			'touchstart @ui.canvas': 'startTouchLine',
			'mousemove @ui.canvas': 'drawLine',
			'touchmove @ui.canvas': 'drawTouchLine',
			'mouseup @ui.canvas': 'finishLine',
			'touchend @ui.canvas': 'finishTouchLine',
			'mouseleave @ui.canvas': 'finishLine'
		},
		startLine: function(e, isTouch) {
			isTouch = isTouch || false;

			this.drawing = true;
			this.line = new Line();
			var currentPosition = this.getCurrentMousePosition(e, isTouch);
			this.line.addPoint(currentPosition);
			this.lastPosition = currentPosition;
		},
		startTouchLine: function(e) {
			this.startLine(e.originalEvent, true);
		},
		drawLine: function(e, isTouch) {
			e.preventDefault();
			e.stopPropagation();
			isTouch = isTouch || false;

			if (this.drawing) {
				var currentPosition = this.getCurrentMousePosition(e, isTouch);
				if (currentPosition.equals(this.lastPosition)) {
					// ignore it
					return;
				}
				this.drawPartialLine(this.lastPosition, currentPosition, this.canvas);
				this.lastPosition = currentPosition;
				this.line.addPoint(currentPosition);
			}
		},
		drawTouchLine: function(e) {
			e.stopPropagation();
			this.drawLine(e.originalEvent, true);
		},
		finishLine: function(e, isTouch) {
			isTouch = isTouch || false;

			if (this.drawing) {
				this.drawing = false;
				this.lastPosition = null;

				// Add a single point if the line is empty -> draw
				// a point
				if (this.line.length === 0) {
					this.line.addPoint(this.getCurrentMousePosition(e, isTouch));
				}

				this.sketch.get('lines').push(this.line);

				// Remove it from foreground and draw it to the
				// background canvas
				this.clearCanvas(this.canvas);
				this.drawLineOnCanvas(this.line, this.background);

				require('app').trigger('line:add', this.sketch.get('id'), this.line);
			}
		},
		finishTouchLine: function(e) {
			this.finishLine(e.originalEvent, true);
		},
		initialize: function(options) {
			this.sketch = options.sketch;

			this.background = null;
			this.canvas = null;
			this.line = new Line();
			this.drawing = false;

			// Listen to window resize
			this.resizeHandler = _.bind(this.adjustCanvasSize, this);
			$(window).on('resize', this.resizeHandler);
		},
		onDestroy: function() {
			$(window).off('resize', this.resizeHandler);
		},
		onRender: function() {
			this.background = this.ui.background[0].getContext('2d');
			this.canvas = this.ui.canvas[0].getContext('2d');
		},
		onShow: function() {
			this.adjustCanvasSize();
			this.canvas.strokeStyle = "#000000";
			this.canvas.lineJoin = "round";
			this.canvas.lineWidth = 1;
		},
		adjustCanvasSize: function() {
			var that = this;
			_.each([this.background, this.canvas], function(canvas) {
				canvas.canvas.width = 1;
				canvas.canvas.height = 1;

				canvas.canvas.width = that.$el.innerWidth();
				canvas.canvas.height = that.$el.innerHeight();
			});

			this.reDrawBackground();
			this.clearCanvas(this.canvas);
			this.drawLineOnCanvas(this.line, this.canvas);
		},
		getCurrentMousePosition: function(e, isTouch) {
			isTouch = isTouch || false;

			if (isTouch) {
				return new Point({
					x: e.changedTouches[0].pageX - this.ui.canvas.offset().left,
					y: e.changedTouches[0].pageY - this.ui.canvas.offset().top
				});
			} else {
				return new Point({
					x: e.pageX - this.ui.canvas.offset().left,
					y: e.pageY - this.ui.canvas.offset().top
				});
			}
		},
		reDrawBackground: function() {
			this.clearCanvas(this.background);
			var that = this;
			this.sketch.get('lines').each(function(line) {
				that.drawLineOnCanvas(line, that.background);
			});
		},
		drawPartialLine: function(previous, current, canvas) {
			canvas.beginPath();
			canvas.moveTo(previous.get('x'), previous.get('y'));
			canvas.lineTo(current.get('x'), current.get('y'));
			canvas.closePath();
			canvas.stroke();
		},
		drawLineOnCanvas: function(line, canvas) {
			if (line.get('points').length === 1) {
				this.drawPointOnCanvas(line, canvas);
			}

			var prev = null;
			canvas.beginPath();
			line.get('points').each(function(point) {
				if (prev !== null) {
					canvas.moveTo(prev.get('x'), prev.get('y'));
					canvas.lineTo(point.get('x'), point.get('y'));
				}
				prev = point;
			});
			canvas.closePath();
			canvas.stroke();
		},
		drawPointOnCanvas: function(line, canvas) {
			var point = line.get('points').first();
			canvas.fillStyle = "#1D2D44";
			canvas.beginPath();
			canvas.arc(point.get('x'), point.get('y'), 1, 0, 2 * Math.PI, true);
			canvas.closePath();
			canvas.fill();
		},
		clearCanvas: function(canvas) {
			canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
		}
	});
});
