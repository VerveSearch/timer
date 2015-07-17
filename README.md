# vs.Timer

A configurable timer JavaScript class which can be very useful for time-based events, HTML5 games timers, etc. 

## Usage

```javascript

var timer = new vs.Timer({
	delay:1000,     //time between ticks 
	maxTicks:20		//maximum number of ticks 
});

timer.on('tick',function(e){
	//handle ticks
	console.log(e); 
});
timer.on('complete',function(){
	//handle complete
});
timer.on('start',function(){
	//handle start event 
});
timer.on('pause',function(){
	//handle paused
});
timer.on('resume',function(){
	//handle resume 
});
timer.on('stop',function(){
	//handle stop
});

timer.start()

//if Kris Kowal's Q library is used, then promises will be supported. 

timer.start()
	.then(function(){
	//handle complete here 
	},function(){
	//handle stop here
	},function(){
	//handle ticks here
	}); 

this.pause();

this.resume()
	.then(function(){
	//handle complete here
	},function(){
	//handle stop here
	},function(){
	//handle tick here
	});


```

## Dependencies 

1. vs.EventManager