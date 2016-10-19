(function (console, $hx_exports, $global) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
Lambda.foreach = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
};
Lambda.fold = function(it,f,first) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
};
Lambda.find = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v = $it0.next();
		if(f(v)) return v;
	}
	return null;
};
var pixi_plugins_app_Application = function() {
	this._animationFrameId = null;
	this.pixelRatio = 1;
	this.set_skipFrame(false);
	this.autoResize = true;
	this.transparent = false;
	this.antialias = false;
	this.forceFXAA = false;
	this.roundPixels = false;
	this.clearBeforeRender = true;
	this.preserveDrawingBuffer = false;
	this.backgroundColor = 16777215;
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this.set_fps(60);
};
pixi_plugins_app_Application.__name__ = true;
pixi_plugins_app_Application.prototype = {
	set_fps: function(val) {
		this._frameCount = 0;
		return val >= 1 && val < 60?this.fps = val | 0:this.fps = 60;
	}
	,set_skipFrame: function(val) {
		if(val) {
			console.log("pixi.plugins.app.Application > Deprecated: skipFrame - use fps property and set it to 30 instead");
			this.set_fps(30);
		}
		return this.skipFrame = val;
	}
	,_setDefaultValues: function() {
		this._animationFrameId = null;
		this.pixelRatio = 1;
		this.set_skipFrame(false);
		this.autoResize = true;
		this.transparent = false;
		this.antialias = false;
		this.forceFXAA = false;
		this.roundPixels = false;
		this.clearBeforeRender = true;
		this.preserveDrawingBuffer = false;
		this.backgroundColor = 16777215;
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.set_fps(60);
	}
	,start: function(rendererType,parentDom,canvasElement) {
		if(rendererType == null) rendererType = "auto";
		if(canvasElement == null) {
			var _this = window.document;
			this.canvas = _this.createElement("canvas");
			this.canvas.style.width = this.width + "px";
			this.canvas.style.height = this.height + "px";
			this.canvas.style.position = "absolute";
		} else this.canvas = canvasElement;
		if(parentDom == null) window.document.body.appendChild(this.canvas); else parentDom.appendChild(this.canvas);
		this.stage = new PIXI.Container();
		var renderingOptions = { };
		renderingOptions.view = this.canvas;
		renderingOptions.backgroundColor = this.backgroundColor;
		renderingOptions.resolution = this.pixelRatio;
		renderingOptions.antialias = this.antialias;
		renderingOptions.forceFXAA = this.forceFXAA;
		renderingOptions.autoResize = this.autoResize;
		renderingOptions.transparent = this.transparent;
		renderingOptions.clearBeforeRender = this.clearBeforeRender;
		renderingOptions.preserveDrawingBuffer = this.preserveDrawingBuffer;
		if(rendererType == "auto") this.renderer = PIXI.autoDetectRenderer(this.width,this.height,renderingOptions); else if(rendererType == "canvas") this.renderer = new PIXI.CanvasRenderer(this.width,this.height,renderingOptions); else this.renderer = new PIXI.WebGLRenderer(this.width,this.height,renderingOptions);
		if(this.roundPixels) this.renderer.roundPixels = true;
		if(parentDom == null) window.document.body.appendChild(this.renderer.view); else parentDom.appendChild(this.renderer.view);
		this.resumeRendering();
	}
	,pauseRendering: function() {
		window.onresize = null;
		if(this._animationFrameId != null) {
			window.cancelAnimationFrame(this._animationFrameId);
			this._animationFrameId = null;
		}
	}
	,resumeRendering: function() {
		if(this.autoResize) window.onresize = $bind(this,this._onWindowResize);
		if(this._animationFrameId == null) this._animationFrameId = window.requestAnimationFrame($bind(this,this._onRequestAnimationFrame));
	}
	,_onWindowResize: function(event) {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.renderer.resize(this.width,this.height);
		this.canvas.style.width = this.width + "px";
		this.canvas.style.height = this.height + "px";
		if(this.onResize != null) this.onResize();
	}
	,_onRequestAnimationFrame: function(elapsedTime) {
		this._frameCount++;
		if(this._frameCount == (60 / this.fps | 0)) {
			this._frameCount = 0;
			if(this.onUpdate != null) this.onUpdate(elapsedTime);
			this.renderer.render(this.stage);
		}
		this._animationFrameId = window.requestAnimationFrame($bind(this,this._onRequestAnimationFrame));
	}
	,addStats: function() {
		if(window.Perf != null) new Perf().addInfo(["UNKNOWN","WEBGL","CANVAS"][this.renderer.type] + " - " + this.pixelRatio);
	}
	,__class__: pixi_plugins_app_Application
	,__properties__: {set_fps:"set_fps",set_skipFrame:"set_skipFrame"}
};
var vega_shell_ApplicationMatchSize = function() {
	this._debugCtrLine = 0;
	this._debugClsBt = null;
	this._debugSwitchBt = null;
	this._debugContainer = null;
	this._EXT_HEIGHT = 720;
	this._EXT_WIDTH = 1136;
	this._MIN_HEIGHT = 640;
	this._MIN_WIDTH = 960;
	this.isFPSForced = false;
	this.tmpFPS = -1;
	this.debugFontSize = 25;
	this.debugMotifs = null;
	this.debugLvl = "WARNING";
	this.debug = false;
	pixi_plugins_app_Application.call(this);
	vega_shell_ApplicationMatchSize.instance = this;
	this.vars = { };
	this.init();
};
vega_shell_ApplicationMatchSize.__name__ = true;
vega_shell_ApplicationMatchSize.__super__ = pixi_plugins_app_Application;
vega_shell_ApplicationMatchSize.prototype = $extend(pixi_plugins_app_Application.prototype,{
	getHit: function() {
		return this._hit;
	}
	,getContent: function() {
		return this._content;
	}
	,traceDebug: function(pTxt,pForce) {
		if(pForce == null) pForce = false;
		var lTxt;
		var lMax;
		console.log(pTxt);
		if(this.debug) {
			if(!(pForce || this.detectDebugMotifIn(pTxt))) {
				if(this.debugLvl == "INFO") {
					if(pTxt.indexOf("INFO") == -1 && pTxt.indexOf("WARNING") == -1 && pTxt.indexOf("ERROR") == -1) return;
				} else if(this.debugLvl == "WARNING") {
					if(pTxt.indexOf("WARNING") == -1 && pTxt.indexOf("ERROR") == -1) return;
				} else if(this.debugLvl == "ERROR") {
					if(pTxt.indexOf("ERROR") == -1) return;
				}
			}
			if(this._debugContainer == null) {
				this._debugContainer = this._container.addChild(new PIXI.Container());
				this._debugContainer.x = this._screenRect.x;
				this._debugContainer.y = this._screenRect.y;
				this._debugContainer.visible = false;
				this._debugContainer.interactiveChildren = false;
				this._debugSwitchBt = this._container.addChild(new PIXI.Container());
				this._debugSwitchBt.addChild(new PIXI.Graphics());
				(js_Boot.__cast(this._debugSwitchBt.getChildAt(0) , PIXI.Graphics)).beginFill(0,0);
				(js_Boot.__cast(this._debugSwitchBt.getChildAt(0) , PIXI.Graphics)).drawRect(0,0,25,25);
				(js_Boot.__cast(this._debugSwitchBt.getChildAt(0) , PIXI.Graphics)).endFill();
				this._debugSwitchBt.x = this._screenRect.x;
				this._debugSwitchBt.y = this._screenRect.y;
				vega_utils_UtilsPixi.setQuickBt(this._debugSwitchBt,$bind(this,this.onBtSwitchTrace));
				this._debugClsBt = this._container.addChild(new PIXI.Container());
				this._debugClsBt.addChild(new PIXI.Graphics());
				(js_Boot.__cast(this._debugClsBt.getChildAt(0) , PIXI.Graphics)).beginFill(0,0);
				(js_Boot.__cast(this._debugClsBt.getChildAt(0) , PIXI.Graphics)).drawRect(0,-25,25,25);
				(js_Boot.__cast(this._debugClsBt.getChildAt(0) , PIXI.Graphics)).endFill();
				this._debugClsBt.x = this._screenRect.x;
				this._debugClsBt.y = this._screenRect.y + this._screenRect.height;
				vega_utils_UtilsPixi.setQuickBt(this._debugClsBt,$bind(this,this.onBtClsTrace));
			}
			lTxt = new PIXI.Text(pTxt,{ 'font' : this.debugFontSize + "px Arial", 'fill' : "#444444"});
			this._debugContainer.addChild(lTxt);
			this._debugCtrLine++;
			lTxt.y = -(this._debugCtrLine - 1) * this.debugFontSize;
			this._debugContainer.y = this._screenRect.y + (this._debugCtrLine - 1) * this.debugFontSize;
			while(this._debugContainer.children.length > Math.ceil(this._EXT_HEIGHT / this.debugFontSize)) this._debugContainer.removeChildAt(0).destroy();
		}
	}
	,onBtSwitchTrace: function(pE) {
		this._debugContainer.visible = !this._debugContainer.visible;
	}
	,onBtClsTrace: function(pE) {
		this._debugCtrLine = 0;
		while(this._debugContainer.children.length > 0) this._debugContainer.removeChildAt(0).destroy();
	}
	,detectDebugMotifIn: function(pTxt) {
		var lMot;
		if(this.debugMotifs != null && this.debugMotifs.length > 0) {
			var _g = 0;
			var _g1 = this.debugMotifs;
			while(_g < _g1.length) {
				var lMot1 = _g1[_g];
				++_g;
				if(pTxt.indexOf(lMot1) != -1) return true;
			}
		}
		return false;
	}
	,getScreenRectExt: function() {
		return new PIXI.Rectangle(-this._EXT_WIDTH / 2,-this._EXT_HEIGHT / 2,this._EXT_WIDTH,this._EXT_HEIGHT);
	}
	,getScreenRectMin: function() {
		return new PIXI.Rectangle(-this._MIN_WIDTH / 2,-this._MIN_HEIGHT / 2,this._MIN_WIDTH,this._MIN_HEIGHT);
	}
	,getScreenRect: function() {
		return this._screenRect;
	}
	,setFPS: function(pFPS) {
		this.tmpFPS = pFPS;
		if(!this.isFPSForced) this.set_fps(pFPS);
	}
	,restaureFPS: function() {
		this.isFPSForced = false;
		this.set_fps(this.tmpFPS);
	}
	,forceFPS: function(pFPS) {
		this.isFPSForced = true;
		this.set_fps(pFPS);
	}
	,reload: function() {
		var lId;
		if(typeof(window) != "undefined") {
			try {
				this.traceDebug("WARNING : ApplicationMatchSize::reload");
				var _g = 0;
				var _g1 = Reflect.fields(PIXI.utils.TextureCache);
				while(_g < _g1.length) {
					var lId1 = _g1[_g];
					++_g;
					Reflect.field(PIXI.utils.TextureCache,lId1).destroy(true);
				}
			} catch( pE ) {
				if (pE instanceof js__$Boot_HaxeError) pE = pE.val;
				this.traceDebug("ERROR : ApplicationMatchSize::reload : clear textures failure");
			}
			window.document.location.reload(true);
			return true;
		} else {
			this.traceDebug("ERROR : ApplicationMatchSize::reload : no browser, fail");
			return false;
		}
	}
	,refreshRender: function() {
		this.renderer.resize(1,1);
		this._onWindowResize(null);
	}
	,init: function() {
		var lVars;
		var lKV;
		var lI;
		var lGraph;
		if(typeof(window) != "undefined") {
			lVars = window.location.search.substring(1).split("&");
			var _g = 0;
			while(_g < lVars.length) {
				var lI1 = lVars[_g];
				++_g;
				lKV = lI1.split("=");
				this.vars[lKV[0]] = lKV[1];
			}
		}
		this.backgroundColor = 0;
		this.start();
		this._hit = this.stage.addChild(new PIXI.Container());
		lGraph = this._hit.addChild(new PIXI.Graphics());
		lGraph.beginFill(0,0);
		lGraph.drawRect(-100,-100,200,200);
		lGraph.endFill();
		this._hit.interactive = true;
		this._container = new PIXI.Container();
		this.stage.addChild(this._container);
		this._bg = new PIXI.Graphics();
		this._bg.beginFill(this.getBGColor());
		this._bg.drawRect(-this._EXT_WIDTH / 2,-this._EXT_HEIGHT / 2,this._EXT_WIDTH,this._EXT_HEIGHT);
		this._bg.endFill();
		this._container.addChild(this._bg);
		this._content = new PIXI.Container();
		this._container.addChild(this._content);
		this.onResize = $bind(this,this.updateSize);
		this.updateSize();
	}
	,getBGColor: function() {
		return 16777215;
	}
	,updateSize: function() {
		var lNewW = this.width;
		var lNewH = lNewW * this._MIN_HEIGHT / this._MIN_WIDTH;
		if(lNewH > this.height) {
			lNewW = this.height * this._MIN_WIDTH / this._MIN_HEIGHT;
			lNewH = this.height;
		}
		this._baseScale = lNewW / this._MIN_WIDTH;
		this._container.scale.x = this._baseScale;
		this._container.scale.y = this._baseScale;
		this._container.x = this.width / 2;
		this._container.y = this.height / 2;
		this._hit.scale.x = this._baseScale;
		this._hit.scale.y = this._baseScale;
		this._hit.x = this.width / 2;
		this._hit.y = this.height / 2;
		(js_Boot.__cast(this._hit.getChildAt(0) , PIXI.Graphics)).width = this.width / this._baseScale;
		(js_Boot.__cast(this._hit.getChildAt(0) , PIXI.Graphics)).height = this.height / this._baseScale;
		lNewW = Math.min(this.width / this._baseScale,this._EXT_WIDTH);
		lNewH = Math.min(this.height / this._baseScale,this._EXT_HEIGHT);
		this._screenRect = new PIXI.Rectangle(-lNewW / 2,-lNewH / 2,lNewW,lNewH);
		if(this._scrMsk == null) {
			this._scrMsk = new PIXI.Graphics();
			this._scrMsk.beginFill(255);
			this._scrMsk.drawRect(-this._EXT_WIDTH / 2,-this._EXT_HEIGHT / 2,this._EXT_WIDTH,this._EXT_HEIGHT);
			this._scrMsk.endFill();
			this._container.addChildAt(this._scrMsk,0);
			this._container.mask = this._scrMsk;
		}
		if(this._debugContainer != null) {
			this._debugContainer.x = this._screenRect.x;
			this._debugContainer.y = this._screenRect.y + (this._debugCtrLine - 1) * this.debugFontSize;
			this._debugSwitchBt.x = this._screenRect.x;
			this._debugSwitchBt.y = this._screenRect.y;
			this._debugClsBt.x = this._screenRect.x;
			this._debugClsBt.y = this._screenRect.y + this._screenRect.height;
		}
		vega_shell_ResizeBroadcaster.getInstance().broadcastResize();
	}
	,__class__: vega_shell_ApplicationMatchSize
});
var Main = function() {
	vega_shell_ApplicationMatchSize.call(this);
	this.debug = true;
	this.setFPS(60);
	this.version = "0";
	this.traceDebug(this.version,true);
	vega_sound_SndMgr.getInstance(.5);
	new vega_shell_GlobalPointer();
	vega_shell_VegaFramer.getInstance().addIterator($bind(this,this.startShell));
	vega_shell_VegaDeactivator.getInstance();
};
Main.__name__ = true;
Main.main = function() {
	new Main();
};
Main.__super__ = vega_shell_ApplicationMatchSize;
Main.prototype = $extend(vega_shell_ApplicationMatchSize.prototype,{
	startShell: function(pDT) {
		vega_shell_VegaFramer.getInstance().remIterator($bind(this,this.startShell));
		this.shell = new labo_shell_MyShell();
		this.shell.init(this.getContent(),new vega_loader_file_MyFile("assets.json",null,"NO-CACHE"),new vega_loader_file_MyFile("local.xml",null,"NO-CACHE"),{ 'Comfortaa-Light' : new vega_loader_file_MyFile("comfortaa_light.css",null,"NO-VERSION")});
	}
	,__class__: Main
});
Math.__name__ = true;
var Perf = $hx_exports.Perf = function(pos,offset) {
	if(offset == null) offset = 0;
	if(pos == null) pos = "TR";
	this._perfObj = window.performance;
	if(Reflect.field(this._perfObj,"memory") != null) this._memoryObj = Reflect.field(this._perfObj,"memory");
	this._memCheck = this._perfObj != null && this._memoryObj != null && this._memoryObj.totalJSHeapSize > 0;
	this._pos = pos;
	this._offset = offset;
	this.currentFps = 60;
	this.currentMs = 0;
	this.currentMem = "0";
	this.lowFps = 60;
	this.avgFps = 60;
	this._measureCount = 0;
	this._totalFps = 0;
	this._time = 0;
	this._ticks = 0;
	this._fpsMin = 60;
	this._fpsMax = 60;
	if(this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null) this._startTime = this._perfObj.now(); else this._startTime = new Date().getTime();
	this._prevTime = -Perf.MEASUREMENT_INTERVAL;
	this._createFpsDom();
	this._createMsDom();
	if(this._memCheck) this._createMemoryDom();
	if(($_=window,$bind($_,$_.requestAnimationFrame)) != null) this.RAF = ($_=window,$bind($_,$_.requestAnimationFrame)); else if(window.mozRequestAnimationFrame != null) this.RAF = window.mozRequestAnimationFrame; else if(window.webkitRequestAnimationFrame != null) this.RAF = window.webkitRequestAnimationFrame; else if(window.msRequestAnimationFrame != null) this.RAF = window.msRequestAnimationFrame;
	if(($_=window,$bind($_,$_.cancelAnimationFrame)) != null) this.CAF = ($_=window,$bind($_,$_.cancelAnimationFrame)); else if(window.mozCancelAnimationFrame != null) this.CAF = window.mozCancelAnimationFrame; else if(window.webkitCancelAnimationFrame != null) this.CAF = window.webkitCancelAnimationFrame; else if(window.msCancelAnimationFrame != null) this.CAF = window.msCancelAnimationFrame;
	if(this.RAF != null) this._raf = Reflect.callMethod(window,this.RAF,[$bind(this,this._tick)]);
};
Perf.__name__ = true;
Perf.prototype = {
	_init: function() {
		this.currentFps = 60;
		this.currentMs = 0;
		this.currentMem = "0";
		this.lowFps = 60;
		this.avgFps = 60;
		this._measureCount = 0;
		this._totalFps = 0;
		this._time = 0;
		this._ticks = 0;
		this._fpsMin = 60;
		this._fpsMax = 60;
		if(this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null) this._startTime = this._perfObj.now(); else this._startTime = new Date().getTime();
		this._prevTime = -Perf.MEASUREMENT_INTERVAL;
	}
	,_now: function() {
		if(this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null) return this._perfObj.now(); else return new Date().getTime();
	}
	,_tick: function(val) {
		var time;
		if(this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null) time = this._perfObj.now(); else time = new Date().getTime();
		this._ticks++;
		if(this._raf != null && time > this._prevTime + Perf.MEASUREMENT_INTERVAL) {
			this.currentMs = Math.round(time - this._startTime);
			this.ms.innerHTML = "MS: " + this.currentMs;
			this.currentFps = Math.round(this._ticks * 1000 / (time - this._prevTime));
			if(this.currentFps > 0 && val > Perf.DELAY_TIME) {
				this._measureCount++;
				this._totalFps += this.currentFps;
				this.lowFps = this._fpsMin = Math.min(this._fpsMin,this.currentFps);
				this._fpsMax = Math.max(this._fpsMax,this.currentFps);
				this.avgFps = Math.round(this._totalFps / this._measureCount);
			}
			this.fps.innerHTML = "FPS: " + this.currentFps + " (" + this._fpsMin + "-" + this._fpsMax + ")";
			if(this.currentFps >= 30) this.fps.style.backgroundColor = Perf.FPS_BG_CLR; else if(this.currentFps >= 15) this.fps.style.backgroundColor = Perf.FPS_WARN_BG_CLR; else this.fps.style.backgroundColor = Perf.FPS_PROB_BG_CLR;
			this._prevTime = time;
			this._ticks = 0;
			if(this._memCheck) {
				this.currentMem = this._getFormattedSize(this._memoryObj.usedJSHeapSize,2);
				this.memory.innerHTML = "MEM: " + this.currentMem;
			}
		}
		this._startTime = time;
		if(this._raf != null) this._raf = Reflect.callMethod(window,this.RAF,[$bind(this,this._tick)]);
	}
	,_createDiv: function(id,top) {
		if(top == null) top = 0;
		var div;
		var _this = window.document;
		div = _this.createElement("div");
		div.id = id;
		div.className = id;
		div.style.position = "absolute";
		var _g = this._pos;
		switch(_g) {
		case "TL":
			div.style.left = this._offset + "px";
			div.style.top = top + "px";
			break;
		case "TR":
			div.style.right = this._offset + "px";
			div.style.top = top + "px";
			break;
		case "BL":
			div.style.left = this._offset + "px";
			div.style.bottom = (this._memCheck?48:32) - top + "px";
			break;
		case "BR":
			div.style.right = this._offset + "px";
			div.style.bottom = (this._memCheck?48:32) - top + "px";
			break;
		}
		div.style.width = "80px";
		div.style.height = "12px";
		div.style.lineHeight = "12px";
		div.style.padding = "2px";
		div.style.fontFamily = Perf.FONT_FAMILY;
		div.style.fontSize = "9px";
		div.style.fontWeight = "bold";
		div.style.textAlign = "center";
		window.document.body.appendChild(div);
		return div;
	}
	,_createFpsDom: function() {
		this.fps = this._createDiv("fps");
		this.fps.style.backgroundColor = Perf.FPS_BG_CLR;
		this.fps.style.zIndex = "995";
		this.fps.style.color = Perf.FPS_TXT_CLR;
		this.fps.innerHTML = "FPS: 0";
	}
	,_createMsDom: function() {
		this.ms = this._createDiv("ms",16);
		this.ms.style.backgroundColor = Perf.MS_BG_CLR;
		this.ms.style.zIndex = "996";
		this.ms.style.color = Perf.MS_TXT_CLR;
		this.ms.innerHTML = "MS: 0";
	}
	,_createMemoryDom: function() {
		this.memory = this._createDiv("memory",32);
		this.memory.style.backgroundColor = Perf.MEM_BG_CLR;
		this.memory.style.color = Perf.MEM_TXT_CLR;
		this.memory.style.zIndex = "997";
		this.memory.innerHTML = "MEM: 0";
	}
	,_getFormattedSize: function(bytes,frac) {
		if(frac == null) frac = 0;
		var sizes = ["Bytes","KB","MB","GB","TB"];
		if(bytes == 0) return "0";
		var precision = Math.pow(10,frac);
		var i = Math.floor(Math.log(bytes) / Math.log(1024));
		return Math.round(bytes * precision / Math.pow(1024,i)) / precision + " " + sizes[i];
	}
	,addInfo: function(val) {
		this.info = this._createDiv("info",this._memCheck?48:32);
		this.info.style.backgroundColor = Perf.INFO_BG_CLR;
		this.info.style.color = Perf.INFO_TXT_CLR;
		this.info.style.zIndex = "998";
		this.info.innerHTML = val;
	}
	,clearInfo: function() {
		if(this.info != null) {
			window.document.body.removeChild(this.info);
			this.info = null;
		}
	}
	,destroy: function() {
		Reflect.callMethod(window,this.CAF,[this._raf]);
		this._raf = null;
		this._perfObj = null;
		this._memoryObj = null;
		if(this.fps != null) {
			window.document.body.removeChild(this.fps);
			this.fps = null;
		}
		if(this.ms != null) {
			window.document.body.removeChild(this.ms);
			this.ms = null;
		}
		if(this.memory != null) {
			window.document.body.removeChild(this.memory);
			this.memory = null;
		}
		this.clearInfo();
		this.currentFps = 60;
		this.currentMs = 0;
		this.currentMem = "0";
		this.lowFps = 60;
		this.avgFps = 60;
		this._measureCount = 0;
		this._totalFps = 0;
		this._time = 0;
		this._ticks = 0;
		this._fpsMin = 60;
		this._fpsMax = 60;
		if(this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null) this._startTime = this._perfObj.now(); else this._startTime = new Date().getTime();
		this._prevTime = -Perf.MEASUREMENT_INTERVAL;
	}
	,_cancelRAF: function() {
		Reflect.callMethod(window,this.CAF,[this._raf]);
		this._raf = null;
	}
	,__class__: Perf
};
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var Type = function() { };
Type.__name__ = true;
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
var _$UInt_UInt_$Impl_$ = {};
_$UInt_UInt_$Impl_$.__name__ = true;
_$UInt_UInt_$Impl_$.gt = function(a,b) {
	var aNeg = a < 0;
	var bNeg = b < 0;
	if(aNeg != bNeg) return aNeg; else return a > b;
};
_$UInt_UInt_$Impl_$.gte = function(a,b) {
	var aNeg = a < 0;
	var bNeg = b < 0;
	if(aNeg != bNeg) return aNeg; else return a >= b;
};
_$UInt_UInt_$Impl_$.toFloat = function(this1) {
	var $int = this1;
	if($int < 0) return 4294967296.0 + $int; else return $int + 0.0;
};
var flump_DisplayObjectKey = function(symbolId) {
	this.symbolId = symbolId;
};
flump_DisplayObjectKey.__name__ = true;
flump_DisplayObjectKey.prototype = {
	__class__: flump_DisplayObjectKey
};
var flump_IFlumpMovie = function() { };
flump_IFlumpMovie.__name__ = true;
flump_IFlumpMovie.prototype = {
	__class__: flump_IFlumpMovie
};
var flump_MoviePlayer = function(symbol,movie,resolution) {
	this.position = 0.0;
	this.fullyGenerated = false;
	this.dirty = false;
	this.changed = 0;
	this.labelsToFire = [];
	this.childPlayers = new haxe_ds_ObjectMap();
	this.createdChildren = new haxe_ds_ObjectMap();
	this.currentChildrenKey = new haxe_ds_ObjectMap();
	this.STATE_STOPPED = "stopped";
	this.STATE_LOOPING = "looping";
	this.STATE_PLAYING = "playing";
	this.independantControl = true;
	this.independantTimeline = true;
	this.advanced = 0.0;
	this.previousElapsed = 0.0;
	this.elapsed = 0.0;
	this.symbol = symbol;
	this.movie = movie;
	this.resolution = resolution;
	var _g = 0;
	var _g1 = symbol.layers;
	while(_g < _g1.length) {
		var layer = _g1[_g];
		++_g;
		movie.createLayer(layer);
	}
	this.state = this.STATE_LOOPING;
	this.advanceTime(0);
	var _g2 = 0;
	var _g11 = symbol.layers;
	while(_g2 < _g11.length) {
		var layer1 = _g11[_g2];
		++_g2;
		movie.setMask(layer1);
	}
};
flump_MoviePlayer.__name__ = true;
flump_MoviePlayer.prototype = {
	get_labels: function() {
		return this.symbol.labels.iterator();
	}
	,getDisplayKey: function(layerId,keyframeIndex) {
		if(keyframeIndex == null) keyframeIndex = 0;
		var layer = this.symbol.getLayer(layerId);
		if(layer == null) throw new js__$Boot_HaxeError("Layer " + layerId + " does not exist.");
		var keyframe = layer.getKeyframeForFrame(keyframeIndex);
		if(keyframe == null) throw new js__$Boot_HaxeError("Keyframe does not exist at index " + Std.string(_$UInt_UInt_$Impl_$.toFloat(keyframeIndex)));
		this.createChildIfNessessary(keyframe);
		return keyframe.displayKey;
	}
	,reset: function() {
		this.elapsed = 0;
		this.previousElapsed = 0;
	}
	,get_position: function() {
		return (this.elapsed % this.symbol.duration + this.symbol.duration) % this.symbol.duration;
	}
	,get_totalFrames: function() {
		return this.symbol.totalFrames;
	}
	,play: function() {
		this.setState(this.STATE_PLAYING);
		return this;
	}
	,loop: function() {
		this.setState(this.STATE_LOOPING);
		return this;
	}
	,stop: function() {
		this.setState(this.STATE_STOPPED);
		return this;
	}
	,goToLabel: function(label) {
		if(!this.labelExists(label)) throw new js__$Boot_HaxeError("Symbol " + this.symbol.name + " does not have label " + label + ".");
		this.set_currentFrame(this.getLabelFrame(label));
		this.fireHitFrames(this.getLabelFrame(label));
		return this;
	}
	,goToFrame: function(frame) {
		this.set_currentFrame(frame);
		this.fireHitFrames(frame);
		return this;
	}
	,fireHitFrames: function(frame) {
		this.changed++;
		var current = this.changed;
		var time = frame * this.symbol.library.frameTime;
		var _g = 0;
		var _g1 = this.symbol.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = layer.keyframes;
			while(_g2 < _g3.length) {
				var kf = _g3[_g2];
				++_g2;
				if(current != this.changed) return;
				if(kf.label != null) {
					if(kf.timeInside(time)) this.movie.labelHit(kf.label);
				}
			}
		}
	}
	,goToPosition: function(time) {
		this.elapsed = time;
		this.previousElapsed = time;
		this.clearLabels();
		return this;
	}
	,get_playing: function() {
		return this.state == this.STATE_PLAYING;
	}
	,get_looping: function() {
		return this.state == this.STATE_LOOPING;
	}
	,get_stopped: function() {
		return this.state == this.STATE_STOPPED;
	}
	,getLabelFrame: function(label) {
		if(!this.labelExists(label)) throw new js__$Boot_HaxeError("Symbol " + this.symbol.name + " does not have label " + label + ".");
		return this.symbol.labels.get(label).keyframe.index;
	}
	,get_currentFrame: function() {
		return Std["int"](this.get_position() / this.symbol.library.frameTime);
	}
	,set_currentFrame: function(value) {
		this.goToPosition(this.symbol.library.frameTime * value);
		return value;
	}
	,labelExists: function(label) {
		return this.symbol.labels.exists(label);
	}
	,advanceTime: function(ms) {
		if(this.state != this.STATE_STOPPED) {
			this.elapsed += ms;
			while(this.elapsed < 0) {
				this.elapsed += this.symbol.duration;
				this.previousElapsed += this.symbol.duration;
			}
		}
		this.advanced += ms;
		if(this.state != this.STATE_STOPPED) this.fireLabels();
		this.render();
	}
	,clearLabels: function() {
		while(this.labelsToFire.length > 0) this.labelsToFire.pop();
	}
	,fireLabels: function() {
		if(this.symbol.firstLabel == null) return;
		if(this.previousElapsed > this.elapsed) return;
		var label;
		if(this.previousElapsed <= this.elapsed) label = this.symbol.firstLabel; else label = this.symbol.lastLabel;
		var checking = true;
		while(checking) if(label.keyframe.time > this.previousElapsed % this.symbol.duration) checking = false; else if(_$UInt_UInt_$Impl_$.gte(label.keyframe.index,label.next.keyframe.index)) {
			checking = false;
			label = label.next;
		} else label = label.next;
		var firstChecked = label;
		while(label != null) {
			var checkFrom = this.previousElapsed % this.symbol.duration;
			var checkTo = this.elapsed % this.symbol.duration;
			if(label.keyframe.insideRangeStart(checkFrom,checkTo) && this.state != this.STATE_STOPPED) this.labelsToFire.push(label);
			label = label.next;
			if(label == firstChecked) label = null;
		}
		while(this.labelsToFire.length > 0) {
			var label1 = this.labelsToFire.shift();
			this.movie.labelPassed(label1);
		}
	}
	,render: function() {
		if(this.state == this.STATE_PLAYING) {
			if(this.get_position() < 0) {
				this.elapsed = 0;
				this.stop();
				this.movie.onAnimationComplete();
			} else if(this.get_position() >= this.symbol.duration - this.symbol.library.frameTime) {
				this.elapsed = this.symbol.duration - this.symbol.library.frameTime;
				this.stop();
				this.movie.onAnimationComplete();
			}
		}
		while(this.get_position() < 0) this.position += this.symbol.duration;
		var _g = 0;
		var _g1 = this.symbol.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			var keyframe = layer.getKeyframeForTime(this.get_position());
			if(keyframe.isEmpty == true) this.removeChildIfNessessary(keyframe); else if(keyframe.isEmpty == false) {
				var interped = this.getInterpolation(keyframe,this.get_position());
				var next = keyframe.next;
				if(next.isEmpty) next = keyframe;
				var lColor;
				if(keyframe.tint != next.tint) {
					var lPrevR = keyframe.tint >> 16 & 255;
					var lPrevG = keyframe.tint >> 8 & 255;
					var lPrevB = keyframe.tint & 255;
					var lNextR = next.tint >> 16 & 255;
					var lNextG = next.tint >> 8 & 255;
					var lNextB = next.tint & 255;
					lColor = Math.round(lPrevR + (lNextR - lPrevR) * interped) << 16 | Math.round(lPrevG + (lNextG - lPrevG) * interped) << 8 | Math.round(lPrevB + (lNextB - lPrevB) * interped);
				} else lColor = keyframe.tint;
				if(this.currentChildrenKey.h[layer.__id__] != keyframe.displayKey) {
					this.createChildIfNessessary(keyframe);
					this.removeChildIfNessessary(keyframe);
					this.addChildIfNessessary(keyframe);
				}
				if(js_Boot.__instanceof(keyframe.symbol,flump_library_MovieSymbol)) {
					var childMovie = this.movie.getChildPlayer(keyframe);
					if(childMovie.independantTimeline) {
						childMovie.advanceTime(this.advanced);
						childMovie.render();
					} else {
						childMovie.elapsed = this.get_position();
						childMovie.render();
					}
				}
				this.movie.renderFrame(keyframe,keyframe.location.x + (next.location.x - keyframe.location.x) * interped,keyframe.location.y + (next.location.y - keyframe.location.y) * interped,keyframe.scale.x + (next.scale.x - keyframe.scale.x) * interped,keyframe.scale.y + (next.scale.y - keyframe.scale.y) * interped,keyframe.skew.x + (next.skew.x - keyframe.skew.x) * interped,keyframe.skew.y + (next.skew.y - keyframe.skew.y) * interped,keyframe.alpha + (next.alpha - keyframe.alpha) * interped,lColor);
			}
		}
		this.advanced = 0;
		this.previousElapsed = this.elapsed;
	}
	,createChildIfNessessary: function(keyframe) {
		if(keyframe.isEmpty) return;
		if(this.createdChildren.h.__keys__[keyframe.displayKey.__id__] != null == false) {
			this.movie.createFlumpChild(keyframe.displayKey);
			{
				this.createdChildren.set(keyframe.displayKey,true);
				true;
			}
		}
	}
	,removeChildIfNessessary: function(keyframe) {
		if(this.currentChildrenKey.h.__keys__[keyframe.layer.__id__] != null) {
			this.movie.removeFlumpChild(keyframe.layer,keyframe.displayKey);
			this.currentChildrenKey.remove(keyframe.layer);
		}
	}
	,addChildIfNessessary: function(keyframe) {
		if(keyframe.isEmpty) return;
		var v = keyframe.displayKey;
		this.currentChildrenKey.set(keyframe.layer,v);
		v;
		this.movie.addFlumpChild(keyframe.layer,keyframe.displayKey);
	}
	,setState: function(state) {
		this.state = state;
		var _g = 0;
		var _g1 = this.symbol.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			var keyframe = layer.getKeyframeForTime(this.get_position());
			this.createChildIfNessessary(keyframe);
			if(js_Boot.__instanceof(keyframe.symbol,flump_library_MovieSymbol)) {
				var childMovie = this.movie.getChildPlayer(keyframe);
				if(childMovie.independantControl == false) childMovie.setState(state);
			}
		}
		this.advanceTime(0);
	}
	,timeForLabel: function(label) {
		return this.symbol.labels.get(label).keyframe.time;
	}
	,getInterpolation: function(keyframe,time) {
		if(keyframe.tweened == false) return 0.0;
		var interped = (time - keyframe.time) / keyframe.duration;
		var ease = keyframe.ease;
		if(ease != 0) {
			var t;
			if(ease < 0) {
				var inv = 1 - interped;
				t = 1 - inv * inv;
				ease = -ease;
			} else t = interped * interped;
			interped = ease * t + (1 - ease) * interped;
		}
		return interped;
	}
	,__class__: flump_MoviePlayer
	,__properties__: {set_currentFrame:"set_currentFrame",get_currentFrame:"get_currentFrame",get_stopped:"get_stopped",get_looping:"get_looping",get_playing:"get_playing",get_totalFrames:"get_totalFrames",get_position:"get_position",get_labels:"get_labels"}
};
var flump_json__$FlumpJSON_FlumpPointSpec_$Impl_$ = {};
flump_json__$FlumpJSON_FlumpPointSpec_$Impl_$.__name__ = true;
flump_json__$FlumpJSON_FlumpPointSpec_$Impl_$.__properties__ = {get_y:"get_y",get_x:"get_x"}
flump_json__$FlumpJSON_FlumpPointSpec_$Impl_$.get_x = function(this1) {
	return this1[0];
};
flump_json__$FlumpJSON_FlumpPointSpec_$Impl_$.get_y = function(this1) {
	return this1[1];
};
var flump_json__$FlumpJSON_FlumpRectSpec_$Impl_$ = {};
flump_json__$FlumpJSON_FlumpRectSpec_$Impl_$.__name__ = true;
flump_json__$FlumpJSON_FlumpRectSpec_$Impl_$.__properties__ = {get_height:"get_height",get_width:"get_width",get_y:"get_y",get_x:"get_x"}
flump_json__$FlumpJSON_FlumpRectSpec_$Impl_$.get_x = function(this1) {
	return this1[0];
};
flump_json__$FlumpJSON_FlumpRectSpec_$Impl_$.get_y = function(this1) {
	return this1[1];
};
flump_json__$FlumpJSON_FlumpRectSpec_$Impl_$.get_width = function(this1) {
	return this1[2];
};
flump_json__$FlumpJSON_FlumpRectSpec_$Impl_$.get_height = function(this1) {
	return this1[3];
};
var flump_library_FlumpLibrary = function(resolution) {
	this.atlases = [];
	this.sprites = new haxe_ds_StringMap();
	this.movies = new haxe_ds_StringMap();
	this.resolution = resolution;
};
flump_library_FlumpLibrary.__name__ = true;
flump_library_FlumpLibrary.create = function(flumpData,resolution) {
	var lib = flumpData;
	var spriteSymbols = new haxe_ds_StringMap();
	var movieSymbols = new haxe_ds_StringMap();
	var flumpLibrary = new flump_library_FlumpLibrary(resolution);
	flumpLibrary.sprites = spriteSymbols;
	flumpLibrary.movies = movieSymbols;
	flumpLibrary.framerate = _$UInt_UInt_$Impl_$.toFloat(lib.frameRate);
	flumpLibrary.frameTime = 1000 / flumpLibrary.framerate;
	flumpLibrary.md5 = lib.md5;
	var atlasSpecs = [];
	var textureGroup = null;
	var _g = 0;
	var _g1 = lib.textureGroups;
	while(_g < _g1.length) {
		var tg = _g1[_g];
		++_g;
		if(_$UInt_UInt_$Impl_$.toFloat(tg.scaleFactor) >= resolution && textureGroup == null) textureGroup = tg;
	}
	if(textureGroup == null) textureGroup = lib.textureGroups[lib.textureGroups.length - 1];
	var _g2 = 0;
	var _g11 = textureGroup.atlases;
	while(_g2 < _g11.length) {
		var atlas = _g11[_g2];
		++_g2;
		flumpLibrary.atlases.push(atlas);
		atlasSpecs.push(atlas);
	}
	var _g3 = 0;
	while(_g3 < atlasSpecs.length) {
		var spec = atlasSpecs[_g3];
		++_g3;
		var _g12 = 0;
		var _g21 = spec.textures;
		while(_g12 < _g21.length) {
			var textureSpec = _g21[_g12];
			++_g12;
			var frame = new flump_library_Rectangle(textureSpec.rect[0],textureSpec.rect[1],textureSpec.rect[2],textureSpec.rect[3]);
			var origin = new flump_library_Point(textureSpec.origin[0],textureSpec.origin[1]);
			var symbol = new flump_library_SpriteSymbol();
			symbol.name = textureSpec.symbol;
			symbol.data = textureSpec.data;
			symbol.origin = origin;
			symbol.texture = textureSpec.symbol;
			{
				spriteSymbols.set(symbol.name,symbol);
				symbol;
			}
		}
	}
	var pendingSymbolAttachments = new haxe_ds_ObjectMap();
	var _g4 = 0;
	var _g13 = lib.movies;
	while(_g4 < _g13.length) {
		var movieSpec = _g13[_g4];
		++_g4;
		var symbol1 = new flump_library_MovieSymbol();
		symbol1.name = movieSpec.id;
		symbol1.data = movieSpec.data;
		symbol1.library = flumpLibrary;
		var _g22 = 0;
		var _g31 = movieSpec.layers;
		while(_g22 < _g31.length) {
			var layerSpec = _g31[_g22];
			++_g22;
			var layer1 = new flump_library_Layer(layerSpec.name);
			layer1.movie = symbol1;
			layer1.mask = layerSpec.mask;
			var layerDuration = 0;
			var previousKeyframe = null;
			var _g41 = 0;
			var _g5 = layerSpec.keyframes;
			while(_g41 < _g5.length) {
				var keyframeSpec = _g5[_g41];
				++_g41;
				var keyframe1 = new flump_library_Keyframe();
				keyframe1.prev = previousKeyframe;
				if(previousKeyframe != null) previousKeyframe.next = keyframe1;
				keyframe1.layer = layer1;
				keyframe1.numFrames = keyframeSpec.duration;
				keyframe1.duration = _$UInt_UInt_$Impl_$.toFloat(keyframeSpec.duration) * flumpLibrary.frameTime;
				keyframe1.index = keyframeSpec.index;
				var time = _$UInt_UInt_$Impl_$.toFloat(keyframe1.index) * flumpLibrary.frameTime;
				time *= 10;
				time = Math.floor(time);
				time /= 10;
				keyframe1.time = time;
				if(keyframeSpec.ref == null) keyframe1.isEmpty = true; else {
					keyframe1.isEmpty = false;
					keyframe1.symbolId = keyframeSpec.ref;
					if(keyframeSpec.pivot == null) keyframe1.pivot = new flump_library_Point(0,0); else keyframe1.pivot = new flump_library_Point(keyframeSpec.pivot[0] * resolution,keyframeSpec.pivot[1] * resolution);
					if(keyframeSpec.loc == null) keyframe1.location = new flump_library_Point(0,0); else keyframe1.location = new flump_library_Point(keyframeSpec.loc[0] * resolution,keyframeSpec.loc[1] * resolution);
					if(keyframeSpec.tweened == false) keyframe1.tweened = false; else keyframe1.tweened = true;
					keyframe1.symbol = null;
					if(keyframeSpec.scale == null) keyframe1.scale = new flump_library_Point(1,1); else keyframe1.scale = new flump_library_Point(keyframeSpec.scale[0],keyframeSpec.scale[1]);
					if(keyframeSpec.skew == null) keyframe1.skew = new flump_library_Point(0,0); else keyframe1.skew = new flump_library_Point(keyframeSpec.skew[0],keyframeSpec.skew[1]);
					if(keyframeSpec.alpha == null) keyframe1.alpha = 1; else keyframe1.alpha = keyframeSpec.alpha;
					if(keyframeSpec.tint == null) keyframe1.tint = 16777215; else keyframe1.tint = Std.parseInt(StringTools.replace(js_Boot.__cast(keyframeSpec.tint[1] , String),"#","0x"));
					if(keyframeSpec.ease == null) keyframe1.ease = 0; else keyframe1.ease = keyframeSpec.ease;
				}
				if(layer1.keyframes.length == 0) layer1.firstKeyframe = keyframe1;
				if(keyframeSpec.label != null) {
					keyframe1.label = new flump_library_Label();
					keyframe1.label.keyframe = keyframe1;
					keyframe1.label.name = keyframeSpec.label;
					symbol1.labels.set(keyframe1.label.name,keyframe1.label);
				}
				if(keyframe1.time + keyframe1.duration > layer1.duration) layerDuration = keyframe1.time + keyframe1.duration;
				var v = keyframeSpec.ref;
				pendingSymbolAttachments.set(keyframe1,v);
				v;
				layer1.keyframes.push(keyframe1);
				previousKeyframe = keyframe1;
			}
			layer1.lastKeyframe = layer1.keyframes[layer1.keyframes.length - 1];
			layer1.keyframes[0].prev = layer1.lastKeyframe;
			layer1.lastKeyframe.next = layer1.keyframes[0];
			symbol1.layers.push(layer1);
			var allAreEmpty = Lambda.foreach(layer1.keyframes,(function() {
				return function(keyframe) {
					return keyframe.isEmpty;
				};
			})());
			if(allAreEmpty) {
			} else {
				var _g42 = 0;
				var _g51 = layer1.keyframes;
				while(_g42 < _g51.length) {
					var keyframe2 = [_g51[_g42]];
					++_g42;
					var hasNonEmptySibling = Lambda.exists(layer1.keyframes,(function(keyframe2) {
						return function(checkedKeyframe1) {
							return checkedKeyframe1.isEmpty == false && checkedKeyframe1 != keyframe2[0];
						};
					})(keyframe2));
					if(hasNonEmptySibling) {
						var checked1 = keyframe2[0].prev;
						while(checked1.isEmpty) checked1 = checked1.prev;
						keyframe2[0].prevNonEmptyKeyframe = checked1;
						checked1 = keyframe2[0].next;
						while(checked1.isEmpty) checked1 = checked1.next;
						keyframe2[0].nextNonEmptyKeyframe = checked1;
					} else {
						keyframe2[0].prevNonEmptyKeyframe = keyframe2[0];
						keyframe2[0].nextNonEmptyKeyframe = keyframe2[0];
					}
				}
				var firstNonEmpty = Lambda.find(layer1.keyframes,(function() {
					return function(checkedKeyframe) {
						return checkedKeyframe.isEmpty == false;
					};
				})());
				if(firstNonEmpty != null) firstNonEmpty.displayKey = new flump_DisplayObjectKey(firstNonEmpty.symbolId);
				var checked = firstNonEmpty.nextNonEmptyKeyframe;
				while(checked != firstNonEmpty) {
					if(checked.symbolId == checked.prevNonEmptyKeyframe.symbolId) checked.displayKey = checked.prevNonEmptyKeyframe.displayKey; else checked.displayKey = new flump_DisplayObjectKey(checked.symbolId);
					checked = checked.nextNonEmptyKeyframe;
				}
			}
		}
		var getHighestFrameNumber = (function() {
			return function(layer,accum) {
				var layerLength = layer.lastKeyframe.index + layer.lastKeyframe.numFrames;
				if(_$UInt_UInt_$Impl_$.gt(layerLength,accum)) return layerLength; else return accum;
			};
		})();
		symbol1.totalFrames = Lambda.fold(symbol1.layers,getHighestFrameNumber,0);
		symbol1.duration = _$UInt_UInt_$Impl_$.toFloat(symbol1.totalFrames) * flumpLibrary.frameTime;
		var labels = [];
		var _g23 = 0;
		var _g32 = symbol1.layers;
		while(_g23 < _g32.length) {
			var layer2 = _g32[_g23];
			++_g23;
			var _g43 = 0;
			var _g52 = layer2.keyframes;
			while(_g43 < _g52.length) {
				var keyframe3 = _g52[_g43];
				++_g43;
				if(keyframe3.label != null) labels.push(keyframe3.label);
			}
		}
		haxe_ds_ArraySort.sort(labels,flump_library_FlumpLibrary.sortLabel);
		var _g33 = 0;
		var _g24 = labels.length;
		while(_g33 < _g24) {
			var i = _g33++;
			var nextIndex = i + 1;
			if(nextIndex >= labels.length) nextIndex = 0;
			var label = labels[i];
			var nextLabel = labels[nextIndex];
			label.next = nextLabel;
			nextLabel.prev = label;
		}
		symbol1.firstLabel = labels[0];
		symbol1.lastLabel = labels[labels.length - 1];
		{
			movieSymbols.set(symbol1.name,symbol1);
			symbol1;
		}
	}
	var $it0 = pendingSymbolAttachments.keys();
	while( $it0.hasNext() ) {
		var keyframe4 = $it0.next();
		var symbolId = pendingSymbolAttachments.h[keyframe4.__id__];
		if((__map_reserved[symbolId] != null?spriteSymbols.getReserved(symbolId):spriteSymbols.h[symbolId]) != null) keyframe4.symbol = __map_reserved[symbolId] != null?spriteSymbols.getReserved(symbolId):spriteSymbols.h[symbolId]; else keyframe4.symbol = __map_reserved[symbolId] != null?movieSymbols.getReserved(symbolId):movieSymbols.h[symbolId];
	}
	return flumpLibrary;
};
flump_library_FlumpLibrary.sortLabel = function(a,b) {
	if(_$UInt_UInt_$Impl_$.gt(b.keyframe.index,a.keyframe.index)) return -1; else if(_$UInt_UInt_$Impl_$.gt(a.keyframe.index,b.keyframe.index)) return 1;
	return 0;
};
flump_library_FlumpLibrary.prototype = {
	__class__: flump_library_FlumpLibrary
};
var flump_library_Keyframe = function() {
};
flump_library_Keyframe.__name__ = true;
flump_library_Keyframe.prototype = {
	timeInside: function(time) {
		return this.time <= time && this.time + this.duration > time;
	}
	,rangeInside: function(from,to) {
		return this.timeInside(from) && this.timeInside(to);
	}
	,rangeIntersect: function(from,to) {
		return this.timeInside(from) || this.timeInside(to);
	}
	,insideRangeStart: function(from,to) {
		if(from <= to) return this.time > from && this.time <= to; else return this.time > from || this.time <= to;
	}
	,insideRangeEnd: function(from,to) {
		if(from == to && to == this.time + this.duration) return true;
		if(from > to) return to <= this.time + this.duration && from > this.time + this.duration; else return to <= this.time + this.duration || from > this.time + this.duration;
	}
	,__class__: flump_library_Keyframe
};
var flump_library_Label = function() {
};
flump_library_Label.__name__ = true;
flump_library_Label.prototype = {
	__class__: flump_library_Label
};
var flump_library_Layer = function(name) {
	this.keyframes = [];
	this.name = name;
};
flump_library_Layer.__name__ = true;
flump_library_Layer.prototype = {
	getKeyframeForFrame: function(index) {
		var _g = 0;
		var _g1 = this.keyframes;
		while(_g < _g1.length) {
			var keyframe = _g1[_g];
			++_g;
			if(_$UInt_UInt_$Impl_$.gte(index,keyframe.index) && _$UInt_UInt_$Impl_$.gt(keyframe.index + keyframe.numFrames,index)) return keyframe;
		}
		return null;
	}
	,getKeyframeForTime: function(time) {
		var keyframe = this.lastKeyframe;
		while(keyframe.time > time % this.movie.duration) keyframe = keyframe.prev;
		return keyframe;
	}
	,__class__: flump_library_Layer
};
var flump_library_Symbol = function() {
};
flump_library_Symbol.__name__ = true;
flump_library_Symbol.prototype = {
	__class__: flump_library_Symbol
};
var flump_library_MovieSymbol = function() {
	this.labels = new haxe_ds_StringMap();
	this.layers = [];
	flump_library_Symbol.call(this);
};
flump_library_MovieSymbol.__name__ = true;
flump_library_MovieSymbol.__super__ = flump_library_Symbol;
flump_library_MovieSymbol.prototype = $extend(flump_library_Symbol.prototype,{
	getLayer: function(name) {
		var _g = 0;
		var _g1 = this.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			if(layer.name == name) return layer;
		}
		return null;
	}
	,debug: function() {
		var largestLayerChars = Lambda.fold(this.layers,function(layer,result) {
			if(layer.name.length > result) return layer.name.length; else return result;
		},0);
		var repeat = function(character,amount) {
			var output = "";
			while(amount > 0) {
				output += character;
				amount--;
			}
			return output;
		};
		var output1 = "asdfsadf\n";
		output1 += repeat(" ",largestLayerChars);
		output1 += "   ";
		var _g1 = 0;
		var _g = this.totalFrames;
		while(_g1 < _g) {
			var i = _g1++;
			if(i % 5 == 0) output1 += i; else if(i % 6 != 0 || i < 10) output1 += " ";
		}
		output1 += "\n";
		output1 += repeat(" ",largestLayerChars);
		output1 += "   ";
		var _g11 = 0;
		var _g2 = this.totalFrames;
		while(_g11 < _g2) {
			var i1 = _g11++;
			if(i1 % 5 == 0) output1 += "▽"; else output1 += " ";
		}
		output1 += "\n";
		var _g12 = 0;
		var _g3 = this.layers.length;
		while(_g12 < _g3) {
			var i2 = _g12++;
			var layer1 = this.layers[i2];
			output1 += layer1.name + repeat(" ",largestLayerChars - layer1.name.length);
			output1 += " : ";
			var _g21 = 0;
			var _g31 = layer1.keyframes;
			while(_g21 < _g31.length) {
				var keyframe = _g31[_g21];
				++_g21;
				if(keyframe.symbolId != null) {
					output1 += "◙";
					if(keyframe.tweened) output1 += repeat("▸",keyframe.numFrames - 1); else output1 += repeat("◉",keyframe.numFrames - 1);
				} else {
					output1 += "○";
					output1 += repeat("◌",keyframe.numFrames - 1);
				}
			}
			output1 += "\n";
		}
		return output1;
	}
	,__class__: flump_library_MovieSymbol
});
var flump_library_Point = function(x,y) {
	this.x = x;
	this.y = y;
};
flump_library_Point.__name__ = true;
flump_library_Point.prototype = {
	__class__: flump_library_Point
};
var flump_library_Rectangle = function(x,y,width,height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
flump_library_Rectangle.__name__ = true;
flump_library_Rectangle.prototype = {
	__class__: flump_library_Rectangle
};
var flump_library_SpriteSymbol = function() {
	flump_library_Symbol.call(this);
};
flump_library_SpriteSymbol.__name__ = true;
flump_library_SpriteSymbol.__super__ = flump_library_Symbol;
flump_library_SpriteSymbol.prototype = $extend(flump_library_Symbol.prototype,{
	__class__: flump_library_SpriteSymbol
});
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
haxe_IMap.prototype = {
	__class__: haxe_IMap
};
var haxe_ds_ArraySort = function() { };
haxe_ds_ArraySort.__name__ = true;
haxe_ds_ArraySort.sort = function(a,cmp) {
	haxe_ds_ArraySort.rec(a,cmp,0,a.length);
};
haxe_ds_ArraySort.rec = function(a,cmp,from,to) {
	var middle = from + to >> 1;
	if(to - from < 12) {
		if(to <= from) return;
		var _g = from + 1;
		while(_g < to) {
			var i = _g++;
			var j = i;
			while(j > from) {
				if(cmp(a[j],a[j - 1]) < 0) haxe_ds_ArraySort.swap(a,j - 1,j); else break;
				j--;
			}
		}
		return;
	}
	haxe_ds_ArraySort.rec(a,cmp,from,middle);
	haxe_ds_ArraySort.rec(a,cmp,middle,to);
	haxe_ds_ArraySort.doMerge(a,cmp,from,middle,to,middle - from,to - middle);
};
haxe_ds_ArraySort.doMerge = function(a,cmp,from,pivot,to,len1,len2) {
	var first_cut;
	var second_cut;
	var len11;
	var len22;
	var new_mid;
	if(len1 == 0 || len2 == 0) return;
	if(len1 + len2 == 2) {
		if(cmp(a[pivot],a[from]) < 0) haxe_ds_ArraySort.swap(a,pivot,from);
		return;
	}
	if(len1 > len2) {
		len11 = len1 >> 1;
		first_cut = from + len11;
		second_cut = haxe_ds_ArraySort.lower(a,cmp,pivot,to,first_cut);
		len22 = second_cut - pivot;
	} else {
		len22 = len2 >> 1;
		second_cut = pivot + len22;
		first_cut = haxe_ds_ArraySort.upper(a,cmp,from,pivot,second_cut);
		len11 = first_cut - from;
	}
	haxe_ds_ArraySort.rotate(a,cmp,first_cut,pivot,second_cut);
	new_mid = first_cut + len22;
	haxe_ds_ArraySort.doMerge(a,cmp,from,first_cut,new_mid,len11,len22);
	haxe_ds_ArraySort.doMerge(a,cmp,new_mid,second_cut,to,len1 - len11,len2 - len22);
};
haxe_ds_ArraySort.rotate = function(a,cmp,from,mid,to) {
	var n;
	if(from == mid || mid == to) return;
	n = haxe_ds_ArraySort.gcd(to - from,mid - from);
	while(n-- != 0) {
		var val = a[from + n];
		var shift = mid - from;
		var p1 = from + n;
		var p2 = from + n + shift;
		while(p2 != from + n) {
			a[p1] = a[p2];
			p1 = p2;
			if(to - p2 > shift) p2 += shift; else p2 = from + (shift - (to - p2));
		}
		a[p1] = val;
	}
};
haxe_ds_ArraySort.gcd = function(m,n) {
	while(n != 0) {
		var t = m % n;
		m = n;
		n = t;
	}
	return m;
};
haxe_ds_ArraySort.upper = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[val],a[mid]) < 0) len = half; else {
			from = mid + 1;
			len = len - half - 1;
		}
	}
	return from;
};
haxe_ds_ArraySort.lower = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[mid],a[val]) < 0) {
			from = mid + 1;
			len = len - half - 1;
		} else len = half;
	}
	return from;
};
haxe_ds_ArraySort.swap = function(a,i,j) {
	var tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
haxe_ds_ObjectMap.__name__ = true;
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
haxe_ds__$StringMap_StringMapIterator.__name__ = true;
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var vega_shell_IGameMgr = function() { };
vega_shell_IGameMgr.__name__ = true;
vega_shell_IGameMgr.prototype = {
	__class__: vega_shell_IGameMgr
};
var vega_shell_GameMgrAssets = function() {
	this.GAME_GROUP_ASSET_RADIX = "game";
};
vega_shell_GameMgrAssets.__name__ = true;
vega_shell_GameMgrAssets.__interfaces__ = [vega_shell_IGameMgr];
vega_shell_GameMgrAssets.prototype = {
	init: function(pShell,pCont,pSavedDatas) {
		this.shell = pShell;
		this.gameContainer = pCont;
		this.loadAssets();
	}
	,reset: function(pSavedDatas) {
		vega_shell_ApplicationMatchSize.instance.traceDebug("WARNING : GameMgrAssets::reset : méthode abstraite, doit être redéfinie");
	}
	,destroy: function() {
		vega_assets_AssetsMgr.instance.freeAssets(this.getGamePatternAsset());
		vega_assets_AssetsMgr.instance.unloadAssets(null,this.getGamePatternAsset());
		this.shell = null;
		this.gameContainer = null;
	}
	,start: function() {
		vega_shell_ApplicationMatchSize.instance.traceDebug("WARNING : GameMgrAssets::start : méthode abstraite, doit être redéfinie");
	}
	,doFrame: function(pTime) {
	}
	,getGameId: function() {
		vega_shell_ApplicationMatchSize.instance.traceDebug("ERROR : GameMgrAssets::getGameId : méthode abstraite, doit être redéfinie");
		return null;
	}
	,switchPause: function(pIsPause) {
		vega_shell_ApplicationMatchSize.instance.traceDebug("WARNING : GameMgrAssets::switchPause : méthode abstraite, doit être redéfinie : " + (pIsPause == null?"null":"" + pIsPause));
	}
	,getScore: function() {
		vega_shell_ApplicationMatchSize.instance.traceDebug("WARNING : GameMgrAssets::getScore : pas de définition");
		return null;
	}
	,getDatas: function() {
		vega_shell_ApplicationMatchSize.instance.traceDebug("WARNING : GameMgrAssets::getDatas : pas de définition");
		return null;
	}
	,getGamePatternAsset: function() {
		return [new vega_assets_PatternAsset(this.GAME_GROUP_ASSET_RADIX + this.getGameId(),"findOnGroup","matchAll")];
	}
	,onGameReady: function() {
		this.shell.onGameReady();
	}
	,loadAssets: function(pLoader) {
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : GameMgrAsset::loadAssets");
		if(pLoader == null) pLoader = new vega_loader_VegaLoader();
		vega_assets_AssetsMgr.instance.loadAssets(pLoader,this.getGamePatternAsset()).load(new vega_loader_VegaLoaderListener($bind(this,this.onAssetsLoaded),null,$bind(this,this.onAssetsLoadProgress)));
	}
	,onAssetsLoadProgress: function(pLoader) {
		this.shell.onGameProgress(pLoader.getProgressRate() * .5);
	}
	,onAssetsLoaded: function(pLoader) {
		vega_assets_AssetsMgr.instance.mallocAssets(new vega_assets_NotifyMallocAssets($bind(this,this.onMallocEnd),$bind(this,this.onAssetsMallocProgress)),this.getGamePatternAsset());
	}
	,onAssetsMallocProgress: function(pCur,pTotal) {
		this.shell.onGameProgress(.5 + .5 * pCur / pTotal);
	}
	,onMallocEnd: function() {
		this.onGameReady();
	}
	,__class__: vega_shell_GameMgrAssets
};
var labo_game_MyGMgr = function() {
	this.myHUD = null;
	vega_shell_GameMgrAssets.call(this);
};
labo_game_MyGMgr.__name__ = true;
labo_game_MyGMgr.__super__ = vega_shell_GameMgrAssets;
labo_game_MyGMgr.prototype = $extend(vega_shell_GameMgrAssets.prototype,{
	getGameId: function() {
		return "Game";
	}
	,init: function(pShell,pCont,pSavedDatas) {
		vega_shell_GameMgrAssets.prototype.init.call(this,pShell,pCont,pSavedDatas);
		this.myHUD = this.shell.enableGameHUD();
	}
	,destroy: function() {
		this.myHUD = null;
		vega_shell_GameMgrAssets.prototype.destroy.call(this);
	}
	,__class__: labo_game_MyGMgr
});
var vega_screen_MyScreen = function() {
	this.fadeFrontColor = 0;
	this.bgColor = -1;
	this.FADE_DELAY = 200;
};
vega_screen_MyScreen.__name__ = true;
vega_screen_MyScreen.prototype = {
	destroy: function() {
		vega_shell_ResizeBroadcaster.getInstance().remListener($bind(this,this.onResize));
		if(this.bg != null) {
			this.container.removeChild(this.bg);
			this.bg.destroy();
			this.bg = null;
		}
		if(this.asset != null) {
			this.content.removeChild(this.asset);
			this.asset.free();
			this.asset = null;
		}
		if(this.fadeFront != null) {
			this.container.removeChild(this.fadeFront);
			this.fadeFront.destroy();
			this.fadeFront = null;
		}
		this.container.removeChild(this.content);
		this.content.destroy();
		this.content = null;
		this.container.parent.removeChild(this.container);
		this.container.destroy();
		this.container = null;
		this.doMode = null;
		this.shell = null;
	}
	,initScreen: function(pShell,pContainer) {
		this.shell = pShell;
		this.container = pContainer;
		this.content = this.container.addChild(new PIXI.Container());
		this.buildContent();
		vega_shell_ResizeBroadcaster.getInstance().addListener($bind(this,this.onResize));
		this.launchAfterInit();
	}
	,start: function() {
	}
	,askClose: function(pNext) {
	}
	,doFrame: function(pTime) {
		if(this.doMode != null) this.doMode(pTime);
	}
	,getContainer: function() {
		return this.container;
	}
	,getShell: function() {
		return this.shell;
	}
	,onResize: function() {
	}
	,launchAfterInit: function() {
	}
	,buildContent: function() {
		var lRect;
		if(this.bgColor >= 0) {
			lRect = vega_shell_ApplicationMatchSize.instance.getScreenRectExt();
			this.bg = this.container.addChildAt(new PIXI.Graphics(),0);
			this.bg.beginFill(this.bgColor);
			this.bg.drawRect(lRect.x,lRect.y,lRect.width,lRect.height);
			this.bg.endFill();
		}
		if(this.ASSET_ID != null) this.asset = this.content.addChild(vega_assets_AssetsMgr.instance.getAssetInstance(this.ASSET_ID));
	}
	,onFadeInComplete: function() {
		this.shell.onScreenReady(this);
	}
	,setModeFadeFront: function() {
		var lRect = vega_shell_ApplicationMatchSize.instance.getScreenRectExt();
		this.fadeFront = this.container.addChild(new PIXI.Graphics());
		this.fadeFront.beginFill(this.fadeFrontColor);
		this.fadeFront.drawRect(lRect.x,lRect.y,lRect.width,lRect.height);
		this.fadeFront.endFill();
		this.fadeFront.alpha = 0;
		this.fadeDelay = 0;
		this.doMode = $bind(this,this.doModeFadeFront);
	}
	,doModeFadeFront: function(pTime) {
		if(pTime > this.FADE_DELAY / 2) pTime = this.FADE_DELAY / 2;
		if(this.fadeDelay + pTime >= this.FADE_DELAY) {
			this.content.visible = false;
			this.fadeFront.alpha = 1;
			this.setModeFadeOut();
		} else {
			this.fadeDelay += pTime;
			this.fadeFront.alpha = this.fadeDelay / this.FADE_DELAY;
		}
	}
	,setModeFadeOut: function() {
		this.fadeDelay = 0;
		this.doMode = $bind(this,this.doModeFadeOut);
	}
	,doModeFadeOut: function(pTime) {
		if(pTime > this.FADE_DELAY / 2) pTime = this.FADE_DELAY / 2;
		if(this.fadeDelay + pTime >= this.FADE_DELAY) {
			this.container.alpha = 0;
			this.doMode = null;
			this.shell.onScreenEnd(this);
		} else {
			this.fadeDelay += pTime;
			this.container.alpha = 1 - this.fadeDelay / this.FADE_DELAY;
		}
	}
	,setModeFadeIn: function() {
		this.container.alpha = 0;
		this.fadeDelay = 0;
		this.doMode = $bind(this,this.doModeFadeIn);
	}
	,doModeFadeIn: function(pTime) {
		if(pTime > this.FADE_DELAY / 2) pTime = this.FADE_DELAY / 2;
		if(this.fadeDelay + pTime >= this.FADE_DELAY) {
			this.container.alpha = 1;
			this.doMode = null;
			this.onFadeInComplete();
		} else {
			this.fadeDelay += pTime;
			this.container.alpha = this.fadeDelay / this.FADE_DELAY;
		}
	}
	,__class__: vega_screen_MyScreen
};
var vega_screen_MyScreenMain = function() {
	vega_screen_MyScreen.call(this);
	this.ASSET_ID = "screenMain";
};
vega_screen_MyScreenMain.__name__ = true;
vega_screen_MyScreenMain.__super__ = vega_screen_MyScreen;
vega_screen_MyScreenMain.prototype = $extend(vega_screen_MyScreen.prototype,{
	destroy: function() {
		if(this.asset != null) vega_local_LocalMgr.instance.recursiveFreeLocalTxt(this.asset.getContent());
		if(this.startBt != null) {
			vega_utils_UtilsPixi.unsetQuickBt(this.startBt);
			this.startBt = null;
		}
		if(this.hit != null) {
			vega_utils_UtilsPixi.unsetQuickBt(this.hit);
			this.hit = null;
		}
		vega_screen_MyScreen.prototype.destroy.call(this);
	}
	,buildContent: function() {
		vega_screen_MyScreen.prototype.buildContent.call(this);
		if(this.asset != null) {
			if(vega_utils_UtilsFlump.getLayerWithPrefixInMovie("hit",this.asset.getContent()) != null) {
				this.hit = (js_Boot.__cast(this.asset.getContent() , pixi_flump_Movie)).getLayer("hit");
				this.hit.alpha = 0;
				vega_utils_UtilsPixi.setQuickBt(this.hit,$bind(this,this.onBtStart));
			}
			if(vega_utils_UtilsFlump.getLayerWithPrefixInMovie("start",this.asset.getContent()) != null) {
				this.startBt = (js_Boot.__cast(this.asset.getContent() , pixi_flump_Movie)).getLayer("start");
				vega_utils_UtilsPixi.setQuickBt(this.startBt,$bind(this,this.onBtStart));
				if(this.hit != null) this.hit.buttonMode = false;
			}
			vega_local_LocalMgr.instance.recursiveSetLocalTxt(this.asset.getContent());
		}
	}
	,launchAfterInit: function() {
		this.shell.onScreenReady(this);
	}
	,onBtStart: function(pE) {
		this.shell.onScreenClose(this);
		this.setModeFadeOut();
	}
	,__class__: vega_screen_MyScreenMain
});
var labo_screen_MyScreenMainInit = function() {
	vega_screen_MyScreenMain.call(this);
};
labo_screen_MyScreenMainInit.__name__ = true;
labo_screen_MyScreenMainInit.__super__ = vega_screen_MyScreenMain;
labo_screen_MyScreenMainInit.prototype = $extend(vega_screen_MyScreenMain.prototype,{
	onBtStart: function(pE) {
		vega_sound_SndMgr.getInstance().play("click",null,true);
		vega_screen_MyScreenMain.prototype.onBtStart.call(this,pE);
	}
	,__class__: labo_screen_MyScreenMainInit
});
var labo_screen_MyScreenPopHelp = function() {
	vega_screen_MyScreen.call(this);
	this.ASSET_ID = "popHelp";
};
labo_screen_MyScreenPopHelp.__name__ = true;
labo_screen_MyScreenPopHelp.__super__ = vega_screen_MyScreen;
labo_screen_MyScreenPopHelp.prototype = $extend(vega_screen_MyScreen.prototype,{
	destroy: function() {
		vega_utils_UtilsPixi.unsetQuickBt(this.getHit());
		vega_local_LocalMgr.instance.recursiveFreeLocalTxt(this.asset);
		vega_screen_MyScreen.prototype.destroy.call(this);
	}
	,launchAfterInit: function() {
		this.setModeFadeIn();
	}
	,buildContent: function() {
		vega_screen_MyScreen.prototype.buildContent.call(this);
		vega_utils_UtilsPixi.setQuickBt(this.getHit(),$bind(this,this.onClose));
		vega_local_LocalMgr.instance.recursiveSetLocalTxt(this.asset);
	}
	,onClose: function(pE) {
		vega_sound_SndMgr.getInstance().play("click");
		this.shell.onScreenClose(this);
		this.setModeFadeOut();
	}
	,getHit: function() {
		return (js_Boot.__cast(this.asset.getContent() , pixi_flump_Movie)).getLayer("hit");
	}
	,__class__: labo_screen_MyScreenPopHelp
});
var vega_shell_IMyHUD = function() { };
vega_shell_IMyHUD.__name__ = true;
vega_shell_IMyHUD.prototype = {
	__class__: vega_shell_IMyHUD
};
var labo_shell_MyHUD = function() {
	this.btHelp = null;
	this.container = null;
	this.asset = null;
	this.shell = null;
};
labo_shell_MyHUD.__name__ = true;
labo_shell_MyHUD.__interfaces__ = [vega_shell_IMyHUD];
labo_shell_MyHUD.prototype = {
	init: function(pShell,pContainer,pType) {
		this.shell = pShell;
		this.container = pContainer;
		this.initAsset();
		vega_shell_ResizeBroadcaster.getInstance().addListener($bind(this,this.onResize));
		this.onResize();
	}
	,destroy: function() {
		this.freeAsset();
		this.container = null;
		this.shell = null;
	}
	,doFrame: function(pDT) {
	}
	,switchPause: function(pPause) {
	}
	,initAsset: function() {
		this.asset = this.container.addChild(vega_assets_AssetsMgr.instance.getAssetInstance("myHUD"));
		this.btHelp = new vega_ui_MyButtonFlump(this.getBtHelp(),$bind(this,this.onHelp));
	}
	,freeAsset: function() {
		this.btHelp.destroy();
		this.btHelp = null;
		this.container.removeChild(this.asset);
		this.asset.free();
		this.asset = null;
	}
	,onResize: function() {
		var lRect = vega_shell_ApplicationMatchSize.instance.getScreenRect();
		vega_utils_UtilsFlump.setLayerXY(this.getBtHelp().parent,lRect.x + lRect.width,lRect.y);
	}
	,onHelp: function(pE) {
		vega_sound_SndMgr.getInstance().play("click");
		this.btHelp.reset();
		this.shell.onGameHelp();
	}
	,getBtHelp: function() {
		return (js_Boot.__cast(this.asset.getContent() , pixi_flump_Movie)).getLayer("btHelp").getChildAt(0);
	}
	,__class__: labo_shell_MyHUD
};
var vega_shell_IShell = function() { };
vega_shell_IShell.__name__ = true;
vega_shell_IShell.prototype = {
	__class__: vega_shell_IShell
};
var vega_shell_BaseShell = function() {
	this.isAssetsMainReady = false;
	this.isLocked = false;
	this.isCurScreenReady = true;
};
vega_shell_BaseShell.__name__ = true;
vega_shell_BaseShell.__interfaces__ = [vega_shell_IShell];
vega_shell_BaseShell.prototype = {
	init: function(pCont,pFileAssets,pFileLocal,pFonts) {
		this._container = pCont;
		this._assetsFile = pFileAssets;
		this._localFile = pFileLocal;
		this._fonts = pFonts;
		this._containerScr = this._container.addChild(new PIXI.Container());
		this.initPreLoad();
		vega_shell_VegaFramer.getInstance().addIterator($bind(this,this.doFrame));
	}
	,onScreenReady: function(pScreen) {
		this.isCurScreenReady = true;
		this.switchLock(false);
		if(this.prevScreen == null) {
			pScreen.start();
			if(js_Boot.__instanceof(pScreen,vega_screen_MyScreenInitLoad) && this.isAssetsMainReady) (js_Boot.__cast(pScreen , vega_screen_MyScreenInitLoad)).onLoadComplete();
		}
	}
	,onScreenClose: function(pScreen,pNext) {
		if(js_Boot.__instanceof(pScreen,vega_screen_MyScreenPreload)) {
			pNext = this.getScreenSplash();
			this.onShellReadyMini();
		} else if(js_Boot.__instanceof(pScreen,vega_screen_MyScreenSplash)) pNext = this.getScreenInitLoad();
		this.prevScreen = pScreen;
		this.switchLock(true);
		this.setCurScreen(pNext);
		if(js_Boot.__instanceof(pScreen,vega_screen_MyScreenInitLoad)) this.onShellReadyMain();
	}
	,onScreenEnd: function(pScreen) {
		this.prevScreen = null;
		pScreen.destroy();
		if(this.isCurScreenReady && this.curScreen != null) {
			this.curScreen.start();
			if(js_Boot.__instanceof(this.curScreen,vega_screen_MyScreenInitLoad) && this.isAssetsMainReady) (js_Boot.__cast(this.curScreen , vega_screen_MyScreenInitLoad)).onLoadComplete();
		}
		this.switchLock(false);
	}
	,switchLock: function(pIsLock) {
		if(pIsLock) {
			vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : BaseShell::switchLock : interactiveChildren : " + Std.string(this._container.interactiveChildren) + " -> " + Std.string(!pIsLock));
			this.isLocked = true;
			this._container.interactiveChildren = false;
		} else if(this.prevScreen == null && this.curScreen == null || this.prevScreen == null && this.isCurScreenReady) {
			vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : BaseShell::switchLock : interactiveChildren : " + Std.string(this._container.interactiveChildren) + " -> " + Std.string(!pIsLock));
			this.isLocked = false;
			this._container.interactiveChildren = true;
		}
	}
	,getSavedDatas: function(pId,pForce) {
		if(pForce == null) pForce = false;
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : BaseShell::getSavedDatas : " + pId);
		return null;
	}
	,setSavedDatas: function(pId,pDatas) {
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : BaseShell::setSavedDatas : " + pId);
	}
	,doFrame: function(pTime) {
		if(this.prevScreen != null) this.prevScreen.doFrame(pTime);
		if(this.curScreen != null) this.curScreen.doFrame(pTime);
	}
	,onShellReadyMini: function() {
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : BaseShell::onShellReadyMini");
		this.loadAssetsMain();
	}
	,onShellReadyMain: function() {
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : BaseShell::onShellReadyMain");
		this.setCurScreen(this.getScreenMain());
	}
	,setCurScreen: function(pScreen) {
		this.curScreen = pScreen;
		this.isCurScreenReady = false;
		if(this.curScreen != null) {
			this.switchLock(true);
			this.curScreen.initScreen(this,this.addScreenDisplay(this.curScreen));
		}
	}
	,addScreenDisplay: function(pScreen) {
		return this._containerScr.addChildAt(new PIXI.Container(),0);
	}
	,initPreLoad: function(pLoader) {
		var lId;
		if(pLoader == null) pLoader = new vega_loader_VegaLoader();
		this.setCurScreen(this.getScreenPreload());
		pLoader.addTxtFile(this._localFile);
		pLoader.addTxtFile(this._assetsFile);
		var _g = 0;
		var _g1 = Reflect.fields(this._fonts);
		while(_g < _g1.length) {
			var lId1 = _g1[_g];
			++_g;
			pLoader.addFontFile(lId1,js_Boot.__cast(Reflect.getProperty(this._fonts,lId1) , vega_loader_file_MyFile));
		}
		pLoader.load(new vega_loader_VegaLoaderListener($bind(this,this.onPreLoadComplete),null,$bind(this,this.onPreLoadProgess)));
	}
	,onPreLoadProgess: function(pLoader) {
		(js_Boot.__cast(this.curScreen , vega_screen_MyScreenPreload)).onLoadProgress(pLoader.getProgressRate() * .5);
	}
	,onPreLoadComplete: function(pLoader) {
		this.instanciateLocalMgr();
		this.instanciateAssetsMgr();
		this.onAssetDescBuilt();
		this.loadAssetsMini();
	}
	,instanciateLocalMgr: function() {
		new vega_local_LocalMgr(vega_loader_VegaLoaderMgr.getInstance().getLoadingFile(this._localFile.getId()).getLoadedContent());
	}
	,instanciateAssetsMgr: function() {
		new vega_assets_AssetsMgr();
		vega_assets_AssetsMgr.instance.init(vega_loader_VegaLoaderMgr.getInstance().getLoadingFile(this._assetsFile.getId()).getLoadedContent());
	}
	,onAssetDescBuilt: function() {
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : ShellDefaultRender::onAssetDescBuilt");
	}
	,loadAssetsMini: function(pLoader) {
		if(pLoader == null) pLoader = new vega_loader_VegaLoader();
		vega_assets_AssetsMgr.instance.loadAssets(pLoader,this.getAssetsMiniPatterns()).load(new vega_loader_VegaLoaderListener($bind(this,this.onAssetsMiniLoaded),null,$bind(this,this.onAssetsMiniProgress)));
	}
	,onAssetsMiniProgress: function(pLoader) {
		(js_Boot.__cast(this.curScreen , vega_screen_MyScreenPreload)).onLoadProgress(.5 + pLoader.getProgressRate() * .25);
	}
	,onAssetsMiniLoaded: function(pLoader) {
		vega_assets_AssetsMgr.instance.mallocAssets(new vega_assets_NotifyMallocAssets($bind(this,this.onMallocMiniEnd),$bind(this,this.onMallocMiniProgress)),this.getAssetsMiniPatterns());
	}
	,onMallocMiniProgress: function(pCur,pTotal) {
		(js_Boot.__cast(this.curScreen , vega_screen_MyScreenPreload)).onLoadProgress(.75 + pCur / pTotal * .25);
	}
	,onMallocMiniEnd: function() {
		(js_Boot.__cast(this.curScreen , vega_screen_MyScreenPreload)).onLoadComplete();
	}
	,loadAssetsMain: function(pLoader) {
		if(pLoader == null) pLoader = new vega_loader_VegaLoader();
		vega_assets_AssetsMgr.instance.loadAssets(pLoader,this.getAssetsMainPatterns()).load(new vega_loader_VegaLoaderListener($bind(this,this.onAssetsMainLoaded),null,$bind(this,this.onAssetsMainProgress)));
	}
	,onAssetsMainProgress: function(pLoader) {
		if(js_Boot.__instanceof(this.curScreen,vega_screen_MyScreenInitLoad) && !this.isLocked) (js_Boot.__cast(this.curScreen , vega_screen_MyScreenInitLoad)).onLoadProgress(pLoader.getProgressRate() * .5);
	}
	,onAssetsMainLoaded: function(pLoader) {
		vega_assets_AssetsMgr.instance.mallocAssets(new vega_assets_NotifyMallocAssets($bind(this,this.onMallocMainEnd),$bind(this,this.onMallocMainProgress)),this.getAssetsMainPatterns());
	}
	,onMallocMainProgress: function(pCur,pTotal) {
		if(js_Boot.__instanceof(this.curScreen,vega_screen_MyScreenInitLoad) && !this.isLocked) (js_Boot.__cast(this.curScreen , vega_screen_MyScreenInitLoad)).onLoadProgress(.5 + pCur / pTotal * .5);
	}
	,onMallocMainEnd: function() {
		this.isAssetsMainReady = true;
		if(js_Boot.__instanceof(this.curScreen,vega_screen_MyScreenInitLoad) && !this.isLocked) (js_Boot.__cast(this.curScreen , vega_screen_MyScreenInitLoad)).onLoadComplete();
	}
	,getAssetsMiniPatterns: function() {
		return [new vega_assets_PatternAsset("mini","findOnGroup","matchAll")];
	}
	,getAssetsMainPatterns: function() {
		return [new vega_assets_PatternAsset("main","findOnGroup","matchAll")];
	}
	,getScreenPreload: function() {
		return new vega_screen_MyScreenPreload();
	}
	,getScreenSplash: function() {
		return new vega_screen_MyScreenSplash();
	}
	,getScreenInitLoad: function() {
		return new vega_screen_MyScreenInitLoad();
	}
	,getScreenMain: function() {
		return new vega_screen_MyScreenMain();
	}
	,__class__: vega_shell_BaseShell
};
var vega_shell_IGameShell = function() { };
vega_shell_IGameShell.__name__ = true;
vega_shell_IGameShell.prototype = {
	__class__: vega_shell_IGameShell
};
var vega_shell_GameShell = function() {
	this.curGame = null;
	vega_shell_BaseShell.call(this);
};
vega_shell_GameShell.__name__ = true;
vega_shell_GameShell.__interfaces__ = [vega_shell_IGameShell];
vega_shell_GameShell.__super__ = vega_shell_BaseShell;
vega_shell_GameShell.prototype = $extend(vega_shell_BaseShell.prototype,{
	init: function(pCont,pFileAssets,pFileLocal,pFonts) {
		this.gameContainer = pCont.addChild(new PIXI.Container());
		vega_shell_BaseShell.prototype.init.call(this,pCont,pFileAssets,pFileLocal,pFonts);
	}
	,onGameHelp: function(pHelpTag) {
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : GameShell::onGameHelp : " + pHelpTag);
	}
	,onGameReady: function() {
		this.startGame();
	}
	,onGameProgress: function(pRate) {
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : GameShell::onGameProgress : " + pRate);
	}
	,onGameAborted: function() {
		this.killGame();
	}
	,onGameover: function(pScore,pSavedDatas) {
		this.onGameAborted();
	}
	,getCurGame: function() {
		return this.curGame;
	}
	,enableGameHUD: function(pType) {
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : GameShell::enableGameHUD : " + pType);
		return null;
	}
	,getCurGameHUD: function() {
		return null;
	}
	,getCurGameSavedDatas: function() {
		return this.getSavedDatas(this.curGame.getGameId());
	}
	,getGameInstance: function() {
		return this.curGame;
	}
	,launchGame: function() {
		this.curGame = this.getGameInstance();
		this.curGame.init(this,this.gameContainer,this.getCurGameSavedDatas());
	}
	,startGame: function() {
		this.curGame.start();
	}
	,killGame: function() {
		this.curGame.destroy();
		this.curGame = null;
	}
	,doFrame: function(pTime) {
		vega_shell_BaseShell.prototype.doFrame.call(this,pTime);
		if(this.curGame != null) this.curGame.doFrame(pTime);
	}
	,__class__: vega_shell_GameShell
});
var labo_shell_MyShell = function() {
	this.curHUD = null;
	this.btFullscreenAsset = null;
	this.btFullscreen = null;
	vega_shell_GameShell.call(this);
	vega_shell_ResizeBroadcaster.getInstance().addListener($bind(this,this.onResize));
};
labo_shell_MyShell.__name__ = true;
labo_shell_MyShell.__super__ = vega_shell_GameShell;
labo_shell_MyShell.prototype = $extend(vega_shell_GameShell.prototype,{
	init: function(pCont,pFileAssets,pFileLocal,pFonts) {
		vega_shell_GameShell.prototype.init.call(this,pCont,pFileAssets,pFileLocal,pFonts);
		this.myHUDContainer = pCont.addChildAt(new PIXI.Container(),pCont.getChildIndex(this.gameContainer) + 1);
		this.gameContainer.interactiveChildren = false;
		this.myHUDContainer.interactiveChildren = false;
	}
	,getCurGameHUD: function() {
		return this.curHUD;
	}
	,enableGameHUD: function(pType) {
		if(this.curHUD == null) {
			this.curHUD = new labo_shell_MyHUD();
			this.curHUD.init(this,this.myHUDContainer);
		} else vega_shell_ApplicationMatchSize.instance.traceDebug("ERROR : MyShell::enableGameHUD : un HUD est déjà actif, ignore");
		return this.curHUD;
	}
	,onGameHelp: function(pHelpTag) {
		this.curGame.switchPause(true);
		this.gameContainer.interactiveChildren = false;
		this.myHUDContainer.interactiveChildren = false;
		this.setCurScreen(new labo_screen_MyScreenPopHelp());
	}
	,onScreenEnd: function(pScreen) {
		vega_shell_GameShell.prototype.onScreenEnd.call(this,pScreen);
		if((js_Boot.__instanceof(pScreen,vega_screen_MyScreenMain) || js_Boot.__instanceof(pScreen,labo_screen_MyScreenPopHelp)) && this.curScreen == null && this.curGame != null) {
			this.gameContainer.interactiveChildren = true;
			this.myHUDContainer.interactiveChildren = true;
			this.curGame.switchPause(false);
		}
	}
	,onResize: function() {
		var lRect;
		if(this.btFullscreenAsset != null) {
			lRect = vega_shell_ApplicationMatchSize.instance.getScreenRect();
			this.btFullscreenAsset.x = lRect.x;
			this.btFullscreenAsset.y = lRect.y;
		}
	}
	,onBtFullscreen: function(pE) {
		vega_sound_SndMgr.getInstance().play("click",null,true);
	}
	,setCurScreen: function(pScreen) {
		vega_shell_GameShell.prototype.setCurScreen.call(this,pScreen);
		if(js_Boot.__instanceof(pScreen,vega_screen_MyScreenMain) && this.btFullscreenAsset == null) {
			this.btFullscreenAsset = this._containerScr.addChildAt(vega_assets_AssetsMgr.instance.getAssetInstance("btFullscreen"),this._containerScr.getChildIndex(pScreen.getContainer()) + 1);
			this.btFullscreen = vega_utils_UtilsFlump.createFullscreenBt(this.btFullscreenAsset.getContent());
			this.btFullscreen.addDownListener($bind(this,this.onBtFullscreen));
			this.onResize();
		}
	}
	,loadAssetsMain: function(pLoader) {
		if(pLoader == null) pLoader = new vega_loader_VegaLoader();
		pLoader.addHowlFile(new vega_sound_SndDesc("click"));
		vega_shell_GameShell.prototype.loadAssetsMain.call(this,pLoader);
	}
	,onAssetsMainProgress: function(pLoader) {
		if(js_Boot.__instanceof(this.curScreen,vega_screen_MyScreenInitLoad) && !this.isLocked) (js_Boot.__cast(this.curScreen , vega_screen_MyScreenInitLoad)).onLoadProgress(pLoader.getProgressRate() * .25);
	}
	,onMallocMainProgress: function(pCur,pTotal) {
		if(js_Boot.__instanceof(this.curScreen,vega_screen_MyScreenInitLoad) && !this.isLocked) (js_Boot.__cast(this.curScreen , vega_screen_MyScreenInitLoad)).onLoadProgress(.25 + pCur / pTotal * .25);
	}
	,onMallocMainEnd: function() {
		this.launchGame();
	}
	,onGameProgress: function(pRate) {
		if(js_Boot.__instanceof(this.curScreen,vega_screen_MyScreenInitLoad) && !this.isLocked) (js_Boot.__cast(this.curScreen , vega_screen_MyScreenInitLoad)).onLoadProgress(.5 + pRate * .5);
	}
	,onGameReady: function() {
		vega_shell_GameShell.prototype.onGameReady.call(this);
		this.curGame.switchPause(true);
		vega_shell_GameShell.prototype.onMallocMainEnd.call(this);
	}
	,getScreenMain: function() {
		return new labo_screen_MyScreenMainInit();
	}
	,getGameInstance: function() {
		return new labo_game_MyGMgr();
	}
	,__class__: labo_shell_MyShell
});
var pixi_flump_Factory = function() { };
pixi_flump_Factory.__name__ = true;
pixi_flump_Factory.prototype = {
	__class__: pixi_flump_Factory
};
var pixi_flump_Movie = function(symbolId,resourceId) {
	this.animationSpeed = 1.0;
	this.ticker = PIXI.ticker.shared;
	this.displaying = new haxe_ds_ObjectMap();
	this.movieChildren = new haxe_ds_ObjectMap();
	this.layerLookup = new haxe_ds_StringMap();
	this.layers = new haxe_ds_ObjectMap();
	PIXI.Container.call(this);
	this.resourceId = resourceId;
	if(resourceId == null) {
		this.resource = pixi_flump_Resource.getResourceForMovie(symbolId);
		if(this.resource == null) throw new js__$Boot_HaxeError("Flump movie does not exist: " + symbolId);
	} else {
		this.resource = pixi_flump_Resource.get(resourceId);
		if(this.resource == null) throw new js__$Boot_HaxeError("Flump resource does not exist: " + resourceId);
	}
	this.resolution = this.resource.resolution;
	this.symbol = this.resource.library.movies.get(symbolId);
	this.player = new flump_MoviePlayer(this.symbol,this,this.resolution);
	this.set_loop(true);
	this.master = true;
	this.once("added",$bind(this,this.onAdded));
};
pixi_flump_Movie.__name__ = true;
pixi_flump_Movie.__interfaces__ = [flump_IFlumpMovie];
pixi_flump_Movie.__super__ = PIXI.Container;
pixi_flump_Movie.prototype = $extend(PIXI.Container.prototype,{
	disableAsMaster: function() {
		this.master = false;
		this.off("added",$bind(this,this.onAdded));
	}
	,get_resX: function() {
		return this.x / this.resolution;
	}
	,set_resX: function(value) {
		this.x = value * this.resolution;
		return value;
	}
	,get_resY: function() {
		return this.y / this.resolution;
	}
	,set_resY: function(value) {
		this.y = value * this.resolution;
		return value;
	}
	,get_resScaleX: function() {
		return this.scale.x / this.resolution;
	}
	,set_resScaleX: function(value) {
		this.scale.x = value * this.resolution;
		return value;
	}
	,get_resScaleY: function() {
		return this.scale.y / this.resolution;
	}
	,set_resScaleY: function(value) {
		this.scale.y = value * this.resolution;
		return value;
	}
	,getLayer: function(layerId) {
		if(this.layerLookup.exists(layerId) == false) throw new js__$Boot_HaxeError("Layer " + layerId + "does not exist");
		return this.layerLookup.get(layerId);
	}
	,getChildDisplayObject: function(layerId,keyframeIndex) {
		if(keyframeIndex == null) keyframeIndex = 0;
		var key = this.player.getDisplayKey(layerId,keyframeIndex);
		return this.movieChildren.h[key.__id__];
	}
	,getChildMovie: function(layerId,keyframeIndex) {
		if(keyframeIndex == null) keyframeIndex = 0;
		var child = this.getChildDisplayObject(layerId,keyframeIndex);
		if(js_Boot.__instanceof(child,pixi_flump_Movie) == false) throw new js__$Boot_HaxeError("Child on layer " + layerId + " at keyframeIndex " + Std.string(_$UInt_UInt_$Impl_$.toFloat(keyframeIndex)) + " is not of type flump.Movie!");
		return child;
	}
	,get_symbolId: function() {
		return this.symbol.name;
	}
	,set_loop: function(value) {
		if(value && this.player.get_playing()) this.player.loop(); else if(value == false && this.player.get_looping()) this.player.play();
		return this.loop = value;
	}
	,set_onComplete: function(value) {
		return this.onComplete = value;
	}
	,set_currentFrame: function(value) {
		this.player.set_currentFrame(value);
		return value;
	}
	,get_currentFrame: function() {
		return this.player.get_currentFrame();
	}
	,get_playing: function() {
		return this.player.get_playing() || this.player.get_looping();
	}
	,get_independantTimeline: function() {
		return this.player.independantTimeline;
	}
	,set_independantTimeline: function(value) {
		this.player.independantTimeline = value;
		return value;
	}
	,get_independantControl: function() {
		return this.player.independantControl;
	}
	,set_independantControl: function(value) {
		this.player.independantControl = value;
		return value;
	}
	,get_totalFrames: function() {
		return this.player.get_totalFrames();
	}
	,set_tint: function(pTint) {
		var $it0 = this.movieChildren.iterator();
		while( $it0.hasNext() ) {
			var child = $it0.next();
			if(js_Boot.__instanceof(child,pixi_flump_Sprite)) (js_Boot.__cast(child , pixi_flump_Sprite)).tint = pTint; else if(js_Boot.__instanceof(child,pixi_flump_Movie)) (js_Boot.__cast(child , pixi_flump_Movie)).set_tint(pTint);
		}
		return this.tint = pTint;
	}
	,stop: function() {
		this.player.stop();
	}
	,play: function() {
		if(this.loop) this.player.loop(); else this.player.play();
	}
	,gotoAndStop: function(frameNumber) {
		if(!this.loop) {
			if(_$UInt_UInt_$Impl_$.gt(frameNumber,(function($this) {
				var $r;
				var a = $this.player.get_totalFrames();
				$r = a - 1;
				return $r;
			}(this)))) {
				var a1 = this.player.get_totalFrames();
				frameNumber = a1 - 1;
			} else if(frameNumber < 0) frameNumber = 0;
		}
		this.player.goToFrame(frameNumber).stop();
	}
	,gotoAndPlay: function(frameNumber) {
		if(!this.loop) {
			if(_$UInt_UInt_$Impl_$.gt(frameNumber,(function($this) {
				var $r;
				var a = $this.player.get_totalFrames();
				$r = a - 1;
				return $r;
			}(this)))) {
				var a1 = this.player.get_totalFrames();
				frameNumber = a1 - 1;
			} else if(frameNumber < 0) frameNumber = 0;
		}
		if(this.loop) this.player.goToFrame(frameNumber).loop(); else this.player.goToFrame(frameNumber).play();
	}
	,getLabelFrame: function(label) {
		return this.player.getLabelFrame(label);
	}
	,tick: function() {
		this.player.advanceTime(this.ticker.elapsedMS * this.animationSpeed);
	}
	,onAdded: function(to) {
		this.once("removed",$bind(this,this.onRemoved));
		this.ticker.add($bind(this,this.tick));
	}
	,onRemoved: function(from) {
		this.once("added",$bind(this,this.onAdded));
		this.ticker.remove($bind(this,this.tick));
	}
	,createLayer: function(layer) {
		var v = new PIXI.Container();
		this.layers.set(layer,v);
		v;
		this.layers.h[layer.__id__].name = layer.name;
		var v1 = this.layers.h[layer.__id__];
		this.layerLookup.set(layer.name,v1);
		v1;
		this.addChild(this.layers.h[layer.__id__]);
	}
	,getChildPlayer: function(keyframe) {
		var movie = this.movieChildren.h[keyframe.displayKey.__id__];
		return movie.player;
	}
	,createFlumpChild: function(displayKey) {
		var v = this.resource.createDisplayObject(displayKey.symbolId);
		this.movieChildren.set(displayKey,v);
		v;
	}
	,removeFlumpChild: function(layer,displayKey) {
		var layer1 = this.layers.h[layer.__id__];
		layer1.removeChildren();
	}
	,addFlumpChild: function(layer,displayKey) {
		var layer1 = this.layers.h[layer.__id__];
		layer1.addChild(this.movieChildren.h[displayKey.__id__]);
	}
	,onAnimationComplete: function() {
		if(this.onComplete != null) this.onComplete();
	}
	,renderFrame: function(keyframe,x,y,scaleX,scaleY,skewX,skewY,alpha,tint) {
		var layer = this.layers.h[keyframe.layer.__id__];
		layer.pivot.x = keyframe.pivot.x;
		layer.pivot.y = keyframe.pivot.y;
		if(js_Boot.__instanceof(keyframe.symbol,flump_library_SpriteSymbol)) {
			var spriteSymbol = keyframe.symbol;
			layer.pivot.x -= spriteSymbol.origin.x;
			layer.pivot.y -= spriteSymbol.origin.y;
		}
		layer.x = x;
		layer.y = y;
		if(layer.children.length > 0) {
			layer.getChildAt(0).scale.x = scaleX;
			layer.getChildAt(0).scale.y = scaleY;
		} else console.log("WARNING : Movie::renderFrame : " + this.symbol.name + " : " + layer.name + " : empty");
		layer.skew.x = skewX;
		layer.skew.y = skewY;
		layer.alpha = alpha;
		if(tint != 16777215) {
			var _g = 0;
			var _g1 = layer.children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				if(js_Boot.__instanceof(child,PIXI.Sprite)) (js_Boot.__cast(child , PIXI.Sprite)).tint = tint; else if(js_Boot.__instanceof(child,pixi_flump_Movie)) (js_Boot.__cast(child , pixi_flump_Movie)).set_tint(tint);
			}
		}
		if(this.master) {
			layer.x /= this.resolution;
			layer.y /= this.resolution;
			layer.scale.x /= this.resolution;
			layer.scale.y /= this.resolution;
		}
	}
	,setMask: function(layer) {
		if(layer.mask != null) this.layers.h[layer.__id__].mask = this.getLayer(layer.mask).getChildAt(0);
	}
	,labelPassed: function(label) {
		this.emit("labelPassed",label.name);
	}
	,labelHit: function(label) {
		this.emit("labelHit",label.name);
	}
	,destroy: function() {
		this.stop();
		this.set_onComplete(null);
		var $it0 = this.layers.iterator();
		while( $it0.hasNext() ) {
			var layer = $it0.next();
			layer.removeChildren();
		}
		this.symbol = null;
		this.player = null;
		PIXI.Container.prototype.destroy.call(this,true);
	}
	,getCustomData: function() {
		return this.symbol.data;
	}
	,getLayerCustomData: function(layerId,keyframeIndex) {
		if(keyframeIndex == null) keyframeIndex = 0;
		var layer = this.symbol.getLayer(layerId);
		if(layer == null) throw new js__$Boot_HaxeError("Layer " + layerId + " does not exist.");
		var keyframe = this.symbol.getLayer(layerId).getKeyframeForFrame(keyframeIndex);
		if(keyframe == null) throw new js__$Boot_HaxeError("Keyframe does not exist at index " + Std.string(_$UInt_UInt_$Impl_$.toFloat(keyframeIndex)));
		return keyframe.data;
	}
	,__class__: pixi_flump_Movie
	,__properties__: {set_tint:"set_tint",get_totalFrames:"get_totalFrames",set_independantControl:"set_independantControl",get_independantControl:"get_independantControl",set_independantTimeline:"set_independantTimeline",get_independantTimeline:"get_independantTimeline",get_playing:"get_playing",set_currentFrame:"set_currentFrame",get_currentFrame:"get_currentFrame",set_onComplete:"set_onComplete",set_loop:"set_loop",get_symbolId:"get_symbolId",set_resScaleY:"set_resScaleY",get_resScaleY:"get_resScaleY",set_resScaleX:"set_resScaleX",get_resScaleX:"get_resScaleX",set_resY:"set_resY",get_resY:"get_resY",set_resX:"set_resX",get_resX:"get_resX"}
});
var pixi_flump_Parser = function() { };
pixi_flump_Parser.__name__ = true;
pixi_flump_Parser.parse = function(resolution,loadFromCache) {
	return function(resource,next) {
		if(resource.data == null || resource.isJson == false) return;
		if(!Object.prototype.hasOwnProperty.call(resource.data,"md5") || !Object.prototype.hasOwnProperty.call(resource.data,"movies") || !Object.prototype.hasOwnProperty.call(resource.data,"textureGroups") || !Object.prototype.hasOwnProperty.call(resource.data,"frameRate")) return;
		var lib = flump_library_FlumpLibrary.create(resource.data,resolution);
		var textures = new haxe_ds_StringMap();
		var atlasLoader = new PIXI.loaders.Loader();
		atlasLoader.baseUrl = new EReg("/(.[^/]*)$","i").replace(resource.url,"");
		var _g = 0;
		var _g1 = lib.atlases;
		while(_g < _g1.length) {
			var atlasSpec = [_g1[_g]];
			++_g;
			if(loadFromCache != null) atlasSpec[0].file += "?v=" + loadFromCache; else atlasSpec[0].file += "?" + new Date().getTime();
			atlasLoader.add(atlasSpec[0].file,null,(function(atlasSpec) {
				return function(atlasResource) {
					var atlasTexture = new PIXI.BaseTexture(atlasResource.data);
					atlasTexture.resolution = resolution;
					var _g2 = 0;
					var _g3 = atlasSpec[0].textures;
					while(_g2 < _g3.length) {
						var textureSpec = _g3[_g2];
						++_g2;
						var frame = new PIXI.Rectangle(textureSpec.rect[0],textureSpec.rect[1],textureSpec.rect[2],textureSpec.rect[3]);
						var origin = new PIXI.Point(textureSpec.origin[0],textureSpec.origin[1]);
						origin.x = origin.x / frame.width;
						origin.y = origin.y / frame.height;
						var v = new PIXI.Texture(atlasTexture,frame);
						textures.set(textureSpec.symbol,v);
						v;
					}
				};
			})(atlasSpec));
		}
		atlasLoader.once("complete",function(loader) {
			var flumpResource = new pixi_flump_Resource(lib,textures,resource.name,resolution);
			if(resource.name != null) {
				pixi_flump_Resource.resources.set(resource.name,flumpResource);
				flumpResource;
			}
			resource.data = flumpResource;
			next();
		});
		atlasLoader.load();
	};
};
var pixi_flump_Resource = function(library,textures,resourceId,resolution) {
	this.library = library;
	this.textures = textures;
	this.resourceId = resourceId;
	this.resolution = resolution;
};
pixi_flump_Resource.__name__ = true;
pixi_flump_Resource.exists = function(resourceName) {
	return pixi_flump_Resource.resources.exists(resourceName);
};
pixi_flump_Resource.destroy = function(resourceName) {
	if(pixi_flump_Resource.resources.exists(resourceName) == false) throw new js__$Boot_HaxeError("Cannot destroy FlumpResource: " + resourceName + " as it does not exist.");
	var resource = pixi_flump_Resource.resources.get(resourceName);
	var $it0 = resource.textures.iterator();
	while( $it0.hasNext() ) {
		var texture = $it0.next();
		texture.destroy();
	}
	resource.library = null;
	pixi_flump_Resource.resources.remove(resourceName);
};
pixi_flump_Resource.get = function(resourceName) {
	if(!pixi_flump_Resource.resources.exists(resourceName)) throw new js__$Boot_HaxeError("Flump resource: " + resourceName + " does not exist.");
	return pixi_flump_Resource.resources.get(resourceName);
};
pixi_flump_Resource.getResourceForMovie = function(symbolId) {
	var $it0 = pixi_flump_Resource.resources.iterator();
	while( $it0.hasNext() ) {
		var resource = $it0.next();
		if(resource.library.movies.exists(symbolId)) return resource;
	}
	throw new js__$Boot_HaxeError("Movie: " + symbolId + "does not exists in any loaded flump resources.");
};
pixi_flump_Resource.getResourceForSprite = function(symbolId) {
	var $it0 = pixi_flump_Resource.resources.iterator();
	while( $it0.hasNext() ) {
		var resource = $it0.next();
		if(resource.library.sprites.exists(symbolId)) return resource;
	}
	throw new js__$Boot_HaxeError("Sprite: " + symbolId + " does not exists in any loaded flump resources.");
};
pixi_flump_Resource.prototype = {
	createMovie: function(id) {
		var movie;
		if(pixi_flump_Resource.flumpFactory != null && pixi_flump_Resource.flumpFactory.displayClassExists(id)) movie = Type.createInstance(pixi_flump_Resource.flumpFactory.getMovieClass(id),[]); else movie = new pixi_flump_Movie(id,this.resourceId);
		movie.disableAsMaster();
		return movie;
	}
	,createSprite: function(id) {
		if(pixi_flump_Resource.flumpFactory != null && pixi_flump_Resource.flumpFactory.displayClassExists(id)) return Type.createInstance(pixi_flump_Resource.flumpFactory.getSpriteClass(id),[]); else return new pixi_flump_Sprite(id,this.resourceId);
	}
	,createDisplayObject: function(id) {
		var displayObject;
		if(this.library.movies.exists(id)) displayObject = this.createMovie(id); else displayObject = this.createSprite(id);
		displayObject.name = id;
		return displayObject;
	}
	,__class__: pixi_flump_Resource
};
var pixi_flump_Sprite = function(symbolId,resourceId) {
	this.symbolId = symbolId;
	this.resourceId = resourceId;
	var resource;
	if(resourceId != null) {
		resource = pixi_flump_Resource.get(resourceId);
		if(resource == null) throw new js__$Boot_HaxeError("Library: " + resourceId + "does has not been loaded.");
	} else resource = pixi_flump_Resource.getResourceForSprite(symbolId);
	this.resolution = resource.resolution;
	var symbol = resource.library.sprites.get(symbolId);
	var texture = resource.textures.get(symbol.texture);
	PIXI.Sprite.call(this,texture);
	this.anchor.x = symbol.origin.x / texture.width;
	this.anchor.y = symbol.origin.y / texture.height;
};
pixi_flump_Sprite.__name__ = true;
pixi_flump_Sprite.__super__ = PIXI.Sprite;
pixi_flump_Sprite.prototype = $extend(PIXI.Sprite.prototype,{
	get_resX: function() {
		return this.x / this.resolution;
	}
	,set_resX: function(value) {
		this.x = value * this.resolution;
		return value;
	}
	,get_resY: function() {
		return this.y / this.resolution;
	}
	,set_resY: function(value) {
		this.y = value * this.resolution;
		return value;
	}
	,get_resScaleX: function() {
		return this.scale.x / this.resolution;
	}
	,set_resScaleX: function(value) {
		this.scale.x = value * this.resolution;
		return value;
	}
	,get_resScaleY: function() {
		return this.scale.y / this.resolution;
	}
	,set_resScaleY: function(value) {
		this.scale.y = value * this.resolution;
		return value;
	}
	,getCustomData: function() {
		return this.data;
	}
	,__class__: pixi_flump_Sprite
	,__properties__: {set_resScaleY:"set_resScaleY",get_resScaleY:"get_resScaleY",set_resScaleX:"set_resScaleX",get_resScaleX:"get_resScaleX",set_resY:"set_resY",get_resY:"get_resY",set_resX:"set_resX",get_resX:"get_resX"}
});
var vega_assets_AssetDesc = function(pConf,pParent,pMgr) {
	var lGroups;
	var lGroup;
	var lI;
	this.mgr = pMgr;
	if(pConf != null) {
		lGroups = pConf.add_groups;
		this.id = pConf.id;
		this["export"] = pConf["export"];
		this.sharedProperties = new vega_assets_AssetsSharedProperties(pConf);
		this.groups = new haxe_ds_StringMap();
		if(pParent != null) {
			{
				pParent.assets.set(this.id,this);
				this;
			}
			{
				this.groups.set(pParent.id,pParent);
				pParent;
			}
		}
		if(lGroups != null) {
			lI = 0;
			while(lI < lGroups.length) {
				lGroup = pMgr.addGroup(lGroups[lI]);
				{
					lGroup.assets.set(this.id,this);
					this;
				}
				{
					this.groups.set(lGroup.id,lGroup);
					lGroup;
				}
				lI++;
			}
		}
	}
};
vega_assets_AssetDesc.__name__ = true;
vega_assets_AssetDesc.prototype = {
	getAssetInstance: function() {
		var lAssetI;
		if(this.freeInstances.length > 0) {
			lAssetI = this.freeInstances.pop();
			{
				this.usedInstances.set(lAssetI,lAssetI);
				lAssetI;
			}
			return lAssetI;
		} else {
			lAssetI = this.generateInstance();
			if(this.getLockInstance() != "lock_instance") {
				this.usedInstances.set(lAssetI,lAssetI);
				lAssetI;
			}
			return lAssetI;
		}
	}
	,freeAssetInstance: function(pAssetI) {
		if(this.usedInstances.h.__keys__[pAssetI.__id__] != null) {
			this.usedInstances.remove(pAssetI);
			this.freeInstances.push(pAssetI);
		} else pAssetI.destroy();
	}
	,getFile: function() {
		var lDesc;
		var lFile;
		if(this.sharedProperties.file != null) return this.sharedProperties.file; else {
			var $it0 = this.groups.iterator();
			while( $it0.hasNext() ) {
				var lDesc1 = $it0.next();
				lFile = lDesc1.getFile();
				if(lFile != null) return lFile;
			}
		}
		return this.mgr.sharedProperties.file;
	}
	,free: function() {
		var lAsset;
		var _g = 0;
		var _g1 = this.freeInstances;
		while(_g < _g1.length) {
			var lAsset1 = _g1[_g];
			++_g;
			lAsset1.destroy();
		}
		this.freeInstances = null;
		this.usedInstances = null;
	}
	,isMalloc: function() {
		return this.freeInstances != null;
	}
	,getInstanceCount: function() {
		var lGroup;
		var lCount;
		if(this.sharedProperties.instanceCount >= 0) return this.sharedProperties.instanceCount; else {
			var $it0 = this.groups.iterator();
			while( $it0.hasNext() ) {
				var lGroup1 = $it0.next();
				lCount = lGroup1.getInstanceCount();
				if(lCount >= 0) return lCount;
			}
		}
		return this.mgr.sharedProperties.instanceCount;
	}
	,getLockInstance: function() {
		var lGroup;
		var lLock;
		if(this.sharedProperties.lockInstance != "lock_undefined") return this.sharedProperties.lockInstance; else {
			var $it0 = this.groups.iterator();
			while( $it0.hasNext() ) {
				var lGroup1 = $it0.next();
				lLock = lGroup1.getLockInstance();
				if(lLock != "lock_undefined") return lLock;
			}
		}
		return this.mgr.sharedProperties.lockInstance;
	}
	,getRender: function() {
		var lGroup;
		var lRender;
		if(this.sharedProperties.render != null) return this.sharedProperties.render;
		var $it0 = this.groups.iterator();
		while( $it0.hasNext() ) {
			var lGroup1 = $it0.next();
			lRender = lGroup1.getRender();
			if(lRender != null) return lRender;
		}
		return this.mgr.sharedProperties.render;
	}
	,getData: function(pId) {
		var lGroup;
		var lVal;
		if(this.sharedProperties.datas.exists(pId)) return this.sharedProperties.datas.get(pId); else {
			var $it0 = this.groups.iterator();
			while( $it0.hasNext() ) {
				var lGroup1 = $it0.next();
				lVal = lGroup1.getData(pId);
				if(lVal != null) return lVal;
			}
		}
		if(this.mgr.sharedProperties.datas.exists(pId)) return this.mgr.sharedProperties.datas.get(pId); else return null;
	}
	,malloc: function() {
		this.freeInstances = [];
		this.usedInstances = new haxe_ds_ObjectMap();
		this.mallocInstance();
		return true;
	}
	,mallocInstance: function() {
		var lCount = this.getInstanceCount();
		var lI;
		lI = 0;
		while(lI < lCount) {
			this.freeInstances.push(this.generateInstance());
			lI++;
		}
	}
	,generateInstance: function() {
		var lRender = this.getRender();
		if(lRender.render == "default") {
			if(this.getFile() != null && vega_loader_VegaLoaderMgr.getInstance().getLoadingFile(this.getFile().getId()).isIMG()) return new vega_assets_AssetInstance(this,PIXI.Sprite.fromImage(vega_loader_VegaLoaderMgr.getInstance().getLoadingFile(this.getFile().getId()).getUrl()));
		} else if(lRender.render == "flump") {
			if(lRender.type == "mc") return new vega_assets_AssetInstance(this,new pixi_flump_Movie(this["export"])); else if(lRender.type == "sp") return new vega_assets_AssetInstance(this,new pixi_flump_Sprite(this["export"]));
		}
		return new vega_assets_AssetInstance(this,new PIXI.Sprite());
	}
	,__class__: vega_assets_AssetDesc
};
var vega_assets_AssetDescVoid = function(pConf,pParent,pMgr) {
	vega_assets_AssetDesc.call(this,pConf,pParent,pMgr);
	this.id = "asset_vide";
	this["export"] = null;
	this.sharedProperties = new vega_assets_AssetsSharedProperties(null);
	this.groups = new haxe_ds_StringMap();
	this.sharedProperties.instanceCount = 0;
	this.sharedProperties.lockInstance = "lock_instance";
	this.sharedProperties.render = new vega_assets_AssetRender(null);
};
vega_assets_AssetDescVoid.__name__ = true;
vega_assets_AssetDescVoid.__super__ = vega_assets_AssetDesc;
vega_assets_AssetDescVoid.prototype = $extend(vega_assets_AssetDesc.prototype,{
	__class__: vega_assets_AssetDescVoid
});
var vega_assets_AssetGroupDesc = function(pConfig,pParent) {
	if(pConfig != null) this.id = vega_assets_AssetGroupDesc.getId(pConfig); else this.id = null;
	this.childs = new haxe_ds_StringMap();
	this.assets = new haxe_ds_StringMap();
	this.setConfig(pConfig,pParent);
};
vega_assets_AssetGroupDesc.__name__ = true;
vega_assets_AssetGroupDesc.getId = function(pConfig) {
	return pConfig.id;
};
vega_assets_AssetGroupDesc.prototype = {
	setConfig: function(pConfig,pParent) {
		this.sharedProperties = new vega_assets_AssetsSharedProperties(pConfig);
		this.parent = pParent;
		if(pParent != null) {
			pParent.childs.set(this.id,this);
			this;
		}
	}
	,getFile: function() {
		if(this.sharedProperties.file != null) return this.sharedProperties.file; else if(this.parent != null) return this.parent.getFile(); else return null;
	}
	,getInstanceCount: function() {
		if(this.sharedProperties.instanceCount >= 0) return this.sharedProperties.instanceCount; else if(this.parent != null) return this.parent.getInstanceCount(); else return -1;
	}
	,getLockInstance: function() {
		if(this.sharedProperties.lockInstance != "lock_undefined") return this.sharedProperties.lockInstance; else if(this.parent != null) return this.parent.getLockInstance(); else return "lock_undefined";
	}
	,getRender: function() {
		if(this.sharedProperties.render != null) return this.sharedProperties.render; else if(this.parent != null) return this.parent.getRender(); else return null;
	}
	,getData: function(pId) {
		if(this.sharedProperties.datas.exists(pId)) return this.sharedProperties.datas.get(pId); else if(this.parent != null) return this.parent.getData(pId); else return null;
	}
	,__class__: vega_assets_AssetGroupDesc
};
var vega_assets_AssetInstance = function(pDesc,pExport) {
	PIXI.Container.call(this);
	this._desc = pDesc;
	if(pExport != null) {
		this._export = this.addChild(pExport);
		if(js_Boot.__instanceof(this._export,PIXI.Container)) vega_utils_UtilsFlump.recursiveStop(this._export);
	}
};
vega_assets_AssetInstance.__name__ = true;
vega_assets_AssetInstance.__super__ = PIXI.Container;
vega_assets_AssetInstance.prototype = $extend(PIXI.Container.prototype,{
	destroy: function() {
		if(this._export != null) {
			this.removeChild(this._export);
			this._export.destroy();
			this._export = null;
		}
		this._desc = null;
		PIXI.Container.prototype.destroy.call(this);
	}
	,getContent: function() {
		return this._export;
	}
	,getDesc: function() {
		return this._desc;
	}
	,free: function() {
		this._desc.freeAssetInstance(this);
	}
	,__class__: vega_assets_AssetInstance
});
var vega_assets_AssetRender = function(pNode) {
	if(pNode != null) {
		this.render = pNode.name;
		if(pNode.type != null) this.type = pNode.type;
	} else this.render = "default";
};
vega_assets_AssetRender.__name__ = true;
vega_assets_AssetRender.prototype = {
	__class__: vega_assets_AssetRender
};
var vega_assets_AssetVarDesc = function(pVar) {
	var lVals = pVar.value.split(",");
	var lI;
	this.id = pVar.id;
	this.values = [];
	lI = 0;
	while(lI < lVals.length) {
		this.values.push(new vega_assets_VarValue(lVals[lI]));
		lI++;
	}
};
vega_assets_AssetVarDesc.__name__ = true;
vega_assets_AssetVarDesc.prototype = {
	getLen: function() {
		var lLen = 0;
		var lI = 0;
		while(lI < this.values.length) lLen += this.values[lI++].getLen();
		return lLen;
	}
	,getVal: function(pI) {
		var lI;
		lI = 0;
		while(lI < this.values.length) {
			if(pI >= this.values[lI].getLen()) pI -= this.values[lI].getLen(); else break;
			lI++;
		}
		return this.values[lI].getVal(pI);
	}
	,__class__: vega_assets_AssetVarDesc
};
var vega_assets_AssetsMgr = function() {
	this.mallocLimitTime = 500;
	this.vars = null;
	vega_assets_AssetsMgr.instance = this;
};
vega_assets_AssetsMgr.__name__ = true;
vega_assets_AssetsMgr.prototype = {
	init: function(pConfig) {
		this.assets = new haxe_ds_StringMap();
		this.groups = new haxe_ds_StringMap();
		this.voidAsset = new vega_assets_AssetDescVoid(null,null,this);
		this.parseGlobal(pConfig.assets);
		this.parseGroups(pConfig.assets);
		this.voidAsset.malloc();
	}
	,getAssetInstance: function(pId) {
		if(pId != "asset_vide") return this.assets.get(pId).getAssetInstance(); else return this.voidAsset.getAssetInstance();
	}
	,getVar: function(pId) {
		return this.vars.get(pId);
	}
	,addVar: function(pVar) {
		var lVar;
		if(this.vars == null) this.vars = new haxe_ds_StringMap();
		lVar = new vega_assets_AssetVarDesc(pVar);
		{
			this.vars.set(lVar.id,lVar);
			lVar;
		}
	}
	,getAssetDescById: function(pId) {
		if(this.assets.exists(pId)) return this.assets.get(pId); else return null;
	}
	,loadAssets: function(pLoader,pPatterns) {
		var lLoadControl = new haxe_ds_StringMap();
		var lI;
		if(pPatterns != null) {
			lI = 0;
			while(lI < pPatterns.length) {
				this.loadPatternAsset(pLoader,pPatterns[lI],lLoadControl);
				lI++;
			}
		} else this.loadPatternAsset(pLoader,null,lLoadControl);
		return pLoader;
	}
	,mallocAssets: function(pNotifyMalloc,pPatterns) {
		var lMallocControl = new haxe_ds_StringMap();
		var lI;
		var lJ;
		this.notifyMallocAssets = pNotifyMalloc;
		this.mallocStack = [];
		if(pPatterns != null) {
			lI = 0;
			while(lI < pPatterns.length) {
				this.mallocPatternAsset(pPatterns[lI],lMallocControl);
				lI++;
			}
		} else this.mallocPatternAsset(null,lMallocControl);
		if(pNotifyMalloc != null) {
			this.mallocNbAssets = this.mallocStack.length;
			vega_shell_VegaFramer.getInstance().addIterator($bind(this,this.doMallocIteration));
		} else {
			while(this.mallocStack.length > 0) if(this.mallocStack[0].malloc()) this.mallocStack.shift();
			this.mallocStack = null;
		}
	}
	,freeAssets: function(pPatterns) {
		var lPat;
		if(pPatterns != null) {
			var _g = 0;
			while(_g < pPatterns.length) {
				var lPat1 = pPatterns[_g];
				++_g;
				this.freePatternAsset(lPat1);
			}
		} else this.freePatternAsset(null);
	}
	,unloadAssets: function(pIgnoreFile,pPatterns) {
		var lPat;
		var lAsset;
		var lFile;
		if(pIgnoreFile == null) pIgnoreFile = new haxe_ds_StringMap();
		var $it0 = this.assets.iterator();
		while( $it0.hasNext() ) {
			var lAsset1 = $it0.next();
			if(lAsset1.isMalloc()) {
				lFile = lAsset1.getFile();
				if(lFile != null) {
					var k = lFile.getId();
					if(__map_reserved[k] != null) pIgnoreFile.setReserved(k,lFile); else pIgnoreFile.h[k] = lFile;
					lFile;
				}
			}
		}
		if(pPatterns != null) {
			var _g = 0;
			while(_g < pPatterns.length) {
				var lPat1 = pPatterns[_g];
				++_g;
				this.unloadPatternAsset(lPat1,pIgnoreFile);
			}
		} else this.unloadPatternAsset(null,pIgnoreFile);
	}
	,doMallocIteration: function(pTime) {
		var lNotify = this.notifyMallocAssets;
		var lStartTime;
		if(this.mallocStack != null) {
			lStartTime = new Date().getTime();
			do {
				lNotify.onMallocAssetsProgress(this.mallocNbAssets - this.mallocStack.length,this.mallocNbAssets);
				if(this.mallocStack.length == 0) {
					vega_shell_VegaFramer.getInstance().remIterator($bind(this,this.doMallocIteration));
					this.mallocStack = null;
					this.notifyMallocAssets = null;
					lNotify.onMallocAssetsEnd();
					break;
				} else if(this.mallocStack[0].malloc()) this.mallocStack.shift(); else break;
			} while(new Date().getTime() - lStartTime < this.mallocLimitTime);
		}
	}
	,addGroup: function(pId) {
		var lGroup;
		if(this.groups.exists(pId)) return this.groups.get(pId); else {
			lGroup = new vega_assets_AssetGroupDesc();
			lGroup.id = pId;
			{
				this.groups.set(pId,lGroup);
				lGroup;
			}
			return lGroup;
		}
	}
	,addAsset: function(pADesc) {
		{
			this.assets.set(pADesc.id,pADesc);
			pADesc;
		}
	}
	,freePatternAsset: function(pPattern) {
		var lAsset;
		var $it0 = this.assets.iterator();
		while( $it0.hasNext() ) {
			var lAsset1 = $it0.next();
			if(pPattern == null || pPattern.match(lAsset1)) lAsset1.free();
		}
	}
	,unloadPatternAsset: function(pPattern,pControlFile) {
		var lI;
		var lAsset;
		var lFile;
		var $it0 = this.assets.iterator();
		while( $it0.hasNext() ) {
			var lAsset1 = $it0.next();
			if(!lAsset1.isMalloc() && (pPattern == null || pPattern.match(lAsset1))) {
				lFile = lAsset1.getFile();
				if(lFile != null) {
					if(!(function($this) {
						var $r;
						var key = lFile.getId();
						$r = __map_reserved[key] != null?pControlFile.existsReserved(key):pControlFile.h.hasOwnProperty(key);
						return $r;
					}(this))) {
						var k = lFile.getId();
						if(__map_reserved[k] != null) pControlFile.setReserved(k,lFile); else pControlFile.h[k] = lFile;
						lFile;
						vega_loader_VegaLoaderMgr.getInstance().freeLoadedFileMem(lFile);
					}
				}
			}
		}
	}
	,mallocPatternAsset: function(pPattern,pControl) {
		var lI;
		var lAsset;
		var $it0 = this.assets.keys();
		while( $it0.hasNext() ) {
			var lI1 = $it0.next();
			lAsset = this.assets.get(lI1);
			if((__map_reserved[lI1] != null?pControl.getReserved(lI1):pControl.h[lI1]) == null && (pPattern == null || pPattern.match(lAsset))) {
				{
					if(__map_reserved[lI1] != null) pControl.setReserved(lI1,lAsset); else pControl.h[lI1] = lAsset;
					lAsset;
				}
				this.mallocStack.push(lAsset);
			}
		}
	}
	,loadPatternAsset: function(pLoader,pPattern,pLoadControl) {
		var lI;
		var lAsset;
		var lFile;
		var $it0 = this.assets.keys();
		while( $it0.hasNext() ) {
			var lI1 = $it0.next();
			lAsset = this.assets.get(lI1);
			if(pPattern == null || pPattern.match(lAsset)) {
				lFile = lAsset.getFile();
				if(lFile != null && !(function($this) {
					var $r;
					var key = lFile.getId();
					$r = __map_reserved[key] != null?pLoadControl.existsReserved(key):pLoadControl.h.hasOwnProperty(key);
					return $r;
				}(this))) {
					var k = lFile.getId();
					if(__map_reserved[k] != null) pLoadControl.setReserved(k,lFile); else pLoadControl.h[k] = lFile;
					lFile;
					if(lAsset.getRender().render == "flump") pLoader.addFlumpFile(lFile); else pLoader.addDisplayFile(lFile);
				}
			}
		}
	}
	,parseAssets: function(pConfig,pParent) {
		var lAssets = pConfig.assets;
		var lI;
		var lIPool;
		var lLPool;
		var lAsset;
		var lPool;
		var lAssetD;
		if(lAssets != null) {
			lI = 0;
			while(lI < lAssets.length) {
				lAsset = lAssets[lI];
				lPool = this.getVarPool(lAsset);
				lLPool = lPool.getLen();
				lIPool = 0;
				while(lIPool < lLPool) {
					lAssetD = new vega_assets_AssetDesc(lPool.substituteVars(lAsset,lIPool),pParent,this);
					{
						this.assets.set(lAssetD.id,lAssetD);
						lAssetD;
					}
					lIPool++;
				}
				lI++;
			}
		}
	}
	,parseGroups: function(pConfig,pParent) {
		var lGroups = pConfig.groups;
		var lGroup;
		var lAGroup;
		var lI;
		this.parseAssets(pConfig,pParent);
		if(lGroups != null) {
			lI = 0;
			while(lI < lGroups.length) {
				lGroup = lGroups[lI];
				lAGroup = new vega_assets_AssetGroupDesc(lGroup,pParent);
				if((function($this) {
					var $r;
					var key = vega_assets_AssetGroupDesc.getId(lGroup);
					$r = $this.groups.get(key);
					return $r;
				}(this)) != null) {
					var key1 = vega_assets_AssetGroupDesc.getId(lGroup);
					lAGroup = this.groups.get(key1);
					lAGroup.setConfig(lGroup,pParent);
				} else {
					lAGroup = new vega_assets_AssetGroupDesc(lGroup,pParent);
					{
						this.groups.set(lAGroup.id,lAGroup);
						lAGroup;
					}
				}
				this.parseGroups(lGroup,lAGroup);
				lI++;
			}
		}
	}
	,parseGlobal: function(pConfig) {
		this.sharedProperties = new vega_assets_AssetsSharedProperties(pConfig);
		if(this.sharedProperties.render == null) this.sharedProperties.render = new vega_assets_AssetRender(null);
		if(this.sharedProperties.instanceCount < 0) this.sharedProperties.instanceCount = 1;
		if(this.sharedProperties.lockInstance == "lock_undefined") this.sharedProperties.lockInstance = "unlock_instance";
		this.buildVars(pConfig);
	}
	,buildVars: function(pConfig) {
		var lVars = pConfig.vars;
		var lVar;
		var lI;
		if(this.vars == null) this.vars = new haxe_ds_StringMap();
		if(lVars != null) {
			lI = 0;
			while(lI < lVars.length) {
				lVar = new vega_assets_AssetVarDesc(lVars[lI]);
				{
					this.vars.set(lVar.id,lVar);
					lVar;
				}
				lI++;
			}
		}
	}
	,getVarPool: function(pNode) {
		var lStr = JSON.stringify(pNode);
		var lPool = new vega_assets_VarPool();
		var lDesc;
		var $it0 = this.vars.iterator();
		while( $it0.hasNext() ) {
			var lDesc1 = $it0.next();
			if(lStr.indexOf(lDesc1.id) >= 0) lPool.addVar(this.vars.get(lDesc1.id));
		}
		return lPool;
	}
	,__class__: vega_assets_AssetsMgr
};
var vega_assets_AssetsSharedProperties = function(pConfig) {
	if(pConfig != null) this.file = this.parseFile(pConfig); else this.file = null;
	if(pConfig != null) this.render = this.parseRender(pConfig); else this.render = null;
	if(pConfig != null) this.instanceCount = this.parseInstanceCount(pConfig); else this.instanceCount = -1;
	if(pConfig != null) this.lockInstance = this.parseLockInstance(pConfig); else this.lockInstance = "lock_undefined";
	if(pConfig != null) this.datas = this.parseDatas(pConfig); else this.datas = new haxe_ds_StringMap();
};
vega_assets_AssetsSharedProperties.__name__ = true;
vega_assets_AssetsSharedProperties.prototype = {
	parseFile: function(pNode) {
		var lFile = pNode.file;
		if(lFile != null && lFile.name != null) return new vega_loader_file_MyFile(lFile.name,lFile.path,lFile.version); else return null;
	}
	,parseRender: function(pNode) {
		if(pNode.render != null) return new vega_assets_AssetRender(pNode.render); else return null;
	}
	,parseInstanceCount: function(pNode) {
		if(pNode.instance != null) return Std.parseInt(pNode.instance); else return -1;
	}
	,parseLockInstance: function(pNode) {
		if(pNode.lock_instance != null && pNode.lock_instance != "0") return "lock_instance"; else if(pNode.unlock_instance != null && pNode.unlock_instance != "0") return "unlock_instance"; else return "lock_undefined";
	}
	,parseDatas: function(pNode) {
		var lDatas = pNode.datas;
		var lRes = new haxe_ds_StringMap();
		var lData;
		if(lDatas != null) {
			var _g = 0;
			while(_g < lDatas.length) {
				var lData1 = lDatas[_g];
				++_g;
				var k = lData1.id;
				var v = lData1.value;
				if(__map_reserved[k] != null) lRes.setReserved(k,v); else lRes.h[k] = v;
				v;
			}
		}
		return lRes;
	}
	,__class__: vega_assets_AssetsSharedProperties
};
var vega_assets_INotifyMallocAssets = function() { };
vega_assets_INotifyMallocAssets.__name__ = true;
vega_assets_INotifyMallocAssets.prototype = {
	__class__: vega_assets_INotifyMallocAssets
};
var vega_assets_NotifyMallocAssets = function(pOnEnd,pOnProgress) {
	this._onEnd = pOnEnd;
	this._onProgress = pOnProgress;
};
vega_assets_NotifyMallocAssets.__name__ = true;
vega_assets_NotifyMallocAssets.__interfaces__ = [vega_assets_INotifyMallocAssets];
vega_assets_NotifyMallocAssets.prototype = {
	onMallocAssetsProgress: function(pCurrent,pTotal) {
		if(this._onProgress != null) this._onProgress(pCurrent,pTotal);
	}
	,onMallocAssetsEnd: function() {
		if(this._onEnd != null) {
			this._onEnd();
			this._onEnd = null;
			this._onProgress = null;
		}
	}
	,__class__: vega_assets_NotifyMallocAssets
};
var vega_assets_PatternAsset = function(pFind,pTypeFind,pTypeMatch) {
	if(pTypeMatch == null) pTypeMatch = "matchSubstr";
	if(pTypeFind == null) pTypeFind = "findOnId";
	this.find = pFind;
	this.typeFind = pTypeFind;
	this.typeMatch = pTypeMatch;
};
vega_assets_PatternAsset.__name__ = true;
vega_assets_PatternAsset.prototype = {
	match: function(pAsset) {
		var lDesc;
		if(this.typeFind == "findOnGroup") {
			var $it0 = pAsset.groups.iterator();
			while( $it0.hasNext() ) {
				var lDesc1 = $it0.next();
				if(this.matchGroup(lDesc1)) return true;
			}
		} else if(this.typeFind == "findOnId") return this.cmpStr(pAsset.id); else if(this.typeFind == "findOnFile") return this.cmpStr(pAsset.getFile().getId()); else if(this.typeFind == "findOnExport") return this.cmpStr(pAsset["export"]);
		return false;
	}
	,matchGroup: function(pGroup) {
		if(pGroup == null) return false; else if(this.cmpStr(pGroup.id)) return true; else return this.matchGroup(pGroup.parent);
	}
	,cmpStr: function(pStr) {
		if(this.typeMatch == "matchAll") return pStr == this.find; else return pStr != null && pStr.indexOf(this.find) >= 0;
	}
	,__class__: vega_assets_PatternAsset
};
var vega_assets_VarPool = function() {
	this.vars = [];
};
vega_assets_VarPool.__name__ = true;
vega_assets_VarPool.prototype = {
	addVar: function(pVar) {
		this.vars.push(pVar);
	}
	,getLen: function() {
		var lCard = 1;
		var lI;
		lI = 0;
		while(lI < this.vars.length) {
			lCard *= this.vars[lI].getLen();
			lI++;
		}
		return lCard;
	}
	,substituteVars: function(pNode,pIPool) {
		var lStr;
		var lMap;
		var lI;
		if(this.vars.length > 0) {
			lStr = JSON.stringify(pNode);
			lMap = this.getVarValAt(pIPool);
			var $it0 = lMap.keys();
			while( $it0.hasNext() ) {
				var lI1 = $it0.next();
				lStr = StringTools.replace(lStr,lI1,__map_reserved[lI1] != null?lMap.getReserved(lI1):lMap.h[lI1]);
			}
			return JSON.parse(lStr);
		} else return pNode;
	}
	,getVarValAt: function(pI) {
		var lMap = new haxe_ds_StringMap();
		var lI;
		lI = 0;
		while(lI < this.vars.length) {
			var v = this.vars[lI].getVal(pI % this.vars[lI].getLen());
			lMap.set(this.vars[lI].id,v);
			v;
			pI = Std["int"](pI / this.vars[lI].getLen());
			lI++;
		}
		return lMap;
	}
	,__class__: vega_assets_VarPool
};
var vega_assets_VarValue = function(pVal) {
	this.value = pVal;
};
vega_assets_VarValue.__name__ = true;
vega_assets_VarValue.prototype = {
	getLen: function() {
		var lVals = this.value.split("..");
		if(lVals.length == 1) return 1; else return Std.parseInt(lVals[1]) - Std.parseInt(lVals[0]) + 1;
	}
	,getVal: function(pI) {
		var lVals = this.value.split("..");
		var lFrom;
		var lRes;
		var lResTxt;
		var lI;
		var lLen;
		if(lVals.length == 1) return this.value; else {
			lFrom = Std.parseInt(lVals[0]);
			lRes = lFrom + pI;
			lLen = lVals[0].length;
			if((lFrom == null?"null":"" + lFrom).length < lLen) {
				if(lRes == null) lResTxt = "null"; else lResTxt = "" + lRes;
				lI = lResTxt.length;
				while(lI < lLen) {
					lResTxt = "0" + lResTxt;
					lI++;
				}
				return lResTxt;
			} else if(lRes == null) return "null"; else return "" + lRes;
		}
	}
	,__class__: vega_assets_VarValue
};
var vega_loader_IVegaLoaderListener = function() { };
vega_loader_IVegaLoaderListener.__name__ = true;
vega_loader_IVegaLoaderListener.prototype = {
	__class__: vega_loader_IVegaLoaderListener
};
var vega_loader_VegaLoader = function() {
	this.fileLoads = [];
	this.currentLoadedFileI = 0;
};
vega_loader_VegaLoader.__name__ = true;
vega_loader_VegaLoader.prototype = {
	destroy: function() {
		var lI;
		if(this.fileLoads != null) {
			lI = this.currentLoadedFileI;
			while(lI < this.fileLoads.length) this.fileLoads[lI++].free();
		}
		this.fileLoads = null;
		this.listener = null;
	}
	,addFlumpFile: function(pFile) {
		this.fileLoads.push(new vega_loader_file_LoadingFileFlump(pFile));
	}
	,addDisplayFile: function(pFile) {
		this.fileLoads.push(new vega_loader_file_LoadingFileDisplay(pFile));
	}
	,addTxtFile: function(pFile) {
		this.fileLoads.push(new vega_loader_file_LoadingFileTxt(pFile));
	}
	,addFontFile: function(pFontId,pFontCss) {
		this.fileLoads.push(new vega_loader_file_LoadingFileFont(pFontId,pFontCss));
	}
	,addHowlFile: function(pSndDesc) {
		this.fileLoads.push(new vega_loader_file_LoadingFileHowl(pSndDesc));
	}
	,load: function(pListener) {
		this.listener = pListener;
		this.currentLoadedFileI = -1;
		this.loadNext();
	}
	,getProgressRate: function() {
		return this.currentLoadedFileI / this.fileLoads.length;
	}
	,onCurFileLoaded: function(pDoRegister) {
		if(pDoRegister == null) pDoRegister = true;
		var lLoadedFile = this.fileLoads[this.currentLoadedFileI];
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : VegaLoader::onCurFileLoaded : " + lLoadedFile.getId());
		if(pDoRegister) vega_loader_VegaLoaderMgr.getInstance().regLoadedFile(lLoadedFile);
		this.notifyLoadCurrentFileComplete();
		this.loadNext();
	}
	,loadNext: function() {
		var lCurLoad;
		if(this.fileLoads != null) {
			this.currentLoadedFileI++;
			if(this.currentLoadedFileI < this.fileLoads.length) {
				lCurLoad = this.fileLoads[this.currentLoadedFileI];
				if(vega_loader_VegaLoaderMgr.getInstance().isAlreadyLoaded(lCurLoad.getId())) {
					vega_shell_ApplicationMatchSize.instance.traceDebug("WARNING : VegaLoader::loadNext : " + lCurLoad.getId() + " : already loaded, next");
					this.notifyLoadCurrentFileComplete();
					this.loadNext();
				} else {
					vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : VegaLoader::loadNext : " + lCurLoad.getId());
					lCurLoad.load(this);
				}
			} else this.finalizeLoading();
		}
	}
	,notifyLoadCurrentFileComplete: function() {
		this.listener.onCurrentFileLoaded(this);
	}
	,notifyLoadComplete: function() {
		this.listener.onLoadComplete(this);
	}
	,finalizeLoading: function() {
		this.notifyLoadComplete();
		this.destroy();
	}
	,__class__: vega_loader_VegaLoader
};
var vega_loader_VegaLoaderListener = function(pOnLoadComplete,pOnLoadProgress,pOnCurrentFileLoaded,pOnLoadError) {
	this._onLoadComplete = pOnLoadComplete;
	this._onLoadProgress = pOnLoadProgress;
	this._onCurrentFileLoaded = pOnCurrentFileLoaded;
	this._onLoadError = pOnLoadError;
};
vega_loader_VegaLoaderListener.__name__ = true;
vega_loader_VegaLoaderListener.__interfaces__ = [vega_loader_IVegaLoaderListener];
vega_loader_VegaLoaderListener.prototype = {
	onLoadProgress: function(pLoader) {
		if(this._onLoadProgress != null) this._onLoadProgress(pLoader);
	}
	,onLoadComplete: function(pLoader) {
		if(this._onLoadComplete != null) {
			this._onLoadComplete(pLoader);
			this._onLoadComplete = null;
			this._onLoadProgress = null;
			this._onCurrentFileLoaded = null;
			this._onLoadError = null;
		}
	}
	,onCurrentFileLoaded: function(pLoader) {
		if(this._onCurrentFileLoaded != null) this._onCurrentFileLoaded(pLoader);
	}
	,onLoadError: function(pLoader) {
		if(this._onLoadError != null) this._onLoadError(pLoader);
	}
	,__class__: vega_loader_VegaLoaderListener
};
var vega_loader_VegaLoaderMgr = function() {
	this.loadedFiles = new haxe_ds_StringMap();
};
vega_loader_VegaLoaderMgr.__name__ = true;
vega_loader_VegaLoaderMgr.getInstance = function() {
	if(vega_loader_VegaLoaderMgr.instance == null) vega_loader_VegaLoaderMgr.instance = new vega_loader_VegaLoaderMgr();
	return vega_loader_VegaLoaderMgr.instance;
};
vega_loader_VegaLoaderMgr.prototype = {
	getLoadingFile: function(pFileId) {
		if(this.isAlreadyLoaded(pFileId)) return this.loadedFiles.get(pFileId); else return null;
	}
	,isAlreadyLoaded: function(pFileId) {
		return this.loadedFiles.get(pFileId) != null;
	}
	,regLoadedFile: function(pLoadedFile) {
		if((function($this) {
			var $r;
			var key = pLoadedFile.getId();
			$r = $this.loadedFiles.exists(key);
			return $r;
		}(this))) vega_shell_ApplicationMatchSize.instance.traceDebug("WARNING : VegaLoaderMgr::regLoadedFile : file already exists " + pLoadedFile.getId() + ", ignore"); else {
			var k = pLoadedFile.getId();
			this.loadedFiles.set(k,pLoadedFile);
			pLoadedFile;
		}
	}
	,freeLoadedFileMem: function(pFile) {
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : VegaLoaderMgr::freeLoadedFileMem : " + pFile.getId());
		((function($this) {
			var $r;
			var key = pFile.getId();
			$r = $this.loadedFiles.get(key);
			return $r;
		}(this))).free();
		var key1 = pFile.getId();
		this.loadedFiles.remove(key1);
	}
	,__class__: vega_loader_VegaLoaderMgr
};
var vega_loader_file_LoadingFile = function(pFile) {
	this._file = pFile;
	this.buildLoader();
};
vega_loader_file_LoadingFile.__name__ = true;
vega_loader_file_LoadingFile.getVersionUrl = function(pFile) {
	var lVer = pFile.getVersion();
	if(lVer != null) {
		if(lVer != "NO-VERSION") {
			if(lVer == "NO-CACHE") return Std.string(new Date().getTime()); else return lVer;
		}
	}
	return "";
};
vega_loader_file_LoadingFile.addVersionToUrl = function(pUrl,pVersion) {
	if(pVersion != null && pVersion != "") {
		if(pUrl.indexOf("?") != -1) return pUrl + "&" + vega_loader_file_LoadingFile.VERSION_PARAM + "=" + pVersion; else return pUrl + "?" + vega_loader_file_LoadingFile.VERSION_PARAM + "=" + pVersion;
	}
	return pUrl;
};
vega_loader_file_LoadingFile.prototype = {
	free: function() {
		if(this.vegaLoader != null) this.removeLoaderListener();
		this.vegaLoader = null;
		this._file = null;
		this.freeLoader();
	}
	,getId: function() {
		return this._file.getId();
	}
	,load: function(pLoader) {
		this.vegaLoader = pLoader;
		this.doLoad();
	}
	,getLoadedContent: function(pId) {
		if(this.loader != null && !this.loader.loading && this.loader.progress > 0) return Reflect.getProperty(this.loader.resources,this._file.getId()).data; else return null;
	}
	,isIMG: function() {
		return Reflect.getProperty(this.loader.resources,this._file.getId()).isImage;
	}
	,getUrl: function() {
		return Reflect.getProperty(this.loader.resources,this._file.getId()).url;
	}
	,buildLoader: function() {
		this.loader = new PIXI.loaders.Loader();
		this.loader.add(this._file.getId(),this.getUrlRequest());
	}
	,freeLoader: function() {
		if(this.loader != null) {
			this.loader.reset();
			this.loader = null;
		}
	}
	,doLoad: function() {
		this.loader.load($bind(this,this.onLoadComplete));
	}
	,removeLoaderListener: function() {
		this.loader.removeAllListeners();
	}
	,onLoadComplete: function() {
		if(Reflect.getProperty(this.loader.resources,this._file.getId()).error == null) {
			console.log(Reflect.getProperty(this.loader.resources,this._file.getId()));
			this.removeLoaderListener();
			this.vegaLoader.onCurFileLoaded();
			this.vegaLoader = null;
		} else {
			vega_shell_ApplicationMatchSize.instance.traceDebug("ERROR : LoadingFile::onLoadComplete : " + this._file.getId() + " : " + Std.string(Reflect.getProperty(this.loader.resources,this._file.getId()).error));
			this.loader.reset();
			this.loader.add(this._file.getId(),this.getUrlRequest());
			this.loader.load($bind(this,this.onLoadComplete));
		}
	}
	,getUrlRequest: function() {
		var lName = this._file.getName();
		var lPath;
		if(this._file.getPath() != null) lPath = this._file.getPath(); else lPath = "";
		var lUrl;
		if(lName.indexOf("://") != -1) lUrl = lName; else lUrl = lPath + lName;
		lUrl = vega_loader_file_LoadingFile.addVersionToUrl(lUrl,vega_loader_file_LoadingFile.getVersionUrl(this._file));
		return lUrl;
	}
	,__class__: vega_loader_file_LoadingFile
};
var vega_loader_file_LoadingFileDisplay = function(pFile) {
	vega_loader_file_LoadingFile.call(this,pFile);
};
vega_loader_file_LoadingFileDisplay.__name__ = true;
vega_loader_file_LoadingFileDisplay.__super__ = vega_loader_file_LoadingFile;
vega_loader_file_LoadingFileDisplay.prototype = $extend(vega_loader_file_LoadingFile.prototype,{
	free: function() {
		PIXI.Texture.removeTextureFromCache(this.getUrl()).destroy(true);
		vega_loader_file_LoadingFile.prototype.free.call(this);
	}
	,__class__: vega_loader_file_LoadingFileDisplay
});
var vega_loader_file_LoadingFileFlump = function(pFile) {
	vega_loader_file_LoadingFile.call(this,pFile);
};
vega_loader_file_LoadingFileFlump.__name__ = true;
vega_loader_file_LoadingFileFlump.__super__ = vega_loader_file_LoadingFile;
vega_loader_file_LoadingFileFlump.prototype = $extend(vega_loader_file_LoadingFile.prototype,{
	free: function() {
		pixi_flump_Resource.destroy(this.getId());
		vega_loader_file_LoadingFile.prototype.free.call(this);
	}
	,buildLoader: function() {
		vega_loader_file_LoadingFile.prototype.buildLoader.call(this);
		this.loader.after(pixi_flump_Parser.parse(1,vega_loader_file_LoadingFile.getVersionUrl(this._file)));
	}
	,__class__: vega_loader_file_LoadingFileFlump
});
var vega_loader_file_LoadingFileFont = function(pFontId,pFontCss) {
	vega_loader_file_LoadingFile.call(this,pFontCss);
	this.fontId = pFontId;
};
vega_loader_file_LoadingFileFont.__name__ = true;
vega_loader_file_LoadingFileFont.__super__ = vega_loader_file_LoadingFile;
vega_loader_file_LoadingFileFont.prototype = $extend(vega_loader_file_LoadingFile.prototype,{
	doLoad: function() {
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : LoadingFileFont::doLoad : " + this.fontId + " : " + this.getUrlRequest());
		WebFont.load({ 'custom' : { 'families' : [this.fontId], 'urls' : [this.getUrlRequest()]}, 'active' : $bind(this,this.onLoadComplete)});
	}
	,onLoadComplete: function() {
		this.vegaLoader.onCurFileLoaded();
		this.vegaLoader = null;
	}
	,buildLoader: function() {
	}
	,removeLoaderListener: function() {
	}
	,__class__: vega_loader_file_LoadingFileFont
});
var vega_loader_file_LoadingFileHowl = function(pSndDesc) {
	this.ctrReload = 0;
	this.desc = null;
	this.desc = pSndDesc;
	vega_loader_file_LoadingFile.call(this,null);
};
vega_loader_file_LoadingFileHowl.__name__ = true;
vega_loader_file_LoadingFileHowl.__super__ = vega_loader_file_LoadingFile;
vega_loader_file_LoadingFileHowl.prototype = $extend(vega_loader_file_LoadingFile.prototype,{
	getId: function() {
		return this.desc.getId();
	}
	,getLoadedContent: function(pId) {
		return this.desc.getHowl();
	}
	,isIMG: function() {
		return false;
	}
	,doLoad: function() {
		var lOptions = this.desc.getOptions();
		lOptions.autoplay = false;
		lOptions.preload = false;
		this.desc.regHowl(new Howl(this.desc.getOptions()));
		this.desc.getHowl().on("load",$bind(this,this.onLoadComplete));
		this.desc.getHowl().on("loaderror",$bind(this,this.onLoadError));
		this.desc.getHowl().load();
	}
	,buildLoader: function() {
	}
	,freeLoader: function() {
		this.desc = null;
	}
	,removeLoaderListener: function() {
		this.desc.getHowl().off("load",$bind(this,this.onLoadComplete));
		this.desc.getHowl().off("loaderror",$bind(this,this.onLoadError));
	}
	,onLoadComplete: function() {
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : LoadingFileHowl::onLoadComplete  : " + this.desc.getId());
		this.removeLoaderListener();
		this.vegaLoader.onCurFileLoaded();
		this.vegaLoader = null;
		vega_sound_SndMgr.getInstance().addSndDesc(this.desc);
	}
	,onLoadError: function() {
		if(this.ctrReload++ < 20) {
			vega_shell_ApplicationMatchSize.instance.traceDebug("ERROR : LoadingFileHowl::onLoadError : " + this.desc.getId() + " : retry " + this.ctrReload);
			this.desc.getHowl().load();
		} else {
			vega_shell_ApplicationMatchSize.instance.traceDebug("ERROR : LoadingFileHowl::onLoadError : " + this.desc.getId() + " : skip !");
			this.removeLoaderListener();
			this.vegaLoader.onCurFileLoaded(false);
			this.vegaLoader = null;
			vega_sound_SndMgr.getInstance().addSndDesc(this.desc);
			this.free();
		}
	}
	,__class__: vega_loader_file_LoadingFileHowl
});
var vega_loader_file_LoadingFileTxt = function(pFile) {
	vega_loader_file_LoadingFile.call(this,pFile);
};
vega_loader_file_LoadingFileTxt.__name__ = true;
vega_loader_file_LoadingFileTxt.__super__ = vega_loader_file_LoadingFile;
vega_loader_file_LoadingFileTxt.prototype = $extend(vega_loader_file_LoadingFile.prototype,{
	__class__: vega_loader_file_LoadingFileTxt
});
var vega_loader_file_MyFile = function(pName,pPath,pVersion) {
	this._name = pName;
	this._path = pPath;
	if(pVersion != null) this._version = pVersion; else this._version = vega_shell_ApplicationMatchSize.instance.version;
};
vega_loader_file_MyFile.__name__ = true;
vega_loader_file_MyFile.prototype = {
	getId: function() {
		return (this._path != null?this._path + ":":"") + this._name;
	}
	,getName: function() {
		return this._name;
	}
	,getPath: function() {
		return this._path;
	}
	,getVersion: function() {
		return this._version;
	}
	,__class__: vega_loader_file_MyFile
};
var vega_local_LocalMgr = function(pConf,pLang) {
	this.listeners = null;
	this.conf = null;
	this.TXT_PREFIX = "txt";
	this.TXT_SEP = "_";
	var lLocal;
	vega_local_LocalMgr.instance = this;
	if(pConf.documentElement != null) this.conf = this.xml2Json(pConf); else this.conf = pConf.local;
	console.log(this.conf);
	this.listeners = [];
	if(pLang == null && typeof(window) != "undefined") pLang = window.navigator.language;
	var _g = 0;
	var _g1 = Reflect.fields(this.conf);
	while(_g < _g1.length) {
		var lLocal1 = _g1[_g];
		++_g;
		if(lLocal1 == pLang) {
			this.defaultLang = lLocal1;
			break;
		}
	}
	if(this.defaultLang == null) this.defaultLang = Reflect.fields(this.conf)[0];
	vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : LocalMgr::LocalMgr : defaultLang = " + this.defaultLang,true);
};
vega_local_LocalMgr.__name__ = true;
vega_local_LocalMgr.prototype = {
	xml2Json: function(pXmlData) {
		var lRes = { };
		var lInd1 = 0;
		var lInd2;
		while(lInd1 < pXmlData.documentElement.childNodes.length) {
			if(pXmlData.documentElement.childNodes[lInd1].nodeType == 1) {
				lRes[pXmlData.documentElement.childNodes[lInd1].nodeName] = { };
				lInd2 = 0;
				while(lInd2 < pXmlData.documentElement.childNodes[lInd1].childNodes.length) {
					if(pXmlData.documentElement.childNodes[lInd1].childNodes[lInd2].nodeType == 1) Reflect.setField(lRes[pXmlData.documentElement.childNodes[lInd1].nodeName],pXmlData.documentElement.childNodes[lInd1].childNodes[lInd2].getAttribute("id"),pXmlData.documentElement.childNodes[lInd1].childNodes[lInd2].firstChild.data);
					lInd2++;
				}
			}
			lInd1++;
		}
		return lRes;
	}
	,getCurLangId: function() {
		return this.defaultLang;
	}
	,getCurLangInd: function() {
		var lCtr = 0;
		var lLocal;
		var _g = 0;
		var _g1 = Reflect.fields(this.conf);
		while(_g < _g1.length) {
			var lLocal1 = _g1[_g];
			++_g;
			if(lLocal1 == this.defaultLang) return lCtr; else lCtr++;
		}
		vega_shell_ApplicationMatchSize.instance.traceDebug("ERROR : LocalMgr::getCurLangInd : " + this.defaultLang + " not found !");
		return -1;
	}
	,fromIndToId: function(pInd) {
		var lCtr = 0;
		var lLocal;
		var _g = 0;
		var _g1 = Reflect.fields(this.conf);
		while(_g < _g1.length) {
			var lLocal1 = _g1[_g];
			++_g;
			if(lCtr == pInd) return lLocal1; else lCtr++;
		}
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : LocalMgr::fromIndToId : " + pInd + " out of bounds");
		return null;
	}
	,getNbLangs: function() {
		var lCtr = 0;
		var lLocal;
		var _g = 0;
		var _g1 = Reflect.fields(this.conf);
		while(_g < _g1.length) {
			var lLocal1 = _g1[_g];
			++_g;
			lCtr++;
		}
		return lCtr;
	}
	,swapLang: function(pLangId,pNoDispatch) {
		if(pNoDispatch == null) pNoDispatch = false;
		var lListener;
		if(pLangId != this.defaultLang) {
			this.defaultLang = pLangId;
			if(!pNoDispatch) {
				var _g = 0;
				var _g1 = this.listeners;
				while(_g < _g1.length) {
					var lListener1 = _g1[_g];
					++_g;
					lListener1();
				}
			}
		}
	}
	,addListener: function(pListener) {
		this.listeners.push(pListener);
	}
	,remListener: function(pListener) {
		HxOverrides.remove(this.listeners,pListener);
	}
	,getLocalTxt: function(pId,pForceLang) {
		if(pId == null || pId == "") return "";
		if(pForceLang == null) pForceLang = this.defaultLang;
		return Reflect.getProperty(Reflect.getProperty(this.conf,pForceLang),pId);
	}
	,instanciateTxtFromFlumpModel: function(pTxtId,pModelInstance,pVal) {
		var lLayer = vega_utils_UtilsFlump.getLayerWithPrefixInMovie(pTxtId,pModelInstance);
		var lLayerCont = pModelInstance.getLayer(lLayer.name).getChildAt(0);
		var lDesc = new vega_local_TxtDescFlump(lLayer.name);
		var lParams;
		var lTxt;
		lParams = { 'font' : lDesc.size + "px " + lDesc.fontId, 'fill' : lDesc.color, 'align' : lDesc.align, 'padding' : lDesc.size};
		this.addWordWrapParams(lDesc,lParams);
		lTxt = new PIXI.Text(pVal == null?this.getLocalTxt(lDesc.localId):pVal,lParams);
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : LocalMgr::instanciateTxtFromFlumpModel : " + lDesc.localId + " : " + lTxt.text);
		lLayerCont.addChild(lTxt);
		lLayerCont.interactiveChildren = false;
		this.alignTxt(lTxt,lDesc);
		return lTxt;
	}
	,parseAndSetLocalTxtInMovie: function(pCont) {
		var lLayers = vega_utils_UtilsFlump.getLayersWithPrefixInMovie(this.TXT_PREFIX,pCont);
		var lLayer;
		var _g = 0;
		while(_g < lLayers.length) {
			var lLayer1 = lLayers[_g];
			++_g;
			try {
				this.instanciateTxtFromFlumpModel(lLayer1.name,pCont);
			} catch( pE ) {
				if (pE instanceof js__$Boot_HaxeError) pE = pE.val;
				console.log(pE);
				continue;
			}
		}
	}
	,recursiveSetLocalTxt: function(pCont) {
		this.recursiveApply(pCont,$bind(this,this.parseAndSetLocalTxtInMovie));
	}
	,updateTxtFromFlumpModel: function(pTxtId,pModelInstance,pVal) {
		var lLayer = vega_utils_UtilsFlump.getLayerWithPrefixInMovie(pTxtId,pModelInstance);
		var lLayerCont = pModelInstance.getLayer(lLayer.name).getChildAt(0);
		var lDesc = new vega_local_TxtDescFlump(lLayer.name);
		var lTxt = lLayerCont.getChildAt(lLayerCont.children.length - 1);
		if(pVal == null) lTxt.text = this.getLocalTxt(lDesc.localId); else lTxt.text = pVal;
		this.alignTxt(lTxt,lDesc);
		return lTxt;
	}
	,updateLocalTxtInMovie: function(pCont) {
		var lLayers = vega_utils_UtilsFlump.getLayersWithPrefixInMovie(this.TXT_PREFIX,pCont);
		var lLayer;
		var _g = 0;
		while(_g < lLayers.length) {
			var lLayer1 = lLayers[_g];
			++_g;
			try {
				this.updateTxtFromFlumpModel(lLayer1.name,pCont);
			} catch( pE ) {
				if (pE instanceof js__$Boot_HaxeError) pE = pE.val;
				console.log(pE);
				continue;
			}
		}
	}
	,recursiveUpdateLocalTxt: function(pCont) {
		this.recursiveApply(pCont,$bind(this,this.updateLocalTxtInMovie));
	}
	,freeLocalTxtInMovie: function(pCont) {
		var lLayers = vega_utils_UtilsFlump.getLayersWithPrefixInMovie(this.TXT_PREFIX,pCont);
		var lLayer;
		var lDesc;
		var lTxt;
		var lCont;
		var _g = 0;
		while(_g < lLayers.length) {
			var lLayer1 = lLayers[_g];
			++_g;
			try {
				lDesc = new vega_local_TxtDescFlump(lLayer1.name);
			} catch( pE ) {
				if (pE instanceof js__$Boot_HaxeError) pE = pE.val;
				console.log(pE);
				continue;
			}
			lCont = pCont.getLayer(lLayer1.name).getChildAt(0);
			lTxt = lCont.getChildAt(lCont.children.length - 1);
			pCont.removeChild(lTxt);
			lTxt.destroy();
		}
	}
	,recursiveFreeLocalTxt: function(pCont) {
		this.recursiveApply(pCont,$bind(this,this.freeLocalTxtInMovie));
	}
	,alignTxt: function(pTxt,pDesc) {
		if(pDesc.align == "center") pTxt.x = -pTxt.width / 2; else if(pDesc.align == "right") pTxt.x = -pTxt.width;
		if(pDesc.vAlign == "center") pTxt.y = (pDesc.size - pTxt.height) / 2; else if(pDesc.vAlign == "bot") pTxt.y = pDesc.size - pTxt.height;
	}
	,recursiveApply: function(pCont,pFunc) {
		var lChild;
		var _g = 0;
		var _g1 = pCont.children;
		while(_g < _g1.length) {
			var lChild1 = _g1[_g];
			++_g;
			if(js_Boot.__instanceof(lChild1,PIXI.Container)) this.recursiveApply(lChild1,pFunc);
		}
		if(js_Boot.__instanceof(pCont,pixi_flump_Movie)) pFunc(pCont);
	}
	,addWordWrapParams: function(pDesc,pParams) {
		if(pDesc.wordWrap > 0) {
			pParams.wordWrap = true;
			pParams.wordWrapWidth = pDesc.wordWrap;
		}
		return pParams;
	}
	,__class__: vega_local_LocalMgr
};
var vega_local_TxtDescFlump = function(pLayerData) {
	this.wordWrap = -1;
	var lDatas = pLayerData.split(vega_local_LocalMgr.instance.TXT_SEP);
	if(lDatas.length < 6) throw new js__$Boot_HaxeError("WARNING : TxtDescFlump::TxtDescFlump : invalid params : " + pLayerData);
	this.localId = lDatas[1];
	this.fontId = lDatas[2];
	this.size = Std.parseInt(lDatas[3]);
	this.align = lDatas[4];
	this.color = "#" + lDatas[5];
	if(lDatas.length > 6) this.wordWrap = parseFloat(lDatas[6]);
	if(lDatas.length > 7) this.vAlign = lDatas[7];
};
vega_local_TxtDescFlump.__name__ = true;
vega_local_TxtDescFlump.prototype = {
	__class__: vega_local_TxtDescFlump
};
var vega_screen_MyScreenLoad = function() {
	this.isComplete = false;
	this.toRate = 0;
	this.curRate = 0;
	this.MAX_POINTS_PER_FRAME = .05;
	vega_screen_MyScreen.call(this);
};
vega_screen_MyScreenLoad.__name__ = true;
vega_screen_MyScreenLoad.__super__ = vega_screen_MyScreen;
vega_screen_MyScreenLoad.prototype = $extend(vega_screen_MyScreen.prototype,{
	onLoadProgress: function(pLoadRate) {
		this.toRate = pLoadRate;
	}
	,onLoadComplete: function() {
		this.isComplete = true;
		this.toRate = 1;
	}
	,doLoadFinal: function() {
		this.doMode = null;
	}
	,setModeProgress: function() {
		this.doMode = $bind(this,this.doModeProgress);
	}
	,doModeProgress: function(pTime) {
		if(this.curRate < this.toRate) this.curRate += Math.min(this.toRate - this.curRate,this.MAX_POINTS_PER_FRAME); else if(this.curRate == 1 && this.isComplete) this.doLoadFinal();
	}
	,__class__: vega_screen_MyScreenLoad
});
var vega_screen_MyScreenInitLoad = function() {
	vega_screen_MyScreenLoad.call(this);
	this.bgColor = 16777215;
	this.fadeFrontColor = 16777215;
	this.FADE_DELAY /= 2;
	this.ASSET_ID = "screenInitLoad";
};
vega_screen_MyScreenInitLoad.__name__ = true;
vega_screen_MyScreenInitLoad.__super__ = vega_screen_MyScreenLoad;
vega_screen_MyScreenInitLoad.prototype = $extend(vega_screen_MyScreenLoad.prototype,{
	destroy: function() {
		vega_local_LocalMgr.instance.freeLocalTxtInMovie(this.asset.getContent());
		vega_screen_MyScreenLoad.prototype.destroy.call(this);
	}
	,start: function() {
		this.setModeProgress();
	}
	,doLoadFinal: function() {
		vega_screen_MyScreenLoad.prototype.doLoadFinal.call(this);
		this.shell.onScreenClose(this);
		this.setModeFadeFront();
	}
	,buildContent: function() {
		vega_screen_MyScreenLoad.prototype.buildContent.call(this);
		vega_local_LocalMgr.instance.parseAndSetLocalTxtInMovie(this.asset.getContent());
		this.refreshBar();
	}
	,launchAfterInit: function() {
		this.shell.onScreenReady(this);
	}
	,doModeProgress: function(pTime) {
		vega_screen_MyScreenLoad.prototype.doModeProgress.call(this,pTime);
		this.refreshBar();
	}
	,refreshBar: function() {
		(js_Boot.__cast(this.asset.getContent() , pixi_flump_Movie)).getLayer("barFront").getChildAt(0).scale.x = Math.max(.005,this.curRate);
	}
	,__class__: vega_screen_MyScreenInitLoad
});
var vega_screen_MyScreenPreload = function() {
	vega_screen_MyScreenLoad.call(this);
	this.bgColor = 16777215;
};
vega_screen_MyScreenPreload.__name__ = true;
vega_screen_MyScreenPreload.__super__ = vega_screen_MyScreenLoad;
vega_screen_MyScreenPreload.prototype = $extend(vega_screen_MyScreenLoad.prototype,{
	destroy: function() {
		this.content.removeChild(this.bar);
		this.bar.destroy();
		this.bar = null;
		vega_screen_MyScreenLoad.prototype.destroy.call(this);
	}
	,start: function() {
		this.setModeProgress();
	}
	,onLoadProgress: function(pLoadRate) {
		this.toRate = .5 + .5 * pLoadRate;
	}
	,doLoadFinal: function() {
		vega_screen_MyScreenLoad.prototype.doLoadFinal.call(this);
		this.shell.onScreenClose(this);
		this.setModeFadeOut();
	}
	,buildContent: function() {
		vega_screen_MyScreenLoad.prototype.buildContent.call(this);
		this.bar = this.content.addChild(new PIXI.Graphics());
		this.bar.beginFill(0);
		this.bar.drawRect(0,0,vega_shell_ApplicationMatchSize.instance.getScreenRectExt().width,30);
		this.bar.endFill();
		this.onResize();
	}
	,onResize: function() {
		this.bar.x = vega_shell_ApplicationMatchSize.instance.getScreenRect().x;
		this.bar.y = vega_shell_ApplicationMatchSize.instance.getScreenRect().y;
		this.refreshBar();
	}
	,launchAfterInit: function() {
		this.shell.onScreenReady(this);
	}
	,doModeProgress: function(pTime) {
		vega_screen_MyScreenLoad.prototype.doModeProgress.call(this,pTime);
		this.refreshBar();
	}
	,refreshBar: function() {
		this.bar.scale.x = Math.max(.005,this.curRate) * vega_shell_ApplicationMatchSize.instance.getScreenRect().width / vega_shell_ApplicationMatchSize.instance.getScreenRectExt().width;
	}
	,__class__: vega_screen_MyScreenPreload
});
var vega_screen_MyScreenSplash = function() {
	this.CTRD_DELAY = 1500;
	vega_screen_MyScreen.call(this);
	this.bgColor = 16777215;
	this.fadeFrontColor = 16777215;
	this.FADE_DELAY /= 2;
	this.ASSET_ID = "screenSplash";
};
vega_screen_MyScreenSplash.__name__ = true;
vega_screen_MyScreenSplash.__super__ = vega_screen_MyScreen;
vega_screen_MyScreenSplash.prototype = $extend(vega_screen_MyScreen.prototype,{
	start: function() {
		this.setModeCtrD();
	}
	,launchAfterInit: function() {
		this.shell.onScreenReady(this);
	}
	,buildContent: function() {
		vega_screen_MyScreen.prototype.buildContent.call(this);
		if(vega_loader_VegaLoaderMgr.getInstance().getLoadingFile(this.asset.getDesc().getFile().getId()).isIMG()) {
			this.asset.x = -this.asset.width / 2;
			this.asset.y = -this.asset.height / 2;
		}
	}
	,setModeCtrD: function() {
		this.ctrDDelay = 0;
		this.doMode = $bind(this,this.doModeCtrD);
	}
	,doModeCtrD: function(pTime) {
		if(this.ctrDDelay + pTime >= this.CTRD_DELAY) {
			this.shell.onScreenClose(this);
			this.setModeFadeFront();
		} else this.ctrDDelay += pTime;
	}
	,__class__: vega_screen_MyScreenSplash
});
var vega_shell_GlobalPointer = function() {
	this.isDown = false;
	this.isTouchpad = false;
	this.MOUSE_ID = 421;
	this.TIMEOUT_MOUSE = 5000;
	this.TIMEOUT = 1000;
	var lAnchor = this.getEventAnchor();
	vega_shell_GlobalPointer.instance = this;
	this.datas = [];
	lAnchor.on("mousedown",$bind(this,this.onMouseDown));
	lAnchor.on("mouseup",$bind(this,this.onMouseUp));
	lAnchor.on("mouseupoutside",$bind(this,this.onMouseUp));
	lAnchor.on("mouseout",$bind(this,this.onMouseUp));
	lAnchor.on("mousemove",$bind(this,this.onMouseMove));
	lAnchor.on("touchstart",$bind(this,this.onTouchDown));
	lAnchor.on("touchend",$bind(this,this.onTouchUp));
	lAnchor.on("touchendoutside",$bind(this,this.onTouchUp));
	lAnchor.on("touchmove",$bind(this,this.onTouchMove));
	this.switchEnable(true);
	vega_shell_VegaFramer.getInstance().addIterator($bind(this,this.doFrame));
};
vega_shell_GlobalPointer.__name__ = true;
vega_shell_GlobalPointer.prototype = {
	getDownTouches: function() {
		var lRes = [];
		var lI = 0;
		while(lI < this.datas.length) {
			if(this.datas[lI].isDown) lRes.push(this.datas[lI]);
			lI++;
		}
		return lRes;
	}
	,getTouchId: function(pId) {
		var lTouch;
		var _g = 0;
		var _g1 = this.datas;
		while(_g < _g1.length) {
			var lTouch1 = _g1[_g];
			++_g;
			if(lTouch1.id == pId) return lTouch1;
		}
		return null;
	}
	,getTouchEvent: function(pE,pIsMouse) {
		if(pIsMouse) return this.getMouseTouch(); else return this.getTouchId(pE.data.identifier);
	}
	,getPointerCoord: function() {
		if(this.datas.length > 0) return this.datas[0].coord;
		return null;
	}
	,switchEnable: function(pIsEnable) {
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : GlobalPointer::switchEnable : " + (pIsEnable == null?"null":"" + pIsEnable));
		this.getEventAnchor().interactive = pIsEnable;
		this.flush();
	}
	,flush: function() {
		this.isDown = false;
		this.datas = [];
	}
	,doFrame: function(pDT) {
		var lI = this.datas.length - 1;
		while(lI >= 0) {
			this.datas[lI].delay += pDT;
			if(this.datas[lI].isMouse) {
				if(this.datas[lI].delay >= this.TIMEOUT_MOUSE) HxOverrides.remove(this.datas,this.datas[lI]);
			} else if(this.datas[lI].delay >= this.TIMEOUT) HxOverrides.remove(this.datas,this.datas[lI]);
			lI--;
		}
		this.checkTouchState();
	}
	,toString: function() {
		var lStr = "";
		var lTouch;
		var _g = 0;
		var _g1 = this.datas;
		while(_g < _g1.length) {
			var lTouch1 = _g1[_g];
			++_g;
			lStr += lTouch1.id + ":" + Math.round(lTouch1.coord.x) + ":" + Math.round(lTouch1.coord.y) + ":" + (lTouch1.isDown?"D":"U") + ":" + (lTouch1.isMouse?"M":"T") + " - ";
		}
		return lStr;
	}
	,onTouchDown: function(pE) {
		this.datas.push(new vega_shell_TouchDesc(pE.data.getLocalPosition(this.getRepere()),false,true,pE.data.identifier));
		this.checkTouchState();
	}
	,onTouchUp: function(pE) {
		var lTouch = this.getTouchId(pE.data.identifier);
		if(lTouch != null) {
			HxOverrides.remove(this.datas,lTouch);
			this.checkTouchState();
		}
	}
	,onTouchMove: function(pE) {
		var lPt = pE.data.getLocalPosition(this.getRepere());
		var lTouch = this.getTouchId(pE.data.identifier);
		if(lTouch != null) {
			lTouch.coord = lPt;
			lTouch.delay = 0;
		} else {
			this.datas.push(new vega_shell_TouchDesc(lPt,false,true,pE.data.identifier));
			this.checkTouchState();
		}
	}
	,onMouseDown: function(pE) {
		var lTouch = this.getMouseTouch();
		var lPt = pE.data.getLocalPosition(this.getRepere());
		if(lTouch == null) this.datas.push(new vega_shell_TouchDesc(lPt,true,true,this.MOUSE_ID)); else {
			lTouch.coord = lPt;
			lTouch.delay = 0;
			lTouch.isDown = true;
		}
		this.checkTouchState();
	}
	,onMouseUp: function(pE) {
		var lPt = pE.data.getLocalPosition(this.getRepere());
		var lTouch = this.getMouseTouch();
		if(lTouch != null) {
			lTouch.coord = lPt;
			lTouch.delay = 0;
			lTouch.isDown = false;
		} else this.datas.push(new vega_shell_TouchDesc(lPt,true,false,this.MOUSE_ID));
		this.checkTouchState();
	}
	,onMouseMove: function(pE) {
		var lPt = pE.data.getLocalPosition(this.getRepere());
		var lTouch = this.getMouseTouch();
		if(lTouch != null) {
			lTouch.coord = lPt;
			lTouch.delay = 0;
		} else {
			this.datas.push(new vega_shell_TouchDesc(lPt,true,false,this.MOUSE_ID));
			this.checkTouchState();
		}
	}
	,getEventAnchor: function() {
		return vega_shell_ApplicationMatchSize.instance.stage;
	}
	,getRepere: function() {
		return vega_shell_ApplicationMatchSize.instance.getContent();
	}
	,getMouseTouch: function() {
		var lTouch;
		var _g = 0;
		var _g1 = this.datas;
		while(_g < _g1.length) {
			var lTouch1 = _g1[_g];
			++_g;
			if(lTouch1.isMouse) return lTouch1;
		}
		return null;
	}
	,checkTouchState: function() {
		if(this.datas.length > 0) {
			if(this.datas[0].isMouse) {
				this.isTouchpad = true;
				this.isDown = this.datas[0].isDown;
			} else {
				this.isTouchpad = false;
				this.isDown = true;
			}
		} else this.isDown = false;
	}
	,__class__: vega_shell_GlobalPointer
};
var vega_shell_TouchDesc = function(pCoord,pIsMouse,pIsDown,pId) {
	this.isBound = false;
	this.coord = pCoord;
	this.isMouse = pIsMouse;
	this.delay = 0;
	this.isDown = pIsDown;
	this.id = pId;
};
vega_shell_TouchDesc.__name__ = true;
vega_shell_TouchDesc.prototype = {
	__class__: vega_shell_TouchDesc
};
var vega_shell_MyScore = function(pScore) {
	this._score = -1;
	this._score = pScore;
};
vega_shell_MyScore.__name__ = true;
vega_shell_MyScore.prototype = {
	getScore: function() {
		return this._score;
	}
	,__class__: vega_shell_MyScore
};
var vega_shell_ResizeBroadcaster = function() {
	this.listeners = [];
};
vega_shell_ResizeBroadcaster.__name__ = true;
vega_shell_ResizeBroadcaster.getInstance = function() {
	if(vega_shell_ResizeBroadcaster.instance == null) vega_shell_ResizeBroadcaster.instance = new vega_shell_ResizeBroadcaster();
	return vega_shell_ResizeBroadcaster.instance;
};
vega_shell_ResizeBroadcaster.prototype = {
	addListener: function(pListener) {
		this.listeners.push(pListener);
	}
	,remListener: function(pListener) {
		HxOverrides.remove(this.listeners,pListener);
	}
	,broadcastResize: function() {
		var lListener;
		var _g = 0;
		var _g1 = this.listeners;
		while(_g < _g1.length) {
			var lListener1 = _g1[_g];
			++_g;
			lListener1();
		}
	}
	,__class__: vega_shell_ResizeBroadcaster
};
var vega_shell_SavedDatas = function(pDatas,pSep,pSto) {
	this.STO = "=";
	this.SEP = "#";
	if(pSep != null) this.SEP = pSep;
	if(pSto != null) this.STO = pSto;
	if(pDatas != null) this.setDatas(pDatas); else this.datas = new haxe_ds_StringMap();
};
vega_shell_SavedDatas.__name__ = true;
vega_shell_SavedDatas.prototype = {
	setKeyValue: function(pKey,pVal) {
		{
			this.datas.set(pKey,pVal);
			pVal;
		}
	}
	,getKeyValue: function(pKey) {
		if(this.datas.exists(pKey)) return this.datas.get(pKey); else return null;
	}
	,getDatas: function() {
		var lSerial = "";
		var lKey;
		var $it0 = this.datas.keys();
		while( $it0.hasNext() ) {
			var lKey1 = $it0.next();
			if(lSerial != "") lSerial += this.SEP;
			lSerial += lKey1 + this.STO + this.datas.get(lKey1);
		}
		return lSerial;
	}
	,setDatas: function(pDatas) {
		var lDatas = pDatas.split(this.SEP);
		var lKeyVal;
		var lField;
		this.datas = new haxe_ds_StringMap();
		var _g = 0;
		while(_g < lDatas.length) {
			var lField1 = lDatas[_g];
			++_g;
			lKeyVal = lField1.split(this.STO);
			var v = lKeyVal[1];
			this.datas.set(lKeyVal[0],v);
			v;
		}
	}
	,__class__: vega_shell_SavedDatas
};
var vega_shell_VegaBrowserDetect = function() { };
vega_shell_VegaBrowserDetect.__name__ = true;
vega_shell_VegaBrowserDetect.isIOS = function() {
	var lField;
	if(typeof(window) != "undefined") {
		lField = window.navigator.userAgent.toLowerCase();
		return lField.indexOf("ipad") != -1 || lField.indexOf("ipod") != -1 || lField.indexOf("iphone") != -1;
	} else {
		vega_shell_ApplicationMatchSize.instance.traceDebug("WARNING : VegaBrowserDetect::isIOS : no browser, unable to detect");
		return false;
	}
};
var vega_shell_VegaDeactivator = function() {
	this.timeoutTimeStamp = -1;
	this.isActive = true;
	this.TIMEOUT_DELAY = 120000;
	if(typeof(window) != "undefined") {
		window.onfocus = $bind(this,this.activate);
		window.onblur = $bind(this,this.deactivate);
		window.document.addEventListener("visibilitychange",$bind(this,this.onVChange));
		if(!this.isSystemActive() || !window.document.hasFocus()) this.deactivate(false);
		this.onFocus();
	} else vega_shell_ApplicationMatchSize.instance.traceDebug("ERROR : VegaDeactivator::VegaDeactivator : no browser, ignore deactivate ...");
};
vega_shell_VegaDeactivator.__name__ = true;
vega_shell_VegaDeactivator.getInstance = function() {
	if(vega_shell_VegaDeactivator.instance == null) vega_shell_VegaDeactivator.instance = new vega_shell_VegaDeactivator();
	return vega_shell_VegaDeactivator.instance;
};
vega_shell_VegaDeactivator.prototype = {
	onVChange: function() {
		if(this.isSystemActive()) this.activate(); else this.deactivate();
	}
	,isSystemActive: function() {
		return window.document.visibilityState == "visible";
	}
	,deactivate: function(pSetTimeout) {
		if(pSetTimeout == null) pSetTimeout = true;
		if(!this.isActive) return;
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : VegaDeactivator::deactivate");
		this.isActive = false;
		vega_shell_VegaFramer.getInstance().switchPause(true);
		vega_shell_ApplicationMatchSize.instance.forceFPS(1);
		vega_shell_ApplicationMatchSize.instance.pauseRendering();
		vega_sound_SndMgr.getInstance().switchMute(true);
		if(pSetTimeout) {
			this.timeoutTimeStamp = new Date().getTime();
			this.timeoutId = window.setTimeout($bind(this,this.onTimeout),this.TIMEOUT_DELAY);
		} else this.timeoutTimeStamp = -1;
		vega_shell_ApplicationMatchSize.instance.canvas.addEventListener("mousedown",$bind(this,this.onFocus));
		vega_shell_ApplicationMatchSize.instance.canvas.addEventListener("mousemove",$bind(this,this.onFocus));
		vega_shell_ApplicationMatchSize.instance.canvas.addEventListener("touchstart",$bind(this,this.onFocus));
		vega_shell_ApplicationMatchSize.instance.canvas.addEventListener("touchmove",$bind(this,this.onFocus));
	}
	,activate: function() {
		if(this.isActive) return;
		if(this.timeoutTimeStamp >= 0 && new Date().getTime() - this.timeoutTimeStamp >= this.TIMEOUT_DELAY) this.onTimeout(); else {
			vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : VegaDeactivator::activate");
			this.isActive = true;
			vega_shell_VegaFramer.getInstance().switchPause(false);
			vega_shell_ApplicationMatchSize.instance.restaureFPS();
			vega_shell_ApplicationMatchSize.instance.resumeRendering();
			vega_shell_ApplicationMatchSize.instance.refreshRender();
			vega_sound_SndMgr.getInstance().switchMute(false);
			if(vega_shell_GlobalPointer.instance != null) vega_shell_GlobalPointer.instance.flush();
			vega_shell_VegaOrient.getInstance().flush();
			if(this.timeoutTimeStamp >= 0) window.clearTimeout(this.timeoutId);
			vega_shell_ApplicationMatchSize.instance.canvas.removeEventListener("mousedown",$bind(this,this.onFocus));
			vega_shell_ApplicationMatchSize.instance.canvas.removeEventListener("mousemove",$bind(this,this.onFocus));
			vega_shell_ApplicationMatchSize.instance.canvas.removeEventListener("touchstart",$bind(this,this.onFocus));
			vega_shell_ApplicationMatchSize.instance.canvas.removeEventListener("touchmove",$bind(this,this.onFocus));
		}
	}
	,onTimeout: function() {
		vega_shell_ApplicationMatchSize.instance.reload();
	}
	,onFocus: function() {
		window.focus();
	}
	,__class__: vega_shell_VegaDeactivator
};
var vega_shell_VegaFramer = function() {
	this.isError = false;
	this.isPause = false;
	this.hasRequest = false;
	this.iterators = [];
	this.lastTime = new Date().getTime();
	if(typeof(window) != "undefined") this.onFrame(0); else vega_shell_ApplicationMatchSize.instance.traceDebug("ERROR : VegaFramer::VegaFramer : no browser, no framing ...");
};
vega_shell_VegaFramer.__name__ = true;
vega_shell_VegaFramer.getInstance = function() {
	if(vega_shell_VegaFramer.instance == null) vega_shell_VegaFramer.instance = new vega_shell_VegaFramer();
	return vega_shell_VegaFramer.instance;
};
vega_shell_VegaFramer.prototype = {
	isRegistered: function(pIterator) {
		return HxOverrides.indexOf(this.iterators,pIterator,0) != -1;
	}
	,addIterator: function(pIterator) {
		this.iterators.push(pIterator);
	}
	,remIterator: function(pIterator) {
		HxOverrides.remove(this.iterators,pIterator);
	}
	,switchPause: function(pIsPause) {
		if(this.isPause && !pIsPause) {
			if(!this.hasRequest) {
				this.lastTime = new Date().getTime();
				this.requestFrame();
			}
		}
		this.isPause = pIsPause;
	}
	,onFrame: function(pTime) {
		if(vega_shell_ApplicationMatchSize.instance.debug) {
			if(this.isError) return;
			try {
				this.doFrame(pTime);
			} catch( pE ) {
				if (pE instanceof js__$Boot_HaxeError) pE = pE.val;
				vega_shell_ApplicationMatchSize.instance.traceDebug("ERROR :" + Std.string(pE).split("\n")[0]);
				console.log(pE);
				this.isError = true;
			}
		} else this.doFrame(pTime);
	}
	,doFrame: function(pTime) {
		var lTime;
		var lIterator;
		var lDT;
		var lInter;
		var lAjust;
		var lI;
		if(this.isPause) this.hasRequest = false; else {
			this.requestFrame();
			lTime = new Date().getTime();
			lInter = 1000 / vega_shell_ApplicationMatchSize.instance.fps;
			lDT = Math.min(lTime - this.lastTime,3 * lInter);
			if(lDT >= lInter) {
				lAjust = Math.min(lDT - lInter,lInter / 2);
				lDT -= lAjust;
				lI = this.iterators.length - 1;
				while(lI >= 0 && !this.isPause) this.iterators[lI--](lDT);
				this.lastTime = lTime - lAjust;
			}
		}
	}
	,requestFrame: function() {
		this.hasRequest = true;
		window.requestAnimationFrame($bind(this,this.onFrame));
	}
	,__class__: vega_shell_VegaFramer
};
var vega_shell_VegaOrient = function() {
	this.tmpVal = 0;
	this.isTmpVal = false;
	this.accelStack = null;
	this.motionOK = false;
	this.STACK_MAX = 4;
};
vega_shell_VegaOrient.__name__ = true;
vega_shell_VegaOrient.getInstance = function() {
	if(vega_shell_VegaOrient.instance == null) vega_shell_VegaOrient.instance = new vega_shell_VegaOrient();
	return vega_shell_VegaOrient.instance;
};
vega_shell_VegaOrient.prototype = {
	init: function() {
		if(typeof(window) != "undefined" && window.orientation != null) {
			window.addEventListener("devicemotion",$bind(this,this.onDeviceMotion));
			window.addEventListener("orientationchange",$bind(this,this.onOrientChange));
		} else vega_shell_ApplicationMatchSize.instance.traceDebug("WARNING : VegaOrient::init : unsupported, no orient");
	}
	,flush: function() {
		if(this.motionOK) this.accelStack = [];
	}
	,getInclinaison: function() {
		var lRes = 0;
		var lVal;
		if(this.motionOK && this.accelStack.length > 0) {
			if(this.isTmpVal) return this.tmpVal;
			var _g = 0;
			var _g1 = this.accelStack;
			while(_g < _g1.length) {
				var lVal1 = _g1[_g];
				++_g;
				lRes += lVal1;
			}
			lRes /= this.accelStack.length;
			this.tmpVal = lRes;
			this.isTmpVal = true;
		}
		return lRes;
	}
	,onDeviceMotion: function(pE) {
		if(!this.motionOK) {
			if(pE.accelerationIncludingGravity != null && pE.accelerationIncludingGravity.x != 0 && pE.accelerationIncludingGravity.y != 0 && pE.accelerationIncludingGravity.z != 0) {
				this.accelStack = [];
				this.motionOK = true;
			} else return;
		}
		this.isTmpVal = false;
		this.accelStack.push(this.procInclinaison(pE.accelerationIncludingGravity.x,pE.accelerationIncludingGravity.y,pE.accelerationIncludingGravity.z));
		if(this.accelStack.length > this.STACK_MAX) this.accelStack.shift();
	}
	,onOrientChange: function(pE) {
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : VegaOrient::onOrientChange : " + window.orientation);
	}
	,procInclinaison: function(pAccX,pAccY,pAccZ) {
		var lLen = Math.sqrt(pAccX * pAccX + pAccY * pAccY + pAccZ * pAccZ);
		if(vega_shell_VegaBrowserDetect.isIOS()) {
			pAccX = -pAccX;
			pAccY = -pAccY;
			pAccZ = -pAccZ;
		}
		pAccX = Math.asin(Math.max(-1,Math.min(1,pAccX / lLen)));
		pAccY = Math.asin(Math.max(-1,Math.min(1,pAccY / lLen)));
		pAccZ = Math.asin(Math.max(-1,Math.min(1,pAccZ / lLen)));
		if(window.orientation == 0) return pAccX; else if(window.orientation == -90) return pAccY; else if(window.orientation == 90) return -pAccY; else if(window.orientation == 180) return -pAccX; else vega_shell_ApplicationMatchSize.instance.traceDebug("WARNING : VegaOrient::procInclinaison : unrecognized ref orient : " + window.orientation);
		return 0;
	}
	,__class__: vega_shell_VegaOrient
};
var vega_sound_SndDesc = function(pId,pFile,pOtions,pExts) {
	this._fileResId = null;
	this._howl = null;
	this._options = null;
	this._id = null;
	var lName;
	var lPath;
	var lUrl;
	this._id = pId;
	if(pOtions == null) this._options = { }; else this._options = pOtions;
	if(this._options.src == null) {
		if(pFile == null) pFile = new vega_loader_file_MyFile(pId); else if(pFile.getName() == "" || pFile.getName() == null) pFile = new vega_loader_file_MyFile(pId,pFile.getPath(),pFile.getVersion());
		lName = pFile.getName();
		if(pFile.getPath() != null) lPath = pFile.getPath(); else lPath = "";
		if(lName.indexOf("://") != -1) lUrl = lName; else lUrl = lPath + lName;
		if(pExts == null) pExts = vega_sound_SndMgr.getInstance().getExts();
		this._options.src = [];
		while(this._options.src.length < pExts.length) this._options.src.push(vega_loader_file_LoadingFile.addVersionToUrl(lUrl + pExts[this._options.src.length - 1],vega_loader_file_LoadingFile.getVersionUrl(pFile)));
	}
	if(pFile == null) this._fileResId = new vega_loader_file_MyFile(pId); else this._fileResId = pFile;
};
vega_sound_SndDesc.__name__ = true;
vega_sound_SndDesc.prototype = {
	getIsLoaded: function() {
		return this._howl != null && this._howl.state() == "loaded";
	}
	,destroy: function() {
		this._options = null;
		this._howl = null;
		this._fileResId = null;
	}
	,regHowl: function(pHowl) {
		this._howl = pHowl;
	}
	,getHowl: function() {
		return this._howl;
	}
	,getId: function() {
		return this._id;
	}
	,getOptions: function() {
		return this._options;
	}
	,getFileResId: function() {
		return this._fileResId;
	}
	,__class__: vega_sound_SndDesc
};
var vega_sound_SndInstance = function(pTrack) {
	this.doMode = null;
	this.playTimestamp = -1;
	this.mode = null;
	this.chan = -1;
	this.track = null;
	this.PLAY_DELAI_MAX = 1500;
	this.track = pTrack;
	vega_shell_VegaFramer.getInstance().addIterator($bind(this,this.onFrame));
};
vega_sound_SndInstance.__name__ = true;
vega_sound_SndInstance.prototype = {
	play: function(pMode) {
		this.mode = pMode;
		if(!this.regChainedTracks()) this.tryUnloadedTrackOpenChan();
	}
	,playInvalid: function(pMode) {
		vega_shell_ApplicationMatchSize.instance.traceDebug("WARNING : SndInstance::playInvalid : " + this.track.getDesc().getId());
		this.mode = pMode;
		this.regChainedTracks();
		this.setModeOpenChanInvalid();
	}
	,regChainedTracks: function() {
		var lTracks;
		var lTrack;
		if(js_Boot.__instanceof(this.mode,vega_sound_SndPlayModeChained)) {
			if(vega_sound_SndMgr.getInstance().isPlaying((js_Boot.__cast(this.mode , vega_sound_SndPlayModeChained)).getSubId())) {
				lTracks = vega_sound_SndMgr.getInstance().getSndTracks((js_Boot.__cast(this.mode , vega_sound_SndPlayModeChained)).getSubId());
				var _g = 0;
				while(_g < lTracks.length) {
					var lTrack1 = lTracks[_g];
					++_g;
					if(lTrack1.isPlaying()) lTrack1.addEndListener($bind(this,this.onSndChainEnd));
				}
				return true;
			}
		}
		return false;
	}
	,onFrame: function(pDT) {
		if(this.doMode != null) this.doMode();
	}
	,tryUnloadedTrackOpenChan: function() {
		if(!this.track.getDesc().getIsLoaded()) this.setModeOpenChanInvalid(); else this.openChan();
	}
	,setModeOpenChanInvalid: function() {
		this.playTimestamp = new Date().getTime();
		this.doMode = $bind(this,this.doModeOpenChanInvalid);
	}
	,doModeOpenChanInvalid: function() {
		if(this.track.getDesc().getIsLoaded() && vega_sound_SndMgr.getInstance().isUnlocked()) this.checkTimestampPlay(); else this.checkTimestampStop();
	}
	,stop: function() {
		var lTracks;
		var lTrack;
		if(this.chan >= 0) {
			this.track.getDesc().getHowl().stop(this.chan);
			this.chan = -1;
		}
		if(js_Boot.__instanceof(this.mode,vega_sound_SndPlayModeChained)) {
			lTracks = vega_sound_SndMgr.getInstance().getSndTracks((js_Boot.__cast(this.mode , vega_sound_SndPlayModeChained)).getSubId());
			var _g = 0;
			while(_g < lTracks.length) {
				var lTrack1 = lTracks[_g];
				++_g;
				lTrack1.remEndListener($bind(this,this.onSndChainEnd));
			}
		}
		this.onSndEnd();
	}
	,checkTimestampStop: function() {
		if(this.playTimestamp > 0) {
			if(!this.track.getDesc().getOptions().loop && new Date().getTime() - this.playTimestamp > this.PLAY_DELAI_MAX) {
				vega_shell_ApplicationMatchSize.instance.traceDebug("WARNING : SndInstance::checkTimestampStop : too late, stop : " + this.track.getDesc().getId());
				this.stop();
			}
		}
	}
	,checkTimestampPlay: function() {
		if(this.playTimestamp > 0) {
			if(this.track.getDesc().getOptions().loop || new Date().getTime() - this.playTimestamp <= this.PLAY_DELAI_MAX) {
				vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : SndInstance::checkTimestampPlay : loaded, resume play : " + this.track.getDesc().getId());
				if(js_Boot.__instanceof(this.mode,vega_sound_SndPlayModeChained)) this.onSndChainEnd(); else this.openChan();
			} else {
				vega_shell_ApplicationMatchSize.instance.traceDebug("WARNING : SndInstance::checkTimestampPlay : loaded, too late, stop : " + this.track.getDesc().getId());
				this.stop();
			}
		}
	}
	,openChan: function() {
		this.doMode = null;
		if(!vega_sound_SndMgr.getInstance().isUnlocked()) vega_shell_ApplicationMatchSize.instance.traceDebug("WARNING : SndInstance::openChan : unlocker ? : " + this.track.getDesc().getId());
		this.chan = this.track.getDesc().getHowl().play();
		this.track.getDesc().getHowl().on("end",$bind(this,this.onSndEnd),this.chan);
		if(this.chan >= 0) {
			vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : SndInstance::openChan : " + this.track.getDesc().getId() + " : " + this.chan);
			this.playTimestamp = -1;
		} else vega_shell_ApplicationMatchSize.instance.traceDebug("ERROR : SndInstance::openChan : " + this.track.getDesc().getId() + " : " + this.chan);
	}
	,onSndEnd: function() {
		if(this.chan >= 0) {
			if(this.track.getDesc().getOptions().loop) {
				if(this.track.getDesc().getHowl().playing(this.chan)) vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : SndInstance::onSndEnd : loop " + this.track.getDesc().getId() + " : " + this.chan); else {
					vega_shell_ApplicationMatchSize.instance.traceDebug("WARNING : SndInstance::onSndEnd : broken loop, restart : " + this.track.getDesc().getId() + " : " + this.chan);
					this.chan = this.track.getDesc().getHowl().play();
				}
				return;
			}
			this.track.getDesc().getHowl().off("end",$bind(this,this.onSndEnd),this.chan);
		}
		this.doMode = null;
		vega_shell_VegaFramer.getInstance().remIterator($bind(this,this.onFrame));
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : SndInstance::onSndEnd : " + this.track.getDesc().getId() + " : " + this.chan);
		this.track.onChanStop(this);
	}
	,onSndChainEnd: function() {
		var lTracks;
		var lTrack;
		if(this.track.getDesc().getIsLoaded() && vega_sound_SndMgr.getInstance().isUnlocked() && !vega_sound_SndMgr.getInstance().isPlaying((js_Boot.__cast(this.mode , vega_sound_SndPlayModeChained)).getSubId())) {
			lTracks = vega_sound_SndMgr.getInstance().getSndTracks((js_Boot.__cast(this.mode , vega_sound_SndPlayModeChained)).getSubId());
			var _g = 0;
			while(_g < lTracks.length) {
				var lTrack1 = lTracks[_g];
				++_g;
				lTrack1.remEndListener($bind(this,this.onSndChainEnd));
			}
			vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : SndInstance::onSndChainEnd : play " + this.track.getDesc().getId());
			this.openChan();
		}
	}
	,__class__: vega_sound_SndInstance
};
var vega_sound_SndMgr = function(pVol) {
	this.isMute = false;
	this._isInitEnd = false;
	this._vol = 1;
	this.firstSndLock = false;
	this.tracks = null;
	this.exts = [".mp3",".ogg"];
	this._vol = pVol;
	Howler.init();
	this.tracks = new haxe_ds_StringMap();
	if(!this.isHowlerEndInit()) vega_shell_VegaFramer.getInstance().addIterator($bind(this,this.checkHolwerEndInit));
};
vega_sound_SndMgr.__name__ = true;
vega_sound_SndMgr.getInstance = function(pVol) {
	if(pVol == null) pVol = 1;
	if(vega_sound_SndMgr.current == null) vega_sound_SndMgr.current = new vega_sound_SndMgr(pVol);
	return vega_sound_SndMgr.current;
};
vega_sound_SndMgr.prototype = {
	switchMute: function(pIsMute) {
		if(this._isInitEnd) Howler.mute(pIsMute);
		this.isMute = pIsMute;
	}
	,getExts: function() {
		return this.exts;
	}
	,addSndDesc: function(pDesc,pDoLoad) {
		if(pDoLoad == null) pDoLoad = false;
		if((function($this) {
			var $r;
			var key = pDesc.getId();
			$r = $this.tracks.exists(key);
			return $r;
		}(this))) {
			vega_shell_ApplicationMatchSize.instance.traceDebug("WARNING : SndMgr::addSndDesc : sound already defined, ignore : " + pDesc.getId());
			return;
		}
		var k = pDesc.getId();
		var v = new vega_sound_SndTrack(pDesc,pDoLoad);
		this.tracks.set(k,v);
		v;
	}
	,unload: function(pSubId) {
		var lTrack;
		var $it0 = this.tracks.iterator();
		while( $it0.hasNext() ) {
			var lTrack1 = $it0.next();
			if(pSubId == null || lTrack1.getDesc().getId().indexOf(pSubId) != -1) {
				var key = lTrack1.getDesc().getId();
				this.tracks.remove(key);
				lTrack1.destroy();
			}
		}
	}
	,play: function(pSndId,pMode,pDoUnlock) {
		if(pDoUnlock == null) pDoUnlock = false;
		var lDesc;
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : SndMgr::play : " + pSndId);
		if(!this.tracks.exists(pSndId)) {
			vega_shell_ApplicationMatchSize.instance.traceDebug("WARNING : SndMgr::play : unregistered sound, create new record : " + pSndId);
			lDesc = new vega_sound_SndDesc(pSndId);
			lDesc.getOptions().preload = false;
			lDesc.getOptions().autoplay = false;
			lDesc.regHowl(new Howl(lDesc.getOptions()));
			var v = new vega_sound_SndTrack(lDesc);
			this.tracks.set(pSndId,v);
			v;
		}
		if(this.isUnlocked() || this.canUnlockSound() && pDoUnlock || this.tracks.get(pSndId).getDesc().getOptions().loop) this.tracks.get(pSndId).play(pMode,!this.isUnlocked() && !pDoUnlock); else vega_shell_ApplicationMatchSize.instance.traceDebug("WARNING : SndMgr::play : sounds locked, ignore " + pSndId);
	}
	,stop: function(pSubId,pExcludeId) {
		var lTrack;
		var $it0 = this.tracks.iterator();
		while( $it0.hasNext() ) {
			var lTrack1 = $it0.next();
			if(pSubId == null || lTrack1.getDesc().getId().indexOf(pSubId) != -1) {
				if(pExcludeId == null || lTrack1.getDesc().getId().indexOf(pExcludeId) == -1) lTrack1.stop();
			}
		}
	}
	,isPlaying: function(pSubId,pExcludeId) {
		var lTrack;
		var $it0 = this.tracks.iterator();
		while( $it0.hasNext() ) {
			var lTrack1 = $it0.next();
			if(pSubId == null || lTrack1.getDesc().getId().indexOf(pSubId) != -1) {
				if(pExcludeId == null || lTrack1.getDesc().getId().indexOf(pExcludeId) == -1) {
					if(lTrack1.isPlaying()) return true;
				}
			}
		}
		return false;
	}
	,getSndTracks: function(pSubId) {
		var lRes = [];
		var lTrack;
		var $it0 = this.tracks.iterator();
		while( $it0.hasNext() ) {
			var lTrack1 = $it0.next();
			if(pSubId == null || lTrack1.getDesc().getId().indexOf(pSubId) != -1) lRes.push(lTrack1);
		}
		return lRes;
	}
	,isUnlocked: function() {
		return this._isInitEnd && (!Howler.usingWebAudio || Howler.ctx != null && Howler.ctx.currentTime > 0);
	}
	,canUnlockSound: function() {
		return Howler.ctx != null;
	}
	,checkHolwerEndInit: function(pDT) {
		if(this.isHowlerEndInit()) {
			vega_shell_VegaFramer.getInstance().remIterator($bind(this,this.checkHolwerEndInit));
			this.onHowlerEndInit();
		}
	}
	,isHowlerEndInit: function() {
		if(this._isInitEnd) return true;
		try {
			Howler.volume(this._vol);
			Howler.mute(this.isMute);
			this._isInitEnd = true;
			return true;
		} catch( pE ) {
			if (pE instanceof js__$Boot_HaxeError) pE = pE.val;
			return false;
		}
	}
	,onHowlerEndInit: function() {
		var lExt;
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : SndMgr::onHowlerEndInit",true);
		var _g = 0;
		var _g1 = this.exts;
		while(_g < _g1.length) {
			var lExt1 = _g1[_g];
			++_g;
			vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : SndMgr::onHowlerEndInit : codec " + lExt1 + " : " + Std.string(Howler.codecs(HxOverrides.substr(lExt1,1,null))),true);
		}
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : SndMgr::onHowlerEndInit : ctx=" + Std.string(Howler.ctx),true);
		if(Howler.ctx != null) vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : SndMgr::onHowlerEndInit : ctx.time=" + Howler.ctx.currentTime,true);
		if(Howler.ctx != null) vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : SndMgr::onHowlerEndInit : ctx.rate=" + Howler.ctx.sampleRate,true);
	}
	,__class__: vega_sound_SndMgr
};
var vega_sound_SndPlayMode = function() {
};
vega_sound_SndPlayMode.__name__ = true;
vega_sound_SndPlayMode.prototype = {
	__class__: vega_sound_SndPlayMode
};
var vega_sound_SndPlayModeChained = function(pSubId) {
	this._subId = null;
	vega_sound_SndPlayMode.call(this);
	this._subId = pSubId;
};
vega_sound_SndPlayModeChained.__name__ = true;
vega_sound_SndPlayModeChained.__super__ = vega_sound_SndPlayMode;
vega_sound_SndPlayModeChained.prototype = $extend(vega_sound_SndPlayMode.prototype,{
	getSubId: function() {
		return this._subId;
	}
	,__class__: vega_sound_SndPlayModeChained
});
var vega_sound_SndTrack = function(pDesc,pDoLoad) {
	if(pDoLoad == null) pDoLoad = false;
	this.isLoading = false;
	this.endListeners = null;
	this.channels = null;
	this._desc = null;
	this._desc = pDesc;
	this.channels = [];
	this.endListeners = [];
	if(pDoLoad && !this._desc.getIsLoaded()) this.doLoad();
};
vega_sound_SndTrack.__name__ = true;
vega_sound_SndTrack.prototype = {
	destroy: function() {
		vega_loader_VegaLoaderMgr.getInstance().freeLoadedFileMem(this._desc.getFileResId());
		this.stop();
		if(this._desc.getIsLoaded()) this._desc.getHowl().unload();
		if(this.isLoading) this.remLoadListener();
		this._desc.destroy();
		this.channels = null;
		this.endListeners = null;
		this._desc = null;
	}
	,getDesc: function() {
		return this._desc;
	}
	,play: function(pMode,pCheckInvalid) {
		if(pCheckInvalid == null) pCheckInvalid = false;
		this.addSndInstance(pMode,pCheckInvalid);
	}
	,stop: function() {
		var lI = this.channels.length - 1;
		while(lI >= 0) this.channels[lI--].stop();
	}
	,isPlaying: function() {
		return this.channels.length > 0;
	}
	,onChanStop: function(pChan) {
		var lI;
		HxOverrides.remove(this.channels,pChan);
		if(!this.isPlaying()) {
			lI = this.endListeners.length - 1;
			while(lI >= 0) this.endListeners[lI]();
		}
	}
	,addEndListener: function(pListener) {
		this.endListeners.push(pListener);
	}
	,remEndListener: function(pListener) {
		HxOverrides.remove(this.endListeners,pListener);
	}
	,addSndInstance: function(pMode,pCheckInvalid) {
		if(pCheckInvalid == null) pCheckInvalid = false;
		var lSnd;
		lSnd = new vega_sound_SndInstance(this);
		this.channels.push(lSnd);
		if(pCheckInvalid) lSnd.playInvalid(pMode); else lSnd.play(pMode);
		if(!(this._desc.getIsLoaded() || this.isLoading)) this.doLoad();
	}
	,doLoad: function() {
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : SndTrack::doLoad : " + this._desc.getId() + " : " + this._desc.getHowl().state());
		this.isLoading = true;
		this._desc.getHowl().load();
		this._desc.getHowl().on("load",$bind(this,this.onTrackLoaded));
		this._desc.getHowl().on("loaderror",$bind(this,this.onTrackLoadError));
	}
	,remLoadListener: function() {
		this._desc.getHowl().off("load",$bind(this,this.onTrackLoaded));
		this._desc.getHowl().off("loaderror",$bind(this,this.onTrackLoadError));
	}
	,onTrackLoaded: function() {
		var lI = this.channels.length - 1;
		vega_shell_ApplicationMatchSize.instance.traceDebug("INFO : SndTrack::onTrackLoaded : " + this._desc.getId());
		vega_loader_VegaLoaderMgr.getInstance().regLoadedFile(new vega_loader_file_LoadingFileHowl(this._desc));
		this.remLoadListener();
		this.isLoading = false;
		while(lI >= 0) this.channels[lI--].checkTimestampPlay();
	}
	,onTrackLoadError: function() {
		var lI = this.channels.length - 1;
		vega_shell_ApplicationMatchSize.instance.traceDebug("ERROR : SndTrack::onTrackLoadError : " + this._desc.getId());
		this.remLoadListener();
		this.isLoading = false;
		while(lI >= 0) this.channels[lI].stop();
	}
	,__class__: vega_sound_SndTrack
};
var vega_ui_MyButtonFlump = function(pCont,pOnDown,pOnRelease,pIsAutoPlay,pIsPreservFrame) {
	if(pIsPreservFrame == null) pIsPreservFrame = false;
	if(pIsAutoPlay == null) pIsAutoPlay = false;
	this.isPause = false;
	this.isPreservFrame = false;
	this.autoPlay = false;
	this.onReleaseCB = null;
	this.onDownCB = null;
	this.container = pCont;
	this.onDownCB = [];
	this.onReleaseCB = pOnRelease;
	this.autoPlay = pIsAutoPlay;
	this.isPreservFrame = pIsPreservFrame;
	if(pOnDown != null) this.onDownCB.push(pOnDown);
	this.hit = pCont.getLayer("hit").getChildAt(0);
	this.hit.alpha = 0;
	this.hit.buttonMode = true;
	this.hit.interactive = true;
	this.hit.on("mousedown",$bind(this,this.onDown));
	this.hit.on("mouseover",$bind(this,this.onOver));
	this.hit.on("mouseup",$bind(this,this.onUp));
	this.hit.on("mouseout",$bind(this,this.onOut));
	this.hit.on("touchstart",$bind(this,this.onTDown));
	this.hit.on("touchmove",$bind(this,this.onTOver));
	this.hit.on("touchend",$bind(this,this.onTUp));
	this.hit.on("touchendoutside",$bind(this,this.onTUpOut));
	this.stateUp = pCont.getLayer("up").getChildAt(0);
	this.stateUp.interactive = false;
	this.stateUp.visible = false;
	if(vega_utils_UtilsFlump.getLayer("over",pCont) != null) {
		this.stateOver = pCont.getLayer("over").getChildAt(0);
		this.stateOver.interactive = false;
		this.stateOver.visible = false;
	}
	if(vega_utils_UtilsFlump.getLayer("down",pCont) != null) {
		this.stateDown = pCont.getLayer("down").getChildAt(0);
		this.stateDown.interactive = false;
		this.stateDown.visible = false;
	}
	if(vega_utils_UtilsFlump.getLayer("select",pCont) != null) {
		this.stateSelect = pCont.getLayer("select").getChildAt(0);
		this.stateSelect.interactive = false;
		this.stateSelect.visible = false;
	}
	if(vega_utils_UtilsFlump.getLayer("selectDown",pCont) != null) {
		this.stateSelectDown = pCont.getLayer("selectDown").getChildAt(0);
		this.stateSelectDown.interactive = false;
		this.stateSelectDown.visible = false;
	}
	if(vega_utils_UtilsFlump.getLayer("selectOver",pCont) != null) {
		this.stateSelectOver = pCont.getLayer("selectOver").getChildAt(0);
		this.stateSelectOver.interactive = false;
		this.stateSelectOver.visible = false;
	}
	this.enableState(this.stateUp);
};
vega_ui_MyButtonFlump.__name__ = true;
vega_ui_MyButtonFlump.prototype = {
	destroy: function() {
		if(this.curState != null && this.autoPlay && js_Boot.__instanceof(this.curState,PIXI.Container)) vega_utils_UtilsFlump.recursiveGotoAndStop(this.curState,0);
		this.hit.off("mousedown",$bind(this,this.onDown));
		this.hit.off("touchstart",$bind(this,this.onTDown));
		this.hit.off("mouseover",$bind(this,this.onOver));
		this.hit.off("touchmove",$bind(this,this.onTOver));
		this.hit.off("mouseup",$bind(this,this.onUp));
		this.hit.off("touchend",$bind(this,this.onTUp));
		this.hit.off("touchendoutside",$bind(this,this.onTUpOut));
		this.hit.off("mouseout",$bind(this,this.onOut));
		this.hit.buttonMode = false;
		this.hit.interactive = false;
		this.container.visible = true;
		if(this.stateUp != null) {
			this.stateUp.visible = true;
			this.stateUp = null;
		}
		if(this.stateOver != null) {
			this.stateOver.visible = true;
			this.stateOver = null;
		}
		if(this.stateDown != null) {
			this.stateDown.visible = true;
			this.stateDown = null;
		}
		if(this.stateSelect != null) {
			this.stateSelect.visible = true;
			this.stateSelect = null;
		}
		if(this.stateSelectOver != null) {
			this.stateSelectOver.visible = true;
			this.stateSelectOver = null;
		}
		if(this.stateSelectDown != null) {
			this.stateSelectDown.visible = true;
			this.stateSelectDown = null;
		}
		this.curState = null;
		this.data = null;
		this.hit = null;
		this.onDownCB = null;
		this.onReleaseCB = null;
		this.container = null;
	}
	,addDownListener: function(pListener) {
		this.onDownCB.push(pListener);
	}
	,getModel: function() {
		return this.container;
	}
	,switchEnable: function(pIsEnable) {
		this.hit.buttonMode = pIsEnable;
		this.hit.interactive = pIsEnable;
	}
	,switchAnim: function(pIsAnim) {
		if(pIsAnim) {
			if(!this.autoPlay) {
				this.autoPlay = true;
				if(!this.isPause && this.curState != null && js_Boot.__instanceof(this.curState,PIXI.Container)) vega_utils_UtilsFlump.recursivePlay(this.curState);
			}
		} else if(this.autoPlay) {
			this.autoPlay = false;
			if(!this.isPause && this.curState != null && js_Boot.__instanceof(this.curState,PIXI.Container)) vega_utils_UtilsFlump.recursiveGotoAndStop(this.curState,0);
		}
	}
	,switchPause: function(pIsPause) {
		if(this.autoPlay) {
			if(pIsPause) {
				if(!this.isPause) {
					if(this.curState != null && js_Boot.__instanceof(this.curState,PIXI.Container)) vega_utils_UtilsFlump.recursiveStop(this.curState);
				}
			} else if(this.isPause) {
				if(this.curState != null && js_Boot.__instanceof(this.curState,PIXI.Container)) vega_utils_UtilsFlump.recursivePlay(this.curState);
			}
		}
		this.isPause = pIsPause;
	}
	,unselect: function() {
		if(this.stateUp != null) this.enableState(this.stateUp);
	}
	,select: function() {
		if(this.stateSelect != null) this.enableState(this.stateSelect);
	}
	,reset: function() {
		this.enableState(this.stateUp);
	}
	,hide: function() {
		this.reset();
		this.container.visible = false;
	}
	,show: function() {
		this.reset();
		this.container.visible = true;
	}
	,enableState: function(pState) {
		var lFr = 0;
		if(pState != this.curState) {
			if(this.curState != null) {
				if(this.isPreservFrame && js_Boot.__instanceof(this.curState,pixi_flump_Movie)) lFr = (js_Boot.__cast(this.curState , pixi_flump_Movie)).get_currentFrame();
				if(this.autoPlay && js_Boot.__instanceof(this.curState,PIXI.Container)) vega_utils_UtilsFlump.recursiveStop(this.curState);
				this.curState.visible = false;
			}
			this.curState = pState;
			if(this.curState != null) {
				this.curState.visible = true;
				if(this.isPreservFrame && js_Boot.__instanceof(this.curState,pixi_flump_Movie)) vega_utils_UtilsFlump.recursiveGotoAndStop(this.curState,lFr);
				if(!this.isPause && this.autoPlay && js_Boot.__instanceof(this.curState,PIXI.Container)) vega_utils_UtilsFlump.recursivePlay(this.curState);
			}
		}
	}
	,isSelect: function() {
		return this.curState != null && (this.curState == this.stateSelect || this.curState == this.stateSelectDown || this.curState == this.stateSelectOver);
	}
	,onTOver: function(pE) {
		this.data = pE.data;
		if(this.isSelect()) {
			if(this.stateSelectOver != null && this.isOver()) this.enableState(this.stateSelectOver); else this.enableState(this.stateSelect);
		} else if(this.stateOver != null && this.isOver()) this.enableState(this.stateOver); else this.enableState(this.stateUp);
	}
	,onOver: function(pE) {
		if(this.isSelect()) {
			if(this.stateSelectOver != null) this.enableState(this.stateSelectOver); else this.enableState(this.stateSelect);
		} else if(this.stateOver != null) this.enableState(this.stateOver); else this.enableState(this.stateUp);
	}
	,onTUp: function(pE) {
		this.onTUpOut(pE);
		if(this.onReleaseCB != null) this.onReleaseCB(pE);
	}
	,onTUpOut: function(pE) {
		this.data = null;
		if(this.isSelect()) this.enableState(this.stateSelect); else this.enableState(this.stateUp);
	}
	,onUp: function(pE) {
		this.data = pE.data;
		if(this.isSelect()) {
			if(this.stateSelectOver != null && this.isOver()) this.enableState(this.stateSelectOver); else this.enableState(this.stateSelect);
		} else if(this.stateOver != null && this.isOver()) this.enableState(this.stateOver); else this.enableState(this.stateUp);
		if(this.onReleaseCB != null) this.onReleaseCB(pE);
	}
	,onTDown: function(pE) {
		this.onDown(pE);
	}
	,onDown: function(pE) {
		var lListener;
		this.data = pE.data;
		if(this.isSelect()) {
			if(this.stateSelectDown != null) this.enableState(this.stateSelectDown); else this.enableState(this.stateSelect);
		} else if(this.stateDown != null) this.enableState(this.stateDown); else this.enableState(this.stateUp);
		var _g = 0;
		var _g1 = this.onDownCB;
		while(_g < _g1.length) {
			var lListener1 = _g1[_g];
			++_g;
			lListener1(pE);
		}
	}
	,onOut: function(pE) {
		this.enableState(this.stateUp);
		if(this.isSelect()) this.enableState(this.stateSelect); else this.enableState(this.stateUp);
	}
	,isOver: function() {
		var lRect = this.hit.getLocalBounds();
		var lPt;
		if(this.data != null) {
			if(this.data.global.x == 0 && this.data.global.y == 0) return false;
			lPt = this.data.getLocalPosition(this.hit);
		} else if(this.hit.eventData != null) {
			if(this.hit.eventData.data.global.x == 0 && this.hit.eventData.data.global.y == 0) return false;
			lPt = this.hit.eventData.data.getLocalPosition(this.hit);
		} else return false;
		return lRect.contains(lPt.x,lPt.y);
	}
	,__class__: vega_ui_MyButtonFlump
};
var vega_utils_UtilsFlump = function() { };
vega_utils_UtilsFlump.__name__ = true;
vega_utils_UtilsFlump.getDescMc = function(pAtlasId,pMcId) {
	var this1 = pixi_flump_Resource.get(pAtlasId).library.movies;
	return this1.get(pMcId);
};
vega_utils_UtilsFlump.getLayerWithPrefix = function(pPrefix,pAtlasId,pMcId) {
	return vega_utils_UtilsFlump.getLayerWithPrefixInSymbol(pPrefix,vega_utils_UtilsFlump.getDescMc(pAtlasId,pMcId));
};
vega_utils_UtilsFlump.getLayerWithPrefixInMovie = function(pPrefix,pCont) {
	return vega_utils_UtilsFlump.getLayerWithPrefixInSymbol(pPrefix,pCont.symbol);
};
vega_utils_UtilsFlump.getLayersWithPrefixInMovie = function(pPrefix,pCont) {
	return vega_utils_UtilsFlump.getLayersWithPrefixInSymbol(pPrefix,pCont.symbol);
};
vega_utils_UtilsFlump.getLayer = function(pName,pCont) {
	if(vega_utils_UtilsFlump.getLayerWithPrefixInSymbol(pName,pCont.symbol,true) != null) return pCont.getLayer(pName); else return null;
};
vega_utils_UtilsFlump.getLayers = function(pCont) {
	return pCont.symbol.layers;
};
vega_utils_UtilsFlump.getLayerWithPrefixInSymbol = function(pPrefix,pDesc,pIsFull) {
	if(pIsFull == null) pIsFull = false;
	var lLayer;
	var _g = 0;
	var _g1 = pDesc.layers;
	while(_g < _g1.length) {
		var lLayer1 = _g1[_g];
		++_g;
		if(pIsFull) {
			if(lLayer1.name == pPrefix) return lLayer1;
		} else if(lLayer1.name.indexOf(pPrefix) == 0) return lLayer1;
	}
	return null;
};
vega_utils_UtilsFlump.getLayersWithPrefixInSymbol = function(pPrefix,pDesc) {
	var lLayers = [];
	var lLayer;
	var _g = 0;
	var _g1 = pDesc.layers;
	while(_g < _g1.length) {
		var lLayer1 = _g1[_g];
		++_g;
		if(lLayer1.name.indexOf(pPrefix) == 0) lLayers.push(lLayer1);
	}
	return lLayers;
};
vega_utils_UtilsFlump.getTextureFromSpId = function(pId) {
	var lRes = pixi_flump_Resource.getResourceForSprite(pId);
	var key = lRes.library.sprites.get(pId).texture;
	return lRes.textures.get(key);
};
vega_utils_UtilsFlump.getLayerName = function(pLayer) {
	var lLayer;
	if(js_Boot.__instanceof(pLayer.parent,pixi_flump_Movie)) {
		var _g = 0;
		var _g1;
		_g1 = (js_Boot.__cast(pLayer.parent , pixi_flump_Movie)).symbol.layers;
		while(_g < _g1.length) {
			var lLayer1 = _g1[_g];
			++_g;
			if((js_Boot.__cast(pLayer.parent , pixi_flump_Movie)).getLayer(lLayer1.name) == pLayer) return lLayer1.name;
		}
	}
	return null;
};
vega_utils_UtilsFlump.getContent = function(pMovie,pLayer) {
	return pMovie.getLayer(pLayer).getChildAt(0);
};
vega_utils_UtilsFlump.getSymbolId = function(pDisp) {
	if(js_Boot.__instanceof(pDisp,pixi_flump_Movie)) return (js_Boot.__cast(pDisp , pixi_flump_Movie)).get_symbolId(); else if(js_Boot.__instanceof(pDisp,pixi_flump_Sprite)) return (js_Boot.__cast(pDisp , pixi_flump_Sprite)).symbolId; else return null;
};
vega_utils_UtilsFlump.recursiveStop = function(pCont) {
	var lChild;
	if(js_Boot.__instanceof(pCont,pixi_flump_Movie)) (js_Boot.__cast(pCont , pixi_flump_Movie)).stop();
	var _g = 0;
	var _g1 = pCont.children;
	while(_g < _g1.length) {
		var lChild1 = _g1[_g];
		++_g;
		if(js_Boot.__instanceof(lChild1,PIXI.Container)) vega_utils_UtilsFlump.recursiveStop(lChild1);
	}
};
vega_utils_UtilsFlump.recursivePlay = function(pCont) {
	var lChild;
	if(js_Boot.__instanceof(pCont,pixi_flump_Movie)) (js_Boot.__cast(pCont , pixi_flump_Movie)).play();
	var _g = 0;
	var _g1 = pCont.children;
	while(_g < _g1.length) {
		var lChild1 = _g1[_g];
		++_g;
		if(js_Boot.__instanceof(lChild1,PIXI.Container)) vega_utils_UtilsFlump.recursivePlay(lChild1);
	}
};
vega_utils_UtilsFlump.recursiveGotoAndStop = function(pCont,pFrame) {
	var lChild;
	if(js_Boot.__instanceof(pCont,pixi_flump_Movie)) (js_Boot.__cast(pCont , pixi_flump_Movie)).gotoAndStop(pFrame);
	var _g = 0;
	var _g1 = pCont.children;
	while(_g < _g1.length) {
		var lChild1 = _g1[_g];
		++_g;
		if(js_Boot.__instanceof(lChild1,PIXI.Container)) vega_utils_UtilsFlump.recursiveGotoAndStop(lChild1,pFrame);
	}
};
vega_utils_UtilsFlump.updateLayerInstanceRelativePos = function(pCont,pX,pY) {
	var lDisp = pCont.getChildAt(0);
	var lCoord = pCont.toLocal(new PIXI.Point(pX,pY),pCont.parent);
	lDisp.x = lCoord.x;
	lDisp.y = lCoord.y;
};
vega_utils_UtilsFlump.setLayerXY = function(pCont,pX,pY) {
	var lDisp = pCont.getChildAt(0);
	lDisp.x = (pX - pCont.x) / pCont.scale.x;
	lDisp.y = (pY - pCont.y) / pCont.scale.y;
};
vega_utils_UtilsFlump.setLayerX = function(pLayer,pX) {
	pLayer.getChildAt(0).x = (pX - pLayer.x) / pLayer.scale.x;
};
vega_utils_UtilsFlump.setLayerY = function(pLayer,pY) {
	pLayer.getChildAt(0).y = (pY - pLayer.y) / pLayer.scale.y;
};
vega_utils_UtilsFlump.getLayerX = function(pLayer) {
	return pLayer.getChildAt(0).x * pLayer.scale.x + pLayer.x;
};
vega_utils_UtilsFlump.getLayerY = function(pLayer) {
	return pLayer.getChildAt(0).y * pLayer.scale.y + pLayer.y;
};
vega_utils_UtilsFlump.getLayerXY = function(pLayer) {
	var lChild = pLayer.getChildAt(0);
	return new PIXI.Point(lChild.x * pLayer.scale.x + pLayer.x,lChild.y * pLayer.scale.y + pLayer.y);
};
vega_utils_UtilsFlump.recursiveApplyMask = function(pCont) {
	var lLayers;
	var lLayer;
	var lChild;
	var lModel;
	var lMasked;
	var lMask;
	var lRect;
	if(js_Boot.__instanceof(pCont,pixi_flump_Movie)) {
		lLayers = vega_utils_UtilsFlump.getLayersWithPrefixInMovie("mask",pCont);
		var _g = 0;
		while(_g < lLayers.length) {
			var lLayer1 = lLayers[_g];
			++_g;
			lModel = vega_utils_UtilsFlump.getLayer(lLayer1.name,pCont);
			lMasked = pCont.getChildAt(pCont.getChildIndex(lModel) - 1);
			lMask = pCont.addChildAt(new PIXI.Graphics(),pCont.getChildIndex(lModel));
			lRect = vega_utils_UtilsPixi.getParentBounds(lModel);
			lMask.beginFill(0,1);
			lMask.drawRect(lRect.x,lRect.y,lRect.width,lRect.height);
			lMask.endFill();
			lMasked.mask = lMask;
			lModel.visible = false;
		}
	}
	var _g1 = 0;
	var _g11 = pCont.children;
	while(_g1 < _g11.length) {
		var lChild1 = _g11[_g1];
		++_g1;
		if(js_Boot.__instanceof(lChild1,PIXI.Container)) vega_utils_UtilsFlump.recursiveApplyMask(lChild1);
	}
};
vega_utils_UtilsFlump.recursiveRemoveMask = function(pCont) {
	var lChild;
	if(js_Boot.__instanceof(pCont,pixi_flump_Movie)) {
		var _g = 0;
		var _g1 = pCont.children;
		while(_g < _g1.length) {
			var lChild1 = _g1[_g];
			++_g;
			if(lChild1.mask != null) {
				pCont.removeChild(lChild1.mask).destroy();
				lChild1.mask = null;
			}
		}
	}
	var _g2 = 0;
	var _g11 = pCont.children;
	while(_g2 < _g11.length) {
		var lChild2 = _g11[_g2];
		++_g2;
		if(js_Boot.__instanceof(lChild2,PIXI.Container)) vega_utils_UtilsFlump.recursiveRemoveMask(lChild2);
	}
};
vega_utils_UtilsFlump.createFullscreenBt = function(pCont) {
	var lBt = new vega_ui_MyButtonFlump(pCont,vega_utils_UtilsFlump.onBtFullscreen);
	if(vega_shell_ApplicationMatchSize.instance.vars.f == "0") lBt.hide();
	return lBt;
};
vega_utils_UtilsFlump.onBtFullscreen = function(pE) {
	if(fullScreenApi.supportsFullScreen) {
		if(fullScreenApi.isFullScreen()) fullScreenApi.cancelFullScreen(); else fullScreenApi.requestFullScreen(window.document.documentElement);
	}
};
var vega_utils_UtilsPixi = function() { };
vega_utils_UtilsPixi.__name__ = true;
vega_utils_UtilsPixi.getParentBounds = function(pDisp,pRect) {
	var lRect;
	if(pRect == null) lRect = pDisp.getLocalBounds(); else lRect = pRect;
	lRect.x = pDisp.x + (pDisp.scale.x >= 0?lRect.x * pDisp.scale.x:(lRect.x + lRect.width) * pDisp.scale.x);
	lRect.width *= Math.abs(pDisp.scale.x);
	lRect.y = pDisp.y + (pDisp.scale.y >= 0?lRect.y * pDisp.scale.y:(lRect.y + lRect.height) * pDisp.scale.y);
	lRect.height *= Math.abs(pDisp.scale.y);
	return lRect;
};
vega_utils_UtilsPixi.getContentBounds = function(pDisp,pRect) {
	var lTarget = vega_shell_ApplicationMatchSize.instance.getContent();
	var lRect;
	if(pRect == null) lRect = pDisp.getLocalBounds(); else lRect = pRect;
	while(pDisp != lTarget) {
		vega_utils_UtilsPixi.getParentBounds(pDisp,lRect);
		pDisp = pDisp.parent;
	}
	return lRect;
};
vega_utils_UtilsPixi.contentToChild = function(pChild,pCoord) {
	var lTrans = [];
	var lTarget = vega_shell_ApplicationMatchSize.instance.getContent();
	var lI;
	var lX;
	var lY;
	while(pChild != lTarget) {
		lTrans.push([new PIXI.Point(pChild.x,pChild.y),pChild.scale.clone()]);
		if(pChild.rotation != 0) lTrans[lTrans.length - 1].push(new PIXI.Point(Math.cos(pChild.rotation),Math.sin(pChild.rotation)));
		pChild = pChild.parent;
	}
	lI = lTrans.length - 1;
	while(lI >= 0) {
		if(lTrans[lI].length > 2) {
			lX = pCoord.x;
			lY = pCoord.y;
			pCoord.x = (lX * lTrans[lI][2].x + lY * lTrans[lI][2].y - lTrans[lI][0].x * lTrans[lI][2].x - lTrans[lI][0].y * lTrans[lI][2].y) / lTrans[lI][1].x;
			pCoord.y = (lY * lTrans[lI][2].x - lX * lTrans[lI][2].y + lTrans[lI][0].x * lTrans[lI][2].y - lTrans[lI][0].y * lTrans[lI][2].x) / lTrans[lI][1].y;
		} else {
			pCoord.x = (pCoord.x - lTrans[lI][0].x) / lTrans[lI][1].x;
			pCoord.y = (pCoord.y - lTrans[lI][0].y) / lTrans[lI][1].y;
		}
		lI--;
	}
	return pCoord;
};
vega_utils_UtilsPixi.childToContent = function(pChild,pCoord) {
	var lTarget = vega_shell_ApplicationMatchSize.instance.getContent();
	var lCos;
	var lSin;
	var lX;
	var lY;
	while(pChild != lTarget) {
		if(pChild.rotation != 0) {
			lCos = Math.cos(pChild.rotation);
			lSin = Math.sin(pChild.rotation);
			lX = pCoord.x * pChild.scale.x;
			lY = pCoord.y * pChild.scale.y;
			pCoord.x = lX * lCos - lY * lSin + pChild.x;
			pCoord.y = lX * lSin + lY * lCos + pChild.y;
		} else {
			pCoord.x = pCoord.x * pChild.scale.x + pChild.x;
			pCoord.y = pCoord.y * pChild.scale.y + pChild.y;
		}
		pChild = pChild.parent;
	}
	return pCoord;
};
vega_utils_UtilsPixi.childToChild = function(pFrom,pTo,pCoord) {
	return vega_utils_UtilsPixi.contentToChild(pTo,vega_utils_UtilsPixi.childToContent(pFrom,pCoord));
};
vega_utils_UtilsPixi.addPt = function(pPtA,pPtB) {
	pPtA.x += pPtB.x;
	pPtA.y += pPtB.y;
	return pPtA;
};
vega_utils_UtilsPixi.subPt = function(pPtA,pPtB) {
	return new PIXI.Point(pPtA.x - pPtB.x,pPtA.y - pPtB.y);
};
vega_utils_UtilsPixi.intersects = function(pRect1,pRect2) {
	return pRect1.x <= pRect2.x + pRect2.width && pRect2.x <= pRect1.x + pRect1.width && pRect1.y <= pRect2.y + pRect2.height && pRect2.y <= pRect1.y + pRect1.height;
};
vega_utils_UtilsPixi.isPtInRect = function(pX,pY,pRect,pOffset) {
	if(pOffset == null) pOffset = 0;
	return pX >= pRect.x - pOffset && pX <= pRect.x + pRect.width + pOffset && pY >= pRect.y - pOffset && pY <= pRect.y + pRect.height + pOffset;
};
vega_utils_UtilsPixi.isPtInRectExp = function(pX,pY,pRect,pExp) {
	if(pExp <= 0) return vega_utils_UtilsPixi.isPtInRect(pX,pY,pRect,pExp); else if(pX < pRect.x && pY < pRect.y) return (pX - pRect.x) * (pX - pRect.x) + (pY - pRect.y) * (pY - pRect.y) <= pExp * pExp; else if(pX < pRect.x && pY > pRect.y + pRect.height) return (pX - pRect.x) * (pX - pRect.x) + (pY - pRect.y - pRect.height) * (pY - pRect.y - pRect.height) <= pExp * pExp; else if(pX > pRect.x + pRect.width && pY < pRect.y) return (pX - pRect.x - pRect.width) * (pX - pRect.x - pRect.width) + (pY - pRect.y) * (pY - pRect.y) <= pExp * pExp; else if(pX > pRect.x + pRect.width && pY > pRect.y + pRect.height) return (pX - pRect.x - pRect.width) * (pX - pRect.x - pRect.width) + (pY - pRect.y - pRect.height) * (pY - pRect.y - pRect.height) <= pExp * pExp; else return vega_utils_UtilsPixi.isPtInRect(pX,pY,pRect,pExp);
};
vega_utils_UtilsPixi.center = function(pDisp) {
	pDisp.x = -pDisp.width / 2;
	pDisp.y = -pDisp.height / 2;
	return pDisp;
};
vega_utils_UtilsPixi.setQuickBt = function(pDisp,pListener) {
	pDisp.buttonMode = true;
	pDisp.interactive = true;
	pDisp.addListener("touchstart",pListener);
	pDisp.addListener("mousedown",pListener);
};
vega_utils_UtilsPixi.unsetQuickBt = function(pDisp) {
	pDisp.removeAllListeners("touchstart");
	pDisp.removeAllListeners("mousedown");
	pDisp.buttonMode = false;
	pDisp.interactive = false;
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
;(function() {
	var fullScreenApi = {
		supportsFullScreen: false,
		isFullScreen: function() { return false; },
		requestFullScreen: function() {},
		cancelFullScreen: function() {},
		fullScreenEventName: '',
		prefix: ''
	};
	
	var browserPrefixes = 'webkit moz o ms khtml'.split(' ');

	if (typeof document.cancelFullScreen != 'undefined')
	{
		fullScreenApi.supportsFullScreen = true;
	}
	else
	{
		// check for fullscreen support by vendor prefix
		for (var i = 0, il = browserPrefixes.length; i < il; i++ )
		{
			fullScreenApi.prefix = browserPrefixes[i];

			if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined' )
			{
				fullScreenApi.supportsFullScreen = true;
				break;
			}
		}
	}

	if (fullScreenApi.supportsFullScreen) 
	{
		fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';

		fullScreenApi.isFullScreen = function() 
		{
			switch (this.prefix) 
			{
				case '':
					return document.fullScreen;
				case 'webkit':
					return document.webkitIsFullScreen;
				default:
					return document[this.prefix + 'FullScreen'];
			}
		};
		
		fullScreenApi.requestFullScreen = function(el) 
		{
			return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
		};
		
		fullScreenApi.cancelFullScreen = function(el) 
		{
			return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
		};
	}

	if (typeof jQuery != 'undefined')
	{
		jQuery.requestFullScreen = function(el)
		{
			el = jQuery(el);
			if (el.length > 0)
			{
				if (fullScreenApi.supportsFullScreen) 
				{
					fullScreenApi.requestFullScreen(el[0]);
					return true;
				}
			}
			return false;
		};
		
		jQuery.cancelFullScreen = function()
		{
			if (fullScreenApi.supportsFullScreen)
			{
				fullScreenApi.cancelFullScreen();
			}
		};
	}

	window.fullScreenApi = fullScreenApi;
})();;
pixi_plugins_app_Application.AUTO = "auto";
pixi_plugins_app_Application.RECOMMENDED = "recommended";
pixi_plugins_app_Application.CANVAS = "canvas";
pixi_plugins_app_Application.WEBGL = "webgl";
Perf.MEASUREMENT_INTERVAL = 1000;
Perf.FONT_FAMILY = "Helvetica,Arial";
Perf.FPS_BG_CLR = "#00FF00";
Perf.FPS_WARN_BG_CLR = "#FF8000";
Perf.FPS_PROB_BG_CLR = "#FF0000";
Perf.MS_BG_CLR = "#FFFF00";
Perf.MEM_BG_CLR = "#086A87";
Perf.INFO_BG_CLR = "#00FFFF";
Perf.FPS_TXT_CLR = "#000000";
Perf.MS_TXT_CLR = "#000000";
Perf.MEM_TXT_CLR = "#FFFFFF";
Perf.INFO_TXT_CLR = "#000000";
Perf.TOP_LEFT = "TL";
Perf.TOP_RIGHT = "TR";
Perf.BOTTOM_LEFT = "BL";
Perf.BOTTOM_RIGHT = "BR";
Perf.DELAY_TIME = 4000;
flump_library_Label.LABEL_ENTER = "labelEnter";
flump_library_Label.LABEL_EXIT = "labelExit";
flump_library_Label.LABEL_UPDATE = "labelUpdate";
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = {}.toString;
pixi_flump_Resource.resources = new haxe_ds_StringMap();
vega_assets_AssetRender.RENDER_FLUMP = "flump";
vega_assets_AssetRender.RENDER_DEFAULT = "default";
vega_assets_AssetRender.TYPE_FLUMP_MC = "mc";
vega_assets_AssetRender.TYPE_FLUMP_SP = "sp";
vega_assets_AssetsMgr.VOID_ASSET = "asset_vide";
vega_assets_AssetsSharedProperties.LOCKER_UNLOCKED = "unlock_instance";
vega_assets_AssetsSharedProperties.LOCKER_LOCKED = "lock_instance";
vega_assets_AssetsSharedProperties.LOCKER_UNDEFINED = "lock_undefined";
vega_assets_PatternAsset.FIND_ON_GROUP = "findOnGroup";
vega_assets_PatternAsset.FIND_ON_ID = "findOnId";
vega_assets_PatternAsset.FIND_ON_FILE = "findOnFile";
vega_assets_PatternAsset.FIND_ON_EXPORT = "findOnExport";
vega_assets_PatternAsset.MATCH_ALL = "matchAll";
vega_assets_PatternAsset.MATCH_SUBSTR = "matchSubstr";
vega_loader_file_LoadingFile.VERSION_PARAM = "v";
vega_loader_file_LoadingFileHowl.RELOAD_MAX = 20;
vega_loader_file_MyFile.NO_VERSION = "NO-VERSION";
vega_loader_file_MyFile.VERSION_NO_CACHE = "NO-CACHE";
vega_local_TxtDescFlump.ALIGN_CENTER = "center";
vega_local_TxtDescFlump.ALIGN_RIGHT = "right";
vega_local_TxtDescFlump.V_ALIGN_CENTER = "center";
vega_local_TxtDescFlump.V_ALIGN_BOT = "bot";
vega_ui_MyButtonFlump.NAME_UP = "up";
vega_ui_MyButtonFlump.NAME_OVER = "over";
vega_ui_MyButtonFlump.NAME_DOWN = "down";
vega_ui_MyButtonFlump.NAME_SELECT = "select";
vega_ui_MyButtonFlump.NAME_SELECT_DOWN = "selectDown";
vega_ui_MyButtonFlump.NAME_SELECT_OVER = "selectOver";
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
