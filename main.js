var audio  = new webkitAudioContext,
	output = audio.destination,
	delay  = audio.createDelayNode(),
	input,
	rec;

delay.delayTime.value = 0.2;
delay.connect(output);

btns = {
	start: document.getElementById('start'),
	stop: document.getElementById('stop'),
	download: document.getElementById('download')
}

navigator.webkitGetUserMedia({ audio: true }, function(stream) {
	input = audio.createMediaStreamSource(stream);
	rec = new Recorder(input);

	document.getElementById('startMessage').style.display = 'none';
	document.getElementById('main').style.display = 'block';

	btns.start.onclick = start;
	btns.stop.onclick = stop;
	btns.download.onclick = download;
});

var start = function() {
	input.connect(delay);
	rec.record();

	btns.stop.style.display = 'block';
	btns.start.style.display = 'none';
	btns.download.disabled = true;
}

var stop = function() {
	input.disconnect();
	rec.stop();

	btns.start.style.display = 'block';
	btns.stop.style.display = 'none';
	btns.download.disabled = false;
}

var download = function() {
	rec.exportWAV(function(blob) {
		Recorder.forceDownload(blob);
		rec.clear();
	});
}
