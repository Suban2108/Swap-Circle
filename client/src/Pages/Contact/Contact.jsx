"use client"

import React, { useState } from "react"
import {
  Mail, Phone, MapPin, MessageSquare, Users,
  Recycle, Heart, Calendar, BarChart3, Send,
  CheckCircle
} from "lucide-react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import HeroSection from "./HeroSection"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const res = await fetch("http://localhost:5005/api/users/send-contact-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.success) {
        setSubmitStatus("success")
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          inquiryType: "general",
        })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Support",
      content: "hello@swapcircle.com",
      description: "Get help with your community",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Community Hotline",
      content: "+1 (555) 123-SWAP",
      description: "Mon-Fri, 9am-6pm EST",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Headquarters",
      content: "123 Community St, Sustainability City",
      description: "Visit our eco-friendly office",
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Live Chat",
      content: "Available 24/7",
      description: "Instant community support",
    },
  ]

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Small Communities",
      description: "Perfect for hostels, apartments, and close-knit groups of 10-20 users",
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: "Sustainable Impact",
      description: "Track your environmental impact with our waste diversion calculator",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Karma System",
      description: "Earn points and badges for donations and community participation",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Event Mode",
      description: "Organize themed donation events like 'Winter Donation Week'",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-sky-100 mt-[40px]">
      <HeroSection />
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">Get In Touch</h1>
            <p className="text-xl text-blue-800 max-w-3xl mx-auto leading-relaxed">
              Join our community of sustainability champions. Whether you're starting a new SwapCircle
              or need support for your existing community, we're here to help.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Info */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
              <h2 className="text-3xl font-bold text-blue-900 mb-8 flex items-center">
                <MessageSquare className="w-8 h-8 text-blue-600 mr-3" />
                Contact Information
              </h2>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-blue-50 hover:bg-orange-100 transition-colors duration-200">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{item.title}</h3>
                      <p className="text-orange-600 font-medium">{item.content}</p>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-orange-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Community Support Hours</h3>
                <p className="text-gray-600">
                  Our community managers are available to help you set up and optimize your SwapCircle experience.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
              <h2 className="text-3xl font-bold text-blue-900 mb-8 flex items-center">
                <Send className="w-8 h-8 text-blue-600 mr-3" />
                Send us a Message
              </h2>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-800">Message sent successfully! We'll get back to you soon.</p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-medium">
                  Oops! Something went wrong. Please try again later.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type</label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="community">Start a Community</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white resize-none"
                    placeholder="Tell us about your community or how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-orange-600 hover:to-orange-700 focus:ring-4 focus:ring-orange-200 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Interactive Map Section */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 flex items-center">
              <MapPin className="w-8 h-8 text-blue-600 mr-3" />
              Community Locations
            </h2>
            <div className="overflow-hidden rounded-2xl h-[600px]">
              <MapContainer center={[22.9734, 78.6569]} zoom={5} className="h-full w-full z-10">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={[12.9716, 77.5946]}>
                  <Popup>Bengaluru - SwapCircle Community</Popup>
                </Marker>
                <Marker position={[28.6139, 77.2090]}>
                  <Popup>Delhi - SwapCircle Community</Popup>
                </Marker>
                <Marker position={[19.0760, 72.8777]}>
                  <Popup>Mumbai - SwapCircle Community</Popup>
                </Marker>
                <Marker position={[13.0827, 80.2707]}>
                  <Popup>Chennai - SwapCircle Community</Popup>
                </Marker>
                <Marker position={[17.3850, 78.4867]}>
                  <Popup>Hyderabad - SwapCircle Community</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {React.cloneElement(feature.icon, { className: "w-8 h-8 text-white" })}
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
