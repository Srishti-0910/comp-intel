export type Salary = {
  id: string;
  name: string;
  company: string;
  level: string;
  role: string;
  location: string;
  base: number;
  bonus: number;
  stock: number;
  total: number;
  experience: number;
  date: string;
};

export const salaries: Salary[] = [
  { id: "1", name: "Anonymous", company: "Google", level: "L4", role: "Software Engineer", location: "Bangalore", base: 2800000, bonus: 400000, stock: 800000, total: 4000000, experience: 3, date: "2024-01-15" },
  { id: "2", name: "Anonymous", company: "Google", level: "L5", role: "Software Engineer", location: "Hyderabad", base: 4000000, bonus: 600000, stock: 1500000, total: 6100000, experience: 6, date: "2024-02-10" },
  { id: "3", name: "Anonymous", company: "Microsoft", level: "SDE2", role: "Software Engineer", location: "Bangalore", base: 2400000, bonus: 300000, stock: 600000, total: 3300000, experience: 4, date: "2024-01-20" },
  { id: "4", name: "Anonymous", company: "Microsoft", level: "SDE3", role: "Software Engineer", location: "Hyderabad", base: 3500000, bonus: 500000, stock: 1200000, total: 5200000, experience: 7, date: "2024-03-05" },
  { id: "5", name: "Anonymous", company: "Amazon", level: "SDE2", role: "Software Engineer", location: "Bangalore", base: 2200000, bonus: 250000, stock: 500000, total: 2950000, experience: 3, date: "2024-02-18" },
  { id: "6", name: "Anonymous", company: "Amazon", level: "SDE3", role: "Backend Engineer", location: "Chennai", base: 3200000, bonus: 400000, stock: 1000000, total: 4600000, experience: 6, date: "2024-01-30" },
  { id: "7", name: "Anonymous", company: "Meta", level: "E4", role: "Software Engineer", location: "Bangalore", base: 3000000, bonus: 450000, stock: 1000000, total: 4450000, experience: 4, date: "2024-03-12" },
  { id: "8", name: "Anonymous", company: "Meta", level: "E5", role: "Frontend Engineer", location: "Bangalore", base: 4200000, bonus: 700000, stock: 2000000, total: 6900000, experience: 7, date: "2024-02-25" },
  { id: "9", name: "Anonymous", company: "Flipkart", level: "SDE2", role: "Software Engineer", location: "Bangalore", base: 1800000, bonus: 200000, stock: 400000, total: 2400000, experience: 3, date: "2024-01-10" },
  { id: "10", name: "Anonymous", company: "Flipkart", level: "SDE3", role: "Backend Engineer", location: "Bangalore", base: 2600000, bonus: 350000, stock: 800000, total: 3750000, experience: 6, date: "2024-03-20" },
  { id: "11", name: "Anonymous", company: "Swiggy", level: "SDE2", role: "Software Engineer", location: "Bangalore", base: 1600000, bonus: 180000, stock: 300000, total: 2080000, experience: 2, date: "2024-02-05" },
  { id: "12", name: "Anonymous", company: "Swiggy", level: "SDE3", role: "Frontend Engineer", location: "Bangalore", base: 2400000, bonus: 300000, stock: 700000, total: 3400000, experience: 5, date: "2024-01-25" },
  { id: "13", name: "Anonymous", company: "Zomato", level: "SDE2", role: "Software Engineer", location: "Gurgaon", base: 1700000, bonus: 200000, stock: 350000, total: 2250000, experience: 3, date: "2024-03-01" },
  { id: "14", name: "Anonymous", company: "Zomato", level: "SDE3", role: "Backend Engineer", location: "Gurgaon", base: 2500000, bonus: 320000, stock: 750000, total: 3570000, experience: 5, date: "2024-02-15" },
  { id: "15", name: "Anonymous", company: "Uber", level: "SWE2", role: "Software Engineer", location: "Bangalore", base: 2600000, bonus: 350000, stock: 900000, total: 3850000, experience: 4, date: "2024-01-05" },
  { id: "16", name: "Anonymous", company: "Uber", level: "SWE3", role: "Frontend Engineer", location: "Bangalore", base: 3400000, bonus: 500000, stock: 1300000, total: 5200000, experience: 6, date: "2024-03-18" },
  { id: "17", name: "Anonymous", company: "Adobe", level: "MTS2", role: "Software Engineer", location: "Noida", base: 2000000, bonus: 250000, stock: 500000, total: 2750000, experience: 3, date: "2024-02-20" },
  { id: "18", name: "Anonymous", company: "Adobe", level: "MTS3", role: "Frontend Engineer", location: "Bangalore", base: 2800000, bonus: 380000, stock: 900000, total: 4080000, experience: 5, date: "2024-01-18" },
  { id: "19", name: "Anonymous", company: "Razorpay", level: "SDE2", role: "Software Engineer", location: "Bangalore", base: 1900000, bonus: 220000, stock: 450000, total: 2570000, experience: 3, date: "2024-03-08" },
  { id: "20", name: "Anonymous", company: "Razorpay", level: "SDE3", role: "Backend Engineer", location: "Bangalore", base: 2700000, bonus: 350000, stock: 850000, total: 3900000, experience: 5, date: "2024-02-12" },
];

export const companies = [...new Set(salaries.map(s => s.company))];
export const roles = [...new Set(salaries.map(s => s.role))];
export const locations = [...new Set(salaries.map(s => s.location))];
export const levels = [...new Set(salaries.map(s => s.level))];