/**
 * 游戏事件
 * @author clong 2019.3.23
 */
class GameEvent extends egret.Event{

	/**选择 */
	public static SELECT:string = "GameEvent.select";

	/**渲染事件 */
	public static RENDER:string = "GameEvent.render";

	/**加载完成 */
	public static LOAD_COMPLETE:string = "GameEvent.loadComplete";

	/**舞台自适应 */
	public static STGAE_RESIZE:string = "GameEvent.stageResize";

	/**加载进度 */
	public static LOAD_PROGRESS:string = "GameEvent.loadProgress";

	/**列表渲染 */
	public static EGLIST_RENDER:string = "GameEvent.EGlistRender";
	/**列表渲染完成 */
	public static EGLIST_COMPLETE:string = "GameEvent.EGlistComplete";

	/**结束引导 */
	public static GUIDE_END:string = "GameEvent.guideEnd";

	/**寻找引导对象 */
	public static GUIDE_SEARCH_TARGET:string = "GameEvent.guideSearchTarget";

	/**设置引导目标对象 */
	public static GUIDE_TARGET:string = "GameEvent.guideTarget";

	/**主加载界面加载完成 */
	public static MAIN_LOAD_COMPLETE:string = "GameEvent.mainLoadComplete";

	/**开始游戏 */
	public static START_GAME:string = "GameEvent.stageGame";

	/**添加消息 */
	public static ADD_MESSAGE:string = "GameEvent.addMessage";

	/**播放广告完成 */
	public static END_PLAY_AD:string = "GameEvent.endPlayAd";

	public thisObject:any = null;

	public constructor( type: string , data?: any, bubbles?: boolean, cancelable?: boolean ) {
		super( type , bubbles , cancelable , data );
	}
}