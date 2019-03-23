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
    var Avatar = (function (_super) {
        __extends(Avatar, _super);
        function Avatar() {
            var _this = _super.call(this) || this;
            _this._isDispose = false;
            _this._aniDirType = 0;
            _this._dir = -1;
            /**是否已改变方向*/
            _this._isChangeDir = false;
            _this._partVisible = true;
            _this._partAlpha = 1;
            _this._isPlaying = false;
            _this._isChangeAction = false;
            _this._isLoop = false;
            _this._isChangeUpdatePartDepth = false;
            _this._endFrame = -1;
            _this._currentFrame = 0;
            /**当前动作经过时间*/
            _this._currentActionPasstime = 0;
            _this._frameCount = -1;
            _this._fiveDir = -1;
            _this._speed = 1;
            _this.init();
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        Object.defineProperty(Avatar.prototype, "partHash", {
            get: function () {
                return this._partHash;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Avatar.prototype, "isDispose", {
            get: function () {
                return this._isDispose;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Avatar.prototype, "action", {
            get: function () {
                return this._action;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Avatar.prototype, "aniDirType", {
            /**动画的方向类型， 一般是0:八方向, 1:五方向 */
            get: function () {
                return this._aniDirType;
            },
            set: function (value) {
                this._aniDirType = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Avatar.prototype, "dir", {
            get: function () {
                return this._dir;
            },
            set: function (value) {
                if (this._dir != value) {
                    this._dir = value;
                    this._isChangeDir = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Avatar.prototype, "partVisible", {
            /**是否显示挂件*/
            get: function () {
                return this._partVisible;
            },
            set: function (value) {
                if (value != this._partVisible) {
                    this._partVisible = value;
                    this._partHash.forEach(function (key, part) {
                        part.visible = value;
                    }, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Avatar.prototype, "partAlpha", {
            get: function () {
                return this._partAlpha;
            },
            set: function (value) {
                if (value != this._partAlpha) {
                    this._partAlpha = value;
                    this._partHash.forEach(function (key, part) {
                        part.alpha = value;
                    }, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Avatar.prototype, "isLoop", {
            get: function () {
                return this._isLoop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Avatar.prototype, "playEndHanlder", {
            get: function () {
                return this._playEndHanlder;
            },
            set: function (value) {
                this._playEndHanlder = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Avatar.prototype, "speed", {
            get: function () {
                return this._speed;
            },
            set: function (value) {
                if (this._speed != value) {
                    this._speed = (value <= 0.1 ? 0.1 : value);
                }
            },
            enumerable: true,
            configurable: true
        });
        Avatar.prototype.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        };
        Avatar.prototype.init = function () {
            this.touchEnabled = false;
            this.touchChildren = false;
            this._partHash = new flash.Dictionary();
        };
        /**
         * 增加一个挂件。<br>1、注意，body也是挂件。<br>2、如佩刀，坐骑、翅膀等都是挂件。<br>
         * @param partType
         * @param path
         * @return base.AvatarPart
         */
        Avatar.prototype.addPart = function (partType) {
            var part = this._partHash.getItem(partType);
            if (part == null) {
                part = this.makePart(partType);
                this._partHash.setItem(partType, part);
                part.addParent(this);
                //part.changeAnimator(this.action, this.dir);
                //this.setupPartAnimator(part);
                this._isChangeUpdatePartDepth = true;
            }
            return part;
        };
        /**
         * 增加挂件时，new一个挂件对象。
         * @param partType
         * @return
         */
        Avatar.prototype.makePart = function (partType) {
            return new base.AvatarPart(partType);
        };
        Avatar.prototype.removePart = function (partType) {
            var part = this._partHash.getItem(partType);
            if (part) {
                part.dispose();
                this._partHash.delItem(partType);
            }
        };
        Avatar.prototype.getPart = function (partType) {
            return this._partHash.getItem(partType);
        };
        /**
         * 设置动画的缩放
         * @param sX
         * @param sY
         */
        Avatar.prototype.scaleXY = function (sX, sY) {
            if (!this._isDispose) {
                this._partHash.forEach(function (key, part) {
                    part.scaleX = sX;
                    part.scaleY = sX;
                }, this);
            }
        };
        /**
         * 是否点中任一挂件或指定的挂件。
         * @param partType
         * @return
         */
        Avatar.prototype.checkHitPoint = function (partType) {
            if (partType === void 0) { partType = -1; }
            var bool = false;
            if (partType == -1) {
                this._partHash.forEach(function (key, part) {
                    if (part.checkContainPoint()) {
                        bool = true;
                        return;
                    }
                }, this);
            }
            else {
                if (this.getPart(partType)) {
                    bool = this.getPart(partType).checkContainPoint();
                }
            }
            return bool;
        };
        /**开始播放*/
        Avatar.prototype.play = function () {
            this._isPlaying = true;
            this._endFrame = -1;
        };
        Avatar.prototype.playEnd = function () {
            if (this._playEndHanlder != null)
                this._playEndHanlder.apply(this._playEndHanlder["owner"]);
        };
        /**停止播放*/
        Avatar.prototype.stop = function () {
            this._isPlaying = false;
        };
        /**
         * 停止在第几帧
         * @param frame
         */
        Avatar.prototype.gotoAndStop = function (endFrame, startFrame) {
            if (startFrame === void 0) { startFrame = 0; }
            this._isLoop = false;
            this._currentFrame = startFrame;
            this.play();
            this._endFrame = endFrame;
        };
        /**
         * 从第几帧开始播放
         * @param frame
         */
        Avatar.prototype.gotoAndPlay = function (frame, loop) {
            if (loop === void 0) { loop = false; }
            this._isLoop = loop;
            this._currentFrame = frame;
            this.play();
        };
        Avatar.prototype.changeAction = function (action, loop, reset, startFrame) {
            if (loop === void 0) { loop = false; }
            if (reset === void 0) { reset = false; }
            if (startFrame === void 0) { startFrame = 0; }
            this._isLoop = loop;
            this.setAction(action, reset, startFrame);
        };
        Avatar.prototype.setAction = function (action, reset, startFrame) {
            if (reset === void 0) { reset = false; }
            if (startFrame === void 0) { startFrame = 0; }
            if (this._action != action || reset) {
                this._action = action;
                this._currentFrame = startFrame;
                this._currentActionPasstime = 0;
                this._isChangeAction = true;
                // com.center.FightCenter.getInstance().autoSortType = true;
            }
        };
        /**
         * 在帧事件中每帧调用
         * @param passtime
         */
        Avatar.prototype.addvanceTime = function (passtime) {
            if (!this._isPlaying || this.isDispose)
                return;
            this._currentActionPasstime += passtime;
            this.changeAnimator();
            var body = this.getPart(EnumAvatarPart.BODY);
            if (body == null || body.animator == null) {
                return;
            }
            if (this._frameCount != body.aniLength) {
                this._frameCount = body.aniLength;
                if (this._currentFrame >= this._frameCount) {
                    this._currentFrame = 0;
                }
            }
            if (this._currentFrame == -1) {
                this._currentFrame = this._frameCount - 1;
                this.setCurrentFrame();
                this.playEnd();
            }
            else {
                this.update();
            }
        };
        /**改变动画数据后的处理。 <br>1、现在的资源组织方式是方向和动作放在不同的资源包中。2、所以方向或动作任一一个变化都是要加载对应的资源。*/
        Avatar.prototype.changeAnimator = function () {
            if (this._isChangeDir || this._isChangeAction) {
                if (this._aniDirType == EnumAvatarPart.EIGHT_DIR) {
                    this._partHash.forEach(function (key, part) {
                        if (part.changeAnimator(this._action, this._dir))
                            this.setupPartAnimator(part);
                    }, this);
                    this.changePartDepth();
                }
                else if (this._aniDirType == EnumAvatarPart.FIVE_DIR) {
                    var fiveDir = EnumAvatarPart.getFiveDir(this, this.dir);
                    if (fiveDir != this._fiveDir || this._isChangeAction) {
                        this._fiveDir = fiveDir;
                        this._partHash.forEach(function (key, part) {
                            if (part.changeAnimator(this._action, this._fiveDir))
                                this.setupPartAnimator(part);
                        }, this);
                        this.changePartDepth();
                    }
                    else {
                        if (this._isChangeAction) {
                            this.changePartDepth();
                        }
                    }
                }
            }
            if (this._isChangeUpdatePartDepth) {
                this.changePartDepth();
            }
            this._isChangeAction = false;
            this._isChangeDir = false;
        };
        /**设置当前帧*/
        Avatar.prototype.setCurrentFrame = function () {
            this._partHash.forEach(function (key, part) {
                part.currentIndex = this._currentFrame;
                this._isChangeUpdatePartDepth = true;
            }, this);
        };
        Avatar.prototype.update = function () {
            var animator = this.getPart(EnumAvatarPart.BODY).animator;
            if (animator == null || animator.isDispose) {
                return;
            }
            var totalTime = Math.floor(animator.totalMovieTime * this.speed);
            var ct = this._currentActionPasstime;
            var num = Math.floor(this._currentActionPasstime / totalTime);
            this._currentActionPasstime = this._currentActionPasstime % totalTime;
            var frame = this._currentFrame;
            var image = animator.getImage(frame);
            while (image && this._currentActionPasstime >= image.delayTime * this.speed) {
                this._currentActionPasstime -= image.delayTime * this.speed;
                frame++;
                if (frame >= this._frameCount - 1) {
                    num++;
                }
                if (frame >= this._frameCount) {
                    frame = 0;
                }
                image = animator.getImage(frame);
            }
            if (frame != this._currentFrame || num > 0) {
                this._currentFrame = frame;
                this.setCurrentFrame();
                if (this._endFrame == this._currentFrame) {
                    this.stop();
                }
                if (num > 0) {
                    num = this._isLoop ? num : 1;
                    while (num > 0) {
                        this.playEnd();
                        num--;
                    }
                }
            }
        };
        Avatar.prototype.changePartDepth = function () {
            //@TODO
        };
        Avatar.prototype.setupPartAnimator = function (part) {
            var url = AssetPathManager.getInstance().getFightRoleRes(part.path, this.action, this._fiveDir);
            var animaor = App.asset.getResAsset(url);
            if (animaor) {
                this.showWaitAvatar(false);
                part.deleteAnimator();
                part.addAnimatior(animaor);
                return true;
            }
            else {
                this.showWaitAvatar(true);
                part.deleteAnimator();
                this.getAnimationNetPath(url, part.partType);
                return false;
            }
        };
        Avatar.prototype.getAnimationNetPath = function (url, type) {
            com.loader.GLoaderManager.getInstance().load(url, EnumLoader.RES, this, this.resLoadComleteHandler, null, null, [type, this.action, this.dir], false);
        };
        Avatar.prototype.resLoadComleteHandler = function (data) {
            if (this.action == data.argArray[1] && this.dir == data.argArray[2]) {
                var part = this.getPart(data.argArray[0]);
                part.addAnimatior(data.data);
                this.showWaitAvatar(false);
            }
        };
        /**制造等待加载资源所需待图*/
        Avatar.prototype.makeWaitAvatar = function () {
            if (!this._waitAvatar) {
                this._waitAvatar = new base.GBitmap();
            }
            //this._waitAvatar.texture = RES.getRes("heiying_png");
            // this._waitAvatar.x = -this._waitAvatar.measuredWidth * 0.5;
            // this._waitAvatar.y = -this._waitAvatar.measuredHeight;
        };
        Avatar.prototype.showWaitAvatar = function (showType) {
            if (this._waitAvatar && this.contains(this._waitAvatar)) {
                this._waitAvatar.visible = showType;
            }
        };
        /**移除等待加载资源所需待图*/
        Avatar.prototype.removeWaitAvatar = function () {
            if (this._waitAvatar && this.contains(this._waitAvatar)) {
                this.removeChild(this._waitAvatar);
            }
        };
        Avatar.prototype.clear = function () {
            if (this._waitAvatar)
                this._waitAvatar.texture = null;
            this._partHash.forEach(function (key, part) {
                part.clearActionAndDir();
            }, this);
            this.scaleX = 1;
            this._action = null;
            this._fiveDir = -1;
            this._dir = -1;
            this._isChangeAction = false;
            this._isChangeUpdatePartDepth = false;
            this._isChangeDir = false;
            this._speed = 1;
            this._frameCount = -1;
            this._currentFrame = 0;
            this._currentActionPasstime = 0;
            this._isLoop = false;
            this.alpha = 1;
        };
        Avatar.prototype.dispose = function (type) {
            _super.prototype.dispose.call(this, type);
            //this.removeWaitAvatar();
            //this._isDispose = true;
            this.stop();
            this.clear();
            if (type) {
                this._partHash.forEach(function (key, part) {
                    part.dispose();
                }, this);
                this._partHash = null;
            }
        };
        return Avatar;
    }(base.GSprite));
    base.Avatar = Avatar;
    __reflect(Avatar.prototype, "base.Avatar");
})(base || (base = {}));
//# sourceMappingURL=Avatar.js.map