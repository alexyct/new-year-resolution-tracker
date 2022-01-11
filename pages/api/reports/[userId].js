import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('tracker');
  const { userId } = req.query;
  const week = new Date(req.query.week + 'T00:00:00.000Z');

  // /api/reports/[userId]?week=${2021-01-03}.
  switch (req.method) {
    case 'GET': {
      const report = await db
        .collection('reports')
        .find({
          userId: ObjectId(userId),
          week: week,
        })
        .toArray();

      const logs = await db
        .collection('logs')
        .find({
          userId: ObjectId(userId),
          startDateTime: {
            $gte: week,
          },
          endDateTime: {
            $lte: new Date(week.setDate(week.getDate() + 7)),
          },
        })
        .sort({ _id: -1 })
        .toArray();

      return res.status(200).json({ logs, report });
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
