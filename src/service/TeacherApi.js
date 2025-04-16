
export async function teacherApi() {
  try {
    const res = await fetch('http://localhost:5000/api/teacher/createTeacher');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Failed to fetch teacher:', err);
  }
};

export async function fetchTeacherbyId(_id){
  try {
    const res = await fetch(`http://localhost:5000/api/teacher/${_id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Failed to fetch teachers:', err);
  }
}