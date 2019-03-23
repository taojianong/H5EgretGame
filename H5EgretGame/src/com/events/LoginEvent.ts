class LoginEvent {

	public static SHOW_CREATE_PLAYER: string = "show_create_player";
	public static REMOVE_CREATE_PLAYER: string = "remove_create_player";
	public static SHOW_SELECT_PLAYER: string = "show_select_player";
	public static REMOVE_SELECT_PLAYER: string = "remove_select_player";
	public static SHOW_PRE_LOADER: string = "show_pre_loader";
	public static LOGIN_ERROR: string = "login_error";
	public static ROLE_LOGIN_TO_SECNE: string = "RoleLoginToSecne";
	public static SHOW_INIT_GAME_PROGRESS: string = "show_init_game_progress";
	public static PRELOAD_CLIENT: string = "preload_client";
	/**显示游戏loadding界面*/
	public static SHOW_GAME_LOADDING: string = "LoginEvent.SHOW_GAME_LOADDING";
	/**隐藏游戏loadding界面*/
	public static HIDE_GAME_LOADDING: string = "LoginEvent.HIDE_GAME_LOADDING";
	public static SHOW_RANDOM_NAME: string = "LoginEvent.SHOW_RANDOM_NAME";
	/**游戏服务器列表加载成功*/
	public static LOAD_SERVERLIST_COMPLETE: string = "LoginEvent.LOAD_SERVERLIST_COMPLETE";
	/**登录刷新引导 */
	public static Load_Refresh_Guide: string = "LoginEvent.Load_Refresh_Guide";

	public constructor() {
	}
}