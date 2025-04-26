export async function attendenceApi() {
    try {
      const res = await fetch('http://localhost:5000/api/attendence/createAttendance');
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Failed to fetch course:', err);
    }
  };
