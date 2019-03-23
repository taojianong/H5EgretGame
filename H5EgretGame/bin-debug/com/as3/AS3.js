var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by mengj_000 on 2015/4/16.
 */
var flash;
(function (flash) {
    var progressTime = 0;
    //export var frame = 0;
    //export var stage:egret.Stage;
    // export function init(stage:egret.Stage)
    // {
    //     flash.stage = stage;
    //     progressTime = (new Date()).getTime();
    //     stage.addEventListener(egret.Event.ENTER_FRAME,onNextFrame,null);
    //     // new BindManager();
    // }
    // function onNextFrame(e:egret.Event):void
    // {
    //     frame++;
    // }
    function InitArray() {
        return null;
    }
    flash.InitArray = InitArray;
    function tranint(val, radix) {
        if (typeof val == "boolean") {
            if (val) {
                return 1;
            }
            return 0;
        }
        if (typeof val != "number")
            return parseInt(val);
        return Math.floor(val);
    }
    flash.tranint = tranint;
    function trannumber(val, radix) {
        if (typeof val != "number")
            return parseFloat(val);
        return val;
    }
    flash.trannumber = trannumber;
    function Boolean(val) { return val ? true : false; }
    flash.Boolean = Boolean;
    function isNaN(val) { return val == undefined ? true : false; }
    flash.isNaN = isNaN;
    // export function XML_(val)
    // {
    //     return new XML(val);
    // }
    // export function XMLList_(val) {return new XMLList(val);}
    function As3is(value, type, implement) {
        if (value == null)
            return false;
        var name;
        if (type) {
            if (type == "Class") {
                if (value.prototype && value.prototype.__class__)
                    return true;
                return false;
            }
            if (typeof (type) == "string")
                name = type;
            else
                name = flash.getClassName(type);
            if (typeof (value) != "object") {
                if (typeof (value) == name)
                    return true;
                return false;
            }
            if (egret.getQualifiedClassName(value) == name)
                return true;
            var cls;
            if (value.__proto__ && value.__proto__.__proto__)
                cls = value.__proto__.__proto__;
            while (cls) {
                if (cls.__class__ == name)
                    return true;
                if (cls.__proto__)
                    cls = cls.__proto__;
                else
                    cls = null;
            }
        }
        else if (implement) {
            var className = null;
            try {
                className = egret.getQualifiedClassName(value);
            }
            catch (e) {
                className = null;
            }
            if (className == null) {
                return false;
            }
            var implements = classImplements.getItem(className);
            if (implements) {
                for (var i = 0; i < implements.length; i++) {
                    if (implements[i] == implement) {
                        return true;
                    }
                }
            }
            var cls;
            if (value.__proto__ && value.__proto__.__proto__)
                cls = value.__proto__.__proto__;
            while (cls) {
                implements = classImplements.getItem(cls.__class__);
                if (implements) {
                    for (var i = 0; i < implements.length; i++) {
                        if (implements[i] == implement) {
                            return true;
                        }
                    }
                }
                if (cls.__proto__)
                    cls = cls.__proto__;
                else
                    cls = null;
            }
        }
        return false;
    }
    flash.As3is = As3is;
    function As3As(value, type, implement) {
        if (As3is(value, type, implement) == false)
            return null;
        return value;
    }
    flash.As3As = As3As;
    function AS3Object(_val) {
        return _val;
    }
    flash.AS3Object = AS3Object;
    flash.sortOn = function (arr, fieldName, options) {
        var ch;
        for (var i = 0; i < arr.length - 1; i++) {
            if (arr[i][fieldName] > arr[i + 1][fieldName]) {
                ch = arr[i + 1];
                arr[i + 1] = arr[i];
                arr[i] = ch;
                i = -1;
            }
        }
        return arr;
    };
    var AS3Array = (function () {
        function AS3Array() {
        }
        AS3Array.CASEINSENSITIVE = 1;
        AS3Array.DESCENDING = 2;
        AS3Array.NUMERIC = 16;
        AS3Array.RETURNINDEXEDARRAY = 8;
        AS3Array.UNIQUESORT = 4;
        return AS3Array;
    }());
    flash.AS3Array = AS3Array;
    __reflect(AS3Array.prototype, "flash.AS3Array");
    // export function error(msg,id?:number):Error
    // {
    //     return new Error(msg,id);
    // }
    function getTimer() {
        return (new Date()).getTime() - progressTime;
    }
    flash.getTimer = getTimer;
    // export function setTimeout(fun:Function,time:number,...arg):number
    // {
    //     function fun2(...arg2):void{//与flash类兼容，返回结果一致
    //         if(arg2.length>0){
    //             var arg3 = arg2[0];
    //             if(arg3.length==0){
    //                 fun.call(null);
    //             }else if(arg3.length == 1){
    //                 fun.call(null, arg3[0]);
    //             }else if(arg3.length == 2){
    //                 fun.call(null, arg3[0], arg3[1]);
    //             }else if(arg3.length == 3){
    //                 fun.call(null, arg3[0], arg3[1], arg3[2]);
    //             }else if(arg3.length == 4){
    //                 fun.call(null, arg3[0], arg3[1], arg3[2],arg3[3]);
    //             }else{
    //                 fun.call(null, arg3);
    //             }
    //         }else{
    //             fun.call(null);
    //         }
    //     }
    //     return egret.setTimeout(fun2,null,time,arg);
    // }
    // export function setInterval(fun:Function,time:number,...arg):number
    // {
    //     function fun2(...arg2):void{
    //         if(arg2.length>0){
    //             var arg3 = arg2[0];
    //             if(arg3.length==0){
    //                 fun.call(null);
    //             }else if(arg3.length == 1){
    //                 fun.call(null, arg3[0]);
    //             }else if(arg3.length == 2){
    //                 fun.call(null, arg3[0], arg3[1]);
    //             }else if(arg3.length == 3){
    //                 fun.call(null, arg3[0], arg3[1], arg3[2]);
    //             }else if(arg3.length == 4){
    //                 fun.call(null, arg3[0], arg3[1], arg3[2],arg3[3]);
    //             }else{
    //                 fun.call(null, arg3);
    //             }
    //         }else{
    //             fun.call(null);
    //         }
    //     }
    //     return egret.setInterval(fun2,null,time,arg);
    // }
    // export function clearInterval(time:number):void
    // {
    //     egret.clearInterval(time);
    // }
    // export function clearTimeout(time:number):void
    // {
    //     egret.clearTimeout(time);
    // }
    // export function describeType(s:any):XML
    // {
    //     var keys:Array<any> = Object.keys(s);
    //     console.log(keys);
    //     return null;
    //     //没有实现    
    // }
    function changeStringAny(str) {
        for (var i = 0; i < str.length; i++) {
            if (str.slice(i, i + 2) == "\\r") {
                str = str.slice(0, i) + "\r" + str.slice(i + 2, str.length);
            }
            if (str.slice(i, i + 2) == "\\n") {
                str = str.slice(0, i) + "\n" + str.slice(i + 2, str.length);
            }
            if (str.slice(i, i + 2) == "\\\\") {
                str = str.slice(0, i) + "\\" + str.slice(i + 2, str.length);
            }
        }
        return str;
    }
    flash.changeStringAny = changeStringAny;
    var bindId = 0;
    function bind(func, owner) {
        if (func == null)
            return null;
        if (func["__EgretBid__"] == null) {
            func["__EgretBid__"] = bindId;
            bindId++;
        }
        var bid = func["__EgretBid__"];
        if (owner["__EgretBO__"] == null) {
            owner["__EgretBO__"] = {};
        }
        if (!owner["__EgretBO__"][bid]) {
            var f = function () {
                return f["function"].apply(f["owner"], arguments);
            };
            f["function"] = func;
            f["owner"] = owner;
            owner["__EgretBO__"][bid] = f;
        }
        return owner["__EgretBO__"][bid];
    }
    flash.bind = bind;
    var classImplements;
    function implementsClass(cls, implements) {
        if (!classImplements)
            classImplements = new flash.Dictionary();
        classImplements.setItem(cls, implements);
    }
    flash.implementsClass = implementsClass;
    var classExtends;
    function extendsClass(cls, implements) {
        if (!classExtends)
            classExtends = new flash.Dictionary();
        classExtends.setItem(cls, implements);
    }
    flash.extendsClass = extendsClass;
    // export class ArgumentError extends Error
    // {
    //     public constructor(msg?:string,id?:number)
    //     {
    //         super(msg,id);
    //         this.name = "ArgumentError";
    //     }
    // }
    // export function navigateToURL(url:URLRequest, windowFlag:string = null):void{
    //     window.open(url.url, windowFlag);
    // }
})(flash || (flash = {}));
//# sourceMappingURL=AS3.js.map