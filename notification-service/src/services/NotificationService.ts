import NpontuSMSProvider from "../integrations/interfaces/sms/NpontuSMSProvider";
import SMSAdapter from "../integrations/interfaces/sms/SMSAdapter";


export const sendSms = async() => {
    const npontuProvider = new NpontuSMSProvider();
    const smsAdapter = new SMSAdapter(npontuProvider);
    await smsAdapter.sendSMS('233242953672', 'Hello from Notification service!');
}