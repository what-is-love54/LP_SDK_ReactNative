/** @format */

import {NativeModules} from 'react-native';

interface LivePersonNativeModule {
	initSDK(accountId: string, jwtTokenId: string): Promise<string>;
	showConversation(): Promise<string>;
}

export const LivePersonModule =
	NativeModules.LivePersonModule as LivePersonNativeModule;
