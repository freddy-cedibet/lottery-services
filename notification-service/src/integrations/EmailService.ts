import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

class EmailService {
    private transporter: Transporter;

    constructor() {
        // Here, you would typically configure your SMTP server settings
        // For this example, let's use a test account from Nodemailer
        nodemailer.createTestAccount((err, account) => {
            if (err) {
                console.error('Failed to create a testing account. ' + err.message);
                return process.exit(1);
            }

            // Create a transporter using the test account
            this.transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure, // true for 465, false for other ports
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });
        });
    }

    async sendMail(to: string, subject: string, text: string, html: string): Promise<void> {
        let info = await this.transporter.sendMail({
            from: '"Notifications Service" <no-reply@example.com>',
            to: to,
            subject: subject,
            text: text,
            html: html,
        });

        console.log('Message sent: %s', info.messageId);
        // Preview URL for the sent email
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
}

export default EmailService;
