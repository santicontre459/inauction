import sgMail from '@sendgrid/mail';
import bidderEmailVerificationTemplate from "../core/services/email/template/bidderEmailVerificationTemplate";
import bidderInvitationTemplate from "../core/services/email/template/bidderInvitationTemplate";
import bidderVerificationTemplate from "../core/services/email/template/bidderVerificationTemplate";
import config from "../configs/config";

export class SendEmail {

    // This Email is send when bidder is registered through iNauction Tool Web App
    public static sendBidderVerificationEmail(email: string, verificationCode: string) {

        // set API Key
        sgMail.setApiKey(config.sendGridApiKey);

        // construct needed object for sending the email
        const bidderVerificationMessage = {
            to: email,
            from: 'noreply@inegotio.com',
            subject: 'iNegotio - Confirm Your Registration',
            html: bidderEmailVerificationTemplate.bidderEmailVerification(verificationCode, email),
        };

        //send email
        sgMail.send(bidderVerificationMessage).then(() => {}, error => {
            if (error.response) {
                console.error(error.response.body)
            }
            else {
                console.error(error);
            }
        });

    }

    public static sendBidderInvitationEmail(email: string, code: string) {

        // set API Key
        sgMail.setApiKey(config.sendGridApiKey);

        // construct needed object for sending the email
        const bidderInvitationMessage = {
            to: email,
            from: 'noreply@inegotio.com',
            subject: 'Invitation to register iNegotio Auction Platform',
            html: bidderInvitationTemplate.bidderInvitation(code),

        };

        // send email
        sgMail.send(bidderInvitationMessage).then(() => {}, error => {
            if (error.response) {
                console.error(error.response.body)
            }
            else {
                console.error(error);
            }
        });
    }


    public static sendBidderVerificationStatusEmail(email: string, verificationStatus: string, verificationSubject: string) {

        // set API Key
        sgMail.setApiKey(config.sendGridApiKey);

        // construct needed object for sending the email
        const bidderInvitationMessage = {
            to: email,
            from: 'noreply@inegotio.com',
            subject: verificationSubject,
            html: bidderVerificationTemplate.bidderVerification(verificationStatus, verificationSubject),

        };

        // send email
        sgMail.send(bidderInvitationMessage).then(() => {}, error => {
            if (error.response) {
                console.error(error.response.body)
            }
            else {
                console.error(error);
            }
        });
    }
}