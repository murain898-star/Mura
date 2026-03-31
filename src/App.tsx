import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Briefcase, 
  Code, 
  Palette, 
  Clock,
  Send
} from 'lucide-react';

const MuraLogo = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="3" stdDeviation="3" floodOpacity="0.4" />
      </filter>
    </defs>
    <g filter="url(#shadow)">
      {/* Right Arch (Teal) */}
      <path d="M 50 55 C 50 15, 85 15, 85 55 L 85 80" stroke="#38B2A5" strokeWidth="14" strokeLinecap="round" />
      {/* Left Arch (Dark Blue) */}
      <path d="M 15 80 L 15 55 C 15 15, 50 15, 50 55" stroke="#1A3B5C" strokeWidth="14" strokeLinecap="round" />
      {/* Center Circle */}
      <circle cx="50" cy="55" r="14" stroke="#235A68" strokeWidth="14" />
      
      {/* Glitch Blocks */}
      <rect x="3" y="40" width="12" height="8" fill="#1A3B5C" />
      <rect x="22" y="65" width="8" height="8" fill="#1A3B5C" />
      <rect x="85" y="35" width="10" height="8" fill="#38B2A5" />
      <rect x="73" y="60" width="12" height="8" fill="#38B2A5" />
    </g>
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<'project' | 'appointment'>('project');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData.entries());
    
    // Add subject for the email
    data._subject = `New ${activeTab === 'project' ? 'Project Inquiry' : 'Appointment Request'} from Mura Website`;
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/mura.in898@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
        formElement.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MuraLogo className="w-10 h-10" />
            <span className="font-bold text-xl tracking-tight">Mura</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#about" className="hover:text-white transition-colors">About Us</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <a 
            href="#contact"
            className="bg-white text-zinc-950 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors"
          >
            Let's Talk
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950 -z-10" />
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Bring your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">vision</span> to life with Mura.
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed max-w-2xl">
              We are a digital agency specializing in crafting exceptional web experiences, mobile applications, and brand identities. Discuss your project with us today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all"
              >
                Start a Project <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#contact"
                onClick={() => setActiveTab('appointment')}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all"
              >
                Book Appointment <Calendar className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Expertise</h2>
            <p className="text-zinc-400 max-w-2xl">Comprehensive digital solutions tailored to your business needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Code, title: 'Web Development', desc: 'Custom, responsive websites built with modern technologies.' },
              { icon: Palette, title: 'UI/UX Design', desc: 'Intuitive and engaging user interfaces that delight your customers.' },
              { icon: Briefcase, title: 'Digital Strategy', desc: 'Data-driven approaches to grow your online presence and reach.' }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-950 border border-zinc-800 p-8 rounded-3xl hover:border-indigo-500/50 transition-colors group"
              >
                <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
                  <service.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Contact & Booking Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Column: Info */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's build something great.</h2>
              <p className="text-zinc-400 text-lg mb-12">
                Whether you have a fully fleshed-out project or just an idea, we're here to help. Book a consultation or send us your project details.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-zinc-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-500 mb-1">Email Us</h4>
                    <p className="text-lg font-medium">mura.in898@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-zinc-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-500 mb-1">Call Us</h4>
                    <p className="text-lg font-medium">+91 8128851553</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-zinc-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-500 mb-1">Located In</h4>
                    <p className="text-lg font-medium">Surat, Gujarat</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Form */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden">
              {/* Form Tabs */}
              <div className="flex p-1 bg-zinc-950 rounded-full mb-8 relative z-10">
                <button
                  onClick={() => setActiveTab('project')}
                  className={`flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'project' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" /> Discuss Project
                </button>
                <button
                  onClick={() => setActiveTab('appointment')}
                  className={`flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'appointment' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Calendar className="w-4 h-4" /> Book Appointment
                </button>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-16 text-center h-[400px]"
                  >
                    <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
                    <p className="text-zinc-400 max-w-xs mx-auto">
                      Thank you for reaching out. Our team will get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSubmit}
                    className="space-y-5 relative z-10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Full Name</label>
                        <input required name="name" type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Email Address</label>
                        <input required name="email" type="email" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="john@example.com" />
                      </div>
                    </div>

                    {activeTab === 'project' ? (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-zinc-400">Project Type</label>
                          <select name="projectType" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none">
                            <option>Web Development</option>
                            <option>Mobile App</option>
                            <option>UI/UX Design</option>
                            <option>E-commerce</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-zinc-400">Project Details</label>
                          <textarea required name="projectDetails" rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none" placeholder="Tell us about your goals, timeline, and budget..."></textarea>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Preferred Date</label>
                            <div className="relative">
                              <input required name="preferredDate" type="date" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all [&::-webkit-calendar-picker-indicator]:invert" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Preferred Time</label>
                            <div className="relative">
                              <input required name="preferredTime" type="time" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all [&::-webkit-calendar-picker-indicator]:invert" />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-zinc-400">Topic of Discussion</label>
                          <input required name="topic" type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="E.g., Initial consultation, Project scoping..." />
                        </div>
                      </>
                    )}

                    <button disabled={isSubmitting} type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-all mt-4">
                      {isSubmitting ? 'Sending...' : (activeTab === 'project' ? 'Submit Project Details' : 'Confirm Appointment')} {!isSubmitting && <Send className="w-4 h-4" />}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <MuraLogo className="w-8 h-8" />
            <span className="font-bold tracking-tight">Mura</span>
          </div>
          <p className="text-zinc-500 text-sm">Â© {new Date().getFullYear()} Mura Agency. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
