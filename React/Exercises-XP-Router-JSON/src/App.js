import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorBoundary from './ErrorBoundary.js';
import PostList from './PostList.js';
import Example1 from './Example1.js';
import Example2 from './Example2.js';
import Example3 from './Example3.js';
import webhook from './data/webhook.json';
import './App.css';

export function HomeScreen() { return <h2>Home</h2>; }
export function ProfileScreen() { return <h2>Profile Screen</h2>; }
export function ShopScreen() { throw new Error('Shop failed to render'); }

export default function App() {
  const [url, setUrl] = useState(webhook.url);
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  async function postData() {
    setSending(true);
    setStatus('Sending…');
    try {
      const endpoint = new URL(url);
      if (endpoint.protocol !== 'https:' || endpoint.hostname !== 'webhook.site') {
        throw new Error('Enter your HTTPS Webhook.site URL');
      }
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key1: 'myusername', email: 'mymail@gmail.com', name: 'Isaac', lastname: 'Doe', age: 27 }),
      });
      console.log(response);
      const text = await response.text();
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      console.log(text);
      setStatus('Sent successfully. Check the console and Webhook.site request history.');
    } catch (error) {
      console.error(error);
      setStatus(error.message);
    } finally { setSending(false); }
  }

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand bg-dark navbar-dark px-3" aria-label="Main navigation">
        <div className="navbar-nav flex-row gap-3">
          <NavLink className="nav-link" to="/" end>Home</NavLink>
          <NavLink className="nav-link" to="/profile">Profile</NavLink>
          <NavLink className="nav-link" to="/shop">Shop</NavLink>
        </div>
      </nav>
      <main className="container py-4">
        <h1>React Router and JSON</h1>
        <section aria-label="Routes">
          <Routes>
            <Route path="/" element={<ErrorBoundary key="home"><HomeScreen /></ErrorBoundary>} />
            <Route path="/profile" element={<ErrorBoundary key="profile"><ProfileScreen /></ErrorBoundary>} />
            <Route path="/shop" element={<ErrorBoundary key="shop"><ShopScreen /></ErrorBoundary>} />
            <Route path="*" element={<h2>Page not found</h2>} />
          </Routes>
        </section>
        <section aria-label="Posts"><h2>Posts</h2><PostList /></section>
        <section aria-label="Social media"><h2>Social media</h2><Example1 /></section>
        <section aria-label="Skills"><h2>Skills</h2><Example2 /></section>
        <section aria-label="Experiences"><h2>Experiences</h2><Example3 /></section>
        <section aria-label="Post JSON">
          <h2>Post JSON data</h2>
          <label className="form-label" htmlFor="webhook-url">Your Webhook.site URL (CORS enabled)</label>
          <input id="webhook-url" className="form-control mb-3" type="url" value={url} onChange={event => setUrl(event.target.value)} />
          <button className="btn btn-primary" disabled={sending || !url.trim()} onClick={postData}>Send JSON</button>
          <p role="status" className="mt-3">{status}</p>
          <a href="https://webhook.site/" target="_blank" rel="noreferrer">Open Webhook.site</a>
        </section>
      </main>
    </BrowserRouter>
  );
}
