webpackJsonp([32],{0:function(f,g,b){b(2949);b(1320)},1320:function(f,g){YUI.add("squarespace-image-zoom",function(b){b.namespace("Squarespace");var c=b.Squarespace.ImageZoom=b.Base.create("image-zoom",b.Base,[],{initializer:function(){this._shouldInitialize()&&(this.get("host")?this._initializeZoom():console.warn("[squarespace-image-zoom]: Missing host attribute."))},destructor:function(){this._shouldInitialize()&&(this.get("zoomedNode").remove(!0),this.get("host").removeClass(c.CSS_PREFIX).removeClass(c.CSS_PREFIX+
"--behavior-"+this.get("behavior")),this.get("dropzone").setStyle("position","").removeClass(c.CSS_PREFIX+"-dropzone"),this._zoomTriggerEvent&&this._zoomTriggerEvent.detach(),this._mouseMoveEvent&&this._mouseMoveEvent.detach(),this._mouseOutEvent&&this._mouseOutEvent.detach(),this._resizeEvent&&this._resizeEvent.detach(),this._resizeEvent=this._mouseOutEvent=this._mouseMoveEvent=this._zoomTriggerEvent=null)},_bindUI:function(){var a=this.get("host");this._zoomTriggerEvent=a.on(this.get("behavior"),
this._toggleZoom,this);this._mouseMoveEvent=a.on("mousemove",this._trackMovement,this);this._mouseOutEvent=a.on("mouseout",this._zoomOut,this);this._resizeEvent=b.one(window).on("resize",this._refresh,this)},_shouldInitialize:function(){return!b.UA.mobile&&Modernizr.csstransforms},_initializeZoom:function(){var a=this.get("host"),b=a.one("img"),e=this.get("dropzone");a.addClass(c.CSS_PREFIX);a.addClass(c.CSS_PREFIX+"--behavior-"+this.get("behavior"));e.addClass(c.CSS_PREFIX+"-dropzone");"static"===
e.getStyle("position")&&e.setStyle("position","relative");if(b.getAttribute("src"))this._appendZoomedNode(),this._bindUI();else b.once("load",function(){this._appendZoomedNode();this._bindUI()},this)},_appendZoomedNode:function(){var a=this.get("host").one("img"),d=a.getAttribute("data-src");if(!d)return console.warn("[squarespace-image-zoom]: Host image did not load properly; missing data-src."),null;var e=a.getAttribute("data-image-dimensions");e||(e=a.get("clientWidth")+"x"+a.get("clientHeight"));
(a=a.getAttribute("data-image-focal-point"))||(a="0.5,0.5");d=b.Node.create('<div class="'+c.CSS_PREFIX+'-duplicate"><img src="'+d+"?format="+this._getSquarespaceSizeForWidth()+'" data-image-dimensions="'+e+'" data-image-focal-point="'+a+'"></div>');d.setStyle("transform","scale("+this.get("zoom")+")");d.one("img").plug(b.Squarespace.Loader2,{load:!0,mode:"fill"});this.set("zoomedNode",d);this.get("dropzone").append(d)},_refresh:function(){var a=this.get("host").one("img").getAttribute("data-src"),
b=this.get("zoomedNode").one("img");b.setAttribute("src",a+"?format="+this._getSquarespaceSizeForWidth());b.fire("refresh")},_toggleZoom:function(a){this.get("_isZoomedIn")?this._zoomOut():this._zoomIn(a);a.stopPropagation()},_zoomIn:function(a){this.get("host").addClass("is-zoomed");this.set("_isZoomedIn",!0);this._trackMovement(a)},_zoomOut:function(){this.get("host").removeClass("is-zoomed");this.set("_isZoomedIn",!1)},_trackMovement:function(a){if(this.get("_isZoomedIn")){var b=Math.max(100*((a.pageX-
this.get("host").getX())/this.get("host").get("clientWidth")),0);a=Math.max(100*((a.pageY-this.get("host").getY())/this.get("host").get("clientHeight")),0);this.get("zoomedNode").setStyle("transformOrigin",b+"% "+a+"%")}},_getSquarespaceSizeForWidth:function(){var a=this.get("host").one("img").get("clientWidth");return b.Squarespace.Rendering.getSquarespaceSizeForWidth(a*this.get("zoom"))}},{CSS_PREFIX:"sqs-image-zoom",ATTRS:{host:{value:null,validator:function(a){a=b.one(a);return b.instanceOf(a,
b.Node)&&a.one("img")&&2>a.all("img").size()},writeOnce:!0},dropzone:{valueFn:function(){return this.get("host")},validator:function(a){return b.instanceOf(b.one(a),b.Node)},writeOnce:!0},behavior:{value:"hover",validator:function(a){return"hover"!==a&&"click"!==a?(console.warn("[squarespace-image-zoom]: Not a valid behavior, defaulting to hover."),!1):!0},writeOnce:!0},zoom:{value:1.5,validator:function(a){("number"!==typeof a||1>=a||5<a)&&console.warn("[squarespace-image-zoom]: Not a valid zoom value, defaulting to 1.5.");
return!0},writeOnce:!0},_isZoomedIn:{value:!1}}})},"1.0",{requires:"base event node squarespace-image-loader squarespace-rendering yui-base".split(" ")})},2949:function(f,g){YUI.add("squarespace-products-collection-list-v2",function(b){b.namespace("Squarespace.SystemCollections.Products").ListV2=b.Base.create("systemCollectionsProductsListV2",b.Base,[],{initializer:function(){this._loadImages();this._bindUI();this._syncUI()},destructor:function(){this._resizeEvent&&this._resizeEvent.detach();this._tweakChangeEvent&&
this._tweakChangeEvent.detach();this._tweakResetEvent&&this._tweakResetEvent.detach();b.Array.each(this._onImageLoadEvents,function(a){a.detach()});this._onImageLoadEvents=this._tweakResetEvent=this._tweakChangeEvent=this._resizeEvent=null},_loadImages:function(){this._onImageLoadEvents=[];this.get("images").each(function(a){a.plug(b.Squarespace.Loader2,{load:!0,mode:"fill"});this._onImageLoadEvents.push(a.on("load",function(){a.hasClass("ProductList-image--primary")&&a.ancestor(".ProductList-item").addClass("image-is-loaded")}))},
this)},_bindUI:function(){this._resizeEvent=b.on("resize",function(){this._syncUI()},b.config.win,this);this._tweakChangeEvent=b.Global.on("tweak:change",this._tweakChangeHandler,this);this._tweakResetEvent=b.Global.on("tweak:reset",this._syncUI,this);if(window.SQUARESPACE_LOGIN&&window.SQUARESPACE_LOGIN.isLoggedIn())b.on("beforeunload",function(){this.destroy(!0)},this)},_syncUI:function(){this._adjustSubPixelValues();this.get("images").each(function(a){a.fire("refresh")})},_adjustSubPixelValues:function(){var a=
this.get("host").all(".ProductList-item");a&&(a.setStyle("width",""),a.setStyle("width",Math.floor(parseInt(a.getStyle("width")[0],10))+"px"))},_tweakChangeHandler:function(a){var b=a.getName();a=a.getValue();"tweak-product-list-image-aspect-ratio"===b||"tweak-product-list-item-spacing"===b||"tweak-product-list-filter-display"===b||"tweak-product-list-filter-width"===b?this._syncUI():"tweak-product-list-items-per-row"===b?(this._previewTweakChangeItemsPerRow(),this._syncUI()):"tweak-product-list-item-hover-behavior"===
b&&"Show Alternate Image"===a&&(this._loadImages(),this._previewTweakChangeItemHoverBehavior())},_previewTweakChangeItemsPerRow:function(){var a=parseInt(b.Squarespace.Template.getTweakValue("tweak-product-list-items-per-row"),10);this.get("host").all(".ProductList-item").setStyle("clear","none");this.get("host").all(".ProductList-item:nth-child("+a+"n+1)").setStyle("clear","left");this.get("host").one(".ProductList-grid").setAttribute("data-items-per-row",a)},_previewTweakChangeItemHoverBehavior:function(){var a=
this.get("host").one(".ProductList-image--alt"),c=function(){a.setStyle("opacity",1);b.later(1E3,this,function(){a.setStyle("opacity","")})};if(a.hasClass("loaded"))c();else a.once("load",function(){c()})}},{ATTRS:{host:{value:null,validator:function(a){a=b.one(a);return b.instanceOf(a,b.Node)},writeOnce:!0},images:{getter:function(){return b.one(".tweak-product-list-item-hover-behavior-show-alternate-image")&&b.one(".tweak-product-list-meta-position-under")&&!b.UA.mobile?this.get("host").all(".ProductList-image[data-src]"):
this.get("host").all(".ProductList-image--primary[data-src]")}}}});var c;b.config.win.Squarespace.onInitialize(b,function(){c=[];b.all(".ProductList.products-collection-v2").each(function(a){var d=b.config.win.Static.SQUARESPACE_CONTEXT.tweakJSON["tweak-product-list-items-per-row"];a.one(".ProductList-grid").getDOMNode().dataset.itemsPerRow=d;c.push(new b.Squarespace.SystemCollections.Products.ListV2({host:a}))})});b.config.win.Squarespace.onDestroy(b,function(){c.forEach(function(a){a.destroy()});
c=null})},"1.0",{requires:"base node squarespace-beforeunload squarespace-image-loader squarespace-image-zoom squarespace-public-api".split(" ")})}});
