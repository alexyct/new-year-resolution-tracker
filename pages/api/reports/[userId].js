import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("tracker");
  const {
    query: { userId, type },
  } = req;

  // /api/logs/[userId]?type=${latest/all}.
  switch (req.method) {
    case "GET": {
      if (type === "latest") {
        const reports = await db
          .collection("reports")
          .find({ userId: ObjectId(userId) })
          .sort({ _id: -1 })
          .limit(1);
        return res.status(200).json(reports);
      } else {
        const reports = await db
          .collection("reports")
          .find({ userId: ObjectId(userId) })
          .sort({ _id: -1 })
          .toArray();
        return res.status(200).json(reports);
      }
    }
    case "POST": {
      const log = await db.collection("reports").insertOne({
        userId: ObjectId(userId),
        resolutionId: ObjectId(req.body.resolutionId),
        progress: req.body.progress,
        insights: req.body.insights,
        dateCreated: new Date(),
      });
      return res.status(200).json(log);
    }
    case "PATCH": {
      const report = await db
        .collection("reports")
        .findOneAndUpdate(
          { _id: ObjectId(req.body.reportId) },
          { $set: { memo: req.body.memo } }
        );

      return res.status(200).json(report);
    }
  }
}
