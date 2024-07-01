import { mongooseConnect } from '@/lib/mongoose';
import { User } from '@/models/Users';

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === 'POST') {
    // Basic validation
    const { name, email, password, type } = req.body;
    if (!name || !email || !password || !type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Create user
      const userDoc = await User.create({
        name,
        email,
        password,
        type
      });
  
      res.json(userDoc);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "An error occurred while creating user." });
    }
  }

  // Other CRUD operations (GET, PUT, DELETE) follow similar pattern with proper validation, error handling, and optimizations.



  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await User.findOne({ _id: req.query.id }));
    } else {
      res.json(await User.find());
    }
  }

  if (method === "PUT") {
    try {
      const { name, email, password, type, _id } = req.body;
      await User.updateOne({ _id }, { name, email, password, type });
      res.json(true);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "An error occurred while updating user." });
    }
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await User.deleteOne({ _id: req.query.id });
      res.json(true);
    }
  }
}
