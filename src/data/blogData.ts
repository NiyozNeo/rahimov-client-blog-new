// Define Post interface locally instead of importing
interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  summary: string;
}

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
    summary: "An introduction to React and its core concepts"
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
    summary: "Learn how to use React Hooks in your applications"
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
    summary: "Create modern layouts using CSS Grid"
  }
];