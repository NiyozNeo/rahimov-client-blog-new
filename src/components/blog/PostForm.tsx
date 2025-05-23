import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlogContext } from '../../context/BlogContext';
import { Button } from '../ui/button';
import RichTextEditor from './RichTextEditor';
import api, { BlogApi } from '../../services/api';

interface FormData {
  title: string;
  content: string;
  slug: string;
  authorName: string;
  [key: string]: string;
}

interface FormErrors {
  title?: string;
  content?: string;
  slug?: string;
  [key: string]: string | undefined;
}

interface PostFormProps {
  mode?: 'create' | 'edit';
}

interface PostParams {
  id: string;
  [key: string]: string;
}

// If Blog or Post interfaces are defined here, ensure content is optional
// interface Blog {
//   ...
//   content?: string;
//   ...
// }

const PostForm: React.FC<PostFormProps> = ({ mode = 'create' }) => {
  const { id } = useParams<PostParams>();
  const navigate = useNavigate();
  const { blogs, createPost, updatePost, user } = useBlogContext();
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    slug: '',
    authorName: user?.first_name || 'Anonymous'
  });
  
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (mode === 'edit' && id) {
      const fetchBlogData = async () => {
        try {
          const post = await BlogApi.getBlogById(id);
          if (post) {
            setFormData({
              title: post.title,
              content: post.content,
              slug: post.slug || '',
              authorName: post.authorName
            });
          }
        } catch (error) {
          console.error('Error fetching blog data:', error);
        }
      };
      void fetchBlogData();
    }
  }, [mode, id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    // If changing the title and slug is empty, generate a slug
    if (name === 'title' && !formData.slug) {
      setFormData({
        ...formData,
        [name]: value,
        slug: value.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleEditorChange = (content: string): void => {
    setFormData({
      ...formData,
      content
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) return;    if (mode === 'create') {
      await createPost({
        title: formData.title,
        content: formData.content,
        authorName: formData.authorName,
        slug: formData.slug
      });
      navigate(`/${formData.slug}`);
    } else if (mode === 'edit' && id) {
      const updatedPost = await updatePost(id, {
        title: formData.title,
        content: formData.content,
        slug: formData.slug
      });
      navigate(`/${updatedPost.slug}`);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-secondary">
        {mode === 'create' ? 'Create New Post' : 'Edit Post'}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block font-medium">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-md border ${
              errors.title ? 'border-destructive' : 'border-input'
            } focus:outline-none focus:ring-2 focus:ring-primary`}
          />
          {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="slug" className="block font-medium">Slug</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="my-post-url"
            className={`w-full px-3 py-2 rounded-md border ${
              errors.slug ? 'border-destructive' : 'border-input'
            } focus:outline-none focus:ring-2 focus:ring-primary`}
          />
          {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="content" className="block font-medium">Content</label>
          <RichTextEditor 
            content={formData.content} 
            onChange={handleEditorChange} 
          />
          {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
        </div>
        
        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" variant="default">
            {mode === 'create' ? 'Create Post' : 'Update Post'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;