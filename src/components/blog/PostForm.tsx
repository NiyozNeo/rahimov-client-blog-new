import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlogContext } from '../../context/BlogContext';
import { Button } from '../ui/button';
import RichTextEditor from './RichTextEditor';

interface FormData {
  title: string;
  content: string;
  summary: string;
  authorName: string;
  [key: string]: string;
}

interface FormErrors {
  title?: string;
  content?: string;
  summary?: string;
  [key: string]: string | undefined;
}

interface PostFormProps {
  mode?: 'create' | 'edit';
}

interface PostParams {
  id: string;
  [key: string]: string;
}

const PostForm: React.FC<PostFormProps> = ({ mode = 'create' }) => {
  const { id } = useParams<PostParams>();
  const navigate = useNavigate();
  const { blogs, createPost, updatePost, user } = useBlogContext();
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    summary: '',
    authorName: user?.first_name || 'Anonymous'
  });
  
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (mode === 'edit' && id) {
      const post = blogs.find(blog => blog.id === id);
      if (post) {
        setFormData({
          title: post.title,
          content: post.content,
          // Use empty string for summary if it doesn't exist on the post
          summary: post.content.substring(0, 100) + '...',
          authorName: post.authorName
        });
      }
    }
  }, [mode, id, blogs]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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
    if (!formData.summary.trim()) {
      newErrors.summary = 'Summary is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (mode === 'create') {
      createPost({
        title: formData.title,
        content: formData.content,
        authorName: formData.authorName
      });
      navigate('/');
    } else if (mode === 'edit' && id) {
      updatePost(id, {
        title: formData.title,
        content: formData.content
      });
      navigate(`/post/${id}`);
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
          <label htmlFor="summary" className="block font-medium">Summary</label>
          <input
            type="text"
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-md border ${
              errors.summary ? 'border-destructive' : 'border-input'
            } focus:outline-none focus:ring-2 focus:ring-primary`}
          />
          {errors.summary && <p className="text-sm text-destructive">{errors.summary}</p>}
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