//
//  LivePersonModule.swift
//  AwesomeProject
//
//  Created by Vladyslav Saliuk on 09.04.2025.
//

import Foundation
import LPMessagingSDK
import React

@objc(LivePersonModule)
class LivePersonModule: NSObject {
  
  private var storedAccountId: String = ""
  private var jwtToken: String = ""
  
  // MARK: - INIT_SDK LOADING | JS_THREAD

  @objc(initSDK:withJWT:resolver:rejecter:)
  func initSDK(accountId: NSString,
               jwtTokenId: NSString,
               resolver resolve: @escaping RCTPromiseResolveBlock,
               rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    self.storedAccountId = accountId as String
    self.jwtToken = jwtTokenId as String
    
    do {
      try LPMessaging.instance.initialize(storedAccountId)
      
      resolve("SDK Initialized")
    } catch {
      fatalError("Was unable to initialize LPMessagingSDK for account \(storedAccountId)")
    }
  }
  
  // MARK: - SHOW CONVERSATION ON PRESS | JS_THREAD

  @objc(showConversation:rejecter:)
  func showConversation(resolve: @escaping RCTPromiseResolveBlock,
                        rejecter reject: @escaping RCTPromiseRejectBlock) {

    DispatchQueue.main.async(execute: {
      guard let rootVC = UIApplication.shared.delegate?.window??.rootViewController else {
        reject("NO rootViewController", "Root view controller not found", nil)
        return
      }
           
      let chatVC = ChatViewController()
      chatVC.accountId = self.storedAccountId
      chatVC.jwtToken = self.jwtToken
      
      rootVC.present(chatVC, animated: true)

      resolve("Conversation opened")
    })
  }
}
