
export async function studentApi() {
  try {
    const res = await fetch('http://localhost:5000/api/student/createStudent');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Failed to fetch students:', err);
  }
};

export async function fetchStudentbyId(_id){
  try {
    const res = await fetch(`http://localhost:5000/api/student/${_id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Failed to fetch students:', err);
  }
}