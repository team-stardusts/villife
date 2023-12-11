#import "AppDelegate.h"
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTLinkingManager.h>

// Added for Naver login.
#import <NaverThirdPartyLogin/NaverThirdPartyLoginConnection.h>

// Added for microsoft/code-push.
// https://learn.microsoft.com/en-us/appcenter/distribution/codepush/rn-get-started
#import <CodePush/CodePush.h>


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  self.moduleName = @"villife";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  //return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  return [CodePush bundleURL]; // Added 'code push' to apply it.
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

// Added for Naver login.
- (BOOL)application:(UIApplication *)application
     openURL:(NSURL *)url
     options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  /*
  // for naver login and deep linking.
  if ([url.scheme isEqualToString:@"com.stardusts.villife"]) {
    return [[NaverThirdPartyLoginConnection getSharedInstance] application:application openURL:url options:options];
  }
  
  return YES;
   */
  // Check if the URL scheme matches the Naver login scheme
    if ([url.scheme isEqualToString:@"com.stardusts.villife"]) {
      return [[NaverThirdPartyLoginConnection getSharedInstance] application:application openURL:url options:options];
    }
    
    // Pass the URL to React Native's RCTLinkingManager for handling deep links
    BOOL handledByRCTLinkingManager = [RCTLinkingManager application:application openURL:url options:options];
    
    // Return the combined result of both handlers
    return handledByRCTLinkingManager || YES;
}

// Added for deep linking(Universal links).
- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
 return [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                    restorationHandler:restorationHandler];
}

@end
