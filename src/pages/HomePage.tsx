import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlogContext } from '../context/BlogContext';
import { Button } from '../components/ui/button';

// Define Blog type directly in this file
interface Blog {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { blogs, isAdmin } = useBlogContext();
  
  // Sort blogs by date (newest first)
  const sortedBlogs = [...blogs].sort((a: Blog, b: Blog) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  // Handle read more click
  const handleReadMore = (id: string) => {
    if (!isAdmin) {
      navigate('/login'); // Updated to new login path
      return;
    }
    navigate(`/post/${id}`);
  };
  
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold ">Welcome to Our Blog</h1>
        
        <p className="text-lg text-muted-foreground">
          Explore our latest articles on web development, design trends, and technology insights.
          Our team of experts shares knowledge and best practices to help you stay updated with
          the rapidly evolving tech landscape.
        </p>

        {!isAdmin && (
          <div className="bg-muted/20 p-4 rounded-md border border-muted">
            <p className="text-muted-foreground">
              <strong>Note:</strong> You need to login to read the full blog posts. Click on "Read More" to login.
            </p>
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-secondary border-b pb-2">Latest Posts</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedBlogs.map(blog => (
            <div key={blog.id} className="bg-card text-card-foreground rounded-lg shadow-sm p-6 flex flex-col">
              <h3 className="font-semibold text-xl mb-2">{blog.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{blog.createdAt}</p>
              <p className="text-sm mb-4 flex-1">{blog.content}</p>
              <Button 
                variant="default" 
                className="w-full" 
                onClick={() => handleReadMore(blog.id)}
              >
                {isAdmin ? 'Read More' : 'Login to Read'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;