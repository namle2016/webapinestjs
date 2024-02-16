import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'Yaly-SECRET-Key';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
