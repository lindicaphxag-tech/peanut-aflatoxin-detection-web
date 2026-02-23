import { motion }from 'framer-motion'

function About() {
  const features = [
    { emoji: '🧠', title: 'ResNet50+CBAM', desc: '深度残差网络 + 注意力机制' },
    { emoji: '📊', title: '3分类检测', desc: '正常 / 发霉不长毛 / 发霉长毛' },
    { emoji: '🔧', title: 'Otsu预处理', desc: '自适应阈值背景分割' },
    { emoji: '🎯', title: '高准确率', desc: '准确率 96.2% | AUC 0.982' }
  ]

  const techStack = [
    { layer: '前端', techs: ['React 18', 'TypeScript', 'TailwindCSS', 'Framer Motion'], color: 'from-blue-400 to-blue-500' },
    { layer: '后端', techs: ['Flask', 'PyTorch', 'OpenCV', 'NumPy'], color: 'from-green-400 to-green-500' },
    { layer: '模型', techs: ['ResNet50', 'CBAM', 'Softmax', 'CrossEntropy'], color: 'from-purple-400 to-purple-500' },
  ]

  const teamMembers = [
    { name: '研发团队', role: '模型训练与优化', emoji: '👨‍💻' },
    { name: '产品设计', role: 'UI/UX设计', emoji: '🎨' },
    { name: '测试团队', role: '质量保障', emoji: '🔍' },
  ]

  return (
    <div className="space-y-5">
      {/* 项目介绍 */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-6 card-shadow overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-200/30 to-primary-300/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <motion.div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center shadow-md"
              animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <span className="text-3xl">🥜</span>
            </motion.div>
            <div>
              <h2 className="text-xl font-bold text-primary-800">坚果黄曲霉检测系统</h2>
              <p className="text-xs text-gray-400">Peanut Aflatoxin Detection System</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm">
            本系统基于深度学习技术，采用 ResNet50+CBAM 注意力机制网络，
            实现对坚果（花生）黄曲霉污染的智能检测。通过图像识别技术，
            可快速判断坚果是否存在霉变风险，保障食品安全。
          </p>
        </div>
      </motion.div>

      {/* 技术特点 */}
      <div className="grid grid-cols-2 gap-3">
        {features.map((feature, index) => (
          <motion.div key={index}initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.08 }} whileHover={{ scale: 1.03, y: -2 }}
            className="glass rounded-2xl p-4 card-shadow">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mb-3 shadow">
              <span className="text-xl">{feature.emoji}</span>
            </div>
            <h3 className="font-bold text-primary-800 text-sm">{feature.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* 检测流程 */}
      <motion.div initial={{ opacity: 0, y: 20 }}animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="glass rounded-3xl p-5 card-shadow">
        <h3 className="font-bold text-primary-800 mb-4 flex items-center gap-2"><span>⚡</span> 检测流程</h3>
        <div className="flex items-center justify-between">
          {[
            { emoji: '📷', label: '图像采集' },
            { emoji: '🔧', label: 'Otsu分割' },
            { emoji: '🧠', label: '模型推理' },
            { emoji: '📊', label: '结果输出' }
          ].map((step, idx) => (
            <motion.div key={idx} className="text-center flex-1" initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + idx * 0.1 }}>
              <motion.div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-2 shadow"
                whileHover={{ scale: 1.1 }}>
                <span className="text-xl">{step.emoji}</span>
              </motion.div>
              <span className="text-xs text-gray-600">{step.label}</span>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between px-6 mt-2">
          <div className="flex-1 h-0.5 bg-gradient-to-r from-primary-200 to-primary-300 rounded mx-2"></div>
          <div className="flex-1 h-0.5 bg-gradient-to-r from-primary-300 to-primary-400 rounded mx-2"></div>
          <div className="flex-1 h-0.5 bg-gradient-to-r from-primary-400 to-primary-500 rounded mx-2"></div>
        </div>
      </motion.div>

      {/* 技术栈 */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="glass rounded-3xl p-5 card-shadow">
        <h3 className="font-bold text-primary-800 mb-4 flex items-center gap-2"><span>🛠️</span> 技术架构</h3>
        <div className="space-y-3">
          {techStack.map((stack, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }} className="flex items-center gap-3">
              <div className={`w-16 py-1.5 text-center text-xs font-bold text-white rounded-lg bg-gradient-to-r ${stack.color}`}>
                {stack.layer}
              </div>
              <div className="flex-1 flex flex-wrap gap-2">
                {stack.techs.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-white/60 rounded-lg text-xs text-gray-600">{tech}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 模型性能 */}
      <motion.div initial={{ opacity: 0, y: 20 }}animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="glass rounded-3xl p-5 card-shadow">
        <h3 className="font-bold text-primary-800 mb-4 flex items-center gap-2"><span>📈</span> 模型性能</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '准确率', value: '96.2%', emoji: '🎯' },
            { label: 'AUC', value: '0.982', emoji: '📊' },
            { label: '推理速度', value: '~50ms', emoji: '⚡' },
          ].map((metric, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + idx * 0.1 }} className="text-center p-3 bg-white/50 rounded-xl">
              <span className="text-2xl">{metric.emoji}</span>
              <p className="text-xl font-bold text-primary-800 mt-1">{metric.value}</p>
              <p className="text-xs text-gray-500">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 团队信息 */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        className="glass rounded-3xl p-5 card-shadow">
        <h3 className="font-bold text-primary-800 mb-4 flex items-center gap-2"><span>👥</span> 开发团队</h3>
        <div className="grid grid-cols-3 gap-3">
          {teamMembers.map((member, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + idx * 0.1 }} whileHover={{ scale: 1.05 }}
              className="text-center p-3 bg-white/50 rounded-xl">
              <span className="text-3xl">{member.emoji}</span>
              <p className="font-bold text-gray-800 text-sm mt-2">{member.name}</p>
              <p className="text-xs text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 版本信息 */}
      <motion.div initial={{ opacity: 0 }}animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
        className="glass rounded-2xl p-4 card-shadow text-center">
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-1.5"><span>📱</span><span className="text-gray-500">v2.0.0</span></div>
          <div className="w-px h-4 bg-gray-200"></div>
          <div className="flex items-center gap-1.5"><span>📅</span><span className="text-gray-500">2026年2月</span></div>
          <div className="w-px h-4 bg-gray-200"></div>
          <div className="flex items-center gap-1.5"><span>🌐</span><span className="text-gray-500">Web端</span></div>
        </div>
        <p className="text-xs text-gray-400 mt-3">© 2026 坚果黄曲霉检测系统 All Rights Reserved</p>
      </motion.div>
    </div>
  )
}

export default About

