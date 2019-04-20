/**
 * 可释放接口
 * @author clong 2019.4.20
 */
interface IDispose {

	/**是否已经释放 */
	isDisposed: boolean;

	/**释放资源 */
	dispose();
}
