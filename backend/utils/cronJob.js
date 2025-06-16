const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const { ConnectionRequest } = require("../model/connectionRequest.model");
const { sendTemplatedEmail } = require("./sendEmail");

cron.schedule("0 16 * * *", async () => {
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

        for (const request of interestedRequestsFromYesterday) {
            const receiverEmail = request.receiverId?.emailId;
            const senderName = `${request.senderId?.firstName} ${request.senderId?.lastName}`;
            const receiverName = `${request.receiverId?.firstName} ${request.receiverId?.lastName}`;

            if (!receiverEmail) continue;

            try {
                await sendTemplatedEmail({
                    to: receiverEmail,
                    from: 'khanfai900@gmail.com',
                    senderName,
                    receiverName,
                    status: request.status,
                });

                console.log(`Email sent to ${receiverEmail}`);
            } catch (err) {
                console.error(`Failed to send email to ${receiverEmail}:`, err.message);
            }
        }
    } catch (error) {
        console.log("Error in scheduled task:", error);
    }
});
