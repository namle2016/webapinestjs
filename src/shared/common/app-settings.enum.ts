export const appDomainSetting = (isDevelopment?: boolean, isProduction?: boolean) => {
    if (isProduction) {
      return 'https://yalycouture.com';
    }
    if (isDevelopment) {
      return 'https://dev.yalycouture.click';
    }
    return 'https://yalycouture.click';
  };
  
  export enum GenderEnum {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
  }
  
  export enum AppSlideEnum {
    HOME = 'HOME',
    ABOUT_US = 'ABOUT_US',
    CATALOGS = 'CATALOGS',
    FAQs = 'FAQs',
  }
  
  export enum ReviewQuestionTypeEnum {
    RADIO_BOX = 'RADIO_BOX',
    CHECK_BOX = 'CHECK_BOX',
    TEXT_BOX = 'TEXT_BOX',
  }
  
  export enum RegionEnum {
    NORTHERN_REGIN = 'northernRegion',
    CENTRAL_REGION = 'centralRegion',
    SOUTHERN_REGION = 'southernRegion',
  }
  
  export enum PromotionEnum {
    TOP = 'top',
    POPUP = 'popup',
  }
  
  export enum PromotionDisplayEnum {
    IMAGE = 'image',
    TEXT = 'text',
  }
  
  export enum CodeValidateEnum {
    FABRICS = 'FABRICS',
    PRODUCT = 'PRODUCT',
    CATALOG = 'CATALOG',
    CATALOG_DETAIL = 'CATALOG_DETAIL',
  }
  
  export enum AppNotificationEnum {
    EMAIL = 'EMAIL',
    WARNING = 'WARNING',
    INFO = 'INFO',
    ERROR = 'ERROR',
    STAFF_TRACKING = 'STAFF_TRACKING',
  }
  
  export enum ActionTypeEnum {
    VIEWED = 'VIEWED',
    CREATED = 'CREATED',
    EDITED = 'EDITED',
    DELETED = 'DELETED',
  }
  
  export enum PostalNoticeEnum {
    INTERNAL = 'INTERNAL',
    INTERNATIONAL = 'INTERNATIONAL',
  }
  
  export enum BannerTypeEnum {
    VIDEO = 'VIDEO',
    IMAGE = 'IMAGE',
  }
  
  export enum MadeToMeasureTypeEnum {
    DATA = 'DATA',
    GUIDE = 'GUIDE',
  }
  
  export enum ClientLanguageEnum {
    en = 'en',
    vi = 'vi',
  }