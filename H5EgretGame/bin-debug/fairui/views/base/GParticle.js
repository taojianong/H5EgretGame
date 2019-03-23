var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var base;
(function (base) {
    /**
     * 粒子效果
     */
    var GParticle = (function (_super) {
        __extends(GParticle, _super);
        function GParticle(imgPath, jsonPath) {
            var _this = _super.call(this) || this;
            _this._playType = true;
            _this.init(imgPath, jsonPath);
            return _this;
        }
        //创建
        GParticle.prototype.init = function (imgPath, jsonPath) {
            this._url1 = imgPath;
            this._url2 = jsonPath;
            if (Config.useParticleType) {
                RES.getResByUrl(imgPath, function (texture) {
                    this._texture = texture;
                    this.create();
                }, this, RES.ResourceItem.TYPE_IMAGE);
                RES.getResByUrl(jsonPath, function (data) {
                    this._config = data;
                    this.create();
                }, this, RES.ResourceItem.TYPE_JSON);
            }
        };
        GParticle.prototype.create = function () {
            if (this._texture && this._config) {
                this.system = new particle.GravityParticleSystem(this._texture, this._config);
                this.addChild(this.system);
                if (this._playType)
                    this.system.start();
            }
        };
        GParticle.prototype.play = function () {
            if (this.system)
                this.system.start();
            this._playType = true;
        };
        GParticle.prototype.stop = function () {
            if (this.system)
                this.system.stop();
            this._playType = false;
        };
        GParticle.prototype.dispose = function (type) {
            _super.prototype.dispose.call(this, type);
            this._texture = null;
            this._config = null;
            this.system = null;
            if (type) {
                RES.destroyRes(this._url1);
                RES.destroyRes(this._url2);
            }
        };
        return GParticle;
    }(base.GSprite));
    base.GParticle = GParticle;
    __reflect(GParticle.prototype, "base.GParticle");
})(base || (base = {}));
//# sourceMappingURL=GParticle.js.map