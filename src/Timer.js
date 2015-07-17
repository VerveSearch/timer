(function($W,$D,VS,$Q){

	if (!VS || !VS.proxy || !VS.inherits){
		throw new Error('Dependencies are not met, please include the vs.EventManager');
	}
	var EM = VS.EventManager,
		SuhTimer = function(config){
		var cfg = config || {};
		EM.call(this,['tick','complete','paused','resumed','started']);
		this.tickCount = 0;
		this.counter = -1;
		this.maxTicks = cfg.maxTicks || 10;
		this.delay = cfg.delay || 1000;
		this.deferred = null;
		this.ticking = false;
	};
	vs.inherits(SuhTimer,EM); 
	var _tm = SuhTimer.prototype; 
	_tm.start = function(){
		this.deferred = $Q?$Q.defer():null;
		this.tickCount = 0;
		this.resume();
		return $Q?this.deferred.promise:undefined;
	};
	_tm.resolveDeferred = $Q?function(){
		this.deferred.resolve({
			ticks:this.tickCount
		});
	}:function(){};
	_tm.rejectDeferred = $Q?function(){
		this.deferred.reject({
			ticks:this.tickCount
		});
	}:function(){};
	_tm.tickDeferred = $Q?function(){
		this.deferred.notify({
			ticks:this.tickCount
		});
	}:function(){};
	_tm.isTicking = function(){
		return this.ticking; 
	};
	_tm.reset = function(){
		this.tickCount = 0;
		return this;
	};
	_tm.addTicks = function(ticks){
		this.maxTicks += ticks;
		return this;
	},
	_tm._clearTimer = function(){
		if (this.counter !== -1){
			clearInterval(this.counter);
			this.counter = -1;
		}
	};
	_tm.resume = function(){
		if (this.tickCount >= 0 && this.tickCount < this.maxTicks){
			this._clearTimer();
			this.counter = setInterval(VS.proxy(this.tick,this),this.delay);
			this.ticking = true;
		}
		return $Q?this.deferred.promise:undefined;
	};
	_tm.pause = function(){
		this._clearTimer();
		this.ticking = false;
		return this;
	};
	_tm.tick = function(){
		this.tickCount++;
		this.trigger('tick',{
			ticks:this.tickCount
		});
		this.tickDeferred();
		if (this.tickCount >= this.maxTicks){
			clearInterval(this.counter);
			this.ticking = false;
			this.trigger('complete',{
				ticks:this.tickCount
			});
			this.resolveDeferred();
		}
	};
	_tm.stop = function(){
		this._clearTimer();
		this.ticking = false;
		this.counter = -1;
		this.rejectDeferred();
	};

	$W.vs = $W.vs || {};
	$W.vs.Timer = $W.vs.Timer || SuhTimer; 
})(window,document,vs,Q);