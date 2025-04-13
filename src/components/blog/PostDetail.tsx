import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBlogContext } from '../../context/BlogContext';
import { Button } from '../ui/button';
import Login from '../../pages/Login';
import { Calendar, Clock, Edit, Trash2, User, Share2, Shield } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

interface PostParams {
  id: string;
  [key: string]: string;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<PostParams>();
  const navigate = useNavigate();
  const { selectedPost, selectPost, isAdmin, deletePost, user, isAuthenticated, hasChannelAccess } = useBlogContext();
  const { theme } = useTheme();

  useEffect(() => {
    if (id && isAuthenticated && hasChannelAccess) {
      selectPost(id);
    }
  }, [id, selectPost, isAuthenticated, hasChannelAccess]);

  // Check if dark mode is active
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Theme-based styles
  const textClass = isDark ? "text-slate-200" : "text-slate-800";
  const mutedTextClass = isDark ? "text-slate-400" : "text-slate-500";
  const borderClass = isDark ? "border-slate-700" : "border-slate-200";
  const gradientStartClass = isDark ? "from-indigo-900/10" : "from-indigo-500/10";
  const gradientEndClass = isDark ? "to-purple-900/10" : "to-purple-500/10";
  const borderColorClass = isDark ? "border-indigo-500/20" : "border-indigo-300/30";
  const headingClass = isDark ? "text-indigo-300" : "text-indigo-700";
  const buttonBgClass = isDark ? "bg-slate-800/50" : "bg-white";
  const buttonBorderClass = isDark ? "border-slate-600" : "border-slate-300";
  const buttonTextClass = isDark ? "text-slate-200" : "text-slate-800";
  const deleteButtonBgClass = isDark ? "bg-red-900/30" : "bg-red-50";
  const deleteButtonTextClass = isDark ? "text-red-200" : "text-red-600";
  const alertBgClass = isDark ? "bg-slate-800" : "bg-slate-50";
  const proseClass = isDark ? "prose-invert" : "prose-slate";

  // If not authenticated, render the login component inline
  if (!isAuthenticated) {
    return (
      <div className="post-login-container">
        <div className={`p-6 bg-gradient-to-br ${gradientStartClass} ${gradientEndClass} border ${borderColorClass} rounded-xl mb-6`}>
          <h2 className={`text-xl font-bold ${headingClass} mb-2 flex items-center`}>
            <Shield className={`h-5 w-5 mr-2 ${headingClass}`} />
            Authentication Required
          </h2>
          <p className={`${textClass} mb-4`}>
            Please log in with Telegram to read our blog posts.
          </p>
        </div>
        <Login returnUrl={`/post/${id}`} />
      </div>
    );
  }

