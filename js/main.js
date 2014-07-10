$(document).on('ready', function() {

	$('.canvas').canvas().rendables.push($('.character').character());

});

$.fn.canvas = function() {
	var _self = this;

	this.lastFrame = new Date().getTime();
	this.rendables = [];	

	function render(frameTime) {
		var varia =  (1000/60) / frameTime;
		$('.info').html('Goal:' + (1000/60) + ' FPS: ' + frameTime + '/' + varia);

		$.each(_self.rendables, function(i, rendable) {
			rendable.render(varia);
		});
	}

	(function animloop(){
		requestAnimFrame(animloop);
		render(new Date().getTime() - _self.lastFrame);
		_self.lastFrame = new Date().getTime();
	})();

	return this;
}


$.fn.character = function() {
	var momentum = 0;
	var speed = 1;
	var _self = this;

	this.render = function(varia) {
		momentum = 0;
		if(keysDown[68]) {//
			momentum += speed * varia;
		}

		if(keysDown[65]) {// A
			momentum -= speed * varia;
		}

		if(momentum < 0) {
			$(_self).addClass('left');
		} else {
			$(_self).removeClass('left');
		}

		if(momentum != 0) {
			$(_self).addClass('play');
		} else {
			$(_self).removeClass('play');
		}

		$(this).css('left', $(this).position().left + (momentum * varia))
	}

	return this;
};

var keysDown = {};
$(document).on('keydown', function(evt) {
	keysDown[evt.keyCode] = true;
});
$(document).on('keyup', function(evt) {
	keysDown[evt.keyCode] = false;
});

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})()