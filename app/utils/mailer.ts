import cron from "node-cron";
import Revision from "@/models/revision.model";
import sendMail from "./sendMail";

cron.schedule("0 * * * *", async () => { // runs every hour
  const today = new Date();
  const revisions = await Revision.find({
    "revisionDates.date": today,
    "revisionDates.completed": false
  });

  revisions.forEach(r => {
    sendMail(r.userId.email, `Time to revise: ${r.topic}`);
  });
});
