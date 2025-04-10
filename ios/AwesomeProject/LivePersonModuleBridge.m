//
//  LivePersonModuleBridge.m
//  AwesomeProject
//
//  Created by Vladyslav Saliuk on 09.04.2025.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(LivePersonModule, NSObject)

RCT_EXTERN_METHOD(initSDK:(NSString *)accountId
                  withJWT:(NSString *)jwtTokenId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(showConversation:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
