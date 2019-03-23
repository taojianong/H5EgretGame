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
var fairui;
(function (fairui) {
    /**
     * 标题栏
     * @author cl 2018.4.2
     */
    var TitleBar = (function (_super) {
        __extends(TitleBar, _super);
        function TitleBar() {
            return _super.call(this) || this;
        }
        TitleBar.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.eloader_title.addEventListener(egret.Event.COMPLETE, this.loadTitleComplete, this);
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_END, this.close, this);
            try {
                var json = JSON.parse(this.data);
                if (json && json.hasOwnProperty("title") && json.hasOwnProperty("pkg")) {
                    this.setTitleSkin(json["pkg"], json["title"]);
                }
            }
            catch (error) {
            }
        };
        /**
         * 设置标题皮肤
         * @author pkgName 包名
         * @author resName 资源名
         */
        TitleBar.prototype.setTitleSkin = function (pkgName, resName) {
            // this.eloader_title.texture = fairui.FairyTextureUtils.getTextureBy( pkgName , resName );
            var url = fairui.FairyTextureUtils.getUrl(pkgName, resName);
            if (url == null) {
                App.log.error("没有对应标题资源 " + pkgName + "_" + resName + "!");
            }
            else {
                this.eloader_title.setFairySource(pkgName, resName);
            }
        };
        /**
         * 加载标题文字图片完成
         */
        TitleBar.prototype.loadTitleComplete = function (e) {
            this.eloader_title.x = (this.width - this.eloader_title.width) * 0.5;
            this.eloader_title.y = (this.height - this.eloader_title.height) * 0.5;
        };
        TitleBar.prototype.clear = function () {
            _super.prototype.clear.call(this);
        };
        TitleBar.prototype.close = function () {
            if (this.parent instanceof fairui.BasePanel) {
                this.parent.close();
            }
            else if (this.parent && this.parent.parent instanceof fairui.BasePanel) {
                this.parent.parent.close();
            }
        };
        TitleBar.prototype.dispose = function () {
            this.eloader_title.removeEventListener(egret.Event.COMPLETE, this.loadTitleComplete, this);
            _super.prototype.dispose.call(this);
            if (this.eloader_title != null) {
                this.eloader_title.dispose();
            }
            this.eloader_title = null;
            this.img_bar = null;
            this.btn_close = null;
        };
        return TitleBar;
    }(fairui.BaseSprite));
    fairui.TitleBar = TitleBar;
    __reflect(TitleBar.prototype, "fairui.TitleBar");
})(fairui || (fairui = {}));
//# sourceMappingURL=TitleBar.js.map