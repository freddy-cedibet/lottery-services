// SMSProvider.ts

import ISMSProvider from './ISMSProvider';
import NpontuSMSProvider from './NpontuSMSProvider';

class SMSProvider {
    private provider: ISMSProvider;

    constructor() {
        this.provider = new NpontuSMSProvider();
    }

    async sendSMS(to: string, message: string): Promise<void> {
        await this.provider.sendSMS(to, message);
    }
}

export default SMSProvider;
