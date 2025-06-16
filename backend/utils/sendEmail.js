const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient.js");
const fs = require("fs");
const path = require("path");

const sendTemplatedEmail = async ({ to, from, senderName, receiverName, status }) => {
    const htmlTemplatePath = path.join(__dirname, "emailTemplate.html");
    let htmlContent = fs.readFileSync(htmlTemplatePath, "utf8");

    htmlContent = htmlContent
        .replace("{{senderName}}", senderName)
        .replace("{{receiverName}}", receiverName)
        .replace("{{status}}", status);

    const emailParams = new SendEmailCommand({
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: htmlContent,
                },
                Text: {
                    Charset: "UTF-8",
                    Data: `${senderName} has sent you a connection request and marked it as ${status}.`,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "📩 New Connection Request",
            },
        },
        Source: from,
    });

    try {
        return await sesClient.send(emailParams);
    } catch (error) {
        if (error.name === "MessageRejected") {
            return error;
        }
        throw error;
    }
};

module.exports = { sendTemplatedEmail };
