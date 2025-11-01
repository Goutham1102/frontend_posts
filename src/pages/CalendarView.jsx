import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getAllPostsAPI } from "../services/AllAPI";


function CalendarView() {
    const [posts, setPosts] = useState([])
    const [selectedDate, setsSelectedDate] = useState(null)
    useEffect(() => {
        fetchPosts()
    }, [])
    const fetchPosts = async () => {
        const response = await getAllPostsAPI()
        if (response.status === 200) {
            setPosts(response.data)
        }

    }
    const postsOnDate = posts.filter((post) => {
        if (!selectedDate) return false
        //convert eh date to correct format yyyy-mm-dd
        const fullDateTimeString = selectedDate.toISOString()
        const dateParts = fullDateTimeString.split('T')
        const justTheDate = dateParts[0]
        return post.date === justTheDate

    })


    return (
        <div className="max-w-4xl mx-auto p-5">

            <h2 className="text-xl font-semibold mb-6">Calendar</h2>

            {/* calendar side */}
            <div className="grid grid-cols-2 gap-6">
                <div className="border rounded p-5 bg-white">
                    <Calendar onClickDay={(date) => setsSelectedDate(date)} />
                </div>
                {/* {shows the post of selected date} */}
                {selectedDate &&(
                    <div className="border rounded p-5 bg-white">
                        <h3 className="text-sm font-semibold mb-4">
                            {selectedDate.toLocaleDateString()}
                        </h3>
                        {postsOnDate.length >0?
                        
                        //this part to show posts if present
                        (
                            <div>
                                {postsOnDate.map((post)=>(
                                    <div key={post.id} className="mb-4 pb-4 border-b">
                                        <p>{post.platform}</p>
                                        <p>{post.content}</p>
                                        {post.image &&(
                                            <img src={post.image} alt="" className="w-16 h-16 object cover rounded mt-2" />
                                        )}

                                    </div>
                                ))}
                            </div>
                        ):
                        //this to show if there is none
                        (
                            <p className="text-sm text-gray-500 text-center py-5">No posts scheduled</p>
                        )}
                    </div>
                )}
            
            
            </div>

        </div>

    );
}

export default CalendarView;