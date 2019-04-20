/**
 * 游戏客户端
 * @author clong 2019.3.23
 */
class GameClient extends egret.DisplayObjectContainer {

	/**游戏层 */
	private gameLayer:egret.Sprite = new egret.Sprite();

	/**界面层 */
	private uiLayer:egret.Sprite = new egret.Sprite();

	public constructor() {

		super();

		this.addChild( this.gameLayer );
		this.addChild( this.uiLayer );

		fairui.FairyUIManager.init( this.uiLayer );

		fairui.LoaderManager.loadGroups( "common" , this.loadCommonComplete , this );
	}

	private loadCommonComplete():void{

		fairui.FairyUIManager.initCommon();

		UISystem.Inst.createWindowView( fairui.UIAdVideoView );
	}
}