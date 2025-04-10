//
//  ChatViewController.swift
//  AwesomeProject
//
//  Created by Vladyslav Saliuk on 09.04.2025.
//

import Foundation

import UIKit
import LPMessagingSDK

class ChatViewController: UIViewController {

  var accountId: String = ""
  var jwtToken: String = ""

  override func viewDidLoad() {
    super.viewDidLoad()
    
    print("===----->>>>", accountId)
    print("============", jwtToken)

    let authenticationParams = LPAuthenticationParams(authenticationCode: nil,
                                jwt: self.jwtToken,
                                 redirectURI: nil,
                             certPinningPublicKeys: nil,
                              authenticationType: .authenticated)

    let welcomeMessageParam = LPWelcomeMessage(message: "How can I help you today?", frequency: .FirstTimeConversation)

    let conversationQuery = LPMessaging.instance.getConversationBrandQuery(self.accountId)

    let controlParam = LPConversationHistoryControlParam(historyConversationsStateToDisplay: .all,
                                  historyConversationsMaxDays: -1,
                                       historyMaxDaysType: .startConversationDate)

    let conversationViewParams = LPConversationViewParams(conversationQuery: conversationQuery,
                            containerViewController: nil,
                                   isViewOnly: false,
                        conversationHistoryControlParam: controlParam,
                                 welcomeMessage: welcomeMessageParam)

    LPMessaging.instance.showConversation(conversationViewParams, authenticationParams: authenticationParams)
  }
  
  deinit {
    let conversationQuery = LPMessaging.instance.getConversationBrandQuery(self.accountId)
    if (conversationQuery.getBrandID() == self.accountId) {
      LPMessaging.instance.removeConversation(conversationQuery)
    }
  }
}
