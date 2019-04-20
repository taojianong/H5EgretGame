/**
 * 界面布局
 * @author clong 2019.4.20
 */
class UILayout {

	/**窗口层 0*/
	public static readonly TYPE_WINDOW: number = 0;
	/**主界面层 1*/
	public static readonly TYPE_MAIN: number = 1;
	/**弹窗提示层*/
	public static readonly TYPE_ALERT: number = 2;
	/**顶层 */
	public static readonly TYPE_TOP: number = 3;

	/**默认不用处理的界面 */
	public static readonly VIEW_TYPE_0: number = 0;
	/**界面类型，一级界面 */
	public static readonly VIEW_TYPE_1: number = 1;
	/**界面类型，二级界面 */
	public static readonly VIEW_TYPE_2: number = 2;
	/**界面类型，弹框界面 */
	public static readonly VIEW_TYPE_ALERT: number = 3;

	//界面布局
	/**左上 7*/
	public static readonly LEFT_TOP: number = 7;
	/**上中 8*/
	public static readonly TOP_CENTER: number = 8;
	/**上右 9*/
	public static readonly TOP_RIGHT: number = 9;
	/**左中 4*/
	public static readonly LEFT_CENTER: number = 4;
	/**上下左右居中 5*/
	public static readonly CENTER: number = 5;
	/**右中 6*/
	public static readonly RIGHT_CENTER: number = 6;
	/**左下 1*/
	public static readonly LEFT_BOTTOM: number = 1;
	/**底部中间 2*/
	public static readonly BOTTOM_CENTER: number = 2;
	/**右下 3*/
	public static readonly RIGHT_BOTTOM: number = 3;

	/**背景遮罩 */
	private static bgMsk: fairui.ELoader;

	public constructor() {

	}

	/**
	 * 设置9宫格布局
	 */
	public static setWindowLayout(view: fairui.UIBaseWindow): void {

		let layout: number = view.getViewStruct().layout;
		switch (layout) {
			//左上 7
			case UILayout.LEFT_TOP:
				view.x = 0;
				view.y = 0;
				break;
			//上中 8
			case UILayout.TOP_CENTER:
				view.x = (Global.stageWidth - view.width) * 0.5;
				view.y = 0;
				break;
			//右上 9
			case UILayout.TOP_RIGHT:
				view.x = Global.stageWidth - view.width;
				view.y = 0;
				break;
			//左中 4
			case UILayout.LEFT_CENTER:
				view.x = 0;
				view.y = (Global.stageHeight - view.height) * 0.5;
				break;
			case 0:
			//上下左右居中 5
			case UILayout.CENTER:
				view.x = (Global.stageWidth - view.width) * 0.5;
				view.y = (Global.stageHeight - view.height) * 0.5;
				break;
			//右中 6
			case UILayout.RIGHT_CENTER:
				view.x = Global.stageWidth - view.width;
				view.y = (Global.stageHeight - view.height) * 0.5;
				break;
			//左下 1
			case UILayout.LEFT_BOTTOM:
				view.x = 0;
				view.y = Global.stageHeight - view.height;
				break;
			//底部中间 2
			case UILayout.BOTTOM_CENTER:
				view.x = (Global.stageWidth - view.width) * 0.5;
				view.y = Global.stageHeight - view.height;
				break;
			//右下 3
			case UILayout.RIGHT_BOTTOM:
				view.x = Global.stageWidth - view.width;
				view.y = Global.stageHeight - view.height;
				break;
		}
	}

	/**
	 * 添加显示层级
	 */
	public static setWindowLayer(view: fairui.UIBaseWindow): void {

		let i: number = 0;
		let len: number = 0;
		let panel: fairygui.GObject;

		switch (view.layerType) {

			//主界面
			case UILayout.TYPE_MAIN:
				{
					//先关闭窗口界面的所有面板
					len = fairui.FairyUIManager.windowLayer.numChildren;// fairui.FairyUIManager.windowLayer.numChildren;
					for (i = len - 1; i >= 0; i--) {
						if (fairui.FairyUIManager.windowLayer.numChildren == 0) {
							break;//因遮罩可能在这层，删除界面会删除遮罩一次会移除两个原件,从而导致报错
						}
						try {
							panel = fairui.FairyUIManager.windowLayer.getChildAt(i);
						} catch (e) {
							console.log("xxx");
						}
						if (panel instanceof fairui.UIBaseWindow && !panel.isNotDo) {
							UISystem.Inst.removeWindowView(panel);
						}
					}
					fairui.FairyUIManager.mainLayer.addChild(view);
					break;
				}

			//窗口界面
			case UILayout.TYPE_WINDOW:
				{
					len = fairui.FairyUIManager.windowLayer.numChildren;
					if (view.isFirst) { //一级界面						
						for (i = len - 1; i >= 0; i--) {
							if (fairui.FairyUIManager.windowLayer.numChildren == 0) {
								break;//因遮罩可能在这层，删除界面会删除遮罩一次会移除两个原件,从而导致报错
							}
							panel = fairui.FairyUIManager.windowLayer.getChildAt(i);
							if (panel instanceof fairui.UIBaseWindow && !panel.isNotDo) {
								UISystem.Inst.removeWindowView(panel);
							}
						}
					} else if (view.isTwo) {//二级界面
						let mutexViews: Array<number> = view.mutexViews;//互斥界面列表
						for (i = len - 1; i >= 0; i--) {
							if (fairui.FairyUIManager.windowLayer.numChildren == 0) {
								break;//因遮罩可能在这层，删除界面会删除遮罩一次会移除两个原件,从而导致报错
							}
							panel = fairui.FairyUIManager.windowLayer.getChildAt(i);
							if (panel instanceof fairui.UIBaseWindow) {
								if (panel.isTwo && mutexViews && mutexViews.indexOf(panel.panelId) != -1) {
									UISystem.Inst.removeWindowView(panel);
								}
							}
						}
					}
					if (view.isShowMask) {
						UILayout.showMsk(fairui.FairyUIManager.windowLayer);
					}
					fairui.FairyUIManager.windowLayer.addChild(view);
					break;
				}

			//弹框界面
			case UILayout.TYPE_ALERT:
				{
					if (view.isShowMask) {
						UILayout.showMsk(fairui.FairyUIManager.alertLayer);
					}
					fairui.FairyUIManager.alertLayer.addChild(view);
					break;
				}

			//顶层界面,不添加有遮罩的界面
			case UILayout.TYPE_TOP:
				fairui.FairyUIManager.topLayer.addChild(view);
				break;
		}
	}

