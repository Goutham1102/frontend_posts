import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getAllPostsAPI } from "../services/AllAPI";

function CalendarView() {
    const [posts, setPosts] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await getAllPostsAPI();
            if (response.status === 200) {
                setPosts(response.data);
            }
        };
        fetchPosts();
    }, []);

    const postsOnDate = posts.filter((post) => post.date === selectedDate?.toISOString().split('T')[0]);

    return (
        <div style={{
            maxWidth: '900px',
            margin: '40px auto',
            padding: '0 20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
        }}>
            <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '24px',
                color: '#000'
            }}>
                Calendar
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: selectedDate ? '2fr 1fr' : '1fr',
                gap: '24px',
                alignItems: 'start'
            }}>
                <div style={{
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '20px',
                    background: '#fff'
                }}>
                    <Calendar
                        onClickDay={(date) => setSelectedDate(date)}
                        style={{
                            width: '100%',
                            border: 'none',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                        }}
                    />
                </div>

                {selectedDate && (
                    <div style={{
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        padding: '20px',
                        background: '#fff'
                    }}>
                        <h3 style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            marginBottom: '16px',
                            color: '#000'
                        }}>
                            {selectedDate.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </h3>

                        {postsOnDate.length > 0 ? (
                            <div>
                                {postsOnDate.map((post) => (
                                    <div
                                        key={post.id}
                                        style={{
                                            paddingBottom: '16px',
                                            marginBottom: '16px',
                                            borderBottom: '1px solid #eee'
                                        }}
                                    >
                                        <p style={{
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            marginBottom: '4px',
                                            color: '#000'
                                        }}>
                                            {post.platform}
                                        </p>
                                        <p style={{
                                            fontSize: '14px',
                                            lineHeight: '1.4',
                                            color: '#333',
                                            marginBottom: '8px'
                                        }}>
                                            {post.content}
                                        </p>
                                        {post.image && (
                                            <img
                                                src={post.image}
                                                alt="Post"
                                                style={{
                                                    width: '60px',
                                                    height: '60px',
                                                    objectFit: 'cover',
                                                    borderRadius: '4px',
                                                    border: '1px solid #eee'
                                                }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{
                                fontSize: '13px',
                                color: '#666',
                                textAlign: 'center',
                                padding: '20px 0'
                            }}>
                                No posts scheduled
                            </p>
                        )}
                    </div>
                )}
            </div>

            <style>{`
                .react-calendar {
                    width: 100% !important;
                    border: none !important;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
                }
                
                .react-calendar__tile {
                    padding: 20px 10px !important;
                    font-size: 14px !important;
                }
                
                .react-calendar__month-view__days__day {
                    color: #000 !important;
                }
                
                .react-calendar__tile--active {
                    background: #000 !important;
                    color: #fff !important;
                }
                
                .react-calendar__tile:enabled:hover,
                .react-calendar__tile:enabled:focus {
                    background: #f5f5f5 !important;
                }
                
                .react-calendar__navigation button {
                    font-size: 16px !important;
                    font-weight: 500 !important;
                }
                
                .react-calendar__month-view__weekdays {
                    font-size: 12px !important;
                    font-weight: 500 !important;
                    text-transform: uppercase !important;
                }
            `}</style>
        </div>
    );
}

export default CalendarView;