import { motion } from 'framer-motion'

function About() {
  const features = [
    { emoji: '🧠', title: 'ResNet18', desc: 'PyTorch 3-class image classifier' },
    { emoji: '📊', title: '3-class screening', desc: 'Normal / light mold / visible mold' },
    { emoji: '🔧', title: 'Otsu preprocessing', desc: 'Foreground masking before inference' },
    { emoji: '🧾', title: 'Probability output', desc: 'Class confidence and probability distribution' },
  ]

  const techStack = [
    { layer: 'Frontend', techs: ['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
    { layer: 'Backend', techs: ['Flask', 'PyTorch', 'OpenCV', 'NumPy'] },
    { layer: 'Model', techs: ['ResNet18', 'Softmax', '224×224 input'] },
  ]

  return (
    <div className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-6 card-shadow"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center shadow-md">
            <span className="text-3xl">🥜</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary-800">Peanut Mold Screening System</h2>
            <p className="text-xs text-gray-400">Image-based research and engineering prototype</p>
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed text-sm">
          This project performs visual three-class screening of peanut images. The backend applies
          Otsu-based foreground preprocessing and a PyTorch ResNet18 classifier, then returns the
          predicted class and probability distribution to the web interface.
        </p>

        <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
          <strong>Important:</strong> visual mold classification is not the same as chemical
          aflatoxin quantification. This prototype is not a replacement for laboratory testing or
          a certified food-safety device.
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.08 * index }}
            whileHover={{ scale: 1.03, y: -2 }}
            className="glass rounded-2xl p-4 card-shadow"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mb-3 shadow">
              <span className="text-xl">{feature.emoji}</span>
            </div>
            <h3 className="font-bold text-primary-800 text-sm">{feature.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-5 card-shadow"
      >
        <h3 className="font-bold text-primary-800 mb-4">Pipeline</h3>
        <div className="grid grid-cols-4 gap-2 text-center text-xs text-gray-600">
          {[
            ['📷', 'Image'],
            ['🔧', 'Otsu mask'],
            ['🧠', 'ResNet18'],
            ['📊', 'Probabilities'],
          ].map(([emoji, label]) => (
            <div key={label} className="bg-white/60 rounded-xl p-3">
              <div className="text-2xl mb-1">{emoji}</div>
              <div>{label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-5 card-shadow"
      >
        <h3 className="font-bold text-primary-800 mb-4">Technology</h3>
        <div className="space-y-3">
          {techStack.map((stack) => (
            <div key={stack.layer} className="flex items-start gap-3">
              <div className="w-20 shrink-0 py-1.5 text-center text-xs font-bold text-white rounded-lg bg-primary-500">
                {stack.layer}
              </div>
              <div className="flex flex-wrap gap-2">
                {stack.techs.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-white/60 rounded-lg text-xs text-gray-600">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="glass rounded-2xl p-4 card-shadow text-center text-xs text-gray-400">
        Prototype status · Claims are limited to behavior implemented in the public repository.
      </div>
    </div>
  )
}

export default About
