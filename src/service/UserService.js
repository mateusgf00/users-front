export default {
  create: async (user) => {
      const req = await fetch("http://localhost:3000/users/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: user
      })
      const res = await req.json();
      return res;
  },
  findAll: async () => {
    const req = await fetch("http://localhost:3000/users/")
    const data = await req.json();

    return data;
  },
  delete: async (user) => {
    const req = await fetch(`http://localhost:3000/users/${user._id}`,{
    method: "DELETE"
  });
  const data = await req.json();

  return data;
  },
  update: async(id, user) => {
    console.log(id, user)
      await fetch(`http://localhost:3000/users/${id}`,{
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: user
    });
  }
}