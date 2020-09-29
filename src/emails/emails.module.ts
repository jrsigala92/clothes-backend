// import * as path from 'path';
// import { Module } from '@nestjs/common';
// import { BullModule } from 'nest-bull';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import { mailBullConfig } from '../../config/mail';
// import { EmailsService } from './emails.service';
// // import { EmailsController } from './emails.controller';
// // import { MailQueue  } from './/mail.queue';

// const bullModule = BullModule.forRoot(mailBullConfig);
// @Module({
//   imports: [
//     bullModule,
//     MailerModule.forRoot({
//       defaults: {
//         from: '"No Reply" <noreply@example.com>',
//       },
//       template: {
//         dir: path.join(process.env.PWD, 'templates/pages'),
//         adapter: new HandlebarsAdapter(),
//         options: {
//           strict: true,
//         },
//       },
//       options: {
//         partials: {
//           dir: path.join(process.env.PWD, 'templates/partials'),
//           options: {
//             strict: true,
//           },
//         }
//       }
//     }),
//   ],
//   controllers: [EmailsController],
//   providers: [EmailsService],
//   exports: [bullModule],
// })
// export class EmailsModule {}
