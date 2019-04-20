/**
 * 组件接口
 * @author clong 2019.4.20
 */
interface IComponent extends IDispose{
	
	/**所有监听事件都放这里面 */
	addAllListener():void;
	/**移除所有监听事件 */
	removeAllListener():void;
	/**监听事件方法**/
    addGameListener(type: string, listener: Function, thisObject: any, target?: any);
	/**移除监听事件方法 */
    removeGameListener(type: string, listener: Function, thisObject: any, target?: any);
	/**添加对应IComponent组件方便统一管理 */
    addComponent(component: IComponent): any;
	/**移除组件 */
   	removeComponent(component: IComponent): void;
	/**获取原件唯一hashCode */
	getHashCode(): number;	
	/**界面重置 */
	clear():void;
	/**界面释放 */
	dispose():void;
}