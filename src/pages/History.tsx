import { useState, useEffect } from 'react'
import { motion, AnimatePresence }from 'framer-motion'

interface HistoryItem {
  result: string
  confidence: number
  normal_prob: number
  moldy_light_prob: number
  moldy_heavy_prob: number
  class_index: number
  image: string
  time: string
}

function History() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null)
  const [filter, setFilter] = useState<number | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('detection_history')
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }, [])

  const clearHistory = () => {
    if (confirm('确定要清空所有历史记录吗？')) {
      localStorage.removeItem('detection_history')
      setHistory([])
    }
  }

  const deleteItem = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const newHistory = history.filter((_, i) => i !== index)
    setHistory(newHistory)
    localStorage.setItem('detection_history', JSON.stringify(newHistory))
  }

  const getStatusConfig = (classIndex: number) => {
    switch (classIndex) {
      case 0: return { emoji: '✅', color: 'text-green-600', bg: 'result-safe', label: '正常' }
      case 1: return { emoji: '⚠️', color: 'text-yellow-600', bg: 'result-warning', label: '轻度霉变' }
      case 2: return { emoji: '❌', color: 'text-red-600', bg: 'result-danger', label: '重度霉变' }
      default: return { emoji: '❓', color: 'text-gray-600', bg: 'bg-gray-50', label: '未知' }
    }
  }

  const filteredHistory = filter !== null ? history.filter(h => h.class_index === filter) : history
  const stats = {
    total: history.length,
    normal: history.filter(h => h.class_index === 0).length,
    warning: history.filter(h => h.class_index === 1).length,
    danger: history.filter(h => h.class_index === 2).length
  }

  return (
    <div className="space-y-4">
      {/* 统计卡片 */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-4 card-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📊</span>
            <span className="font-bold text-primary-800">检测统计</span>
          </div>
          {history.length > 0 && (
            <motion.button whileHover={{ scale: 1.05 }}whileTap={{ scale: 0.95 }} onClick={clearHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-medium hover:bg-red-100">
              <span>🗑️</span> 清空全部
            </motion.button>
          )}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: '全部', value: stats.total, emoji: '📋', active: filter === null, filterVal: null },
            { label: '正常', value: stats.normal, emoji: '✅', active: filter === 0, filterVal: 0 },
            { label: '轻度', value: stats.warning, emoji: '⚠️', active: filter === 1, filterVal: 1 },
            { label: '重度', value: stats.danger, emoji: '❌', active: filter === 2, filterVal: 2 },
          ].map((item, idx) => (
            <motion.button key={idx}whileHover={{ scale: 1.05 }}whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(filter === item.filterVal ? null : item.filterVal)}
              className={`p-2 rounded-xl text-center transition-all ${item.active ? 'bg-primary-100 ring-2 ring-primary-300' : 'bg-white/50 hover:bg-white/80'}`}>
              <span className="text-lg">{item.emoji}</span>
              <p className="text-lg font-bold text-gray-800">{item.value}</p>
              <p className="text-xs text-gray-500">{item.label}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* 筛选提示 */}
      {filter !== null && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          className="flex items-center justify-between bg-primary-50 rounded-xl px-4 py-2">
          <span className="text-sm text-primary-700">当前筛选: <span className="font-bold">{getStatusConfig(filter).label}</span> ({filteredHistory.length}条)</span>
          <button onClick={() => setFilter(null)} className="text-primary-600 text-sm hover:underline">清除筛选</button>
        </motion.div>
      )}

      {/* 历史列表 */}
      {filteredHistory.length === 0 ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-3xl p-12 text-center card-shadow">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-4">
            <span className="text-5xl">📭</span>
          </motion.div>
          <p className="text-gray-600 font-medium text-lg">{filter !== null ? '该分类暂无记录' : '暂无检测记录'}</p>
          <p className="text-sm text-gray-400 mt-2">{filter !== null ? '尝试其他筛选条件' : '去首页上传图片开始检测吧'}</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: -20 }}animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.03 }}
              whileHover={{ scale: 1.02, x: 5 }}onClick={() => setSelectedItem(item)}
              className={`${getStatusConfig(item.class_index).bg}rounded-2xl p-4 card-shadow cursor-pointer`}>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={item.image} alt="检测图片" className="w-16 h-16 object-cover rounded-xl shadow-md" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow text-sm">
                    {getStatusConfig(item.class_index).emoji}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${getStatusConfig(item.class_index).color}`}>{item.result}</span>
                    <span className="text-xs px-2 py-0.5 bg-white/60 rounded-full text-gray-600">{item.confidence}%</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1"><span>🕐</span> {item.time}</p>
                </div>
                <motion.button whileHover={{ scale: 1.2 }}whileTap={{ scale: 0.9 }}onClick={(e) => deleteItem(index, e)}
                  className="w-8 h-8 flex items-center justify-center bg-white/60 hover:bg-red-100 rounded-full text-gray-400 hover:text-red-500">🗑️</motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 详情弹窗 */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedItem(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl p-5 max-w-sm w-full max-h-[85vh] overflow-y-auto card-shadow">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2"><span className="text-xl">📄</span><h3 className="text-lg font-bold text-gray-800">检测详情</h3></div>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500">✕</motion.button>
              </div>
              <div className="relative rounded-2xl overflow-hidden mb-4 shadow-lg">
                <img src={selectedItem.image} alt="检测图片" className="w-full" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  {getStatusConfig(selectedItem.class_index).emoji}
                  <span className={getStatusConfig(selectedItem.class_index).color}>{selectedItem.result}</span>
                </div>
              </div>
              <div className={`${getStatusConfig(selectedItem.class_index).bg}rounded-2xl p-4 mb-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center shadow">
                      <span className="text-2xl">{getStatusConfig(selectedItem.class_index).emoji}</span>
                    </div>
                    <div>
                      <p className={`text-xl font-bold ${getStatusConfig(selectedItem.class_index).color}`}>{selectedItem.result}</p>
                      <p className="text-sm text-gray-500">检测结果</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${getStatusConfig(selectedItem.class_index).color}`}>{selectedItem.confidence}%</p>
                    <p className="text-xs text-gray-400">置信度</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                <p className="text-sm font-medium text-gray-500 mb-3">概率分布</p>
                {[
                  { label: '正常', emoji: '✅', prob: selectedItem.normal_prob, color: 'bg-green-500' },
                  { label: '发霉不长毛', emoji: '⚠️', prob: selectedItem.moldy_light_prob, color: 'bg-yellow-500' },
                  { label: '发霉长毛', emoji: '❌', prob: selectedItem.moldy_heavy_prob, color: 'bg-red-500' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-sm">{item.emoji}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1"><span className="text-gray-600">{item.label}</span><span className="font-medium">{item.prob}%</span></div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${item.prob}%` }} transition={{ duration: 0.5, delay: idx * 0.1 }} className={`h-full ${item.color}rounded-full`}/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-400 text-xs mt-4 flex items-center justify-center gap-1"><span>🕐</span> {selectedItem.time}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default History

