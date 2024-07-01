import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

// Other imports...

export default function User({
    _id,
    name: existingName,
    email: existingEmail,
    image: existingImage,
    emailVerified: existingEmailVerified,
    type: existingType, // Update to role
  }) {
    const [name, setName] = useState(existingName || '');
  const [email, setEmail] = useState(existingEmail || '');
  const [image, setImage] = useState(existingImage || '');
  const [emailVerified, setEmailVerified] = useState(existingEmailVerified || false);
  const [type, setType] = useState(existingType || ''); // Update to role
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [redirect, setRedirect] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
    useEffect(() => {
     // Fetch user data if editing an existing user
    if (_id) {
        // Fetch user data by id and populate the state
        axios.get(`/api/users/${_id}`)
          .then((response) => {
            const userData = response.data;
            setName(userData.name);
            setEmail(userData.email);
            setImage(userData.image);
            setEmailVerified(userData.emailVerified);
            setRole(userData.type); // Update to role
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }
    }, [_id]);
  
    async function saveUser(ev) {
      ev.preventDefault();
  
      // Make API request to save/update user
      const userData = { name, email, image, emailVerified, type, password }; // Update to role
    try {
      if (_id) {
        await axios.put(`/api/users/${_id}`, userData);
        toast.success('User updated successfully!');
      } else {
        await axios.post('/api/users', userData);
        toast.success('User created successfully!');
      }
      setRedirect(true);
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error('An error occurred while saving user!');  
      }
    }
  
    // Rest of the component...
  

  if (redirect) {
    router.push('/users');
    return null;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={saveUser} className="space-y-5">
        {/* Name input */}
        <div className="grid grid-cols-2 items-center my-4">
          <label className="col-span-1 block text-lg font-medium text-gray-700 mb-3">Name</label>
          <div className="col-span-2">
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
              placeholder="Name of user"
              required
              value={name}
              onChange={ev => setName(ev.target.value)}
            />
          </div>
        </div>

        {/* Email input */}
        <div className="grid grid-cols-2 items-center my-4">
          <label className="col-span-1 block text-lg font-medium text-gray-700 mb-3">Email</label>
          <div className="col-span-2">
            <input
              type="email"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
              placeholder="Email address"
              required
              value={email}
              onChange={ev => setEmail(ev.target.value)}
            />
          </div>
        </div>

        {/* Password input */}
<div className="grid grid-cols-2 items-center my-4">
  <label className="col-span-1 block text-lg font-medium text-gray-700 mb-3">Password</label>
  <div className="col-span-2">
    <input
      type="password"
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
      placeholder="Password"
      required
      value={password}
      onChange={ev => setPassword(ev.target.value)}
    />
  </div>
</div>


        {/* Image input */}
        <div className="grid grid-cols-2 items-center my-4">
          <label className="col-span-1 block text-lg font-medium text-gray-700 mb-3">Image</label>
          <div className="col-span-2">
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
              placeholder="Image URL"
              value={image}
              onChange={ev => setImage(ev.target.value)}
            />
          </div>
        </div>

        {/* Email Verified input */}
        <div className="grid grid-cols-2 items-center my-4">
          <label className="col-span-1 block text-lg font-medium text-gray-700 mb-3">Email Verified</label>
          <div className="col-span-2">
            <input
              type="checkbox"
              className="rounded border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
              checked={emailVerified}
              onChange={ev => setEmailVerified(ev.target.checked)}
            />
          </div>
        </div>

        {/* Role input */}
<div className="grid grid-cols-2 items-center my-4">
  <label className="col-span-1 block text-lg font-medium text-gray-700 mb-3">Role</label>
  <div className="col-span-2">
    <select
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
      value={type}
      onChange={ev => setType(ev.target.value)}
    >
      <option value="admin">Admin</option>
      <option value="employee">Employee</option>
      <option value="customer">Customer</option>
      <option value="business_owner">Business Owner</option>
    </select>
  </div>
</div>


        {/* Save button */}
        <div className="items-center my-4">
          <div className="col-span-2 col-start-2">
            <button
              type="submit"
              className="rounded-lg border border-slate-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300"
            >
              Save User
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
