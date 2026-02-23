import { Outlet, NavLink }from 'react-router-dom'
import { motion } from 'framer-motion'

function Layout() {
  const navItems = [
    { path: '/', label: '检测', emoji: '🔍' },
    { path: '/history', label: '档案', emoji: '📋' },
    { path: '/about', label: '关于', emoji: 'ℹ️' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="gradient-bg text-white py-5 px-6 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-yellow-200 rounded-full blur-3xl"></div>
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-center tracking-wider relative z-10"
        >
          <span className="mr-2">🥜</span>
          坚果黄曲霉检测系统
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-sm text-white/70 mt-1 relative z-10"
        >
          AI智能检测  守护食品安全
        </motion.p>
      </header>
      <main className="flex-1 p-4 max-w-2xl mx-auto w-full">
        <Outlet />
      </main>
      <nav className="glass border-t border-primary-200 py-3 px-4 sticky bottom-0">
        <div className="flex justify-around max-w-md mx-auto">
          {navItems.map(({ path, label, emoji }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center py-2 px-6 rounded-2xl transition-all duration-300 ${isActive ? 'bg-gradient-to-br from-primary-100 to-primary-200 text-primary-800 scale-110 shadow-md' : 'text-gray-500 hover:text-primary-600 hover:bg-primary-50'}`
              }
            >
              {({ isActive }) => (
                <>
                  <motion.span 
                    className="text-2xl" 
                    animate={{ scale: isActive ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {emoji}
                  </motion.span>
                  <span className={`text-xs mt-1 font-medium ${isActive ? 'font-bold' : ''}`}>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default Layout
