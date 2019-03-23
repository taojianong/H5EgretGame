module fairui {
	/**
	 * 虚线
	 * @author cl 2018.4.16
	 */
	export class DashedLine extends fairygui.GGraph{

		/**
		 * The target movie clip in which drawings are to be made
		 */
		public target:egret.Graphics;
		/**
		 * A value representing the accuracy used in determining the length
		 * of curveTo curves.
		 */
		public _curveaccuracy:number = 6;
			
		private isLine:boolean = true;
		private overflow:number = 0;
		private offLength:number = 0;
		private onLength:number = 0;
		private dashLength:number = 0;
		private pen:Object;

		public constructor( target:Object = null , onLength:number, offLength:number ) {

			super();
			
			let g:fairygui.GGraph = null;
			if( target instanceof fairygui.GComponent ){
				g = new fairygui.GGraph();
				target.addChild( g );
				this.target = g.graphics;
			}else{
				this.target = target ? target["graphics"] : this.graphics;
			}
			
			this.setDash(onLength, offLength);
			this.isLine = true;
			this.overflow = 0;
			this.pen = {x:0, y:0};
		}

		/**
		 * Sets new lengths for dash sizes
		 * @param onLength Length of visible dash lines.
		 * @param offLength Length of space between dash lines.
		 * @return nothing
		 */
		public setDash(onLength:number, offLength:number):void {
			this.onLength = onLength;
			this.offLength = offLength;
			this.dashLength = this.onLength + this.offLength;
		}

		/**
		 * Gets the current lengths for dash sizes
		 * @return Array containing the onLength and offLength values
		 * respectively in that order
		 */
		public getDash():Array<any> {
			return [this.onLength, this.offLength];
		}

		/**
		 * Moves the current drawing position in target to (x, y).
		 * @param x An integer indicating the horizontal position relative to the registration point of
		 * the parent movie clip.
		 * @param An integer indicating the vertical position relative to the registration point of the
		 * parent movie clip.
		 * @return nothing
		 */
		public moveTo(x:number, y:number):void {
			this.targetMoveTo(x, y);
		}
		
		/**
		 * Draws a dashed line in target using the current line style from the current drawing position
		 * to (x, y); the current drawing position is then set to (x, y).
		 * @param x An integer indicating the horizontal position relative to the registration point of
		 * the parent movie clip.
		 * @param An integer indicating the vertical position relative to the registration point of the
		 * parent movie clip.
		 * @return nothing
		 */
		public lineTo(x:number,y:number):void {
			var dx:number = x-this.pen["x"],	dy:number = y-this.pen["y"];
			var a:number = Math.atan2(dy, dx);
			var ca:number = Math.cos(a), sa:number = Math.sin(a);
			var segLength:number = this.lineLength(dx, dy);
			if (this.overflow){
				if (this.overflow > segLength){
					if (this.isLine) this.targetLineTo(x, y);
					else this.targetMoveTo(x, y);
					this.overflow -= segLength;
					return;
				}
				if (this.isLine) this.targetLineTo(this.pen["x"] + ca*this.overflow, this.pen["y"] + sa*this.overflow);
				else this.targetMoveTo(this.pen["x"] + ca*this.overflow, this.pen["y"] + sa*this.overflow);
				segLength -= this.overflow;
				this.overflow = 0;
				this.isLine = !this.isLine;
				if (!segLength) return;
			}
			var fullDashCount:number = Math.floor(segLength/this.dashLength);
			if (fullDashCount){
				var onx:number = ca*this.onLength,	ony:number = sa*this.onLength;
				var offx:number = ca*this.offLength,	offy:number = sa*this.offLength;
				for (var i:number=0; i<fullDashCount; i++){
					if (this.isLine){
						this.targetLineTo(this.pen["x"]+onx, this.pen["y"]+ony);
						this.targetMoveTo(this.pen["x"]+offx, this.pen["y"]+offy);
					}else{
						this.targetMoveTo(this.pen["x"]+offx, this.pen["y"]+offy);
						this.targetLineTo(this.pen["x"]+onx, this.pen["y"]+ony);
					}
				}
				segLength -= this.dashLength*fullDashCount;
			}
			if (this.isLine){
				if (segLength > this.onLength){
					this.targetLineTo(this.pen["x"]+ca*this.onLength, this.pen["y"]+sa*this.onLength);
					this.targetMoveTo(x, y);
					this.overflow = this.offLength-(segLength-this.onLength);
					this.isLine = false;
				}else{
					this.targetLineTo(x, y);
					if (segLength == this.onLength){
						this.overflow = 0;
						this.isLine = !this.isLine;
					}else{
						this.overflow = this.onLength-segLength;
						this.targetMoveTo(x, y);
					}
				}
			}else{
				if (segLength > this.offLength){
					this.targetMoveTo(this.pen["x"]+ca*this.offLength, this.pen["y"]+sa*this.offLength);
					this.targetLineTo(x, y);
					this.overflow = this.onLength-(segLength-this.offLength);
					this.isLine = true;
				}else{
					this.targetMoveTo(x, y);
					if (segLength == this.offLength){
						this.overflow = 0;
						this.isLine = !this.isLine;
					}else this.overflow = this.offLength-segLength;
				}
			}
		}

		/**
		 * Draws a dashed curve in target using the current line style from the current drawing position to
		 * (x, y) using the control point specified by (cx, cy). The current  drawing position is then set
		 * to (x, y).
		 * @param cx An integer that specifies the horizontal position of the control point relative to
		 * the registration point of the parent movie clip.
		 * @param cy An integer that specifies the vertical position of the control point relative to the
		 * registration point of the parent movie clip.
		 * @param x An integer that specifies the horizontal position of the next anchor point relative
		 * to the registration. point of the parent movie clip.
		 * @param y An integer that specifies the vertical position of the next anchor point relative to
		 * the registration point of the parent movie clip.
		 * @return nothing
		 */
		public curveTo(cx:number, cy:number, x:number, y:number):void {
			var sx:number = this.pen["x"];
			var sy:number = this.pen["y"];
			var segLength:number = this.curveLength(sx, sy, cx, cy, x, y);
			var t:number = 0;
			var t2:number = 0;
			var c:Array<any>;
			if (this.overflow){
				if (this.overflow > segLength){
					if (this.isLine) this.targetCurveTo(cx, cy, x, y);
					else this.targetMoveTo(x, y);
					this.overflow -= segLength;
					return;
				}
				t = this.overflow/segLength;
				c = this.curveSliceUpTo(sx, sy, cx, cy, x, y, t);
				if (this.isLine) this.targetCurveTo(c[2], c[3], c[4], c[5]);
				else this.targetMoveTo(c[4], c[5]);
				this.overflow = 0;
				this.isLine = !this.isLine;
				if (!segLength) return;
			}
			var remainLength:number = segLength - segLength*t;
			var fullDashCount:number = Math.floor(remainLength/this.dashLength);
			var ont:number = this.onLength/segLength;
			var offt:number = this.offLength/segLength;
			if (fullDashCount){
				for (var i:number=0; i<fullDashCount; i++){
					if (this.isLine){
						t2 = t + ont;
						c = this.curveSlice(sx, sy, cx, cy, x, y, t, t2);
						this.targetCurveTo(c[2], c[3], c[4], c[5]);
						t = t2;
						t2 = t + offt;
						c = this.curveSlice(sx, sy, cx, cy, x, y, t, t2);
						this.targetMoveTo(c[4], c[5]);
					}else{
						t2 = t + offt;
						c = this.curveSlice(sx, sy, cx, cy, x, y, t, t2);
						this.targetMoveTo(c[4], c[5]);
						t = t2;
						t2 = t + ont;
						c = this.curveSlice(sx, sy, cx, cy, x, y, t, t2);
						this.targetCurveTo(c[2], c[3], c[4], c[5]);
					}
					t = t2;
				}
			}
			remainLength = segLength - segLength*t;
			if (this.isLine){
				if (remainLength > this.onLength){
					t2 = t + ont;
					c = this.curveSlice(sx, sy, cx, cy, x, y, t, t2);
					this.targetCurveTo(c[2], c[3], c[4], c[5]);
					this.targetMoveTo(x, y);
					this.overflow = this.offLength-(remainLength-this.onLength);
					this.isLine = false;
				}else{
					c = this.curveSliceFrom(sx, sy, cx, cy, x, y, t);
					this.targetCurveTo(c[2], c[3], c[4], c[5]);
					if (segLength == this.onLength){
						this.overflow = 0;
						this.isLine = !this.isLine;
					}else{
						this.overflow = this.onLength-remainLength;
						this.targetMoveTo(x, y);
					}
				}
			}else{
				if (remainLength > this.offLength){
					t2 = t + offt;
					c = this.curveSlice(sx, sy, cx, cy, x, y, t, t2);
					this.targetMoveTo(c[4], c[5]);
					c = this.curveSliceFrom(sx, sy, cx, cy, x, y, t2);
					this.targetCurveTo(c[2], c[3], c[4], c[5]);
					
					this.overflow = this.onLength-(remainLength-this.offLength);
					this.isLine = true;
				}else{
					this.targetMoveTo(x, y);
					if (remainLength == this.offLength){
						this.overflow = 0;
						this.isLine = !this.isLine;
					}else this.overflow = this.offLength-remainLength;
				}
			}
		}
		
		public curvedBox(x:number, y:number, w:number,h:number,radius:number): void {
			var circ:number = 0.707107;
			var off:number = 0.6;
			this.moveTo(x+0,y+radius);
			this.lineTo(x+0,y+h-radius);
			this.curveTo(x+0,y+(h-radius)+radius*(1-off),x+0+(1-circ)*radius,y+h-(1-circ)*radius);
			this.curveTo(x+(0+radius)-radius*(1-off),y+h,x+radius,y+h);
			this.lineTo(x+w-radius,y+h);
			this.curveTo(x+(w-radius)+radius*(1-off),y+h,x+w-(1-circ)*radius,y+h-(1-circ)*radius);
			this.curveTo(x+w,y+(h-radius)+radius*(1-off),x+w,y+h-radius);
			this.lineTo(x+w,y+0+radius);
			this.curveTo(x+w, y+radius-radius*(1-off),x+w-(1-circ)*radius,y+0+(1-circ)*radius);
			this.curveTo(x+(w-radius)+radius*(1-off),y+0,x+w-radius,y+0);
			this.lineTo(x+radius,y+0);
			this.curveTo(x+radius-radius*(1-off),y+0,x+(1-circ)*radius,y+(1-circ)*radius);
			this.curveTo(x+0, y+radius-radius*(1-off),x+0,y+radius);
		}

		public ellipse(x:number, y:number, w:number,h:number): void {
			var rW:number = w/2;
			var rH:number = h/2;
			
			// Center x,y
			x += w/2;
			y += h/2;
			
			// r=circle radius, x,y=offset circle center coordinates within mcClip
			this.moveTo(x+rW, y);
			// start drawing circle CCW at positive x-axis, at distance r from center(x+r)
			// 1st anchor point...x:(x+r), y:y
			this.curveTo(rW+x,-0.4142*rH+y,0.7071*rW+x,-0.7071*rH+y);
			// control point...x:radius+x offset, y:tan(pi/8)*radius+y offset
			// 2nd anchor point...x:cos(pi/4)*radius+x offset, y:sin(pi/4)*radius+y offset
			// becomes 1st anchor point for next curveTo
			this.curveTo(0.4142*rW+x,-rH+y,x,-rH+y);
			// control point...x:cot(3pi/8)*radius+x offset, y:-radius+ y offset
			// 2nd anchor point...x:x offset,y:-radius+y offset
			// etc...
			this.curveTo(-0.4142*rW+x,-rH+y,-0.7071*rW+x,-0.7071*rH+y);
			this.curveTo(-rW+x,-0.4142*rH+y,-rW+x, y);
			this.curveTo(-rW+x,0.4142*rH+y,-0.7071*rW+x,0.7071*rH+y);
			this.curveTo(-0.4142*rW+x,rH+y,x,rH+y);
			this.curveTo(0.4142*rW+x,rH+y,0.7071*rW+x,0.7071*rH+y) ;
			this.curveTo(rW+x,0.4142*rH+y,rW+x,y);
		}
		
		// direct translations
		/**
		 * Clears the drawing in target
		 * @return nothing
		 */
		public clear():void {
			this.target.clear();
		}

		/**
		 * Sets the lineStyle for target
		 * @param thickness An integer that indicates the thickness of the line in points; valid values
		 * are 0 to 255. If a number is not specified, or if the parameter is undefined, a line is not
		 * drawn. If a value of less than 0 is passed, Flash uses 0. The value 0 indicates hairline
		 * thickness; the maximum thickness is 255. If a value greater than 255 is passed, the Flash
		 * interpreter uses 255.
		 * @param rgb A hex color value (for example, red is 0xFF0000, blue is 0x0000FF, and so on) of
		 * the line. If a value isn?t indicated, Flash uses 0x000000 (black).
		 * @param alpha An integer that indicates the alpha value of the line?s color; valid values are
		 * 0?100. If a value isn?t indicated, Flash uses 100 (solid). If the value is less than 0, Flash
		 * uses 0; if the value is greater than 100, Flash uses 100.
		 * @return nothing
		 */
		public lineStyle(thickness:number,rgb:number,alpha:number):void {
			this.target.lineStyle(thickness,rgb,alpha);
		}

		/**
		 * Sets a basic fill style for target
		 * @param rgb A hex color value (for example, red is 0xFF0000, blue is 0x0000FF, and so on). If
		 * this value is not provided or is undefined, a fill is not created.
		 * @param alpha An integer between 0?100 that specifies the alpha value of the fill. If this value
		 * is not provided, 100 (solid) is used. If the value is less than 0, Flash uses 0. If the value is
		 * greater than 100, Flash uses 100.
		 * @return nothing
		 */
		public beginFill(rgb:number,alpha:number):void {
			this.target.beginFill(rgb,alpha);
		}

		/**
		 * Sets a gradient fill style for target
		 * @param fillType Either the string "linear" or the string "radial".
		 * @param colors An array of RGB hex color values to be used in the gradient (for example, red is
		 * 0xFF0000, blue is 0x0000FF, and so on).
		 * @param alphas An array of alpha values for the corresponding colors in the colors array; valid
		 * values are 0?100. If the value is less than 0, Flash uses 0. If the value is greater than 100,
		 * Flash uses 100.
		 * @param ratios An array of color distribution ratios; valid values are 0?255. This value defines
		 * the percentage of the width where the color is sampled at 100 percent.
		 * @param matrix A transformation matrix that is an object with one of two sets of properties.
		 * @return nothing
		 */
		public beginGradientFill(fillType:string,colors:Array<any>,alphas:Array<any>,ratios:Array<any>,matrix:egret.Matrix):void {
			this.target.beginGradientFill(fillType,colors,alphas,ratios,matrix);
		}

		/**
		 * Ends the fill style for target
		 * @return nothing
		 */
		public endFill():void {
			this.target.endFill();
		}
		
		// private methods
		private lineLength(sx:number, sy:number, ...args):number {
			if(!args.length){
				return Math.sqrt(sx*sx + sy*sy);
			} else {
				var ex:number = args[0];
				var ey:number = args[1];
			}
			var dx:number = ex - sx;
			var dy:number = ey - sy;
			return Math.sqrt(dx*dx + dy*dy);
		}

		private curveLength(sx:number, sy:number, cx:number, cy:number, ex:number, ey:number, ...args):number {
			var total:number = 0;
			var tx:number = sx;
			var ty:number = sy;
			var px:number, py:number, t:number, it:number, a:number, b:number, c:number;
			var n:number = args[0] != null ? args[0] : this._curveaccuracy;
			for (var i:number = 1; i<=n; i++){
				t = i/n;
				it = 1-t;
				a = it*it; b = 2*t*it; c = t*t;
				px = a*sx + b*cx + c*ex;
				py = a*sy + b*cy + c*ey;
				total += this.lineLength(tx, ty, px, py);
				tx = px;
				ty = py;
			}
			return total;
		}

		private curveSlice(sx:number, sy:number, cx:number, cy:number, ex:number, ey:number, t1:number, t2:number):Array<any> {
			if (t1 == 0) return this.curveSliceUpTo(sx, sy, cx, cy, ex, ey, t2);
			else if (t2 == 1) return this.curveSliceFrom(sx, sy, cx, cy, ex, ey, t1);
			var c:Array<any> = this.curveSliceUpTo(sx, sy, cx, cy, ex, ey, t2);
			c.push(t1/t2);
			return this.curveSliceFrom.apply(this, c);
		}

		private curveSliceUpTo(sx:number, sy:number, cx:number, cy:number, ex:number, ey:number, t:number = 0):Array<any> {
			if (t == 0) t = 1;
			if (t != 1) {
				var midx:number = cx + (ex-cx)*t;
				var midy:number = cy + (ey-cy)*t;
				cx = sx + (cx-sx)*t;
				cy = sy + (cy-sy)*t;
				ex = cx + (midx-cx)*t;
				ey = cy + (midy-cy)*t;
			}
			return [sx, sy, cx, cy, ex, ey];
		}

		private curveSliceFrom(sx:number, sy:number, cx:number, cy:number, ex:number, ey:number, t:number = 0):Array<any> {
			if (t == 0) t = 1;
			if (t != 1) {
				var midx:number = sx + (cx-sx)*t;
				var midy:number = sy + (cy-sy)*t;
				cx = cx + (ex-cx)*t;
				cy = cy + (ey-cy)*t;
				sx = midx + (cx-midx)*t;
				sy = midy + (cy-midy)*t;
			}
			return [sx, sy, cx, cy, ex, ey];
		}
		
		private targetMoveTo(x:number, y:number):void {
			this.pen = {x:x, y:y};
			this.target.moveTo(x, y);
		}
		private targetLineTo(x:number, y:number):void {
			if (x == this.pen["x"] && y == this.pen["y"]) return;
			this.pen = {x:x, y:y};
			this.target.lineTo(x, y);
		}
		private targetCurveTo(cx:number, cy:number, x:number, y:number):void {
			if (cx == x && cy == y && x == this.pen["x"] && y == this.pen["y"]) return;
			this.pen = {x:x, y:y};
			this.target.curveTo(cx, cy, x, y);
		}

		public dispose():void{

			super.dispose();

			if( this.target != null ){
				this.target.clear();
				this.target = null;
			}
			this.pen = null;

		}
	}
}