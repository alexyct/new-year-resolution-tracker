import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('tracker');
  const { userId } = req.query;
  switch (req.method) {
    case 'GET': {
      const resolutions = await db
        .collection('resolutions')
        .find({ userId: ObjectId(userId) })
        .toArray();
      return res.status(200).json(resolutions);
    }
  }
}
