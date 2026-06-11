import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Salary from '../models/Salary';
dotenv.config();

const seeds = [
  { company: 'Meta', role: 'Frontend Engineer', level: 'E5', location: 'Bangalore', base: 42, bonus: 7, stock: 20, yearsOfExperience: 7 },
  { company: 'Google', role: 'Software Engineer', level: 'L5', location: 'Hyderabad', base: 40, bonus: 6, stock: 15, yearsOfExperience: 6 },
  { company: 'Microsoft', role: 'Software Engineer', level: 'SDE3', location: 'Hyderabad', base: 35, bonus: 5, stock: 12, yearsOfExperience: 7 },
  { company: 'Uber', role: 'Frontend Engineer', level: 'SWE3', location: 'Bangalore', base: 34, bonus: 5, stock: 13, yearsOfExperience: 6 },
  { company: 'Amazon', role: 'Backend Engineer', level: 'SDE3', location: 'Chennai', base: 32, bonus: 4, stock: 10, yearsOfExperience: 6 },
  { company: 'Meta', role: 'Software Engineer', level: 'E4', location: 'Bangalore', base: 30, bonus: 4.5, stock: 10, yearsOfExperience: 4 },
  { company: 'Adobe', role: 'Frontend Engineer', level: 'MTS3', location: 'Bangalore', base: 28, bonus: 3.8, stock: 9, yearsOfExperience: 5 },
  { company: 'Google', role: 'Software Engineer', level: 'L4', location: 'Bangalore', base: 28, bonus: 4, stock: 8, yearsOfExperience: 3 },
  { company: 'Razorpay', role: 'Backend Engineer', level: 'SDE3', location: 'Bangalore', base: 27, bonus: 3.5, stock: 8.5, yearsOfExperience: 5 },
  { company: 'Uber', role: 'Software Engineer', level: 'SWE2', location: 'Bangalore', base: 26, bonus: 3.5, stock: 9, yearsOfExperience: 4 },
  { company: 'Flipkart', role: 'Backend Engineer', level: 'SDE3', location: 'Bangalore', base: 26, bonus: 3.5, stock: 8, yearsOfExperience: 6 },
  { company: 'Zomato', role: 'Backend Engineer', level: 'SDE3', location: 'Gurgaon', base: 25, bonus: 3.2, stock: 7.5, yearsOfExperience: 5 },
  { company: 'Swiggy', role: 'Frontend Engineer', level: 'SDE3', location: 'Bangalore', base: 24, bonus: 3, stock: 7, yearsOfExperience: 5 },
  { company: 'Microsoft', role: 'Software Engineer', level: 'SDE2', location: 'Bangalore', base: 24, bonus: 3, stock: 6, yearsOfExperience: 4 },
  { company: 'Amazon', role: 'Software Engineer', level: 'SDE2', location: 'Bangalore', base: 22, bonus: 2.5, stock: 5, yearsOfExperience: 3 },
  { company: 'Adobe', role: 'Software Engineer', level: 'MTS2', location: 'Noida', base: 20, bonus: 2.5, stock: 5, yearsOfExperience: 3 },
  { company: 'Razorpay', role: 'Software Engineer', level: 'SDE2', location: 'Bangalore', base: 19, bonus: 2.2, stock: 4.5, yearsOfExperience: 3 },
  { company: 'Flipkart', role: 'Software Engineer', level: 'SDE2', location: 'Bangalore', base: 18, bonus: 2, stock: 4, yearsOfExperience: 3 },
  { company: 'Zomato', role: 'Software Engineer', level: 'SDE2', location: 'Gurgaon', base: 17, bonus: 2, stock: 3.5, yearsOfExperience: 3 },
  { company: 'Swiggy', role: 'Software Engineer', level: 'SDE2', location: 'Bangalore', base: 16, bonus: 1.8, stock: 3, yearsOfExperience: 2 },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('Connected to MongoDB');
  await Salary.deleteMany({});
  const toInsert = seeds.map(s => ({ ...s, totalComp: s.base + s.bonus + s.stock, verified: true }));
  await Salary.insertMany(toInsert);
  console.log('Seeded ' + toInsert.length + ' records');
  await mongoose.disconnect();
}

seed().catch(console.error);