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
	var Line = require('model/line').Model;

	return Marionette.ItemView.extend({
		template: '#sketch-canvas-template',
		className: 'content',
		ui: {
			'background': '#sketch-background',
			'canvas': '#sketch-canvas'
		},
		events: {
			'mousedown @ui.canvas': 'startLine',
			'mousemove @ui.canvas': 'drawLine',
			'mouseup @ui.canvas': 'finishLine',
			'mouseleave @ui.canvas': 'finishLine'
		},
		startLine: function(e) {
			e.stopPropagation();
			this.drawing = true;
			this.line = new Line();
			this.line.addPoint(this.getCurrentMousePosition(e));
		},
		drawLine: function(e) {
			e.stopPropagation();
			if (this.drawing) {
				this.line.addPoint(this.getCurrentMousePosition(e));
				this.clearCanvas(this.canvas);
				this.drawLineOnCanvas(this.line, this.canvas);
			}
		},
		finishLine: function(e) {
			e.stopPropagation();
			if (this.drawing) {
				this.drawing = false;
				this.sketch.get('lines').push(this.line);

				// Remove it from foreground and draw it to the
				// background canvas
				this.clearCanvas(this.canvas);
				this.drawLineOnCanvas(this.line, this.background);

				require('app').trigger('line:add', this.sketch.get('id'), this.line);
			}
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
		getCurrentMousePosition: function(e) {
			return {
				x: e.pageX - this.ui.canvas.offset().left,
				y: e.pageY - this.ui.canvas.offset().top
			};
		},
		reDrawBackground: function() {
			this.clearCanvas(this.background);
			var that = this;
			this.sketch.get('lines').each(function(line) {
				that.drawLineOnCanvas(line, that.background);
			});
		},
		drawLineOnCanvas: function(line, canvas) {
			canvas.strokeStyle = "#1D2D44";
			canvas.lineJoin = "round";
			canvas.lineWidth = 1;

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
		clearCanvas: function(canvas) {
			canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
		}
	});
});
