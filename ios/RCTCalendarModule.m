//
//  RCTCalendarModule.m
//  villife
//
//  Created by 홍성빈 on 2023/04/01.
//

#import <Foundation/Foundation.h>
#import "RCTCalendarModule.h"

@implementation RCTCalendarModule

RCT_EXPORT_MODULE(CalendarModuleFoo);
RCT_EXPORT_METHOD(createCalendarEvent: (NSString *)name location: (NSString *)location)
{

  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}
<#methods#>

@end
