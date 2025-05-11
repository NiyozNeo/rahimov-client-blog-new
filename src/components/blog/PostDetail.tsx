import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useBlogContext } from "../../context/BlogContext";
import { Button } from "../ui/button";
import Login from "../../pages/Login";
import {
  Edit,
  Trash2,
  Shield,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

interface PostParams {
  slug: string;
  [key: string]: string;
}

const PostDetail: React.FC = () => {
  const { slug } = useParams<PostParams>();
  const navigate = useNavigate();
  const {
    selectedPost,
    selectPostBySlug,
    isAdmin,
    deletePost,
    isAuthenticated,
    hasChannelAccess,
    isChannelMembershipRequired, // <-- use from context
  } = useBlogContext();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      if (!selectedPost || selectedPost.slug !== slug) {
        setIsLoading(true);
        setLoadError(null);
        try {
          await selectPostBySlug(slug);
        } catch (error) {
          console.error("Error loading post:", error);
          if (!(error && typeof error === 'object' && 'error' in error && error.error === 'channel_access_required')) {
            setLoadError("Failed to load the blog post. Please try again.");
          }
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadPost();
  }, [slug, isAuthenticated, hasChannelAccess, selectPostBySlug, selectedPost]);

  // Check if dark mode is active
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Theme-based styles
  const textClass = isDark ? "text-slate-200" : "text-slate-800";
  const mutedTextClass = isDark ? "text-slate-400" : "text-slate-500";
  const borderClass = isDark ? "border-slate-700" : "border-slate-200";
  const gradientStartClass = isDark
    ? "from-indigo-900/10"
    : "from-indigo-500/10";
  const gradientEndClass = isDark ? "to-purple-900/10" : "to-purple-500/10";
  const borderColorClass = isDark
    ? "border-indigo-500/20"
    : "border-indigo-300/30";
  const buttonBorderClass = isDark ? "border-slate-600" : "border-slate-300";
  const deleteButtonBgClass = isDark ? "bg-red-900/30" : "bg-red-50";
  const deleteButtonTextClass = isDark ? "text-red-200" : "text-red-600";
  const alertBgClass = isDark ? "bg-slate-800" : "bg-slate-50";
  const proseClass = isDark ? "prose-invert" : "prose-slate";

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="w-12 h-12 border-4 border-t-indigo-500 border-indigo-200 rounded-full animate-spin"></div>
        <p className={mutedTextClass}>Loading post...</p>
      </div>
    );
  }

  // Show error state
  if (loadError) {
    return (
      <div className={`p-6 ${alertBgClass} border ${borderClass} rounded-xl`}>
        <div className="flex items-start gap-4">
          <div className="p-2 bg-red-500/10 rounded-full">
            <Shield className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h2 className={`text-xl font-bold ${textClass} mb-2`}>
              Failed to Load Post
            </h2>
            <p className={`${mutedTextClass} mb-4`}>{loadError}</p>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate('/')}
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isChannelMembershipRequired) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-bold mb-10 mt-6 text-center">
          {selectedPost?.title || (slug && slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '))}
        </h1>
        <div className="text-center">
          <div className="text-2xl font-semibold mb-4">Sizda obuna aniqlanmadi.</div>
          <div className="text-base text-muted-foreground mb-6">Inshoni o'qish uchun obunangizni yangilang.</div>
          <a
            href="https://t.me/parallelmuhit_bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-xl font-semibold px-8 py-3 rounded-xl shadow-md transition-colors"
              style={{ minWidth: 220 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-7 h-7 text-yellow-400"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-4h.01M12 16h.01" />
                <path fill="currentColor" d="M12 17a1 1 0 100-2 1 1 0 000 2zm0-4a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              Botga o'tish
            </Button>
          </a>
        </div>
      </div>
    );
  }

  if (!selectedPost) {
    // If viewing the welcome page, always show loading spinner until loaded (never show login)
    if (slug === "welcome") {
      return (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="w-12 h-12 border-4 border-t-indigo-500 border-indigo-200 rounded-full animate-spin"></div>
          <p className={mutedTextClass}>Loading post...</p>
        </div>
      );
    }
    // For all other posts, if not authenticated, show login
    if (!isAuthenticated) {
      return (
        <div className="post-login-container">
          <div
            className={`p-6 bg-gradient-to-br ${gradientStartClass} ${gradientEndClass} border ${borderColorClass} rounded-xl mb-6`}
          >
            <h2 className={`text-xl font-bold mb-2 flex items-center`}>
              <Shield className={`h-5 w-5 mr-2`} />
              Authentication Required
            </h2>
            <p className={`${textClass} mb-4`}>
              Please log in with Telegram to read our blog posts.
            </p>
          </div>
          <Login returnUrl={`/post/${slug}`} />
        </div>
      );
    }
    // Otherwise, show loading spinner
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="w-12 h-12 border-4 border-t-indigo-500 border-indigo-200 rounded-full animate-spin"></div>
        <p className={mutedTextClass}>Loading post...</p>
      </div>
    );
  }

  // If the post is not public and user is not authenticated, show login
  if (!selectedPost.isPublic && !isAuthenticated) {
    return (
      <div className="post-login-container">
        <div
          className={`p-6 bg-gradient-to-br ${gradientStartClass} ${gradientEndClass} border ${borderColorClass} rounded-xl mb-6`}
        >
          <h2
            className={`text-xl font-bold mb-2 flex items-center`}
          >
            <Shield className={`h-5 w-5 mr-2`} />
            Authentication Required
          </h2>
          <p className={`${textClass} mb-4`}>
            Please log in with Telegram to read our blog posts.
          </p>
        </div>
        <Login returnUrl={`/post/${slug}`} />
      </div>
    );
  }

  // If authenticated but no channel access or channel membership required
  if (isAuthenticated && (!hasChannelAccess || isChannelMembershipRequired)) {
    return (
      <div className={`p-6 ${alertBgClass} border ${borderClass} rounded-xl`}>
        <div className="flex items-start gap-4">
          <div className="p-2 bg-yellow-500/10 rounded-full">
            <Shield className="h-6 w-6 text-yellow-500" />
          </div>
          <div>
            <h2 className={`text-xl font-bold ${textClass} mb-2`}>
              Channel Access Required
            </h2>
            <p className={`${mutedTextClass} mb-4`}>
              {isChannelMembershipRequired 
                ? "Access denied: Not a member of the required channel. Please join our Telegram channel to read this post."
                : "To access blog posts, you need to join our Telegram channel. Once you're a member, you'll have full access to all content."
              }
            </p>
            <a 
              href="https://t.me/parallelmuhit_bot" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-blue-500"
                >
                  <path
                    d="M22.2398 2.11c-.4535-.187-1.27-.387-2.1234-.2176-1.0055.1986-5.1743 2.0557-8.8454 3.7116C7.7323 7.166 3.60728 9.0033 2.34493 9.57c-.43744.1975-.87487.5927-.87487 1.184 0 .3951.17497.7904.52492.9879.61241.3951 2.62178 1.3816 3.67721 1.9744.35.1975.78737.1975 1.1374 0 .61241-.3951 3.14777-2.1729 3.67721-2.4693.35-.1976.78741-.1976 1.1374 0 .6124.395 2.5368 1.7766 3.2367 2.1718.35.1975.7874.1975 1.1374 0 .6124-.3952 3.1478-2.1729 3.6772-2.4694.35-.1975.7874-.1975 1.1374 0 .6999.3952 2.5368 1.6779 3.2367 2.1719.35.1975.7874.1975 1.1374 0 .6124-.3952 1.6623-1.0841 2.0998-1.3816.4375-.2963.6124-.6915.6124-1.1854 0-.4939-.35-.9878-.7874-1.1853-1.2624-.6915-5.3868-2.5681-9.0204-4.2447-3.67716-1.6779-7.87961-3.55264-9.05788-4.14551-.26247-.09878-.6124-.09878-.87487 0-.52493.19757-1.13734.69145-1.13734 1.3816 0 .69016.61241 1.1854 1.13734 1.3816.43744.1976 4.56246 2.0357 8.29301 3.6128 3.50224 1.5791 7.52964 3.3539 8.84294 4.0442.35.1976.5249.5927.5249 1.0867v5.1423c0 .4939-.35.8891-.7874 1.0866-.4374.1976-.9624.1976-1.3123-.0987-.6999-.4939-2.8867-2.0754-3.4991-2.3718-.35-.0988-.6124-.2963-.6124-.5927 0-.1975 0-.395.1749-.5926.4375-.3952 1.3124-1.0866 1.6624-1.3829.3499-.1976.4374-.5927.4374-.9879 0-.395-.175-.7903-.5249-.9878-.4375-.1976-.9624-.1976-1.3124 0-1.1373.9878-3.2367 2.7656-4.5491 3.8523-.52493.4939-1.39982.4939-1.92475 0-1.31236-1.0867-3.36718-2.8645-4.50459-3.8523-.34995-.1976-.87487-.1976-1.31231 0-.34995.1975-.52493.5927-.52493.9878 0 .3952.0875.7904.43744.9879.34995.2963 1.22485.9879 1.66229 1.3829.17498.1976.17498.3951.17498.5926 0 .2964-.17498.4939-.61241.5927-.61241.2964-2.79922 1.8779-3.49903 2.3718-.34995.2964-.87487.2964-1.31231.0988-.43744-.1975-.78738-.5927-.78738-1.0866v-5.1423c0-.494.1769-.8891.52484-1.0867 1.3967-.6903-1.3967.6903 17.5259-7.65718.35-.19762.5249-.59268.5249-.98781 0-.3952-.175-.79041-.5249-.98782z"
                    fill="currentColor"
                  />
                </svg>
                Join Our Telegram Channel
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  const handleDelete = (): void => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(selectedPost.id);
      // Redirect to first post after deletion or to the list
      navigate("/");
    }
  };

  return (
    <article className="max-w-full">
      {/* Large Title - centered with no left margin */}
      <h1 className={`text-4xl font-bold  mb-10 mt-6`}>
        {selectedPost.title}
      </h1>

      {/* Post content - no left padding */}      <div
        className={`prose ${proseClass} max-w-none
        prose-headings:mt-6
        prose-headings:mb-4
        prose-p:my-5        prose-a:text-${isDark ? "indigo-400" : "indigo-600"} 
        prose-a:underline
        prose-a:hover:text-${isDark ? "indigo-300" : "indigo-700"}
        prose-a:cursor-pointer
        prose-a:decoration-${isDark ? "indigo-400" : "indigo-600"}
        prose-a:decoration-2
        prose-a:font-medium
        prose-code:${isDark ? "text-indigo-300" : "text-indigo-600"}
        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
        prose-code:bg-${isDark ? "slate-800/60" : "slate-100"}
        prose-blockquote:border-l-indigo-500 
        prose-blockquote:${isDark ? "bg-indigo-900/10" : "bg-indigo-50"}
        prose-blockquote:p-6
        prose-blockquote:my-8
        prose-blockquote:rounded-r-md
        prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
        prose-ul:list-disc prose-ul:pl-5 prose-ul:my-5
        prose-ol:list-decimal prose-ol:pl-5 prose-ol:my-5
        prose-li:my-2 prose-li:pl-1.5
        prose-pre:p-4 prose-pre:${isDark ? "bg-slate-800" : "bg-slate-100"} prose-pre:rounded-md
        ${isDark ? "prose-strong:text-white" : "prose-strong:text-slate-900"}
        ${isDark ? "prose-em:text-slate-200" : "prose-em:text-slate-700"}`}
        dangerouslySetInnerHTML={{ __html: selectedPost.content }}
      />

      {/* Admin actions - with separator line above like in the example */}
      {isAdmin && (
        <>
          <hr className="my-8 border-t border-slate-200 dark:border-slate-700" />
          <div className="flex flex-wrap gap-5">
            <Button
              variant="outline"
              asChild
            >
              <Link to={`/admin/edit/${selectedPost.id}`}>
                <Edit className="mr-2" size={18} />
                Edit Post
              </Link>
            </Button>
            <Button
              className={`flex cursor-pointer items-center ${deleteButtonBgClass} ${deleteButtonTextClass} border ${buttonBorderClass} hover:bg-opacity-80`}
              onClick={handleDelete}
              variant={"outline"}
            >
              <Trash2 className="mr-2" size={18} />
              Delete Post
            </Button>
          </div>
        </>
      )}
    </article>
  );
};

export default PostDetail;
