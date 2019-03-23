var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairui;
(function (fairui) {
    /**
     * Shader工具
     * @author cl 2018.5.3
     */
    var ShaderUtils = (function () {
        function ShaderUtils() {
        }
        /**
         * 水平翻转
         */
        ShaderUtils.getHFilter = function () {
            var vertexSrc = "\n\t\t\t\tattribute vec2 aVertexPosition;\n\t\t\t\tattribute vec2 aTextureCoord;\n\t\t\t\tattribute vec2 aColor;\n\n\t\t\t\tuniform vec2 projectionVector;\n\n\t\t\t\tvarying vec2 vTextureCoord;\n\t\t\t\tvarying vec4 vColor;\n\n\t\t\t\tconst vec2 center = vec2(-1.0, 1.0);\n\n\t\t\t\tvoid main(void) {\n\t\t\t\t\tgl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n\t\t\t\t\tvTextureCoord = aTextureCoord;\n\t\t\t\t\tvColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n\t\t\t\t}\n\t\t\t";
            var fragmentSrc1 = "\n\t\t\t\tprecision lowp float;\n\t\t\t\tvarying vec2 vTextureCoord;\n\t\t\t\tvarying vec4 vColor;\n\t\t\t\tuniform sampler2D uSampler;\n\n\t\t\t\tuniform float angle;\n\t\t\t\tuniform float scale;\n\n\t\t\t\tvoid main(void) {\n\t\t\t\t\tvec2 uv = vTextureCoord.xy;\n\t\t\t\t\tvec2 texCoord = uv;\n\t\t\t\t\tfloat tx,ty,cosVal;\n\t\t\t\t\tcosVal = cos(angle);\n\t\t\t\t\tif(uv.x <= 0.5) {\n\t\t\t\t\t\ttx = 0.5 - (0.5-uv.x)/cosVal;\n\t\t\t\t\t\tif(tx < 0.0) {\n\t\t\t\t\t\t\tgl_FragColor = vec4(0,0,0,0);\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tif(cosVal < 0.0) {\n\t\t\t\t\t\t\t\ttexCoord.x = 1.0 - tx;\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\ttexCoord.x = tx;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tty = 0.5 - tx;\n\t\t\t\t\t\t\tty = 2.0*ty*scale;\n\t\t\t\t\t\t\ttexCoord.y = (ty+uv.y)/(1.0+(2.0*ty));\n\t\t\t\t\t\t\tgl_FragColor = texture2D(uSampler, texCoord);\n\t\t\t\t\t\t}\n\t\t\t\t\t} else {\n\t\t\t\t\t\ttx =(uv.x-0.5)/cosVal;\n\t\t\t\t\t\tif(tx > 0.5) {\n\t\t\t\t\t\t\tgl_FragColor = vec4(0,0,0,0);\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tif(cosVal < 0.0) {\n\t\t\t\t\t\t\t\ttexCoord.x = 0.5-tx;\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\ttexCoord.x = 0.5+tx;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tty = tx;\n\t\t\t\t\t\t\tty = 2.0 * ty *scale; \n\t\t\t\t\t\t\ttexCoord.y = (uv.y - ty)/(1.0 -2.0*ty);\n\t\t\t\t\t\t\tgl_FragColor = texture2D(uSampler, texCoord);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t";
            //水平翻转
            return new egret.CustomFilter(vertexSrc, fragmentSrc1, {
                angle: 0 * Math.PI / 180,
                scale: 0.0
            });
        };
        /**
         * 垂直翻转
         */
        ShaderUtils.getVFilter = function () {
            var vertexSrc = "\n\t\t\t\tattribute vec2 aVertexPosition;\n\t\t\t\tattribute vec2 aTextureCoord;\n\t\t\t\tattribute vec2 aColor;\n\n\t\t\t\tuniform vec2 projectionVector;\n\n\t\t\t\tvarying vec2 vTextureCoord;\n\t\t\t\tvarying vec4 vColor;\n\n\t\t\t\tconst vec2 center = vec2(-1.0, 1.0);\n\n\t\t\t\tvoid main(void) {\n\t\t\t\t\tgl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n\t\t\t\t\tvTextureCoord = aTextureCoord;\n\t\t\t\t\tvColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n\t\t\t\t}\n\t\t\t";
            var fragmentSrc2 = "\n\t\t\t\tprecision lowp float;\n\t\t\t\tvarying vec2 vTextureCoord;\n\t\t\t\tvarying vec4 vColor;\n\t\t\t\tuniform sampler2D uSampler;\n\n\t\t\t\tuniform float angle;\n\t\t\t\tuniform float scale;\n\n\t\t\t\tvoid main(void) {\n\t\t\t\t\tvec2 uv = vTextureCoord.xy;\n\t\t\t\t\tvec2 texCoord = uv;\n\t\t\t\t\tfloat tx,ty,cosVal;\n\t\t\t\t\tcosVal = cos(angle);\n\t\t\t\t\tif(uv.y <= 0.5) {\n\t\t\t\t\t\tty = 0.5 - (0.5-uv.y)/cosVal;\n\t\t\t\t\t\tif(ty < 0.0) {\n\t\t\t\t\t\t\tgl_FragColor = vec4(0,0,0,0);\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tif(cosVal < 0.0) {\n\t\t\t\t\t\t\t\ttexCoord.y = 1.0 - ty;\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\ttexCoord.y = ty;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\ttx = 0.5 - ty;\n\t\t\t\t\t\t\ttx = 2.0*tx*scale;\n\t\t\t\t\t\t\ttexCoord.x = (tx+uv.x)/(1.0+(2.0*tx));\n\t\t\t\t\t\t\tgl_FragColor = texture2D(uSampler, texCoord);\n\t\t\t\t\t\t}\n\t\t\t\t\t} else {\n\t\t\t\t\t\tty =(uv.y-0.5)/cosVal;\n\t\t\t\t\t\tif(ty > 0.5) {\n\t\t\t\t\t\t\tgl_FragColor = vec4(0,0,0,0);\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tif(cosVal < 0.0) {\n\t\t\t\t\t\t\t\ttexCoord.y = 0.5-ty;\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\ttexCoord.y = 0.5+ty;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\ttx = ty;\n\t\t\t\t\t\t\ttx = 2.0 * tx *scale;\n\t\t\t\t\t\t\ttexCoord.x = (uv.x - tx)/(1.0 -2.0*tx);\n\t\t\t\t\t\t\tgl_FragColor = texture2D(uSampler, texCoord);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t";
            //垂直翻转
            return new egret.CustomFilter(vertexSrc, fragmentSrc2, {
                angle: 0 * Math.PI / 180,
                scale: 0.0
            });
        };
        return ShaderUtils;
    }());
    fairui.ShaderUtils = ShaderUtils;
    __reflect(ShaderUtils.prototype, "fairui.ShaderUtils");
})(fairui || (fairui = {}));
//# sourceMappingURL=ShaderUtils.js.map