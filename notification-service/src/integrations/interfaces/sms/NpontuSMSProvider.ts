import ISMSProvider from './ISMSProvider';
import axiosRequest from "../../../utils/axiosRequest";
import logger from "../../../utils/logger";

class NpontuSMSProvider implements ISMSProvider {
    private readonly baseUrl: string;
    private readonly username: string;
    private readonly password: string;

    constructor() {
        this.baseUrl = process.env.DEYWURO_SMS_BASE_URL || '';
        this.username = process.env.DEYWURO_SMS_USERNAME || '';
        this.password = process.env.DEYWURO_SMS_PASSWORD || '';

        if (!this.baseUrl || !this.username || !this.password) {
            throw new Error("SMS provider configuration is missing.");
        }
    }

    async sendSMS(to: string, message: string): Promise<void> {
        const url = `${this.baseUrl}?username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(this.password)}&source=AfrLuck-NLA&destination=${encodeURIComponent(to)}&message=${encodeURIComponent(message)}`;

        try {
            const response = await axiosRequest({
                method: 'get',
                url: url,
                authType: 'None'
            });

            logger.info(response)
            console.log("SMS sent successfully:", response);
        } catch (error) {
            logger.error(error)
            console.error('Error from SMS:', error);
        }
    }
}

export default NpontuSMSProvider;
