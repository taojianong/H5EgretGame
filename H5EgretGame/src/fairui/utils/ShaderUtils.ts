module fairui {

	import CustomFilter = egret.CustomFilter;

	/**
	 * Shader工具
	 * @author cl 2018.5.3
	 */
	export class ShaderUtils {

		/**
		 * 水平翻转
		 */
		public static getHFilter():CustomFilter {
			let vertexSrc = `
				attribute vec2 aVertexPosition;
				attribute vec2 aTextureCoord;
				attribute vec2 aColor;

				uniform vec2 projectionVector;

				varying vec2 vTextureCoord;
				varying vec4 vColor;

				const vec2 center = vec2(-1.0, 1.0);

				void main(void) {
					gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);
					vTextureCoord = aTextureCoord;
					vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);
				}
			`;

				let fragmentSrc1 = `
				precision lowp float;
				varying vec2 vTextureCoord;
				varying vec4 vColor;
				uniform sampler2D uSampler;

				uniform float angle;
				uniform float scale;

				void main(void) {
					vec2 uv = vTextureCoord.xy;
					vec2 texCoord = uv;
					float tx,ty,cosVal;
					cosVal = cos(angle);
					if(uv.x <= 0.5) {
						tx = 0.5 - (0.5-uv.x)/cosVal;
						if(tx < 0.0) {
							gl_FragColor = vec4(0,0,0,0);
						} else {
							if(cosVal < 0.0) {
								texCoord.x = 1.0 - tx;
							} else {
								texCoord.x = tx;
							}
							ty = 0.5 - tx;
							ty = 2.0*ty*scale;
							texCoord.y = (ty+uv.y)/(1.0+(2.0*ty));
							gl_FragColor = texture2D(uSampler, texCoord);
						}
					} else {
						tx =(uv.x-0.5)/cosVal;
						if(tx > 0.5) {
							gl_FragColor = vec4(0,0,0,0);
						} else {
							if(cosVal < 0.0) {
								texCoord.x = 0.5-tx;
							} else {
								texCoord.x = 0.5+tx;
							}
							ty = tx;
							ty = 2.0 * ty *scale; 
							texCoord.y = (uv.y - ty)/(1.0 -2.0*ty);
							gl_FragColor = texture2D(uSampler, texCoord);
						}
					}
				}
			`;
				
			//水平翻转
			return new egret.CustomFilter(vertexSrc, fragmentSrc1, {
				angle: 0 * Math.PI / 180,
				scale: 0.0
			});
		}

		/**
		 * 垂直翻转
		 */
		public static getVFilter():CustomFilter{

			let vertexSrc = `
				attribute vec2 aVertexPosition;
				attribute vec2 aTextureCoord;
				attribute vec2 aColor;

				uniform vec2 projectionVector;

				varying vec2 vTextureCoord;
				varying vec4 vColor;

				const vec2 center = vec2(-1.0, 1.0);

				void main(void) {
					gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);
					vTextureCoord = aTextureCoord;
					vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);
				}
			`;

			let fragmentSrc2 = `
				precision lowp float;
				varying vec2 vTextureCoord;
				varying vec4 vColor;
				uniform sampler2D uSampler;

				uniform float angle;
				uniform float scale;

				void main(void) {
					vec2 uv = vTextureCoord.xy;
					vec2 texCoord = uv;
					float tx,ty,cosVal;
					cosVal = cos(angle);
					if(uv.y <= 0.5) {
						ty = 0.5 - (0.5-uv.y)/cosVal;
						if(ty < 0.0) {
							gl_FragColor = vec4(0,0,0,0);
						} else {
							if(cosVal < 0.0) {
								texCoord.y = 1.0 - ty;
							} else {
								texCoord.y = ty;
							}
							tx = 0.5 - ty;
							tx = 2.0*tx*scale;
							texCoord.x = (tx+uv.x)/(1.0+(2.0*tx));
							gl_FragColor = texture2D(uSampler, texCoord);
						}
					} else {
						ty =(uv.y-0.5)/cosVal;
						if(ty > 0.5) {
							gl_FragColor = vec4(0,0,0,0);
						} else {
							if(cosVal < 0.0) {
								texCoord.y = 0.5-ty;
							} else {
								texCoord.y = 0.5+ty;
							}
							tx = ty;
							tx = 2.0 * tx *scale;
							texCoord.x = (uv.x - tx)/(1.0 -2.0*tx);
							gl_FragColor = texture2D(uSampler, texCoord);
						}
					}
				}
			`;
			//垂直翻转
			return new egret.CustomFilter(vertexSrc, fragmentSrc2, {
				angle: 0 * Math.PI / 180,
				scale: 0.0
			});
		}
	}
}