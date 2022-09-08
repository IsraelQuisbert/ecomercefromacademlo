const getConfig = () => ({
    // headers: { Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU5MzczODI1LCJleHAiOjE2NjQ1NTc4MjV9.2dCwe92BRudcp-yT7HkJUyAga0LD7N-c4t4pKs4PP6c'}` }
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export default getConfig;
