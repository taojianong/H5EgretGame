declare class GLong {
    static MAX_VALUE: any;
    constructor(low, high, unsigned);
    /**Returns a Long representing the given 32 bit integer value.@returns !Long*/
    public static fromInt(value, unsigned?): GLong;
    /**Converts the specified value to a Long.@returns !Long*/
    public static fromValue(value): GLong;
    /**Tests if the specified object is a Long.@returns	boolean*/
    public static isLong(obj): boolean;
    /**Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.@returns !Long*/
    public static fromNumber(value, unsigned?): GLong;
    /**Returns a Long representation of the given string, written using the specified radix.@returns !Long*/
    public static fromString(str, unsigned?, radix?): GLong;
    /**转换成为number */
    public  toNumber():number;
    /**转换成为字符串 */
    public  toString():string;
    /**转换成为int */
    //public  toInt():number;
}
