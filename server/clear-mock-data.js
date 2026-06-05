import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User.js';
import { Order } from './models/Order.js';
import { Message } from './models/Message.js';

dotenv.config();

async function clearMocks() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dawai_ghor');
    console.log('Connected to MongoDB');

    // Delete mock messages
    const msgResult = await Message.deleteMany({ id: { $in: ['msg-001', 'msg-002', 'msg-003', 'msg-004'] } });
    console.log(`Deleted ${msgResult.deletedCount} mock messages`);

    // Delete mock orders
    const orderResult = await Order.deleteMany({ id: { $in: ['ORD-2025-001', 'ORD-2025-002', 'ORD-2025-003', 'ORD-2025-004', 'ORD-2025-005', 'ORD-2025-006'] } });
    console.log(`Deleted ${orderResult.deletedCount} mock orders`);

    // Delete mock users
    const userResult = await User.deleteMany({ id: { $in: ['user-001', 'user-002', 'user-003', 'user-004', 'user-005', 'user-006'] } });
    console.log(`Deleted ${userResult.deletedCount} mock users`);

    console.log('Mock data cleared successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

clearMocks();
