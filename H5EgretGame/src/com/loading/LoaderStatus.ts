module load {

	/**静态参数状态
	 * @author clong 2019.4.26
	 */
	export class LoaderStatus {

		//加载状态
		/**加载准备 0*/
		public static readonly READY:number		= 0;
		/**加载中 1*/
		public static readonly LOADING:number	= 1;
		/**加载完成 2*/
		public static readonly COMPLETED:number	= 2;
		/**加载暂停 3*/
		public static readonly PAUSED:number	= 3;
		/**加载失败 4*/
		public static readonly FAILED:number	= 4;
		/**资源已经被释放了 5*/
		public static readonly DISPOSED:number	= 5;

		//加载类型
		/**纹理 0*/
		public static readonly TYPE_TEXTURE: number = 0;
		/**声音 1*/
		public static readonly TYPE_SOUND:number = 1;
		/**资源组 2*/
		public static readonly TYPE_GROUP: number = 2;
		/**文本 3*/
		public static readonly TYPE_TEXT: number = 3;
		/**二进制 4*/
		public static readonly TYPE_BINARY: number = 4;
		/**龙骨 5*/
		public static readonly TYPE_DRAGONBONES: number = 5;
		/**字体 6*/
		public static readonly TYPE_FONT: number = 6;

		public static readonly IMAGE: string = "image";
		public static readonly SOUND:string = "sound";
		public static readonly SHEET: string = "sheet";
		public static readonly TEXT: string = "text";
		public static readonly BIN: string = "bin";
		public static readonly JSON: string = "json";
		public static readonly FONT: string = "font";

		public static EXT_PNG:string = "png";
		public static EXT_JPG:string = "jpg";
		public static EXT_TXT:string = "txt";
		public static EXT_JSON:string = "json";
		public static EXT_MP3:string = "mp3";
		public static EXT_MP4:string = "mp4";
		public static EXT_XML:string = "xml";

		//加载优先级,数字越大优先级越高
		/**VIP 2000 */
		public static LEVEL_VIP: number = 2000;
		/**默认 0 */
		public static LEVEL_DEFAULT:number= 0;
	}
}