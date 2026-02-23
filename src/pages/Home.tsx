import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

interface DetectionResult {
  result: string
  confidence: number
  normal_prob: number
  moldy_light_prob: number
  moldy_heavy_prob: number
  moldy_prob: number
  class_index: number
}

interface StatsData {
  total: number
  normal: number
  warning: number
  danger: number
}

function Home() {
  const [image, setImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [stats, setStats] = useState<StatsData>({ total: 0, normal: 0, warning: 0, danger: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 加载统计数据
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('detection_history') || '[]')
    const statsData = {
      total: history.length,
      normal: history.filter((h: any) => h.class_index === 0).length,
      warning: history.filter((h: any) => h.class_index === 1).length,
      danger: history.filter((h: any) => h.class_index === 2).length
    }
    setStats(statsData)
  }, [result])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setImage(URL.createObjectURL(selectedFile))
      setResult(null)
    }
  }

  const handleDetect = async () => {
    if (!file) return

    setLoading(true)
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await axios.post('/api/detect', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setResult(response.data)

      // 保存到历史记录
      const history = JSON.parse(localStorage.getItem('detection_history') || '[]')
      history.unshift({
        ...response.data,
        image: image,
        time: new Date().toLocaleString('zh-CN')
      })
      localStorage.setItem('detection_history', JSON.stringify(history.slice(0, 50)))
    } catch (error) {
      console.error('检测失败:', error)
      alert('检测失败，请检查后端服务是否运行')
    } finally {
      setLoading(false)
    }
  }

  const getResultConfig = (classIndex: number) => {
    switch (classIndex) {
      case 0: return { emoji: '✅', label: '安全', bgClass: 'result-safe', color: 'text-green-600', barColor: 'bg-gradient-to-r from-green-400 to-green-500' }
      case 1: return { emoji: '⚠️', label: '注意', bgClass: 'result-warning', color: 'text-yellow-600', barColor: 'bg-gradient-to-r from-yellow-400 to-yellow-500' }
      case 2: return { emoji: '❌', label: '危险', bgClass: 'result-danger', color: 'text-red-600', barColor: 'bg-gradient-to-r from-red-400 to-red-500' }
      default: return { emoji: '❓', label: '未知', bgClass: '', color: 'text-gray-600', barColor: 'bg-gray-400' }
    }
  }

  return (
    <div className="space-y-5">
      {/* 统计卡片 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-4 gap-3"
      >
        {[
          { label: '总检测', value: stats.total, emoji: '📊', color: 'from-blue-400 to-blue-500' },
          { label: '正常', value: stats.normal, emoji: '✅', color: 'from-green-400 to-green-500' },
          { label: '轻度', value: stats.warning, emoji: '⚠️', color: 'from-yellow-400 to-yellow-500' },
          { label: '重度', value: stats.danger, emoji: '❌', color: 'from-red-400 to-red-500' },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="glass rounded-2xl p-3 text-center card-shadow"
          >
            <div className={`w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br ${item.color}flex items-center justify-center shadow`}>
              <span className="text-lg">{item.emoji}</span>
            </div>
            <p className="text-xl font-bold text-gray-800">{item.value}</p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* 上传区域 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-5 card-shadow overflow-hidden"
      >
        <div
          onClick={() => fileInputRef.current?.click()}
          className="upload-zone rounded-2xl p-6 text-center cursor-pointer relative overflow-hidden"
        >
          {image ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <img src={image}alt="预览" className="max-h-56 mx-auto rounded-xl shadow-lg" />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors rounded-xl flex items-center justify-center">
                <span className="opacity-0 hover:opacity-100 text-white text-sm bg-black/50 px-3 py-1 rounded-full">点击更换</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="space-y-4 py-4"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                <span className="text-4xl">📷</span>
              </div>
              <div>
                <p className="text-gray-700 font-medium text-lg">点击上传坚果图片</p>
                <p className="text-sm text-gray-400 mt-1">支持 JPG、PNG 格式</p>
              </div>
            </motion.div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* 操作按钮 */}
        <div className="flex gap-3 mt-5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 btn-secondary rounded-2xl font-medium text-primary-800"
          >
            <span className="text-xl">🖼️</span>
            选择图片
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDetect}
            disabled={!file || loading}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 btn-primary text-white rounded-2xl font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <span className="text-xl animate-spin-slow">⏳</span>
                检测中...
              </>
            ) : (
              <>
                <span className="text-xl">🔬</span>
                开始检测
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* 检测结果 */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className={`${getResultConfig(result.class_index).bgClass}rounded-3xl p-5 card-shadow overflow-hidden`}
          >
            {/* 结果头部 */}
            <div className="flex items-center gap-4 mb-5">
              <motion.div
                className="w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center shadow-md"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-4xl">{getResultConfig(result.class_index).emoji}</span>
              </motion.div>
              <div className="flex-1">
                <h3 className={`text-2xl font-bold ${getResultConfig(result.class_index).color}`}>
                  {result.result}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-500 text-sm">置信度</span>
                  <span className={`text-lg font-bold ${getResultConfig(result.class_index).color}`}>{result.confidence}%</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getResultConfig(result.class_index).color} bg-white/60`}>
                {getResultConfig(result.class_index).label}
              </div>
            </div>

            {/* 概率详情 */}
            <div className="bg-white/60 rounded-2xl p-4 space-y-4">
              <p className="text-sm text-gray-500 font-medium">分类概率分布</p>
              {[
                { label: '✅ 正常', prob: result.normal_prob, color: 'from-green-400 to-emerald-500' },
                { label: '⚠️ 发霉不长毛', prob: result.moldy_light_prob, color: 'from-yellow-400 to-amber-500' },
                { label: '❌ 发霉长毛', prob: result.moldy_heavy_prob, color: 'from-red-400 to-rose-500' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-700">{item.label}</span>
                    <span className="font-bold text-gray-800">{item.prob}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.prob}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className={`h-full bg-gradient-to-r ${item.color}rounded-full relative`}
                    >
                      <div className="absolute inset-0 progress-bar"></div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 模型信息 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-4 card-shadow"
      >
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🧠</span>
            <span className="text-gray-600">ResNet50+CBAM</span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <span className="text-lg">📊</span>
            <span className="text-gray-600">3分类</span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🔧</span>
            <span className="text-gray-600">Otsu预处理</span>
          </div>
        </div>
      </motion.div>

      {/* 使用提示 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-2xl p-5 card-shadow"
      >
        <h3 className="font-bold text-primary-800 mb-4 flex items-center gap-2">
          <span>💡</span> 使用提示
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { emoji: '📸', title: '拍摄建议', desc: '光线充足，背景简洁' },
            { emoji: '🎯', title: '对焦清晰', desc: '确保坚果图像清晰' },
            { emoji: '📐', title: '角度正面', desc: '正面拍摄效果最佳' },
            { emoji: '🔍', title: '单颗检测', desc: '每次检测一颗坚果' },
          ].map((tip, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.05 }}
              className="flex items-start gap-3 p-3 bg-white/50 rounded-xl"
            >
              <span className="text-xl">{tip.emoji}</span>
              <div>
                <p className="font-medium text-gray-800 text-sm">{tip.title}</p>
                <p className="text-xs text-gray-500">{tip.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 安全知识 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-2xl p-5 card-shadow"
      >
        <h3 className="font-bold text-primary-800 mb-4 flex items-center gap-2">
          <span>📚</span> 黄曲霉知识
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-medium text-red-700 text-sm">什么是黄曲霉毒素？</p>
              <p className="text-xs text-red-600 mt-1">黄曲霉毒素是一种强致癌物质，主要由黄曲霉菌产生，常见于霉变的花生、玉米等坚果谷物中。</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-100">
            <span className="text-xl">🔬</span>
            <div>
              <p className="font-medium text-yellow-700 text-sm">如何识别霉变？</p>
              <p className="text-xs text-yellow-600 mt-1">霉变坚果通常表面有白色或黄绿色霉斑，有异味，口感发苦。轻度霉变肉眼难以察觉。</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
            <span className="text-xl">✅</span>
            <div>
              <p className="font-medium text-green-700 text-sm">预防建议</p>
              <p className="text-xs text-green-600 mt-1">购买正规渠道产品，存放于干燥通风处，发现霉变立即丢弃，切勿食用。</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Home

