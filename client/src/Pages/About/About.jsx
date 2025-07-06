import React from 'react';
import {
  Users,
  Recycle,
  Heart,
  MessageCircle,
  Search,
  Shield,
  Star,
  Truck,
  Calendar,
  BarChart3,
  Leaf,
  Home,
  GraduationCap,
  Coffee,
  UserPlus
} from 'lucide-react';
import Banner_Image from '../../assets/About-banner.avif'
import toast from 'react-hot-toast';

// Hero Section Component
const HeroSection = () => (
  <div className=" mt-[20px] bg-gradient-to-br from-orange-50 via-amber-500 to-yellow-50 py-20 px-6">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

      {/* Text Section */}
      <div className="text-center md:text-left">
        <div className="flex justify-center md:justify-start mb-6">
          <div className="bg-orange-100 p-4 rounded-full inline-block">
            <Recycle className="w-16 h-16 text-orange-600" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-orange-600">Swap-Circle</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          A local barter and donation platform that brings communities together through sustainable sharing.
          Turn your unused items into someone else's treasure while building meaningful connections.
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
          <span className="bg-white px-4 py-2 rounded-full shadow-sm border">🌱 Sustainability First</span>
          <span className="bg-white px-4 py-2 rounded-full shadow-sm border">🤝 Community Driven</span>
          <span className="bg-white px-4 py-2 rounded-full shadow-sm border">♻️ Zero Waste</span>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative rounded-xl overflow-hidden shadow-xl border border-gray-200">
        <img
          src={Banner_Image}
          alt="Community barter"
          className="w-full h-full object-cover"
        />
        {/* Optional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent"></div>
      </div>
    </div>
  </div>
);

// Mission Statement Component
const MissionStatement = () => (
  <div className="py-16 px-6 bg-white">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
      <div className="bg-gradient-to-r from-orange-100 to-blue-100 p-8 rounded-2xl">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          SwapCircle exists to foster sustainable communities where sharing is caring. We believe that
          every unused item has the potential to bring joy to someone else, while reducing waste and
          strengthening bonds between neighbors.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <Leaf className="w-8 h-8 text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900">Environmental Impact</h3>
            <p className="text-sm text-gray-600">Reduce waste through reuse</p>
          </div>
          <div className="text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900">Community Building</h3>
            <p className="text-sm text-gray-600">Connect with your neighbors</p>
          </div>
          <div className="text-center">
            <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900">Mutual Support</h3>
            <p className="text-sm text-gray-600">Help each other thrive</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Target Audiences Component
const TargetAudiences = () => {
  const audiences = [
    {
      icon: GraduationCap,
      title: "Students in Hostels",
      description: "Share textbooks, electronics, and daily essentials with fellow students",
      color: "text-blue-600"
    },
    {
      icon: Home,
      title: "Apartment Residents",
      description: "Exchange household items, tools, and furniture within your building",
      color: "text-orange-600"
    },
    {
      icon: Users,
      title: "Close Friend Groups",
      description: "Share items within your trusted circle of friends and family",
      color: "text-purple-600"
    },
    {
      icon: Coffee,
      title: "Coworking Teams",
      description: "Barter office supplies, books, and equipment with colleagues",
      color: "text-orange-600"
    }
  ];

  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Perfect for Small Communities
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((audience, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <audience.icon className={`w-12 h-12 ${audience.color} mb-4`} />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{audience.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Core Features Component
const CoreFeatures = () => {
  const features = [
    {
      icon: UserPlus,
      title: "Invite-Only Authentication",
      description: "Join trusted communities through secure invitations"
    },
    {
      icon: Recycle,
      title: "Barter & Donate Items",
      description: "List items for exchange or give them away freely"
    },
    {
      icon: Search,
      title: "Smart Search & Filters",
      description: "Find exactly what you need with advanced filtering"
    },
    {
      icon: MessageCircle,
      title: "Built-in Chat System",
      description: "Coordinate exchanges through secure messaging"
    },
    {
      icon: Shield,
      title: "Admin Dashboard",
      description: "Moderate users and items to maintain community standards"
    },
    {
      icon: Heart,
      title: "Request System",
      description: "Post requests for specific items you need"
    }
  ];

  return (
    <div className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Core Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-gradient-to-br from-orange-50 to-blue-50 p-6 rounded-xl border border-gray-100 hover:border-orange-200 transition-all duration-300 group-hover:shadow-lg">
                <feature.icon className="w-10 h-10 text-orange-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Future Features Component
const FutureFeatures = () => {
  const futureFeatures = [
    {
      icon: Star,
      title: "Karma Points System",
      description: "Earn points for donations and unlock special badges and titles",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Truck,
      title: "Delivery Coordination",
      description: "Add delivery instructions and coordinate pickup times",
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: Calendar,
      title: "Event Mode",
      description: "Themed donation events with special rewards and community",
      color: "from-orange-400 to-teal-500"
    },
    {
      icon: BarChart3,
      title: "Impact Dashboard",
      description: "Track your environmental impact and community contributions",
      color: "from-pink-400 to-red-500"
    }
  ];

  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Coming Soon
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We're constantly working to make SwapCircle even better. Here's what's in our pipeline:
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {futureFeatures.map((feature, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
              <div className="absolute -top-2 -right-2 bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
                Soon
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Social Impact Component
const SocialImpact = () => (
  <div className="py-16 px-6 bg-gradient-to-br from-orange-600 to-blue-600 text-white">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">Making a Real Difference</h2>
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
          <div className="text-3xl font-bold mb-2">♻️</div>
          <h3 className="text-lg font-semibold mb-2">Waste Reduction</h3>
          <p className="text-orange-100">Every item shared prevents waste from entering landfills</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
          <div className="text-3xl font-bold mb-2">🤝</div>
          <h3 className="text-lg font-semibold mb-2">Community Bonds</h3>
          <p className="text-orange-100">Strengthen relationships through mutual support and sharing</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
          <div className="text-3xl font-bold mb-2">💚</div>
          <h3 className="text-lg font-semibold mb-2">Sustainable Living</h3>
          <p className="text-orange-100">Promote conscious consumption and circular economy principles</p>
        </div>
      </div>
      <p className="text-xl text-orange-100 leading-relaxed">
        Together, we're building a world where nothing useful goes to waste and every community thrives through sharing.
      </p>
    </div>
  </div>
);

// Call to Action Component
const CallToAction = () => (
  <div className="py-20 px-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-6">
        Ready to Join the Circle?
      </h2>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Start sharing, start caring, and become part of a community that values sustainability and mutual support.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => toast.success("🎉 Your invite request has been sent to the admin. We'll get back to you shortly!")}
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl">
          Request an Invite
        </button>

        <button className="border-2 border-orange-600 text-orange-600 hover:bg-blue-200 hover:text-blue-700 hover:border-blue-600 px-8 py-4 rounded-xl font-semibold transition-colors">
          Learn More
        </button>
      </div>
    </div>
  </div>
);

// Main About Component
const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <HeroSection />
      <MissionStatement />
      <TargetAudiences />
      <CoreFeatures />
      <FutureFeatures />
      <SocialImpact />
      <CallToAction />
    </div>
  );
};

export default About;
