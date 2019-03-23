/**
 * 游戏事件
 * @author clong 2019.3.23
 */
class GameEvent extends egret.Event{

	/**选择 */
	public static SELECT:string = "GameEvent.select";

	/**渲染事件 */
	public static RENDER:string = "GameEvent.render";

	/**舞台自适应 */
	public static STGAE_RESIZE:string = "GameEvent.stageResize";

	/**加载进度 */
	public static LOAD_PROGRESS:string = "GameEvent.loadProgress";

	public thisObject:any = null;

	public constructor( type: string , data?: any, bubbles?: boolean, cancelable?: boolean ) {
		super( type , bubbles , cancelable , data );
	}
}