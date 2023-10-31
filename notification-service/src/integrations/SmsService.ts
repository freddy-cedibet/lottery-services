// import Twilio from 'twilio';
//
// class SMSService {
//     private client: Twilio.Twilio;
//
//     constructor(accountSid: string, authToken: string) {
//         this.client = Twilio(accountSid, authToken);
//     }
//
//     async sendSMS(to: string, message: string): Promise<void> {
//         try {
//             const response = await this.client.messages.create({
//                 body: message,
//                 to: to,  // Text this number
//                 from: '<Your-Twilio-Phone-Number>' // From a valid Twilio number
//             });
//             //
//             console.log(`Message sent successfully to ${to}. SID: ${response.sid}`);
//         } catch (error) {
//             console.error(`Failed to send SMS: ${error}`);
//         }
//     }
// }
//
// export default SMSService;
