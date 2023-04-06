//
//  FirebasePushNotifier.swift
//  villife
//
//  Created by 홍성빈 on 2023/04/02.
//

import UIKit
import Firebase

class FirebasePushNotification: NSObject {
  override init() {
    FirebaseApp.configure();
    print("FirebaseApp init.");
  }
}
