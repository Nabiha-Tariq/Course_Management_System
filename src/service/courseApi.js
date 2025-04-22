export async function courseApi() {
    try {
      const res = await fetch('http://localhost:5000/api/course/createCourse');
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Failed to fetch course:', err);
    }
  };

  export async function fetchCoursebyId(courseId){
    try {
      const res = await fetch(`http://localhost:5000/api/course/${courseId}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Failed to fetch course:', err);
    }
  }