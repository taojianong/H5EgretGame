/**
 * 音乐管理器
 * @author clong 2019.4.20
 */
class SoundManager {
	
	public constructor() {
	}

	private static _instance:SoundManager = null;
	public static getInstance():SoundManager{
		return this._instance = this._instance || new SoundManager();
	}
}