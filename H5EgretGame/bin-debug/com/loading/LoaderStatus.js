var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var load;
(function (load) {
    /**静态参数状态
     * @author clong 2019.4.26
     */
    var LoaderStatus = (function () {
        function LoaderStatus() {
        }
        //加载状态
        /**加载准备 0*/
        LoaderStatus.READY = 0;
        /**加载中 1*/
        LoaderStatus.LOADING = 1;
        /**加载完成 2*/
        LoaderStatus.COMPLETED = 2;
        /**加载暂停 3*/
        LoaderStatus.PAUSED = 3;
        /**加载失败 4*/
        LoaderStatus.FAILED = 4;
        /**资源已经被释放了 5*/
        LoaderStatus.DISPOSED = 5;
        //加载类型
        /**纹理 0*/
        LoaderStatus.TYPE_TEXTURE = 0;
        /**声音 1*/
        LoaderStatus.TYPE_SOUND = 1;
        /**资源组 2*/
        LoaderStatus.TYPE_GROUP = 2;
        /**文本 3*/
        LoaderStatus.TYPE_TEXT = 3;
        /**二进制 4*/
        LoaderStatus.TYPE_BINARY = 4;
        /**龙骨 5*/
        LoaderStatus.TYPE_DRAGONBONES = 5;
        /**字体 6*/
        LoaderStatus.TYPE_FONT = 6;
        LoaderStatus.IMAGE = "image";
        LoaderStatus.SOUND = "sound";
        LoaderStatus.SHEET = "sheet";
        LoaderStatus.TEXT = "text";
        LoaderStatus.BIN = "bin";
        LoaderStatus.JSON = "json";
        LoaderStatus.FONT = "font";
        LoaderStatus.EXT_PNG = "png";
        LoaderStatus.EXT_JPG = "jpg";
        LoaderStatus.EXT_TXT = "txt";
        LoaderStatus.EXT_JSON = "json";
        LoaderStatus.EXT_MP3 = "mp3";
        LoaderStatus.EXT_MP4 = "mp4";
        LoaderStatus.EXT_XML = "xml";
        //加载优先级,数字越大优先级越高
        /**VIP 2000 */
        LoaderStatus.LEVEL_VIP = 2000;
        /**默认 0 */
        LoaderStatus.LEVEL_DEFAULT = 0;
        return LoaderStatus;
    }());
    load.LoaderStatus = LoaderStatus;
    __reflect(LoaderStatus.prototype, "load.LoaderStatus");
})(load || (load = {}));
//# sourceMappingURL=LoaderStatus.js.map