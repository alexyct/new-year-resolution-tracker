import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('tracker');
  const { userId } = req.query;
  switch (req.method) {
    case 'GET': {
      const user = await db
        .collection('users')
        .findOne({ _id: ObjectId(userId) });
      return res.status(200).json(user);
    }
  }
}
