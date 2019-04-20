/**
 * 可回收接口
 * @author clong 2019.4.20
 */
interface IPool {

	/**初始创建 */
	create(...args):void;
	/**释放资源 */
	recover():void;
	/**清理资源 */
	clear():void;
}