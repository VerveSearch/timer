describe("Timer Test Suite", function() {
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 7000;
	// console.log(vs.Timer);
	var Timer = vs.Timer,
		timer;
	
		// console.log(timer);
// jasmine.DEFAULT
	describe("should support promises", function() {
		beforeEach(function(done){
			timer = new Timer({
			maxTicks:5,
			delay:50
			});
			spyOn(timer,'tick').and.callThrough();
			timer.start()
				.then(function(c){
					done();
				})
		

		});
		it("should call timer 10 times", function() {
			expect(timer.tick).toHaveBeenCalled();
			expect(timer.tick.calls.count()).toEqual(5);
		});
			
	});

	describe("should stop timer when stop is called", function() {
		beforeEach(function(done){
			spyOn(timer,'tick').and.callThrough();
			timer.start()
				.then(function(c){
					done();
				},function(c){
					done();
				}); 
			setTimeout(function(){
				timer.stop();
			},50);

		});
		it("should call timer once", function() {
			expect(timer.tick).toHaveBeenCalled();
			expect(timer.tick.calls.count()).toEqual(1);
		});
			
	});

	describe("should support complete event", function() {
		var doneFn 
			var o = {
				callback:function(e){
					doneFn();
				}
			};
		beforeEach(function(done){
			doneFn = done;
			spyOn(timer,'tick').and.callThrough();
			spyOn(o,'callback').and.callThrough();
			timer.addEventListener('complete',o.callback); 
			timer.start();
		});
		it("should call complete event listener", function() {
			expect(timer.tick).toHaveBeenCalled();
			expect(o.callback).toHaveBeenCalled();
			expect(timer.tick.calls.count()).toEqual(5);
		});
			
	});

	describe("should support pause and resume events", function() {
		var doneFn 
			var o = {
				callback:function(e){
					doneFn();
				}
			};
		beforeEach(function(done){
			timer = new Timer({
				maxTicks:10,
				delay:50
			});
			doneFn = done;
			spyOn(timer,'tick').and.callThrough();
			spyOn(o,'callback').and.callThrough();
			setTimeout(function(){
				timer.pause(); 
				done();
			},270);
			// timer.addEventListener('complete',o.callback); 
			timer.start();
		});
		it("should call complete event listener", function() {
			expect(timer.tick).toHaveBeenCalled();
			// expect(o.callback).toHaveBeenCalled();
			expect(timer.tick.calls.count()).toEqual(5);
			expect(timer.tickCount).toEqual(5);
			timer.resume(); 
			setTimeout(function(){
				expect(o.callback).toHaveBeenCalled();
				doneFn();
			},280); 
		});
			
	});
});