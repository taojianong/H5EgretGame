module com.loader {
	export class AvatarResDecode2 {

		public constructor() {
		}

		public parser(resObject: Object, url: string, isCache: boolean): base.AysncAnimator {
			let ani: base.Animator = this.getAnimator();
			ani.findFromCache(JSON.parse(resObject["json"]), resObject["res"]);
			ani.isCache = isCache;
			ani.url = url;
			App.asset.setResAsset(url, ani);
			return ani;
		}

		protected getAnimator(): base.AysncAnimator {
			return new base.AysncAnimator();
		}
	}
}