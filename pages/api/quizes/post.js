import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const { id } = req.query;
    const { marks } = req.body;

    const post = await db.collection("quizes").updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          marks: marks,
        },
      }
    );

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};