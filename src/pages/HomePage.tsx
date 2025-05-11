import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlogContext } from '../context/BlogContext';
import { Button } from '../components/ui/button';

interface Blog {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt?: string;
  date?: string;
  slug: string;
  isPublic?: boolean;
  author?: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { blogs, isAdmin } = useBlogContext();
  
  // Sort blogs by date (newest first), handling both date formats
  const sortedBlogs = [...blogs].sort((a: Blog, b: Blog) => {
    const dateA = a.createdAt || a.date || '';
    const dateB = b.createdAt || b.date || '';
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  // Function to format date from either createdAt or date
  const formatDate = (blog: Blog) => {
    const dateStr = blog.createdAt || blog.date;
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Function to get author name from either authorName or author
  const getAuthor = (blog: Blog) => blog.authorName || blog.author || 'Anonymous';

  // Function to strip HTML tags and get a preview
  const getContentPreview = (content: string) => {
    const strippedContent = content.replace(/<[^>]*>/g, '');
    return strippedContent.length > 150 ? strippedContent.slice(0, 150) + '...' : strippedContent;
  };

  // Split blogs into public and private
  const publicBlogs = sortedBlogs.filter(blog => blog.isPublic);
  const privateBlogs = sortedBlogs.filter(blog => !blog.isPublic);

  return (
    <div className="space-y-8">
      {/* Public Posts Section */}
      <div className="space-y-8">
        {publicBlogs.map(blog => (
          <div key={blog.id} className="bg-card text-card-foreground rounded-lg shadow-lg p-8 border border-primary/10">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
              <div 
                className="prose dark:prose-invert max-w-none mb-6"
                dangerouslySetInnerHTML={{ 
                  __html: blog.content.split('</h1>')[1]?.split('<h2>')[0] || blog.content
                }}
              />
              <div className="flex justify-between items-center mt-8">
                <div className="text-sm text-muted-foreground">
                  <span>By {getAuthor(blog)}</span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(blog)}</span>
                </div>
                <Button 
                  variant="default"
                  onClick={() => navigate(`/post/${blog.slug}`)}
                >
                  Read More
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Private Posts Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-secondary">Latest Posts</h2>
          {!isAdmin && (
            <div className="text-sm text-muted-foreground">
              Login required to read full posts
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {privateBlogs.map(blog => (
            <div key={blog.id} className="bg-card text-card-foreground rounded-lg shadow-sm p-6 flex flex-col h-full group hover:shadow-md transition-all duration-200">
              <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                {blog.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                {formatDate(blog)}
              </p>
              <p className="text-sm mb-4 flex-1 text-muted-foreground">
                {getContentPreview(blog.content)}
              </p>
              <Button 
                variant="default" 
                className="w-full" 
                onClick={() => navigate(isAdmin ? `/post/${blog.slug}` : '/login')}
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