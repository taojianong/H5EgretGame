module com.bean {
	export class DataManager {

		private _q_itemContainer: com.game.data.container.Q_itemContainer;

		/**物品配置*/
		public get q_itemContainer(): com.game.data.container.Q_itemContainer {
			if (this._q_itemContainer == null) {
				this._q_itemContainer = new com.game.data.container.Q_itemContainer();
				this._q_itemContainer.load();
			}
			return this._q_itemContainer;
		}
		
	}
}