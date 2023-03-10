import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test");

    const quizes = await db
      .collection("quizes")
      .find({ marks: { $exists: true } })
      .sort({ marks: -1 })
      .toArray();

    res.json(quizes);
  } catch (e) {
    console.error(e);
  }
};
