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

	return Marionette.ItemView.extend({
		template: '#sketch-canvas-template',
		ui: {
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
			this.path.length = 0;
			this.position = this.getCurrentMousePosition(e);
		},
		drawLine: function(e) {
			e.stopPropagation();
			if (this.drawing) {
				this.addLineToPath(e);
				this.draw();
			}
		},
		finishLine: function(e) {
			e.stopPropagation();
			if (this.drawing) {
				this.drawing = false;
				this.addLineToPath(e);
			}
		},
		initialize: function() {
			this.canvas = null;
			this.path = [];
			this.drawing = false;

			// Listen to window resize
			this.resizeHandler = _.bind(this.adjustCanvasSize, this);
			$(window).on('resize', this.resizeHandler);
		},
		onDestroy: function() {
			$(window).off('resize', this.resizeHandler);
		},
		onRender: function() {
			this.canvas = this.ui.canvas[0].getContext('2d');
			this.adjustCanvasSize();
		},
		adjustCanvasSize: function() {
			this.canvas.canvas.width = 1;
			this.canvas.canvas.height = 1;

			this.canvas.canvas.width = this.$el.innerWidth();
			this.canvas.canvas.height = this.$el.innerHeight();

			this.draw();
		},
		addLineToPath: function(e) {
			this.path.push({
				from: this.position,
				to: this.getCurrentMousePosition(e)
			});
			this.position = this.getCurrentMousePosition(e);
		},
		getCurrentMousePosition: function(e) {
			return {
				x: e.pageX - this.ui.canvas.offset().left,
				y: e.pageY - this.ui.canvas.offset().top
			};
		},
		draw: function() {
			this.canvas.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
			this.canvas.strokeStyle = "#1D2D44";
			this.canvas.lineJoin = "round";
			this.canvas.lineWidth = 1;

			var that = this;
			_.each(this.path, function(line) {
				that.canvas.beginPath();
				that.canvas.moveTo(line.from.x, line.from.y);
				that.canvas.lineTo(line.to.x, line.to.y);
				that.canvas.closePath();
				that.canvas.stroke();
			});
		}
	});
});
