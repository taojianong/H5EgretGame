module fairui{

    /**
     * 文本基类
     * @author cl 2018.3.20
     */
    export class BaseTextField extends fairygui.GTextField{

        public constructor(){

            super();
        }

        public get textHeight():number{

            return this._textHeight;
        }

        public set text( value:string ){
            
            value = App.lang.getLang( value );
            egret.superSetter( BaseTextField , this , "text" , value );
        }
        /**文本 */
        public get text():string{

            return egret.superGetter( BaseTextField , this , "text" );
        }

        public dispose():void{

            super.dispose();
        }
    }
}