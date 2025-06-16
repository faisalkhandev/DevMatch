const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const { ConnectionRequest } = require("../model/connectionRequest.model");
const { sendTemplatedEmail } = require("./sendEmail");

cron.schedule("0 10 * * *", async () => {
    const yesterday = subDays(new Date(), 1);
    const startOfYesterday = startOfDay(yesterday);
    const endOfYesterday = endOfDay(yesterday);

    try {
        const interestedRequestsFromYesterday = await ConnectionRequest.find({
            status: "interested",
            createdAt: {
                $gte: startOfYesterday,
                $lt: endOfYesterday,
            },
        }).populate([
            { path: "senderId", select: "firstName lastName emailId" },
            { path: "receiverId", select: "firstName lastName emailId" },
        ]);

        console.log(
            "Interested requests from yesterday:",
            interestedRequestsFromYesterday.length
        );

        // Track unique receiver emails to avoid duplicates
        const sentEmails = new Set();

        for (const req of interestedRequestsFromYesterday) {
            const receiverEmail = req.receiverId?.emailId;
            const senderName = `${req.senderId?.firstName} ${req.senderId?.lastName}`;
            const receiverName = `${req.receiverId?.firstName} ${req.receiverId?.lastName}`;
            const status = req.status;

            // Skip if already sent to this receiver
            if (!receiverEmail || sentEmails.has(receiverEmail)) continue;
            sentEmails.add(receiverEmail);

            // AWS SES is currently in Sandbox mode, so emails can only be sent to addresses that have been verified in SES.
            // you have to request for the production Access then i can be able to send the email to anyone. 

            try {
                await sendTemplatedEmail({
                    to: 'khanfai900@gmail.com',
                    from: 'contact@devmatching.faisalkhandev.com',
                    senderName,
                    receiverName,
                    status,
                });

                console.log(`✅ Email sent to ${receiverEmail}`);
            } catch (err) {
                console.error(`❌ Failed to send email to ${receiverEmail}:`, err.message);
            }
        }

    } catch (error) {
        console.error("🔥 Error in scheduled task:", error);
    }
});
