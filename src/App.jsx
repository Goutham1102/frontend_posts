import { useEffect, useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import AllPost from './pages/AllPost'
import AddPost from './pages/AddPost'
import CalendarView from './pages/CalendarView'
import axios from 'axios'
import Header from './components/Header'

function App() {
  const [posts, setPosts] = useState([]);
  
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 ">
       <Header />  {/* Add the Header component */}

      <Routes>
        <Route path="/" element={<AllPost />} />
        <Route path="/add" element={<AddPost onPostAdded={fetchPosts} />} />
        <Route path="/calendar" element={<CalendarView />} />
      </Routes>
    </div>
  );
}

export default App;