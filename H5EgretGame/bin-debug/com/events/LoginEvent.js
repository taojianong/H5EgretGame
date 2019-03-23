var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LoginEvent = (function () {
    function LoginEvent() {
    }
    LoginEvent.SHOW_CREATE_PLAYER = "show_create_player";
    LoginEvent.REMOVE_CREATE_PLAYER = "remove_create_player";
    LoginEvent.SHOW_SELECT_PLAYER = "show_select_player";
    LoginEvent.REMOVE_SELECT_PLAYER = "remove_select_player";
    LoginEvent.SHOW_PRE_LOADER = "show_pre_loader";
    LoginEvent.LOGIN_ERROR = "login_error";
    LoginEvent.ROLE_LOGIN_TO_SECNE = "RoleLoginToSecne";
    LoginEvent.SHOW_INIT_GAME_PROGRESS = "show_init_game_progress";
    LoginEvent.PRELOAD_CLIENT = "preload_client";
    /**显示游戏loadding界面*/
    LoginEvent.SHOW_GAME_LOADDING = "LoginEvent.SHOW_GAME_LOADDING";
    /**隐藏游戏loadding界面*/
    LoginEvent.HIDE_GAME_LOADDING = "LoginEvent.HIDE_GAME_LOADDING";
    LoginEvent.SHOW_RANDOM_NAME = "LoginEvent.SHOW_RANDOM_NAME";
    /**游戏服务器列表加载成功*/
    LoginEvent.LOAD_SERVERLIST_COMPLETE = "LoginEvent.LOAD_SERVERLIST_COMPLETE";
    /**登录刷新引导 */
    LoginEvent.Load_Refresh_Guide = "LoginEvent.Load_Refresh_Guide";
    return LoginEvent;
}());
__reflect(LoginEvent.prototype, "LoginEvent");
//# sourceMappingURL=LoginEvent.js.map