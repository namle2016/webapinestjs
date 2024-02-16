export enum UserRole {
    USER = 'USER',
    SEO = 'SEO',
    ADMIN = 'ADMIN',
  }
  
  export type UserRoleType = keyof typeof UserRole;
  