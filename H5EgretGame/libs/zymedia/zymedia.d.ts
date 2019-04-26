declare module zyMedia {

    /**媒体播放器 */
    class  MediaPlayer{

        public media:any;//HTMLVideoElement
        public options:any;

        constructor(media,option?);

        init():void;

        // bigPlay, loading and error info
        buildDec():void;

        // Fullscreen button
        buildFullscreen():void;

        // Duration time 00:00/00:00
        buildTotalTime():void;

        // Current time 00:00/00:00
        buildCurrentTime():void;

        // Timeline
        buildTimeline():void;

        // Play/pause button
        buildPlaypause():void;

        setPlayerSize( width, height ):void;

        // Media container
        buildContainer():void;

        showControls():void;

        hideControls():void;

        setControlsTimer():void;

        updateTime():void;

        updateTimeline():void;

        enterFullScreen():void;

        exitFullScreen():void;

        loadComplete():void;

        playEnd():void;

        playError():void;
    }
}