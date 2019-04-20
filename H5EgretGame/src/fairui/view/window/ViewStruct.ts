/**
 * 界面结构
 * @author clong 2019.4.20
 */
class ViewStruct {

	/**
	 * 层级类型 0窗口层,1主界面层,2弹窗提示层,3顶层
	 */
	public layerType: number = UILayout.TYPE_WINDOW;

	/**
	 * 是否windows配置界面
	 */
	public isWindow: boolean = true;

	/**界面配置数据,自动生成 */
	public window: any;//Windows

	/**
	 * 界面布局 九键盘布局 7为左上，8为上中，9为上右 4为左中 5中间 6为右中 1为左下 2为下中 3为右下
	 */
	public get layout():number{

		return 0;
	}

	/**面板ID */
	public get panelId(): number {

		return this.window ? this.window.id : 0;
	}

	/**是否为不处理的界面 */
	public get isNotDo(): boolean {

		return this.window && this.window.view_type == UILayout.VIEW_TYPE_0;
	}

	/**是否为一级界面 */
	public get isFirst(): boolean {

		return this.window && this.window.view_type == UILayout.VIEW_TYPE_1;
	}

	/**是否为二级界面 */
	public get isTwo(): boolean {

		return this.window && this.window.view_type == UILayout.VIEW_TYPE_2;
	}

	/**是否为弹框界面 */
	public get isAlert(): boolean {

		return this.window && this.window.view_type == UILayout.VIEW_TYPE_ALERT;
	}

	/**是否显示遮罩 */
	public get isShowMask(): boolean {

		return this.window && this.window.show_mask == 1;
	}

	/**是否显示加入队列显示 */
	public get isQueue(): boolean {

		return this.window && this.window.isQueue == 1;
	}

	/**是否显示特效 */
	public get isShowEffect(): boolean {

		return this.window && this.window.isEffect == 0;
	}
}