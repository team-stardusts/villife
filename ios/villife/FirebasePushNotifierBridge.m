//
//  FirebaseNotifierBridge.m
//  villife
//
//  Created by 홍성빈 on 2023/04/02.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(FirebasePushNotifier, NSObject)
RCT_EXTERN_METHOD(moduleName)
RCT_EXTERN_METHOD(test:(NSString *) _input callback:(RCTResponseSenderBlock *) callback)
@end
