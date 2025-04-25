export async function adminApi() {
    try {
      const res = await fetch('http://localhost:5000/api/admin/createAdmin');
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Failed to fetch admin:', err);
    }
  };