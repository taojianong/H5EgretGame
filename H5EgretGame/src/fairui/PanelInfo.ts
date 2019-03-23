module fairui {

    // import Q_panel_registerExpandBean = com.game.data.bean.Q_panel_registerExpandBean;

    /**
     * 面板信息
     * @author cl 2018.2.5
     */
    export class PanelInfo implements RES.PromiseTaskReporter {

        /**面板ID */
        public panelid: number;
        /**面板类型*/
        public panelType: number;
        /**面板对应功能ID */
        public funcId: number;
        /**资源组 */
        public res: string;
        /**面板加载时显示的加载内容 */
        public loadingTip: string;
        /**面板类 */
        public className: any;
        /**加载完成回调函数 */
        public callback: Function;
        /**回调函数参数 */
        public callbackParams: Array<any>;
        /**是否可释放 */
        public canDispose: boolean = true;
        /**打开面板的时候显示底部按钮 */
        public showBottomBtn: boolean = true;
        /**
		 * 构造函数 
		 * @param res			面板资源swf名称 
		 * @param loadingTip	面板加载时显示的加载内容，如背包模块加载中
		 * @param className	面板类
		 * @param panelId		面板id
         * @param panelType 面板类型
         * @param canDispose    是否可释放
		 * @param showBottomBtn 打开面板的时候显示底部按钮
         * @param funcId    面板对应功能ID
		 */
        public constructor(panelId: number, panelType: number, res: string, loadingTip: string, className: any, canDispose: boolean = true, showBottomBtn: boolean = false, funcId: number = 0) {
            this.panelid = panelId;
            this.panelType = panelType;
            this.res = res;
            this.loadingTip = App.lang.getLang(loadingTip);
            this.className = className;
            this.canDispose = canDispose;
            this.showBottomBtn = showBottomBtn;
            this.funcId = funcId;
        }

        /**面板配置数据 */
        // public get bean():Q_panel_registerExpandBean{

        //     return App.config.q_panel_registerContainer.getDataBean( this.panelid );
        // }

        public onProgress(current: number, total: number): void {
            EventManager.dispatchEvent(GameEvent.LOAD_PROGRESS, this.panelid, current, total);
        }
    }
}