export default async function UserData() {
  try {
    const res = await fetch('https://api.enxsis.com/api/v1/users');
    const data = await res.json();
    // console.log('=======>>>>. the ddata', data.data.users.length);
    return data;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
}
