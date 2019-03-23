module com.utils {

	export class MathUnit {

		public static smoothstep(min: number, max: number, value: number): number {
			if (value < min) {
				return 0;
			}
			if (value > max) {
				return 1;
			}
			let t: number = (value - min) / (max - min);
			return -2 * Math.pow(t, 3) + 3 * Math.pow(t, 2);
		}

		public static getPointDirInLine(px: number, py: number, p1x: number, p1y: number, p2x: number, p2y: number): number {
			let tmpx: number = (p1x - p2x) / (p1y - p2y) * (py - p2y) + p2x;
			if (tmpx > px)
				return -1;
			else if (tmpx == px) {
				return 0;
			}
			return 1;
		}

		public static getPointDirInLine_v2(x: number, y: number, x1: number, y1: number, x2: number, y2: number): number {
			let tmp: number = (y1 - y2) * x + (x2 - x1) * y + (x1 * y2) - (x2 * y1);
			if (tmp > 0) {
				return -1;
			}
			else if (tmp == 0) {
				return 0;
			}
			return 1;
		}

		public static getPointDirInLine_v3(x: number, y: number, x1: number, y1: number, x2: number, y2: number): number {
			let tmp: number = (x2 - x1) * (y - y1) - (y2 - y1) * (x - x1);
			if (tmp > 0) {
				return -1;
			}
			else if (tmp == 0) {
				return 0;
			}
			return 1;
		}

		public cosa_leng(A: number, B: number, a: number): number {
			return Math.sqrt(A * A + B * B - 2 * A * B * Math.cos(a));
		}

		public static rectInsetRound(rect: egret.Rectangle, cx: number, cy: number, range: number): boolean {
			//cx = cx);
			//cy = cy);
			//range = range);
			return false;
		}

		public static distance4_3D(x1: number, y1: number, x2: number, y2: number): number {
			let dy: number = 4 * (y1 - y2) / 3;
			return Math.sqrt((x1 - x2) * (x1 - x2) + (dy) * (dy));
		}

		public static distance3_2D(x1: number, y1: number, x2: number, y2: number): number {
			let dy: number = 3 * (y1 - y2) / 2;
			return Math.sqrt((x1 - x2) * (x1 - x2) + (dy) * (dy));
		}

		public static distance25D(x1: number, y1: number, x2: number, y2: number): number {
			return Math.sqrt((x1 - x2) * (x1 - x2) + 4 * (y1 - y2) * (y1 - y2));
		}

		public static randRange(min: number, max: number): number {
			let randomNum: number = Math.floor(Math.random() * (max - min + 1)) + min;
			return randomNum;
		}

		public static degreesToRadin(degrees: number): number {
			return degrees * Math.PI / 180;
		}

		public static radinToDegrees(radian: number): number {
			return radian * 180 / Math.PI;
		}

		public static getDistributionPointOnPoint(px: number, py: number, tx: number, ty: number, degrees: number, num: number = 3, dis: number = -1): Array<egret.Point> {
			let list: Array<egret.Point> = new Array<egret.Point>();
			let totalAngel: number = degrees * (num - 1);
			let halfAngel: number = totalAngel * 0.5;
			let crtDeg: number = MathUnit.radinToDegrees(MathUnit.atan2Angle(tx, ty, px, py));
			if (crtDeg < 0)
				crtDeg += 360;
			let sDeg: number = crtDeg - halfAngel;
			let distance: number = <any>(dis == -1 ? MathUnit.distancePoint2Point(px, py, tx, ty) : dis);
			let angel: number = MathUnit.degreesToRadin(degrees);
			let startAngel: number = MathUnit.degreesToRadin(sDeg);
			if (startAngel < 0)
				startAngel += Math.PI * 2;
			for (let i: number = 0; i < num; i++) {
				let deg: number = startAngel + i * angel;
				let p: egret.Point = new egret.Point();
				p.x = Math.cos(deg) * distance + px;
				p.y = Math.sin(deg) * distance + py;
				list.push(p);
			}
			return list;
		}

		public static distanceMinPoint(px: number, py: number, px2: number, py2: number): number {
			// px = px);
			// py = py);
			// px2 = px2);
			// py2 = py2);
			let decx: number = Math.abs(px - px2);
			let decy: number = Math.abs(py - py2);
			return decx > decy ? decx : decy;
		}

		public static distancePoint2Point(px: number, py: number, px2: number, py2: number): number {
			// px = px);
			// py = py);
			// px2 = px2);
			// py2 = py2);
			let distance: number = Math.sqrt(Math.pow(px - px2, 2) + Math.pow(py - py2, 2));
			return distance;
		}

		public static selectMonsterInSectorFromVector(p1: Vector2D, p: Vector2D, target: Vector2D, angle: number, dis: number): boolean {
			//dis = dis);
			let ang: number = MathUnit.get_angle(p1, target, p);
			let d: number = egret.Point.distance(new egret.Point(target.x, target.y), new egret.Point(p.x, p.y));
			if (ang <= angle / 2 && d <= dis)
				return true;
			return false;
		}

		private static get_angle(p1: Vector2D, p2: Vector2D, p: Vector2D): number {
			let angle: number = 0;
			let MMM_PI: number = 3.1415926;
			let va: Vector2D = p1.subtract(p);
			let vb: Vector2D = p2.subtract(p);
			let productValue: number = va.x * vb.x + va.y * vb.y;
			let va_val: number = Math.sqrt(va.x * va.x + va.y * va.y);
			let vb_val: number = Math.sqrt(vb.x * vb.x + vb.y * vb.y);
			let cosValue: number = productValue / (va_val * vb_val);
			if (cosValue < -1 && cosValue > -2) {
				cosValue = -1;
			}
			else if (cosValue > 1 && cosValue < 2) {
				cosValue = 1;
			}
			angle = Math.acos(cosValue) * 180 / MMM_PI;
			return angle;
		}

		public static getPointInSector(px: number, py: number, sx: number, sy: number, ex: number, ey: number, centerX: number, centerY: number): boolean {
			// px = px);
			// py = py);
			// sx = sx);
			// sy = sy);
			// ex = ex);
			// ey = ey);
			// centerX = centerX);
			// centerY = centerY);
			let ret: boolean = <any>false;
			let distance: number = MathUnit.distancePoint2Point(px, py, centerX, centerY);
			let dis2: number = MathUnit.distancePoint2Point(centerX, centerY, sx, sy);
			if (distance > dis2) {
				return false;
			}
			let sAngel: number = MathUnit.atan2Angle(sx, sy, centerX, centerY);
			let eAngel: number = MathUnit.atan2Angle(ex, ey, centerX, centerY);
			let bool: boolean = <any>false;
			if (sAngel < 0) {
				sAngel += Math.PI * 2;
				eAngel += Math.PI * 2;
				bool = true;
			}
			if (eAngel < 0) {
				eAngel += Math.PI * 2;
			}
			let angel: number = MathUnit.atan2Angle(px, py, centerX, centerY);
			if (bool || angel < 0)
				angel += Math.PI * 2;
			if (angel >= sAngel && angel <= eAngel) {
				ret = true;
			}
			return ret;
		}

		public static atan2Angle(targetX: number, targetY: number, startX: number, startY: number, dir: number = 0): number {
			let decy: number = targetY - startY;
			let decx: number = targetX - startX;
			let angle: number = 0;
			if (decy == 0 && decx == 0) {
				angle = Math.PI * (dir / 4 - 0.5);
			}
			else {
				angle = Math.atan2(decy, decx);
			}
			return angle;
		}



		public static toPoint(display: egret.DisplayObject, mat: egret.Matrix, cx: number, cy: number, $angle: number) {
			let mat1: egret.Matrix = new egret.Matrix();
			mat1.translate(cx, cy);
			mat1.rotate($angle);
			mat1.concat(mat);
			mat1.translate(cx * -1, cy * -1);
			display.matrix = mat1;
		}
	}
}