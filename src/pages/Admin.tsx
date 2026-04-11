import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Image,
  Users,
  Settings,
  LogOut,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { featuredBlogPosts } from '@/data/mockData';
import { toast } from 'sonner';

export default function Admin() {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = 'Admin Dashboard - Prayagraj Creator';
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'posts', label: 'Blog Posts', icon: FileText },
    { id: 'comments', label: 'Comments', icon: MessageSquare },
    { id: 'media', label: 'Media', icon: Image },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Total Posts', value: '24', icon: FileText, change: '+12%' },
    { label: 'Total Views', value: '125K', icon: Eye, change: '+24%' },
    { label: 'Comments', value: '1.2K', icon: MessageSquare, change: '+8%' },
    { label: 'Subscribers', value: '100K+', icon: Users, change: '+15%' },
  ];

  const recentPosts = featuredBlogPosts.slice(0, 5);

  const filteredPosts = recentPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="w-64 bg-white dark:bg-gray-800 shadow-lg fixed h-full z-10"
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f41d1d] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <div>
              <h2 className="font-bold">Admin Panel</h2>
              <p className="text-xs text-gray-500">Prayagraj Creator</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-[#f41d1d] text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="font-semibold">
                {user.displayName?.[0] || user.email?.[0] || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">
                {user.displayName || 'Admin User'}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold capitalize">{activeTab}</h1>
            <p className="text-gray-500">
              Welcome back, {user.displayName || 'Admin'}!
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
              {isAdmin ? 'Admin' : 'Editor'}
            </span>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#f41d1d]/10 rounded-xl flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-[#f41d1d]" />
                    </div>
                    <span className="text-sm text-green-600 font-medium">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Charts & Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Chart Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">Traffic Overview</h3>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map(
                    (height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 0.5 + i * 0.05 }}
                        className="flex-1 bg-[#f41d1d]/20 rounded-t-lg relative group"
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-[#f41d1d] rounded-t-lg transition-all group-hover:opacity-80"
                          style={{ height: `${height}%` }}
                        />
                      </motion.div>
                    )
                  )}
                </div>
                <div className="flex justify-between mt-4 text-sm text-gray-500">
                  <span>Jan</span>
                  <span>Dec</span>
                </div>
              </motion.div>

              {/* Recent Posts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">Recent Posts</h3>
                  <button className="text-[#f41d1d] text-sm hover:underline">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"
                    >
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{post.title}</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(post.publishedAt).toLocaleDateString()} •{' '}
                          {post.views.toLocaleString()} views
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm"
          >
            {/* Toolbar */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f41d1d]"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 bg-[#f41d1d] text-white font-semibold rounded-lg hover:bg-black transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  New Post
                </motion.button>
              </div>
            </div>

            {/* Posts Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Post
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Views
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => (
                    <tr
                      key={post.id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <span className="font-medium line-clamp-1">
                            {post.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-[#f41d1d]/10 text-[#f41d1d] text-sm rounded-full">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          {post.views.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Other Tabs Placeholder */}
        {['comments', 'media', 'users', 'settings'].includes(activeTab) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-sm text-center"
          >
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              {activeTab === 'comments' && <MessageSquare className="w-10 h-10 text-gray-400" />}
              {activeTab === 'media' && <Image className="w-10 h-10 text-gray-400" />}
              {activeTab === 'users' && <Users className="w-10 h-10 text-gray-400" />}
              {activeTab === 'settings' && <Settings className="w-10 h-10 text-gray-400" />}
            </div>
            <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
            <p className="text-gray-500">
              This feature is under development. Check back later!
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
