import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { User } from './models/User.js';
import { Product } from './models/Product.js';
import { Order } from './models/Order.js';
import { Message } from './models/Message.js';
import { CarouselSlide } from './models/CarouselSlide.js';
import { Wishlist } from './models/Wishlist.js';

dotenv.config();

const DEFAULT_USERS = [
  { id: 'admin-001', name: 'Admin User', email: 'admin@dawai.com', phone: '+880 1711 000000', role: 'admin', joinedAt: '2024-01-01', address: 'DawaiGhor HQ, Dhaka', isActive: true },
  { id: 'user-001', name: 'Rahim Uddin', email: 'rahim@example.com', phone: '+880 1712 123456', role: 'user', joinedAt: '2024-06-15', address: 'Mirpur, Dhaka', isActive: true },
  { id: 'user-002', name: 'Fatema Begum', email: 'fatema@example.com', phone: '+880 1713 234567', role: 'user', joinedAt: '2024-08-22', address: 'Gulshan, Dhaka', isActive: true },
  { id: 'user-003', name: 'Karim Ahmed', email: 'karim@example.com', phone: '+880 1714 345678', role: 'user', joinedAt: '2024-10-05', address: 'Dhanmondi, Dhaka', isActive: false },
  { id: 'user-004', name: 'Nasrin Khatun', email: 'nasrin@example.com', phone: '+880 1715 456789', role: 'user', joinedAt: '2024-11-18', address: 'Uttara, Dhaka', isActive: true },
  { id: 'user-005', name: 'Shahin Alam', email: 'shahin@example.com', phone: '+880 1716 567890', role: 'user', joinedAt: '2025-01-10', address: 'Mohammadpur, Dhaka', isActive: true },
  { id: 'user-006', name: 'Roksana Parvin', email: 'roksana@example.com', phone: '+880 1717 678901', role: 'user', joinedAt: '2025-02-20', address: 'Wari, Dhaka', isActive: true },
];

const DEFAULT_ORDERS = [];

const DEFAULT_MESSAGES = [];

const DEFAULT_CAROUSEL = [
  { id: 'slide-001', title: 'Your Health, Just a Click Away', subtitle: 'Get instant medical advice from our AI Doctor and order 100% authentic medicines.', image: '/images/hero_ai_health.png', badge: 'Premium Care', ctaText: 'Consult AI Doctor', ctaLink: '/ai-doctor', active: true, order: 0 },
  { id: 'slide-002', title: 'Fast Doorstep Delivery', subtitle: 'Get your medicines delivered directly to your home within 24-48 hours.', image: '/images/hero_delivery.png', badge: 'Quick Delivery', ctaText: 'Shop Now', ctaLink: '/products', active: true, order: 1 },
  { id: 'slide-003', title: '100% Authentic Medicines', subtitle: 'All products are verified and sourced directly from reputable manufacturers.', image: '/images/hero_authentic.png', badge: 'Trusted Quality', ctaText: 'Browse Products', ctaLink: '/products', active: true, order: 2 },
];

const MOCK_PRODUCTS = [
  {
    id: 'prod-001',
    name: 'Napa Extend 665mg',
    price: 1.5,
    originalPrice: 2.0,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=60',
    category: 'OTC',
    description: 'Napa Extend is used for the treatment of mild to moderate pain and fever.',
    brand: 'Beximco',
    stock: 100,
    rating: 4.8,
    reviewCount: 125,
    dosage: '665mg',
    activeIngredient: 'Paracetamol',
    requiresPrescription: false,
    inStock: true,
    tags: ['painkiller', 'fever']
  },
  {
    id: 'prod-002',
    name: 'Seclo 20mg',
    price: 5.0,
    originalPrice: 6.0,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=60',
    category: 'Prescription',
    description: 'Used for treating stomach ulcers and acid reflux.',
    brand: 'Square',
    stock: 50,
    rating: 4.5,
    reviewCount: 89,
    dosage: '20mg',
    activeIngredient: 'Omeprazole',
    requiresPrescription: true,
    inStock: true,
    tags: ['gastric', 'ulcer']
  },
  {
    id: 'prod-003',
    name: 'Fexo 120mg',
    price: 3.5,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=60',
    category: 'OTC',
    description: 'Non-drowsy antihistamine for allergies and hay fever.',
    brand: 'Square',
    stock: 200,
    rating: 4.7,
    reviewCount: 45,
    dosage: '120mg',
    activeIngredient: 'Fexofenadine',
    requiresPrescription: false,
    inStock: true,
    tags: ['allergy', 'antihistamine']
  },
  {
    id: 'prod-004',
    name: 'Azithromycin 500mg',
    price: 8.0,
    originalPrice: 10.0,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=60',
    category: 'Antibiotics',
    description: 'Broad-spectrum antibiotic used to treat bacterial infections.',
    brand: 'Incepta',
    stock: 30,
    rating: 4.9,
    reviewCount: 210,
    dosage: '500mg',
    activeIngredient: 'Azithromycin',
    requiresPrescription: true,
    inStock: true,
    tags: ['antibiotic', 'infection']
  },
  {
    id: 'prod-005',
    name: 'Ceevit 250mg',
    price: 2.0,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=60',
    category: 'Vitamins',
    description: 'Vitamin C supplement to boost immunity and skin health.',
    brand: 'Square',
    stock: 500,
    rating: 4.6,
    reviewCount: 340,
    dosage: '250mg',
    activeIngredient: 'Ascorbic Acid',
    requiresPrescription: false,
    inStock: true,
    tags: ['vitamin', 'immunity']
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('Clearing old data...');
    await User.deleteMany({});
    await Order.deleteMany({});
    await Message.deleteMany({});
    await CarouselSlide.deleteMany({});
    await Product.deleteMany({});
    await Wishlist.deleteMany({});

    console.log('Inserting default data...');
    await User.insertMany(DEFAULT_USERS);
    await Order.insertMany(DEFAULT_ORDERS);
    await Message.insertMany(DEFAULT_MESSAGES);
    await CarouselSlide.insertMany(DEFAULT_CAROUSEL);
    await Product.insertMany(MOCK_PRODUCTS);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
