'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, MapPin, Send, Github, Instagram, Facebook } from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formState)
    alert('Thank you! Your message has been sent.')
    setFormState({ name: '', email: '', message: '' })
  }

  const contactInfo = [
    { icon: <Mail />, label: 'Email', value: 'khatiwadaabhi123@gmail.com', href: 'mailto:khatiwadaabhi123@gmail.com' },
    { icon: <Github />, label: 'GitHub', value: 'AA-maker-dev', href: 'https://github.com/AA-maker-dev' },
    { icon: <MapPin />, label: 'Location', value: 'Hattiban, Lalitpur', href: 'https://www.google.com/maps/search/?api=1&query=Hattiban,+Lalitpur,+Nepal' },
  ]

  const socialLinks = [
    { icon: <Github />, label: 'GitHub', href: 'https://github.com/AA-maker-dev', color: 'hover:text-gray-400' },
    { icon: <Instagram />, label: 'Instagram', href: 'https://www.instagram.com/abhi_khatiwada/', color: 'hover:text-pink-400' },
    { icon: <Facebook />, label: 'Facebook', href: 'https://www.facebook.com/khatiwada.abhi/', color: 'hover:text-blue-400' },
  ]

  return (
    <section id="contact" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background animation */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animation-delay-4000" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block px-4 py-2 glass rounded-full text-sm mb-4 text-gradient-blue"
          >
            Let's Connect
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gradient"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Have a project in mind or want to collaborate? Let's connect!
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="space-y-8"
          >
            <motion.div
              className="glass p-8 rounded-2xl glow hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:-translate-y-2"
              whileHover={{ scale: 1.02 }}
            >
              <motion.h3
                className="text-2xl font-bold mb-6 text-gradient-blue"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                Let's talk about everything!
              </motion.h3>
              <motion.p
                className="text-gray-400 mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
              >
                Don't hesitate to reach out. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </motion.p>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -30, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 8, boxShadow: '0 20px 40px rgba(168, 85, 247, 0.2)' }}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all group"
                  >
                    <motion.div
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/50"
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <p className="text-sm text-gray-400">{item.label}</p>
                      <p className="font-semibold group-hover:text-gradient-blue transition-all duration-300">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <motion.div
                className="mt-8 pt-8 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.9 }}
              >
                <p className="text-sm text-gray-400 mb-4">Follow me on</p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                      whileHover={{
                        scale: 1.2,
                        rotate: 8,
                        boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
                      }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 rounded-full glass flex items-center justify-center ${social.color} transition-all duration-300 hover:border-white/40`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="glass p-8 rounded-2xl glow hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <motion.label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-gradient-blue"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  Your Name
                </motion.label>
                <motion.input
                  type="text"
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500"
                  placeholder="John Doe"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.55 }}
                  whileFocus={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)' }}
                />
              </div>

              <div>
                <motion.label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-gradient-blue"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  Your Email
                </motion.label>
                <motion.input
                  type="email"
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500"
                  placeholder="john@example.com"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.65 }}
                  whileFocus={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)' }}
                />
              </div>

              <div>
                <motion.label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-gradient-blue"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.7 }}
                >
                  Your Message
                </motion.label>
                <motion.textarea
                  id="message"
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none placeholder-gray-500"
                  placeholder="Tell me about your project..."
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.75 }}
                  whileFocus={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)' }}
                />
              </div>

              <motion.button
                type="submit"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(168, 85, 247, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                <motion.span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Send Message</span>
                <motion.span
                  className="relative"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Send className="w-4 h-4" />
                </motion.span>
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 pt-8 border-t border-white/10 text-center text-gray-400"
        >
          <p className="mb-2">© 2024 Portfolio. Built with Next.js, TypeScript & Tailwind CSS</p>
          <motion.p
            className="text-sm"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Designed & Developed by Abhi Khatiwada
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
