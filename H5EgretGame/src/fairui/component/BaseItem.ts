module fairui{

    /**
     * 条目基类
     * @author cl 2018.3.15
     */
    export class BaseItem extends BaseSprite{

        /**背景 */
        protected bg: fairygui.GImage | fairygui.GLoader | ELoader | fairygui.GGraph;

        public constructor(){

            super();
        }

        protected constructFromXML(xml: any): void {

            super.constructFromXML(xml);

            this.init();
        }

        protected init():void
        {
            FairyUtils.setVar( this, this );
        }
        
        public dispose():void
        {
            com.utils.ObjectUtils.clearFilter( this );

            let child: any;
            while (this.numChildren > 0) {
                child = this.removeChildAt(0);
                //是否对应资源
                if (egret.is(child, "fairygui.GLoader")) {
                    LoaderManager.disposeTarget(child.url, child);
                }
                (<fairygui.GComponent>child).dispose();
                child = null;
            }

            super.dispose();

            if( this.bg instanceof ELoader ){
                this.bg.dispose();
                this.bg = null;
            }
            this._data=null;
        }
    }
}