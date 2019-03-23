module com.time{

    /**
     * Timer基类
     * @author cl 2018.3.28
     */
    export class BaseTimer extends egret.Timer{

        /**名字 */
        public name:string = "";

        /**
         * 构造函数
         * @param name Timer的名字
         * @param delay 延时
         * @param repeatCount 计时次数
         */
        public constructor( stack:string, delay:number, repeatCount:number=0 ){

            super( delay , repeatCount );

            this.name = stack;
        }
    }
}