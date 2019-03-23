var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var manager;
    (function (manager) {
        var AssetManager = (function () {
            function AssetManager() {
                this.imgMap = new flash.Dictionary();
                this.resMap = new flash.Dictionary();
                this.byteMap = new flash.Dictionary();
                this.txtMap = new flash.Dictionary();
            }
            /**
             * 缓存图片资源
             * @param name 资源url
             */
            AssetManager.prototype.setImgAsset = function (name, data) {
                this.imgMap.setItem(name, data);
            };
            /**
             * 获得图片资源缓存
             * @param name 资源url
             * @return Texture
             */
            AssetManager.prototype.getImgAsset = function (name) {
                return this.imgMap.getItem(name);
            };
            /**
             * 缓存图片资源
             * @param name 资源url
             * @return boolean
             */
            AssetManager.prototype.deleteImgAsset = function (name) {
                var bitmapData = this.imgMap.getItem(name);
                if (bitmapData) {
                    bitmapData.dispose();
                    this.imgMap.delItem(name);
                    return true;
                }
                return false;
            };
            /**
             * 缓存动画资源
             * @param name 资源url
             * @return Animator
             */
            AssetManager.prototype.setResAsset = function (name, data) {
                this.resMap.setItem(name, data);
            };
            /**
             * 获得动画资源缓存
             * @param name 资源url
             * @return Animator
             */
            AssetManager.prototype.getResAsset = function (name) {
                return this.resMap.getItem(name);
            };
            /**
             * 删除指定的动画资源
             * @param name 资源url
             * @return boolean
             */
            AssetManager.prototype.deleteResAsset = function (name) {
                var animator = this.getResAsset(name);
                if (animator) {
                    animator.dispose();
                    this.resMap.delItem(name);
                    return true;
                }
                return false;
            };
            /**删除所有的动画资源*/
            AssetManager.prototype.deleteAllResAsset = function () {
                this.resMap.forEach(function (key, data) {
                    if (!data.isCache) {
                        data.dispose();
                        this.resMap.delItem(key);
                    }
                }, this);
                //this.resMap.destroy();
            };
            /**
             * 缓存二进制资源
             * @param name 资源url
             * @return ByteArray
             */
            AssetManager.prototype.setByteAsset = function (name, data) {
                this.byteMap.setItem(name, data);
            };
            /**
             * 获得二进制资源
             * @param name 资源url
             * @return ByteArray
             */
            AssetManager.prototype.getByteAsset = function (name) {
                return this.byteMap.getItem(name);
            };
            /**
             * 缓存文本资源
             * @param name 资源url
             * @return ByteArray
             */
            AssetManager.prototype.setTxtAsset = function (name, data) {
                this.txtMap.setItem(name, data);
            };
            /**
             * 获得文本资源
             * @param name 资源url
             * @return any
             */
            AssetManager.prototype.getTxtAsset = function (name) {
                return this.txtMap.getItem(name);
            };
            /**
             * 根据资源类型获得该资源缓存
             * @param type 资源类型 EnumLoader
             * @param name 资源url
             * @return any
             */
            AssetManager.prototype.getTypeAsset = function (type, name) {
                var data;
                switch (type) {
                    case EnumLoader.BYTE:
                        data = this.getByteAsset(name);
                        break;
                    case EnumLoader.RES:
                        data = this.getResAsset(name);
                        break;
                    case EnumLoader.IMG:
                        data = this.getImgAsset(name);
                        break;
                    case EnumLoader.TXT:
                        data = this.getTxtAsset(name);
                        break;
                }
                return data;
            };
            AssetManager.prototype.hasClass = function (name) {
                return RES.hasRes(name);
            };
            AssetManager.prototype.getAsset = function (name) {
                return RES.getRes(name);
            };
            return AssetManager;
        }());
        manager.AssetManager = AssetManager;
        __reflect(AssetManager.prototype, "com.manager.AssetManager");
    })(manager = com.manager || (com.manager = {}));
})(com || (com = {}));
//# sourceMappingURL=AssetManager.js.map