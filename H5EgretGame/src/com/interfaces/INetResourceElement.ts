module com.interfaces {
	export interface INetResourceElement extends IDispose {
		url: any;
		resType: number;
		clear();
		netComplete(value: any);
		netProgress(value: number);
		netError(value: any);
		data: any;
		netLoad();
		unNetLoad();
		isLoading: boolean;
		isCache: boolean;
	}
}
