/**
 * 公共特效类
 * @author clong 2019.4.20
 */
class EffectUtil {
	public constructor() {
	}

	/**
	 * 打开窗口特效 0秒 大小30% 透明度100 ， 0.3秒 大小105% 透明度100 ，0.6秒 大小98% 透明度100 ， 0.8秒 大小100% 透明度100
	 * @param window 界面
	 * @param complete 界面特效完成方法
	 * @param thisObj 
	 * @param params 参数
	 */
	public static openWindowEffect( window:fairui.View , complete:Function = null , thisObj:any = null , params:Array<any> = null , isMust:boolean = false ):void{

		if (window) {
			if ( !isMust && window["isWindowEffect"] ) {
				return;
			} else if (isMust) {
				fairygui.GTween.kill(window);
			}
			window.scaleX = window.scaleY = 0.3;
			window.alpha = 1;
			window["isWindowEffect"] = true;
			let _self = this;
			fairygui.GTween.to2(0.3, 0.3, 1.05, 1.05, 0.3)
				.setTarget(window, this)
				.onUpdate( onUpdate , _self)
				.onComplete(function onComplete(): void {
					fairygui.GTween.to2(1.05, 1.05, 0.98, 0.98, 0.3).setTarget(window, _self).onUpdate( onUpdate , _self).onComplete(function onComplete1(): void {
						fairygui.GTween.to2(0.98, 0.98, 1, 1, 0.2).setTarget(window, _self).onUpdate( onUpdate , _self).onComplete(function onComplete2(): void {
							fairygui.GTween.kill(window);
							delete window["isWindowEffect"];
							if (complete != null) {
								complete.apply(thisObj, params);
							}
						}, _self);
					}, _self);

				}, this);
		}

		function onUpdate(tw: fairygui.GTweener): void {
			window.scaleX = tw.value.x;
			window.scaleY = tw.value.y;
			window.x = (Global.stageWidth - window.scaleX * window.width) * 0.5;
			window.y = (Global.stageHeight - window.scaleY * window.height) * 0.5;
		}
	}

	/**
	 * 关闭窗口特效 0秒 大小100% 透明度100 ， 0.4秒 大小80% 透明度0
	 * @param window 界面
	 * @param complete 完成事件
	 * @param thisObj
	 * @param params 其他参数
	 * @param isMust 是否强制关闭 
	 */
	public static closeWindowEffect( window:fairui.View , complete:Function = null , thisObj:any = null , params:Array<any> = null , isMust:boolean = false ):boolean{

		if (window) {
			if (!isMust && window["isWindowEffect"]) {
				return;
			} else if (isMust ) {
				fairygui.GTween.kill(window);
			}
			window.alpha = 1;
			window.scaleX = window.scaleY = 1;
			window["isWindowEffect"] = true;
			let w: number = window.width;
			let h: number = window.height;
			fairygui.GTween.to3(1, 1, 1, 0.8, 0.8, 0, 0.3).setTarget(window, this)
				.onUpdate(function onUpdate(tw: fairygui.GTweener): void {
					window.scaleX = tw.value.x;
					window.scaleY = tw.value.y;
					window.alpha = tw.value.z;
					window.x = (Global.stageWidth - window.scaleX * w) * 0.5;
					window.y = (Global.stageHeight - window.scaleY * h) * 0.5;
				}, this)
				.onComplete(function onComplete(): void {
					fairygui.GTween.kill(window);
					delete window["isWindowEffect"];
					if (complete != null) {
						complete.apply(thisObj, params);
					}
				}, this);
		}
	}
}