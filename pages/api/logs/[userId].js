import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('tracker');
  const {
    query: { userId, range },
  } = req;

  // /api/logs/[userId]?range=${last1/last7}.
  // "api/logs/3859234758?range=last1"
  var start =
    range === 'last1'
      ? new Date().setHours(0, 0, 0, 0)
      : new Date(new Date().setHours(0, 0, 0, 0) - 6 * 60 * 60 * 24 * 1000);

  switch (req.method) {
    case 'GET': {
      const logs = await db
        .collection('logs')
        .find({
          userId: ObjectId(userId),
          startDateTime: {
            $gte: start,
          },
        })
        .sort({ _id: -1 })
        .toArray();
      res.status(200).json(logs);
    }
    case 'POST': {
      const log = await db.collection('logs').insertOne({
        type: req.body.type,
        startDateTime: new Date(req.body.startDateTime),
        endDateTime: new Date(req.body.endDateTime),
        // resolutionId: ObjectId(req.body.resolutionId),
        userId: ObjectId(userId),
      });
      return res.status(200).json(log);
    }
  }
}
