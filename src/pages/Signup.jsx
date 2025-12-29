import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/shared/hooks/use-auth.jsx';
import toast from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail ] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password incorrect");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({email,password})
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      login(data.token);
      toast.success("Welcome aboard!");
      navigate("/search");
    } catch(err) {
      console.error("[Signup] error:", err);
      toast.error(`Signup failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-stone-800 p-6 rounded shadow">
      <h2 className="text-2xl text-amber-400 mb-4">Sign up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          className="w-full px-3 py-2 rounded bg-stone-700 text-stone-200"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 rounded bg-stone-700 text-stone-200"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} required
        />
        <input
          className="w-full px-3 py-2 rounded bg-stone-700 text-stone-200"
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} required
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "signing up - please wait ..." : "sign up"}
        </button>
      </form>
    </div>
   )
}

export default Signup;