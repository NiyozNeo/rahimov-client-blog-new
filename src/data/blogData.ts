// Define Post interface locally instead of importing
interface Post {
  id: number;
  title: string;
  content?: string; // Make content optional
  author: string;
  date: string;
  slug: string;
  isPublic?: boolean;
}

export const defaultPublicPost: Post = {
  id: 0,
  title: "Welcome to Our Blog",
  content: `<h1>Welcome to Our Technical Blog!</h1>
  <p>This is a public post that's accessible to everyone. Here you'll find in-depth articles about:</p>
  <ul>
    <li><strong>Web Development</strong> - Latest trends, best practices, and tutorials</li>
    <li><strong>Programming Tips</strong> - Practical coding advice and problem-solving techniques</li>
    <li><strong>Technology Insights</strong> - Deep dives into modern tech stack and tools</li>
  </ul>
  <h2>How to Access Our Content</h2>
  <p>While this post is public, our premium content requires authentication. To access all articles:</p>
  <ol>
    <li>Click the "Login" button in the navigation</li>
    <li>Log in with your Telegram account</li>
    <li>Join our Telegram channel for full access</li>
  </ol>
  <p>Stay tuned for regular updates and technical insights!</p>`,
  author: "Admin",
  date: new Date().toISOString().split('T')[0],
  slug: "welcome",
  isPublic: true
};

export const blogPosts: Post[] = [
  {
    id: 1,
    title: "Getting Started with React",
    content: `<h2>Introduction to React</h2>
    <p>React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the DOM when data changes.</p>
    <h3>Key Features of React</h3>
    <ul>
      <li><strong>Virtual DOM</strong> - React creates a lightweight representation of the real DOM in memory.</li>
      <li><strong>JSX</strong> - A syntax extension that lets you write HTML-like markup inside JavaScript.</li>
      <li><strong>Component-Based</strong> - Build encapsulated components that manage their own state.</li>
    </ul>
    <blockquote>React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.</blockquote>
    <p>In this post, we'll cover the basics of React and how to set up your first React application.</p>`,
    author: "Admin",
    date: "2025-04-01",
    slug: "getting-started-with-react"
  },
  {
    id: 2,
    title: "Understanding React Hooks",
    content: `<h2>What are React Hooks?</h2>
    <p>React Hooks were introduced in React 16.8 to allow function components to use state and other React features without writing a class. The most common hooks are useState and useEffect.</p>
    <h3>The useState Hook</h3>
    <p>The useState hook lets you add React state to function components:</p>
    <pre><code>const [count, setCount] = useState(0);</code></pre>
    <h3>The useEffect Hook</h3>
    <p>The useEffect hook lets you perform side effects in function components:</p>
    <pre><code>useEffect(() => {
  document.title = \`You clicked \${count} times\`;
}, [count]);</code></pre>
    <p>In this tutorial, we'll explore how these hooks work and when to use them in your React applications.</p>`,
    author: "Admin",
    date: "2025-04-05",
    slug: "understanding-react-hooks"
  },
  {
    id: 3,
    title: "Building Responsive UIs with CSS Grid",
    content: `<h2>CSS Grid Layout</h2>
    <p>CSS Grid Layout is a powerful tool for creating complex responsive layouts. It allows you to define both columns and rows in your layout, making it easier to design web pages without using floats or positioning.</p>
    <h3>Basic Grid Setup</h3>
    <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}</code></pre>
    <p>This creates a three-column layout with equal width columns and 20px gaps between them.</p>
    <h3>Responsive Design with Grid</h3>
    <p>You can easily create responsive layouts using CSS Grid with media queries:</p>
    <pre><code>@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}</code></pre>
    <p>In this guide, we'll walk through creating a responsive grid-based layout for a blog site.</p>`,
    author: "Admin",
    date: "2025-04-10",
    slug: "building-responsive-uis-with-css-grid"
  }
];