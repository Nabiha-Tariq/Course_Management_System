export async function courseRegApi() {
    try {
      const res = await fetch('http://localhost:5000/api/Course_Register/createRegister');
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Failed to fetch students:', err);
    }
  };