interface ISMSProvider {
    sendSMS(to: string, message: string): Promise<void>;
}

export default ISMSProvider;
