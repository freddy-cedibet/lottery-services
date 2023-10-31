import ISMSProvider from './ISMSProvider';

class SMSAdapter {
    private provider: ISMSProvider;

    constructor(provider: ISMSProvider) {
        this.provider = provider;
    }

    async sendSMS(to: string, message: string): Promise<void> {
        return this.provider.sendSMS(to, message);
    }
}

export default SMSAdapter;
