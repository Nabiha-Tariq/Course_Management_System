export async function marksApi() {
    try {
      const res = await fetch('http://localhost:5000/api/marks/createMarks');
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Failed to fetch admin:', err);
    }
  };