import './zoom';

$(document).ready(function() {
	function resizeTopImage() {
		var imageHeight = Math.max(window.innerWidth, window.innerHeight);

		$('.image-fitscreen').css({
			height: imageHeight + 'px'
		});

		// $('.content').css('margin-top', imageHeight + 'px');
	}

	function resizeArchitectImage() {
		var imageHeight = Math.max(window.innerWidth, window.innerHeight);

		$('.image-fitwidth').css({
			height: imageHeight + 'px'
		});
	}

	resizeTopImage();
	resizeArchitectImage();


	var player = SC.Widget($('iframe.sc-widget')[0]);
	var pOffset = $('.player').offset();
	var pWidth = $('.player').width();
	var scrub;

	$('.player-button').on('click', function(e) {
		e.preventDefault();

		player.toggle();
	})

	// Set info on load
	player.bind(SC.Widget.Events.READY, function() {
		setInfo();
	});

	player.bind(SC.Widget.Events.PLAY_PROGRESS, function(e) {
		// if (e.relativePosition < 0.003) { setInfo(); }
		$('.position').css('width', (e.relativePosition * 100) + "%");
	});

	$('.player').mousemove(function(e) {
		scrub = (e.pageX - pOffset.left);
	});

	$('.player').click(function() {
		$('.position').css('width', scrub + "px");
		var seek = player.duration * (scrub / pWidth);

		player.seekTo(seek);

		$('.player-seek').html(msToTime(seek));
	});

	function setInfo() {
		player.getCurrentSound(function(song) {
			console.log(song);

			$('.player-info').html(song.title);

			player.current = song;
		});

		player.getDuration(function(value) {
			player.duration = value;
			$('.player-duration').html(msToTime(player.duration));
		});

		player.isPaused(function(bool) {
			player.getPaused = bool;
		});
	}
});

function msToTime(s) {
	var ms = s % 1000;
	s = (s - ms) / 1000;
	var secs = s % 60;
	s = (s - secs) / 60;
	var mins = s % 60;
	var hrs = (s - mins) / 60;

	return hrs + ':' + mins + ':' + secs;
}