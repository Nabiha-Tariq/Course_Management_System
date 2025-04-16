
export async function TeacherApi() {
    try {
      const res = await fetch('http://localhost:5000/api/teacher/createTeacher');
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Failed to fetch teacher:', err);
    }
  }