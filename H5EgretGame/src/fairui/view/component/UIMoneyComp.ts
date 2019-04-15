module fairui {

	/**
	 * 货币组件
	 * @author clong 2018.11.6
	 */
	export class UIMoneyComp extends BaseButton  {

		private img_bg:fairygui.GImage;
		private eloader_icon:ELoader;
		private lab_num:fairygui.GTextField;

		/**消耗数据 */
		private _costVo: vo.CostVo | RewardBase | ConsumeBase;

		/**文本颜色 */
		private _textColor: number = 0xffffff;
		/**是否显示背景 */
		private _isShowBg: boolean = true;
		/**文本对齐方式 */
		private _textAlign: number = fairygui.AlignType.Center;// "center";
		/**根据是否充足显示为红色 */
		private _isRed: boolean = false;

		private _itemIndex: number = 0;

		public constructor() {

			super();
		}

		protected constructFromXML(xml: any): void {

			super.constructFromXML(xml);

			this.eloader_icon = new fairui.ELoader( <fairygui.GLoader>this.getChild("icon") ); 

			// this.InitComplete();			
		}

		public InitUI(): void {

			super.InitUI();

			if (!this.img_bg) {
				return;
			}

			this.img_bg.visible = this._isShowBg;
			this._textColor = this.lab_num.color;

			this.textAlign = this._textAlign;
			if (this._costVo) {
				this.costVo = this._costVo;
			}
		}

		public AddRootListener(): void {

			super.AddRootListener();

			this.AddGameListener(UIGameEvent.MONEY_UPDATE_EVENT, this.updateMoney, this);
		}

		public RemoveRootListener(): void {

			super.RemoveRootListener();

			this.RemoveGameListener(UIGameEvent.MONEY_UPDATE_EVENT, this.updateMoney, this);
		}

		/**
		 * 货币改变
		 */
		private updateMoney(data: Object): void {

			if (this._costVo instanceof vo.CostVo && data["type"] == this._costVo.type) {
				//TODO 添加对应的逻辑
			}
		}

		public set isBitmap(value: boolean) {
			this.lab_num.font = value ? fairui.FairyTextureUtils.getUrl( "common" , "font_2" ) : null;
		}
		/**是否为位图字体 */
		public get isBitmap(): boolean {

			return this.lab_num.font != null;
		}

		public set num(val: number) {
			if(val == null) val = 0;
			if (this._costVo instanceof vo.CostVo) {
				this._costVo.num = val;
			}
			if (this.lab_num) {
				this.lab_num.text = val.toString();
			}
			if ( this.isLeft && !this.isBitmap && !this.isShowBg) {
				this.width = this.eloader_icon.width + this.lab_num.textWidth;
			}
		}
		/**货币数量 */
		public get num(): number {

			return this.lab_num ? parseInt(this.lab_num.text) : 0;
		}

		public set textSize(value: number) {

			if (this.lab_num) {
				this.lab_num.fontSize = value;
			}
		}
		/**文本字体大雄 */
		public get textSize(): number {

			return this.lab_num ? this.lab_num.fontSize : 20;
		}

		public set bold(value: boolean) {

			if (this.lab_num) {
				this.lab_num.bold = value;
			}
		}
		/**是否为粗体 */
		public get bold(): boolean {

			return this.lab_num && this.lab_num.bold;
		}

		public set textColor(value: number) {

			this._textColor = value;
			if (this.lab_num) {
				if (this._isRed && this._costVo instanceof vo.CostVo) {
					this.lab_num.color = this._costVo.isFull() ? this._textColor : 0xff0000;
				} else {
					this.lab_num.color = this._textColor;
				}
			}
		}
		/**文本颜色 */
		public get textColor(): number {

			return this._textColor;
		}

		public set isShowBg(value: boolean) {

			this._isShowBg = value;
			if (this.img_bg) {
				this.img_bg.visible = value;
			}
		}
		/**是否显示背景 */
		public get isShowBg(): boolean {

			return this._isShowBg;
		}

		public set textAlign(value: number) {

			this._textAlign = value;
			if (this.lab_num) {
				this.lab_num.align = value;
			}
		}
		/**文本对齐方式 */
		public get textAlign(): number {

			return this._textAlign;
		}

		public set isLeft(value: boolean) {

			this.textAlign = fairygui.AlignType.Left;// "left";
		}
		/**是否左对齐 */
		public get isLeft(): boolean {

			return this._textAlign == fairygui.AlignType.Left;//"left";
		}

		/**
		 * 设置货币显示信息
		 * @param costType 	货币类型
		 * @param num 		货币数量
		 * @param isRed 	根据是否充足显示为红色
		 */
		public setData(costType: number, num: number, isRed: boolean = false): void {

			if (this._costVo == null) {
				this._costVo = vo.CostVo.create(costType, num);
			}

			if (this._costVo instanceof vo.CostVo) {
				this._costVo.type = costType;
				this._costVo.num = num;

				this.costVo = this._costVo;

				// if (this.lab_num2) {
				// 	if (isRed) {
				// 		this.lab_num2.textColor = this._costVo.isFull() ? this._textColor : 0xff0000;
				// 	} else {
				// 		this.lab_num2.textColor = this._textColor;
				// 	}
				// }
			}
		}

		public set costVo(value: vo.CostVo | RewardBase | ConsumeBase ) {

			this._costVo = value;

			if (this.eloader_icon && value) {
				if (this._costVo instanceof vo.CostVo) {
					this.eloader_icon.url = this._costVo.iconUrl2;
					this.num = this._costVo.num;
				} else if (this._costVo instanceof RewardBase) {
					this.eloader_icon.url = game.ItemConst.getItemIconUrl( this._costVo.itemId , true , true );
					this.num = this._costVo.count;
				}else if( this._costVo instanceof ConsumeBase ){
					this.eloader_icon.url = game.ItemConst.getItemIconUrl( this._costVo.itemId , true , true );
					this.num = this._costVo.count;
				}
			}
		}
		/**消耗数据 */
		public get costVo(): vo.CostVo | RewardBase | ConsumeBase {

			return this._costVo;
		}

		public show( data:any ):void{

			this.data = data;
		}

		public set data(value: any) {

			this.costVo = value;
		}
		/**消耗数据 */
		public get data(): any {

			return this._costVo;
		}

		public set itemIndex(value: number) {

			this._itemIndex = value;
		}
		/**索引 */
		public get itemIndex(): number {

			return this._itemIndex;
		}

		/**判断是否充足 */
		public isFull(): boolean {

			if (this._costVo instanceof vo.CostVo) {
				return this._costVo.isFull();
			} else if (this._costVo instanceof RewardBase) {
				let money: number = ItemModel.getInstance().getMoney(this._costVo.itemId);
				return this._costVo.count >= money;
			}
		}

		/**不足提示 */
		public get tipDesc():string{

			if( this._costVo instanceof vo.CostVo ){
				return this._costVo.tipDesc;
			}else if( this._costVo instanceof RewardBase ){
				let name:string = game.ItemConst.getItemName( this._costVo.itemId , true );
				return name ? Global.lang.getLang( "29" , name ) :"";//{0}不足
			}
			return "";
		}

		public set y(value: number) {

			egret.superSetter(UIMoneyComp, this, "y", value);
		}

		public get y(): number {

			return egret.superGetter(UIMoneyComp, this, "y");
		}

		/**闪烁收集的资源图标 */
		public flashImgIcon():void {
			let _self:UIMoneyComp = this;
			if(this.eloader_icon) {
				this.eloader_icon.scaleX = this.eloader_icon.scaleY = 1;
				// egret.Tween.get(this.eloader_icon).to({scaleX:1.3,scaleY:1.3},100).to({scaleX:1,scaleY:1},400);//egret原生tween效果
				//fairygui tween效果
				fairygui.GTween.to( 1 , 1.3 , 0.4 ).setTarget( this.eloader_icon , this.onUpdate ).setRepeat(1,true);
				// fairygui.GTween.shake( this.eloader_icon.x , this.eloader_icon.y , 2 , 1 ).setTarget( this.eloader_icon ).onUpdate( this.updateShake , this );
			}
		}

		/**颤抖效果 */
		// private updateShake():void{
		// 	let tw:fairygui.GTweener = fairygui.GTween.getTween( this.eloader_icon );
		// 	if( tw != null ){
		// 		this.eloader_icon.x = tw.value.x;
		// 		this.eloader_icon.y = tw.value.y;
		// 	}
		// }

		private onUpdate( newValue:number ):void{

			this.scaleX = this.scaleY = newValue;
		}

		/**
		 * 获取图标全局坐标点
		 */
		public get iconGlobalPoint():egret.Point{

			if( this.parent == null || this.eloader_icon == null ){
				return new egret.Point();
			}
			return this.localToGlobal( this.eloader_icon.x , this.eloader_icon.y );
		}

		/**飘奖励 */
		public fly(): void {

			if (this._costVo && this.parent != null) {

				let gp: egret.Point = this.localToGlobal(this.eloader_icon.x, this.eloader_icon.y);
				if (this._costVo instanceof vo.CostVo) {
					if (this._costVo.isGold) {
						EffectUtil.flyItemToBag(ItemModel.GOLDEN_COIN_ID,gp,EffectUtil.TO_POS_GOLD)
					} else if (this._costVo.isBlue) {
						EffectUtil.flyItemToBag(ItemModel.DIAMOND_COIN_ID,gp,EffectUtil.TO_POS_BLUE);
					} else if (this._costVo.isExp) {
						EffectUtil.flyItemToBag(ItemModel.EXP_ID,gp,EffectUtil.TO_POS_EXP);
					}
				}else if( this._costVo instanceof RewardBase  ){
					if( this._costVo.itemId == ItemModel.GOLDEN_COIN_ID ){ //金币
						EffectUtil.flyItemToBag(ItemModel.GOLDEN_COIN_ID,gp,EffectUtil.TO_POS_GOLD)
					}else if( this._costVo.itemId == ItemModel.DIAMOND_COIN_ID ){ //钻石
						EffectUtil.flyItemToBag(ItemModel.DIAMOND_COIN_ID,gp,EffectUtil.TO_POS_BLUE);
					}else if( this._costVo.itemId == ItemModel.EXP_ID ){ //经验
						EffectUtil.flyItemToBag(ItemModel.EXP_ID,gp,EffectUtil.TO_POS_EXP);
					}
				}
			}
		}

		public Reset(): void {

			super.Reset();

			if (this._costVo instanceof vo.CostVo) {
				this._costVo.recover();
			}
			this._costVo = null;

			if(this.eloader_icon) {
				// egret.Tween.removeTweens(this.eloader_icon);
				fairygui.GTween.kill( this.eloader_icon );
			}
		}

		public Destroy(): void {

			super.Destroy();

			if (this._costVo instanceof vo.CostVo) {
				this._costVo.recover();
			}
			this._costVo = null;
			this._itemIndex = 0;
		}
	}
}