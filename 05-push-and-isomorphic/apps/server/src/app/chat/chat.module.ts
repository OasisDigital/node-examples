import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SSEMiddleware } from 'nestjs-sse';
import { Subject } from 'rxjs';

import { ChatController } from './chat.controller';

@Module({
  controllers: [ChatController],
  providers: [{ provide: 'bus', useValue: new Subject<string>() }],
})
export class ChatModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SSEMiddleware)
      .exclude('chatapi/message')
      .forRoutes(ChatController);
  }
}
