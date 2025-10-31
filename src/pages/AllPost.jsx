import { jsPDF } from "jspdf";
import React, { useEffect, useState } from "react";
import { deletePostAPI, getAllPostsAPI } from "../services/AllAPI";
import { useNavigate } from "react-router-dom";

function AllPost() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ platform: "", date: "" });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await getAllPostsAPI();
            if (response.status === 200) {
                setPosts(response.data);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
            alert("Failed to fetch posts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (!confirmDelete) return;

        try {
            await deletePostAPI(id);
            setPosts((prev) => prev.filter((p) => p.id !== id));
            alert("Post deleted successfully");
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete post");
        }
    };

    const handleEdit = (post) => {
        navigate("/add", { state: { post } });
    };

    const filtered = posts.filter(
        (p) =>
            (filter.platform ? p.platform === filter.platform : true) &&
            (filter.date ? p.date === filter.date : true)
    );

    const generatePDF = () => {
        if (posts.length === 0) {
            alert("No posts to export");
            return;
        }

        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("Scheduled Posts Report", 105, 20, { align: "center" });

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
        doc.text(`Total Posts: ${posts.length}`, 14, 36);

        doc.setLineWidth(0.5);
        doc.line(14, 40, 196, 40);

        let yPosition = 50;

        posts.forEach((post, index) => {
            if (yPosition > 270) {
                doc.addPage();
                yPosition = 20;
            }

            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text(`${index + 1}. ${post.platform}`, 14, yPosition);

            doc.setFontSize(9);
            doc.setFont("helvetica", "italic");
            doc.setTextColor(100, 100, 100);
            doc.text(`Scheduled: ${post.date}`, 14, yPosition + 5);

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(0, 0, 0);
            const contentLines = doc.splitTextToSize(post.content, 180);
            doc.text(contentLines, 14, yPosition + 12);

            if (post.image) {
                doc.setFontSize(9);
                doc.setTextColor(0, 128, 0);
                doc.text("Image attached", 14, yPosition + 12 + (contentLines.length * 5) + 3);
            }

            const lineY = yPosition + 12 + (contentLines.length * 5) + 8;
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.3);
            doc.line(14, lineY, 196, lineY);

            yPosition = lineY + 10;
        });

        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: "center" });
        }

        doc.save(`scheduled_posts_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    const clearFilters = () => {
        setFilter({ platform: "", date: "" });
    };

    if (loading) {
        return (
            <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
                <p style={{ color: '#666', textAlign: 'center' }}>Loading...</p>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '800px',
            margin: '40px auto',
            padding: '0 20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
        }}>
            <h1 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '32px',
                color: '#000'
            }}>
                Scheduled Posts
            </h1>

            <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '24px',
                flexWrap: 'wrap'
            }}>
                <button
                    onClick={generatePDF}
                    style={{
                        padding: '8px 16px',
                        border: '1px solid #ddd',
                        background: '#fff',
                        cursor: 'pointer',
                        fontSize: '14px',
                        borderRadius: '4px'
                    }}
                    onMouseOver={(e) => e.target.style.background = '#f5f5f5'}
                    onMouseOut={(e) => e.target.style.background = '#fff'}
                >
                    Export PDF
                </button>

                <button
                    onClick={() => navigate("/")}
                    style={{
                        padding: '8px 16px',
                        border: '1px solid #ddd',
                        background: '#fff',
                        cursor: 'pointer',
                        fontSize: '14px',
                        borderRadius: '4px'
                    }}
                    onMouseOver={(e) => e.target.style.background = '#f5f5f5'}
                    onMouseOut={(e) => e.target.style.background = '#fff'}
                >
                    Refresh
                </button>
            </div>

            <div style={{
                marginBottom: '24px',
                padding: '16px',
                background: '#fafafa',
                borderRadius: '4px'
            }}>
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    <select
                        style={{
                            padding: '8px 12px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px',
                            background: '#fff'
                        }}
                        value={filter.platform}
                        onChange={(e) => setFilter((f) => ({ ...f, platform: e.target.value }))}
                    >
                        <option value="">All platforms</option>
                        <option value="Instagram">Instagram</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Twitter">Twitter</option>
                        <option value="Facebook">Facebook</option>
                    </select>

                    <input
                        type="date"
                        style={{
                            padding: '8px 12px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px',
                            background: '#fff'
                        }}
                        value={filter.date}
                        onChange={(e) => setFilter((f) => ({ ...f, date: e.target.value }))}
                    />

                    {(filter.platform || filter.date) && (
                        <button
                            onClick={clearFilters}
                            style={{
                                fontSize: '13px',
                                color: '#666',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            Clear
                        </button>
                    )}

                    <span style={{
                        fontSize: '13px',
                        color: '#666',
                        marginLeft: 'auto'
                    }}>
                        {filtered.length} of {posts.length}
                    </span>
                </div>
            </div>

            {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                    <p style={{ color: '#666', marginBottom: '16px' }}>
                        {posts.length === 0 ? "No posts yet" : "No matching posts"}
                    </p>
                    {posts.length === 0 && (
                        <button
                            onClick={() => navigate("/add")}
                            style={{
                                padding: '8px 16px',
                                border: '1px solid #000',
                                background: '#000',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: '14px',
                                borderRadius: '4px'
                            }}
                        >
                            Create post
                        </button>
                    )}
                </div>
            ) : (
                <div>
                    {filtered.map((post) => (
                        <div
                            key={post.id}
                            style={{
                                padding: '20px',
                                borderBottom: '1px solid #eee',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start'
                            }}
                        >
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    display: 'flex',
                                    gap: '12px',
                                    marginBottom: '8px',
                                    alignItems: 'center'
                                }}>
                                    <span style={{
                                        fontSize: '13px',
                                        fontWeight: '500',
                                        color: '#000'
                                    }}>
                                        {post.platform}
                                    </span>
                                    <span style={{
                                        fontSize: '13px',
                                        color: '#999'
                                    }}>
                                        {post.date}
                                    </span>
                                </div>

                                <p style={{
                                    fontSize: '15px',
                                    lineHeight: '1.5',
                                    color: '#333',
                                    marginBottom: '12px'
                                }}>
                                    {post.content}
                                </p>

                                {post.image && (
                                    <img
                                        src={post.image}
                                        alt="preview"
                                        style={{
                                            width: '120px',
                                            height: '120px',
                                            objectFit: 'cover',
                                            borderRadius: '4px',
                                            border: '1px solid #eee'
                                        }}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                )}
                            </div>

                            <div style={{
                                display: 'flex',
                                gap: '8px',
                                marginLeft: '16px'
                            }}>
                                <button
                                    onClick={() => handleEdit(post)}
                                    style={{
                                        fontSize: '13px',
                                        color: '#666',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    style={{
                                        fontSize: '13px',
                                        color: '#666',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AllPost;