  // If authenticated but no channel access
  if (isAuthenticated && !hasChannelAccess) {
    return (
      <div className={`p-6 ${alertBgClass} border ${borderClass} rounded-xl`}>
        <div className="flex items-start gap-4">
          <div className="p-2 bg-yellow-500/10 rounded-full">
            <Shield className="h-6 w-6 text-yellow-500" />
          </div>
          <div>
            <h2 className={`text-xl font-bold ${textClass} mb-2`}>Channel Access Required</h2>
            <p className={`${mutedTextClass} mb-4`}>
              To access blog posts, you need to join our Telegram channel.
              Once you're a member, you'll have full access to all content.
            </p>
            <Button variant="outline" className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500">
                <path d="M22.2398 2.11c-.4535-.187-1.27-.387-2.1234-.2176-1.0055.1986-5.1743 2.0557-8.8454 3.7116C7.7323 7.166 3.60728 9.0033 2.34493 9.57c-.43744.1975-.87487.5927-.87487 1.184 0 .3951.17497.7904.52492.9879.61241.3951 2.62178 1.3816 3.67721 1.9744.35.1975.78737.1975 1.1374 0 .61241-.3951 3.14777-2.1729 3.67721-2.4693.35-.1976.78741-.1976 1.1374 0 .6124.395 2.5368 1.7766 3.2367 2.1718.35.1975.7874.1975 1.1374 0 .6124-.3952 3.1478-2.1729 3.6772-2.4694.35-.1975.7874-.1975 1.1374 0 .6999.3952 2.5368 1.6779 3.2367 2.1719.35.1975.7874.1975 1.1374 0 .6124-.3952 1.6623-1.0841 2.0998-1.3816.4375-.2963.6124-.6915.6124-1.1854 0-.4939-.35-.9878-.7874-1.1853-1.2624-.6915-5.3868-2.5681-9.0204-4.2447-3.67716-1.6779-7.87961-3.55264-9.05788-4.14551-.26247-.09878-.6124-.09878-.87487 0-.52493.19757-1.13734.69145-1.13734 1.3816 0 .69016.61241 1.1854 1.13734 1.3816.43744.1976 4.56246 2.0357 8.29301 3.6128 3.50224 1.5791 7.52964 3.3539 8.84294 4.0442.35.1976.5249.5927.5249 1.0867v5.1423c0 .4939-.35.8891-.7874 1.0866-.4374.1976-.9624.1976-1.3123-.0987-.6999-.4939-2.8867-2.0754-3.4991-2.3718-.35-.0988-.6124-.2963-.6124-.5927 0-.1975 0-.395.1749-.5926.4375-.3952 1.3124-1.0866 1.6624-1.3829.3499-.1976.4374-.5927.4374-.9879 0-.395-.175-.7903-.5249-.9878-.4375-.1976-.9624-.1976-1.3124 0-1.1373.9878-3.2367 2.7656-4.5491 3.8523-.52493.4939-1.39982.4939-1.92475 0-1.31236-1.0867-3.36718-2.8645-4.50459-3.8523-.34995-.1976-.87487-.1976-1.31231 0-.34995.1975-.52493.5927-.52493.9878 0 .3952.0875.7904.43744.9879.34995.2963 1.22485.9879 1.66229 1.3829.17498.1976.17498.3951.17498.5926 0 .2964-.17498.4939-.61241.5927-.61241.2964-2.79922 1.8779-3.49903 2.3718-.34995.2964-.87487.2964-1.31231.0988-.43744-.1975-.78738-.5927-.78738-1.0866v-5.1423c0-.494.1769-.8891.52484-1.0867 1.3967-.6903-1.3967.6903 17.5259-7.65718.35-.19762.5249-.59268.5249-.98781 0-.3952-.175-.79041-.5249-.98782z" fill="currentColor"/>
              </svg>
              Join Our Telegram Channel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedPost) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="w-12 h-12 border-4 border-t-indigo-500 border-indigo-200 rounded-full animate-spin"></div>
        <p className={mutedTextClass}>Loading post...</p>
      </div>
    );
  }

  const handleDelete = (): void => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(selectedPost.id);
      // Redirect to first post after deletion or to the list
      navigate('/post/1');
    }
  };

  // Format date for better display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Estimate reading time
  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const textOnly = content.replace(/<[^>]*>/g, '');
    const wordCount = textOnly.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };
  
  const readingTime = estimateReadingTime(selectedPost.content);

  return (
    <article className="space-y-8 max-w-3xl mx-auto">
      {/* Featured image - if there's no featured image data, use a gradient */}
      <div className="relative w-full rounded-2xl overflow-hidden h-60 bg-gradient-to-br from-indigo-600 to-purple-700">
        {(selectedPost.imageUrl || selectedPost.image) && (
          <img 
            src={selectedPost.imageUrl || selectedPost.image} 
            alt={selectedPost.title}
            className="w-full h-full object-cover" 
          />
        )}
        {!(selectedPost.imageUrl || selectedPost.image) && (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
          </div>
        )}
        
        {/* Post title overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-6">
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-sm">{selectedPost.title}</h1>
        </div>
      </div>
      
      {/* User profile and metadata */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 pb-6 border-b ${borderClass}`}>
        <div className="flex items-center">
          {user?.photo_url ? (
            <img 
              src={user.photo_url} 
              alt={user.first_name}
              className="w-10 h-10 rounded-full border-2 border-indigo-500" 
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              <User className="h-5 w-5" />
            </div>
          )}
          <div className="ml-3">
            <div className={`font-medium ${textClass}`}>{selectedPost.authorName}</div>
            <div className={`flex items-center text-xs ${mutedTextClass}`}>
              <Calendar className="h-3 w-3 mr-1" />
              <span>{formatDate(selectedPost.createdAt)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`flex items-center text-sm ${mutedTextClass}`}>
            <Clock className="h-4 w-4 mr-1 text-indigo-400" />
            <span>{readingTime} min read</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className={`${textClass} hover:bg-slate-700/50 hover:text-slate-100`}
          >
            <Share2 className="h-4 w-4 mr-1" />
            <span className="text-sm">Share</span>
          </Button>
        </div>
      </div>
      
      {/* Post content */}
      <div className={`prose ${proseClass} max-w-none
        prose-headings:${headingClass} 
        prose-a:text-indigo-400 
        prose-code:${isDark ? "text-indigo-300" : "text-indigo-600"}
        prose-blockquote:border-l-indigo-500 
        prose-blockquote:${isDark ? "bg-indigo-900/10" : "bg-indigo-50"}
        prose-blockquote:p-4 
        prose-blockquote:rounded-r-md
        prose-img:rounded-xl prose-img:shadow-lg`}
        dangerouslySetInnerHTML={{ __html: selectedPost.content }}
      />
      
      {/* Admin actions */}
      {isAdmin && (
        <div className={`pt-8 border-t ${borderClass} flex gap-3`}>
          <Button 
            variant="outline" 
            className={`${buttonBgClass} border-${buttonBorderClass} ${buttonTextClass} hover:bg-slate-700 hover:text-white`}
            asChild
          >
            <Link to={`/admin/edit/${selectedPost.id}`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Post
            </Link>
          </Button>
          <Button 
            variant="destructive" 
            className={`${deleteButtonBgClass} hover:bg-red-800 ${deleteButtonTextClass}`}
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Post
          </Button>
        </div>
      )}
    </article>
  );
};

export default PostDetail;