	/**
	 * 显示遮罩
	 * @param parent 	遮罩的容器
	 * @param index 	层级
	 */
	public static showMsk(parent: fairygui.GComponent, index: number = -1): void {

		if (UILayout.bgMsk == null) {
			UILayout.bgMsk = new fairui.ELoader();
			UILayout.bgMsk.autoSize = false;
			UILayout.bgMsk.fill = fairygui.LoaderFillType.ScaleFree;//自由缩放
			UILayout.bgMsk.setFairySource("common", "common_BG");
			UILayout.bgMsk.width = Global.stageWidth;
			UILayout.bgMsk.height = Global.stageHeight;
			UILayout.bgMsk.touchable = true;
			UILayout.bgMsk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEndHandler, this);
		}

		if (UILayout.bgMsk != null) {
			UILayout.bgMsk.removeFromParent();
		}

		if (parent) {
			if (index <= -1) {
				parent.addChild(UILayout.bgMsk.img);
			} else {
				parent.addChildAt(UILayout.bgMsk.img, index);
			}
		}
	}

	/**点击遮罩关闭对应界面 */
	private static touchEndHandler(e: egret.TouchEvent): void {

		let i: number = 0;
		let view: fairygui.GObject;
		for (i = fairui.FairyUIManager.topLayer.numChildren - 1; i >= 0; i--) {
			view = fairui.FairyUIManager.topLayer.getChildAt(i);
			if (view instanceof fairui.UIBaseTip && view.maskClick && view.isShowMask) {
				view.close();
				return;
			}
		}
		for (i = fairui.FairyUIManager.alertLayer.numChildren - 1; i >= 0; i--) {
			view = fairui.FairyUIManager.alertLayer.getChildAt(i);
			if (view instanceof fairui.UIBaseWindow && view.maskClick && view.isShowMask) {
				view.close();
				return;
			}
		}
		for (i = fairui.FairyUIManager.windowLayer.numChildren - 1; i >= 0; i--) {
			view = fairui.FairyUIManager.windowLayer.getChildAt(i);
			if (view instanceof fairui.UIBaseWindow && view.maskClick && view.isShowMask) {
				view.close();
				return;
			}
		}
	}

	/**
	 * 移除遮罩 
	 */
	public static removeMsk(): void {

		if (UILayout.bgMsk != null) {
			UILayout.bgMsk.removeFromParent();
		}
		//检测是否有其他弹框并显示在后面
		let i: number = 0;
		let view: fairygui.GObject;
		for (i = fairui.FairyUIManager.topLayer.numChildren - 1; i >= 0; i--) {
			view = fairui.FairyUIManager.topLayer.getChildAt(i);
			if (view instanceof fairui.UIBaseTip && view.isShowMask) {
				if (i >= 1) {
					UILayout.showMsk(fairui.FairyUIManager.topLayer, i);
				} else {
					UILayout.showMsk(fairui.FairyUIManager.topLayer, 0);
				}
				return;
			}
		}
		for (i = fairui.FairyUIManager.alertLayer.numChildren - 1; i >= 0; i--) {
			view = fairui.FairyUIManager.alertLayer.getChildAt(i);
			if (view instanceof fairui.UIBaseWindow && view.isShowMask) {
				if (i >= 1) {
					UILayout.showMsk(fairui.FairyUIManager.alertLayer, i);
				} else {
					UILayout.showMsk(fairui.FairyUIManager.alertLayer, 0);
				}
				return;
			}
		}
		for (i = fairui.FairyUIManager.windowLayer.numChildren - 1; i >= 0; i--) {
			view = fairui.FairyUIManager.windowLayer.getChildAt(i);
			if (view instanceof fairui.UIBaseWindow && view.isShowMask) {
				if (i >= 1) {
					UILayout.showMsk(fairui.FairyUIManager.windowLayer, i);
				} else {
					UILayout.showMsk(fairui.FairyUIManager.windowLayer, 0);
				}
				return;
			}
		}
	}

	/**
	 * 自适应
	 */
	public static resizeDisplay(): void {

		if (UILayout.bgMsk != null) {
			UILayout.bgMsk.width = Global.stageWidth;
			UILayout.bgMsk.height = Global.stageHeight;
		}
	}
}