import { AbstractDto } from './AbstractDto';
import type { AbstractEntity } from './abstract.entity';
import { Constructor } from './types';

export function UseDto(dtoClass: Constructor<AbstractDto, [AbstractEntity, unknown]>): ClassDecorator {
  return (ctor) => {
    ctor.prototype.dtoClass = dtoClass;
  };
}
