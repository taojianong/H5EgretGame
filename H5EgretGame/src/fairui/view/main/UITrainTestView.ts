module fairui {

	/**
	 * 火车测试界面
	 * @author clong 2019.2.22
	 */
	export class UITrainTestView extends fairui.View{

		//火车
		private group_testTrain:fairygui.GComponent;
		private numComp_0:fairui.UINumberItemComp;
		private numComp_1:fairui.UINumberItemComp;
		private numComp_2:fairui.UINumberItemComp;
		private numComp_3:fairui.UINumberItemComp; 
		private numComp_4:fairui.UINumberItemComp; 
		private numComp_5:fairui.UINumberItemComp; 
		private numComp_6:fairui.UINumberItemComp; 
		private btn_send:fairui.EButton;
		private btn_back:fairui.EButton;
		private btn_get:fairui.EButton;
		private btn_play:fairui.EButton;
		private btn_stop:fairui.EButton;
		private input_train:fairui.UITextInput;

		public constructor() {

			super();
		}

		public InitUI(): void {

			super.InitUI();

			//火车
			this.btn_send.setLabel("出发");
			this.btn_back.setLabel("回来");
			this.btn_get.setLabel("取货完");
			this.btn_play.setLabel("播放");
			this.btn_stop.setLabel("停止");
			this.numComp_0.setDefault( scene.SceneTrainCtrl.getInstance().hw );
			this.numComp_1.setDefault( scene.SceneTrainCtrl.getInstance().hh );
			this.numComp_2.setDefault( scene.SceneTrainCtrl.getInstance().sw );
			this.numComp_3.setDefault( scene.SceneTrainCtrl.getInstance().sh );
			this.numComp_4.setDefault( scene.SceneTrainCtrl.getInstance().gap );
			this.numComp_5.setDefault( scene.SceneTrainCtrl.getInstance().offsetX );
			this.numComp_6.setDefault( scene.SceneTrainCtrl.getInstance().offsetY );

			this.numComp_0.addHandler = utils.Handler.Create( this.numCompChange , this , [this.numComp_0,true] );
			this.numComp_0.redHandler = utils.Handler.Create( this.numCompChange , this , [this.numComp_0,false] );
			this.numComp_1.addHandler = utils.Handler.Create( this.numCompChange , this , [this.numComp_1,true] );
			this.numComp_1.redHandler = utils.Handler.Create( this.numCompChange , this , [this.numComp_1,false] );
			this.numComp_2.addHandler = utils.Handler.Create( this.numCompChange , this , [this.numComp_2,true] );
			this.numComp_2.redHandler = utils.Handler.Create( this.numCompChange , this , [this.numComp_2,false] );
			this.numComp_3.addHandler = utils.Handler.Create( this.numCompChange , this , [this.numComp_3,true] );
			this.numComp_3.redHandler = utils.Handler.Create( this.numCompChange , this , [this.numComp_3,false] );
			this.numComp_4.addHandler = utils.Handler.Create( this.numCompChange , this , [this.numComp_4,true] );
			this.numComp_4.redHandler = utils.Handler.Create( this.numCompChange , this , [this.numComp_4,false] );
			this.numComp_5.addHandler = utils.Handler.Create( this.numCompChange , this , [this.numComp_5,true] );
			this.numComp_5.redHandler = utils.Handler.Create( this.numCompChange , this , [this.numComp_5,false] );
			this.numComp_6.addHandler = utils.Handler.Create( this.numCompChange , this , [this.numComp_6,true] );
			this.numComp_6.redHandler = utils.Handler.Create( this.numCompChange , this , [this.numComp_6,false] );
		}

		private numCompChange(comp: fairui.UINumberItemComp, isadd: boolean = true): void {

			if( comp == this.numComp_0 ){
				if( isadd ){
					scene.SceneTrainCtrl.getInstance().hw++;
				}else{
					scene.SceneTrainCtrl.getInstance().hw--;
				}
			}else if( comp == this.numComp_1 ){
				if( isadd ){
					scene.SceneTrainCtrl.getInstance().hh++;
				}else{
					scene.SceneTrainCtrl.getInstance().hh--;
				}
			}else if( comp == this.numComp_2 ){
				if( isadd ){
					scene.SceneTrainCtrl.getInstance().sw++;
				}else{
					scene.SceneTrainCtrl.getInstance().sw--;
				}
			}else if( comp == this.numComp_3 ){
				if( isadd ){
					scene.SceneTrainCtrl.getInstance().sh++;
				}else{
					scene.SceneTrainCtrl.getInstance().sh--;
				}
			}else if( comp == this.numComp_4 ){
				if( isadd ){
					scene.SceneTrainCtrl.getInstance().gap++;
				}else{
					scene.SceneTrainCtrl.getInstance().gap--;
				}
			} 
			else if( comp == this.numComp_5 ){
				if( isadd ){
					scene.SceneTrainCtrl.getInstance().offsetX++;
				}else{
					scene.SceneTrainCtrl.getInstance().offsetX--;
				}
			} 
			else if( comp == this.numComp_6 ){
				if( isadd ){
					scene.SceneTrainCtrl.getInstance().offsetY++;
				}else{
					scene.SceneTrainCtrl.getInstance().offsetY--;
				}
			} 
			GameDispatcher.Inst.dispatchEvent(new UIGameEvent(UIGameEvent.TRAIN_SORT));
		}

		public AddRootListener(): void {

			super.AddRootListener();

			//火车测试
			this.AddGameListener( egret.TouchEvent.TOUCH_TAP , this.clickSendHandler , this , this.btn_send );
			this.AddGameListener( egret.TouchEvent.TOUCH_TAP , this.clickBackHandler , this , this.btn_back );
			this.AddGameListener( egret.TouchEvent.TOUCH_TAP , this.clickGetHandler , this , this.btn_get );
			this.AddGameListener( egret.TouchEvent.TOUCH_TAP , this.clickPlayHandler , this , this.btn_play );
			this.AddGameListener( egret.TouchEvent.TOUCH_TAP , this.clickStopHandler , this , this.btn_stop );
			
		}

		public RemoveRootListener(): void {

			super.RemoveRootListener();

			this.RemoveGameListener( egret.TouchEvent.TOUCH_TAP , this.clickSendHandler , this , this.btn_send );
			this.RemoveGameListener( egret.TouchEvent.TOUCH_TAP , this.clickBackHandler , this , this.btn_back );
			this.RemoveGameListener( egret.TouchEvent.TOUCH_TAP , this.clickGetHandler , this , this.btn_get );
			this.RemoveGameListener( egret.TouchEvent.TOUCH_TAP , this.clickPlayHandler , this , this.btn_play );
			this.RemoveGameListener( egret.TouchEvent.TOUCH_TAP , this.clickStopHandler , this , this.btn_stop );
		}

		//发货
		private clickSendHandler(e: egret.TouchEvent): void {

			GameDispatcher.Inst.dispatchEvent( new UIGameEvent( UIGameEvent.TRAIN_SEND , parseInt(this.input_train.text) ) );
		}

		//火车载货回来
		private clickBackHandler(e: egret.TouchEvent): void {

			GameDispatcher.Inst.dispatchEvent( new UIGameEvent( UIGameEvent.TRAIN_ENTER , parseInt(this.input_train.text) ) );
		}

		//火车收取货完成
		private clickGetHandler(e: egret.TouchEvent): void {

			GameDispatcher.Inst.dispatchEvent( new UIGameEvent( UIGameEvent.TRAIN_GET_ITEM , parseInt(this.input_train.text) ) );
		}

		//播放火车动画
		private clickPlayHandler(e: egret.TouchEvent): void {

			GameDispatcher.Inst.dispatchEvent(new UIGameEvent(UIGameEvent.TRAIN_ANI_PLAY));
		}

		//停止火车动画
		private clickStopHandler(e: egret.TouchEvent): void {

			GameDispatcher.Inst.dispatchEvent(new UIGameEvent(UIGameEvent.TRAIN_ANI_Stop));
		}
		
	}
}