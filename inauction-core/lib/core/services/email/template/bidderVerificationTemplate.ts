function bidderVerificationTemplate (verificationStatus, verificationSubject) {

    let content;

    if (verificationStatus === 1) {

        content = '' +
            '<p style="margin-bottom: 6px;font-weight: bold;"> Dear user,</p>' +
            '<p style="margin-bottom: 6px;line-height: 20px;">' +
                'Kindly note that we have checked the information you have provided ' +
                'and we are pleased to inform you that your account has been verified. \n' +
            '</p>' +
            '<p style="margin-bottom: 6px;line-height: 20px;">' +
                'You will have full access to our platform and our services and will be invited for all future events that will be published by iNegotio and its clients.' +
            '</p>' +
            '<p style="margin-bottom: 6px;line-height: 20px;">' +
                'Welcome and enjoy our services...' +
            '</p>' +
            '<p style="margin-bottom: 6px;line-height: 20px;">' +
                'Kind regards,' +
            '</p>' +
            '<p style="margin-bottom: 6px;line-height: 20px;">' +
                'iNegotio Team' +
            '</p>' +
            '<p style="margin-bottom: 6px;line-height: 20px;">' +
                'For any queries do not hesitate to contact us.' +
            '</p>';
    }
    else if (verificationStatus === 2) {

        content = '' +
            '<p style="margin-bottom: 6px;font-weight: bold;"> Dear user,</p>' +
            '<p style="margin-bottom: 6px;line-height: 20px;">' +
                'Kindly note that our team has verified the data provided by you and it seems that the information is not correct and true.' +
            '</p>' +
            '<p style="margin-bottom: 6px;line-height: 20px;">' +
                'Therefore, we have blocked you account until further notice or until you will clarify and verify your account details.' +
            '<p style="margin-bottom: 6px;line-height: 20px;">' +
                'Thank you for your understanding.' +
            '</p>' +
            '<p style="margin-bottom: 6px;line-height: 20px;">' +
                'Kind regards,' +
            '</p>' +
            '<p style="margin-bottom: 6px;line-height: 20px;">' +
                'iNegotio Team' +
            '</p>'
    }

    else {

        content = '' +
            '<p style="margin-bottom: 6px;font-weight: bold;"> Dear user,</p>' +
            '<p style="margin-bottom: 6px;line-height: 20px;">' +
                'Kindly note that our team has checked the data provided by you but however we need more information in order to fully verify your account.' +
            '</p>' +
            '<p style="margin-bottom: 6px;line-height: 20px;">' +
                'Please provide us with:' +
            '</p>' +
            '<p style="margin-bottom: 6px;line-height: 20px;">' +
                '1. Copy of Registration Certificate of the Company.' +
            '</p>' +
            '<p style="margin-bottom: 6px;line-height: 20px;">' +
                '2. Copy of your ID' +
            '</p>' +
            '<p style="margin-bottom: 6px;line-height: 20px;">' +
                '3...' +
            '</p>' +
            '<p style="margin-bottom: 6px;line-height: 20px;">' +
                'Thank you for your understanding.' +
            '</p>' +
            '<p style="margin-bottom: 6px;line-height: 20px;">' +
                'Kind regards,' +
            '</p>' +
            '<p style="margin-bottom: 6px;line-height: 20px;">' +
                'iNegotio Team' +
            '</p>'
    }

    return '<table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;font-family:Microsoft Yahei,Arial,Helvetica,sans-serif;padding:0;margin:0;color:#333;background-color:#f7f7f7;background-repeat:repeat-x;background-position:bottom left">\n' +
        '\t<tbody><tr>\n' +
        '\t<td>\n' +
        '\t<table width="600" border="0" align="center" cellpadding="0" cellspacing="0">\n' +
        '<tbody><tr>\n' +
        '<td align="center" valign="middle" style="padding: 15px 0 10px 0;"><a href="https://www.inegotio.com/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.inegotio.com/&amp;source=gmail&amp;ust=1558299288677000&amp;usg=AFQjCNGdDHhHYbYBotFh49IqZ3bdHsE6EQ"><img src="https://inegotio.com/static/media/inauction_logo.b28ece6f.png" width="auto" height="60" alt="inegotio" style="border:0" class="CToWUd"></a></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td>\n' +
        '<div style="padding:0 30px;background:#fff">\n' +
        '<table width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
        '<tbody><tr>\n' +
        '<td style="border-bottom:1px solid #e6e6e6;font-size:18px;padding:20px 0">\n' +
        '\t<table border="0" cellspacing="0" cellpadding="0" width="100%">\n' +
        '\t<tbody><tr>\n' +
        '\t\t<td>'+verificationSubject+'</td>\n' +
        '\t\t<td>\n' +
        '\n' +
        '\t\t</td>\n' +
        '\t\t</tr>\n' +
        '\t</tbody></table>\n' +
        '\t </td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td style="font-size:14px;line-height:30px;padding: 0px 0 20px 0;color: #999;border-bottom: 1px solid gray;">' +
        ''+content+'' +
        '</td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '\n' +
        '<td style="font-size:12px;line-height:25px;padding:20px 0 10px 0;color:#666;font-weight:bolder"> \n' +
        '<span style="font-size:14px;color:#24aa88">4 Security Tips:</span><br>\n' +
        '* DO NOT give <span class="il">your</span> password to anyone!<br>\n' +
        '* DO NOT call any phone number for someone claiming to be iNegotio Support!<br>\n' +
        '* DO NOT send any money to anyone claiming to be a member of iNegotio!<br>\n' +
        '* Make sure you are visiting "<a href="https://www.inegotio.com" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.inegotio.com&amp;source=gmail&amp;ust=1558299288677000&amp;usg=AFQjCNGFR-mvRb_TOzXfw1PCxrfyQyRPmQ">https://www.inegotio.com</a>"!<br>\n' +
        '</td><td>\n' +
        '</td></tr>\n' +
        '<tr>\n' +
        '<td style="padding:20px 0 0 0;line-height:26px;color:#666">If this activity is not <span class="il">your</span> own operation, please contact us immediately.</td>\n' +
        '</tr>\n' +
        '\t\t\t\t\t\t  <tr>\n' +
        '\t\t\t\t\t\t  <td> <a style="color:#e9b434" href="https://https://inegotio.com/support/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://https://inegotio.com/support/&amp;source=gmail&amp;ust=1558299288677000&amp;usg=AFQjCNGAHamBdk00RYT4Qastv33p8SoFMg">https://inegotio.com/support<wbr></a></td>\n' +
        '\t\t\t\t\t\t  </tr>\n' +
        '<tr>\n' +
        '<td style="padding:30px 0 15px 0;font-size:12px;color:#999;line-height:20px">iNegotio Team<br>Automated message.please do not reply</td>\n' +
        '</tr>\n' +
        '</tbody></table>\n' +
        '</div>\n' +
        '</td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td align="center" style="font-size:12px;color:#999;padding:20px 0">© 2021 iNegotio.com All Rights Reserved<br>URL: <a style="color:#999;text-decoration:none" href="https://www.inegotio.com/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.inegotio.com/&amp;source=gmail&amp;ust=1558299288677000&amp;usg=AFQjCNGdDHhHYbYBotFh49IqZ3bdHsE6EQ">www.inegotio.com</a>&nbsp;&nbsp;E-mail: <a href="mailto:support@inegotio.com" style="color:#999;text-decoration:none" target="_blank">support@inegotio.com</a></td>\n' +
        '</tr>\n' +
        '</tbody></table>\n' +
        '</td>\n' +
        '</tr>\n' +
        '</tbody></table>';
}

export = { bidderVerification: bidderVerificationTemplate };