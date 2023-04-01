//
//  FirebasePushNotifier.swift
//  villife
//
//  Created by 홍성빈 on 2023/04/02.
//

import Foundation
import React


@objc(FirebasePushNotifier)
class FirebasePushNotifier: NSObject {
  @objc(moduleName)
  func moduleName() -> String! {
    return "FirebasePushNotifier";
  }
  
  @objc(test:callback:)
  func test(_input: String, callback: RCTResponseSenderBlock) -> Void {
    callback([NSNull(), "테스트 완료"]);
  }
  
  @objc(requiresMainQueueSetup)
  static func requiresMainQueueSetup() -> Bool { 
    return true;
  }
}

