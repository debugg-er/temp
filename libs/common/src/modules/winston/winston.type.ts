import { LoggerOptions } from 'winston'
import { DynamicModule, ForwardReference, InjectionToken, OptionalFactoryDependency, Type } from '@nestjs/common'

export const WinstonRegisterOption = Symbol('WinstonRegisterOption')
export type RegisterAsyncOptions = {
    inject: Array<InjectionToken | OptionalFactoryDependency>
    imports: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>
    useFactory: (...any: any) => LoggerOptions | Promise<LoggerOptions>
}
