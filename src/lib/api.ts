const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchSalaries(filters: {
  company?: string;
  role?: string;
  level?: string;
  location?: string;
  page?: number;
} = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, String(v)); });
  const res = await fetch(BASE_URL + '/salaries?' + params.toString(), { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch salaries');
  return res.json();
}

export async function fetchCompanyStats() {
  const res = await fetch(BASE_URL + '/salaries/stats', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function fetchCompany(name: string) {
  const res = await fetch(BASE_URL + '/salaries/company/' + name, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch company');
  return res.json();
}

export async function fetchCompanies() {
  const res = await fetch(BASE_URL + '/companies', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch companies');
  return res.json();
}

export async function compareCompanies(companies: string[]) {
  const res = await fetch(BASE_URL + '/companies/compare?companies=' + companies.join(','), { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to compare');
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(BASE_URL + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function register(name: string, email: string, password: string) {
  const res = await fetch(BASE_URL + '/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
}

export async function submitSalary(data: object, token: string) {
  const res = await fetch(BASE_URL + '/salaries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Submission failed');
  return res.json();
}