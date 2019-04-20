var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairui;
(function (fairui) {
    /**
     * 灵子特效
     * @author cl 2018.6.28
     */
    var SpringEffect = (function () {
        function SpringEffect() {
        }
        /**
         * 经验飞翔特效
         * @param startPos	起始点，如果不传则为鼠标处
         * @param targetPos	目标点
         * @param complete  完成事件
         * @param parent	容器
         */
        SpringEffect.play = function (startPos, targetPos, complete, completeParams, parent) {
            if (startPos === void 0) { startPos = null; }
            if (targetPos === void 0) { targetPos = null; }
            if (complete === void 0) { complete = null; }
            if (completeParams === void 0) { completeParams = null; }
            if (parent === void 0) { parent = null; }
            if (targetPos == null) {
                return;
            }
            var _star = [5, 2, 6, 4, 1, 2, 2, 5, 3, 1, 5, 4, 6, 3, 1];
            var _self = this;
            if (startPos == null) {
                startPos = new egret.Point(App.stageX, App.stageY);
            }
            if (parent == null) {
                parent = fairui.FairyUIManager.tipLayer;
            }
            var area = 60;
            var img = null;
            for (var i = 0; i < _star.length; i++) {
                img = new fairui.ELoader();
                img.setFairySource("common", "img_particle_" + _star[i]);
                if (_star[i] == 2 || _star[i] == 3 || _star[i] == 4) {
                    img.scaleX = 0.6;
                    img.scaleY = 0.6;
                }
                img.x = startPos.x - img.width * 0.5;
                img.y = startPos.y - img.height * 0.5;
                parent.addEgretChild(img.displayObject);
                //TweenLite.to(img, 0.2, { x: startPos.x + (area - Math.random() * area * 2), y: startPos.y + (area - Math.random() * area * 2), ease: Linear.easeInOut, onComplete:onStartOver, onCompleteParams: [img, i, targetPos] });
            }
            function onStartOver(img, i, targetPos) {
                if (targetPos != null) {
                    var offset = 50 * img.scaleX;
                    //TweenLite.to(img, 0.5, { delay: i * 0.01, x: targetPos.x - offset, y: targetPos.y - offset, onComplete: onFlyOver, onCompleteParams: [img, i], ease: Linear.easeOut });
                }
            }
            function onFlyOver(img, i) {
                if (i == _star.length - 1) {
                    if (complete != null) {
                        complete.apply(complete["owner"], completeParams);
                    }
                }
                if (img != null) {
                    img.dispose();
                    img = null;
                }
            }
        };
        return SpringEffect;
    }());
    fairui.SpringEffect = SpringEffect;
    __reflect(SpringEffect.prototype, "fairui.SpringEffect");
})(fairui || (fairui = {}));
//# sourceMappingURL=SpringEffect.js.map