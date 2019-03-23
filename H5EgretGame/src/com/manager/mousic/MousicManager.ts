module com.manager {
	export class MousicManager {

		public constructor() {
		}
		/**播放游戏背景音乐*/
		public play(fileName: string) {
			if (Config.playBGM && fileName && fileName != "")
				egret.ExternalInterface.call("playGameBGM", fileName + ".mp3");
		}
		/**暂停游戏背景音乐*/
		public stop() {
			egret.ExternalInterface.call("stopGameBGM", "");
		}
	}
}