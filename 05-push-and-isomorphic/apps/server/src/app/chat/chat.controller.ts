import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Res,
} from '@nestjs/common';

import { Message, languageCheck, OK } from '@oasis-demos/filter';

import { Response as SseResponse } from 'nestjs-sse';
import { Subject } from 'rxjs';

@Controller('chatapi')
export class ChatController {
  constructor(@Inject('bus') private bus: Subject<string>) {}

  @Get('feed')
  receiveFeed(@Res() res: SseResponse) {
    const sub = this.bus.subscribe((text) => {
      const message: Message = { text };
      return res.sse(`data: ${JSON.stringify(message)}\n\n`);
    });
    res.on('close', () => sub.unsubscribe());
  }

  @Post('message')
  sendMessage(@Body() message: Message) {
    if (languageCheck(message.text) == OK) {
      this.bus.next(message.text);
    }
  }
}
