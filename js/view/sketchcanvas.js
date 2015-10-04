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
	var Line = require('model/line');

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
			this.line = new Line();
			this.line.add(this.getCurrentMousePosition(e));
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
			this.line.push(this.getCurrentMousePosition(e));
		},
		getCurrentMousePosition: function(e) {
			return {
				x: e.pageX - this.ui.canvas.offset().left,
				y: e.pageY - this.ui.canvas.offset().top
			};
		},
		draw: function() {
			var canvas = this.canvas;
			canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
			canvas.strokeStyle = "#1D2D44";
			canvas.lineJoin = "round";
			canvas.lineWidth = 1;

			var prev = null;
			this.line.each(function(point) {
				if (prev !== null) {
					canvas.beginPath();
					canvas.moveTo(prev.get('x'), prev.get('y'));
					canvas.lineTo(point.get('x'), point.get('y'));
					canvas.closePath();
					canvas.stroke();
				}
				prev = point;
			});
		}
	});
});
