import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { turnDataToTableFormat, generateInsights } from '@/lib/utils';

export default async function handler(req, res) {
  const client = await clientPromise;

  const db = client.db('tracker');
  const { userId } = req.query;
  const week = new Date(req.query.week + 'T00:00:00.000Z');
  const endDate = new Date(req.query.week + 'T00:00:00.000Z');
  new Date(endDate.setDate(endDate.getDate() + 7));

  // /api/reports/[userId]?week=YYYY-MM-DD.
  switch (req.method) {
    case 'GET': {
      const report = await db
        .collection('reports')
        .find({
          userId: ObjectId(userId),
          week: week,
        })
        .project({ memo: 1 })
        .toArray();

      const resolution = await db.collection('resolutions').findOne({
        userId: ObjectId(userId),
      });

      const logs = await db
        .collection('logs')
        .find({
          userId: ObjectId(userId),
          startDateTime: {
            $gt: week,
          },
          endDateTime: {
            $lte: endDate,
          },
        })
        .sort({ startDateTime: -1 })
        .toArray();

      const table = turnDataToTableFormat(logs, resolution);
      const insights = generateInsights(logs);
      const memo = report[0].memo;

      return res.status(200).json({ table, insights, memo });
    }
    case 'POST': {
      const report = await db.collection('reports').insertOne({
        userId: ObjectId(userId),
        week: week,
        // resolutionId: ObjectId(req.body.resolutionId),
      });
      return res.status(200).json(report);
    }
    case 'PATCH': {
      const report = await db
        .collection('reports')
        .findOneAndUpdate(
          { userId: ObjectId(userId), week: week },
          { $set: { memo: req.body.memo } }
        );

      return res.status(200).json(report);
    }
  }
}
