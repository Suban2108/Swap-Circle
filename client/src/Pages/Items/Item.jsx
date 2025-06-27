import React, { useState } from 'react'
import {
    Plus,
    Eye,
    Heart,
    MessageCircle,
    User,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    X
} from 'lucide-react'
import HeroSection from './HeroSection'
import SearchFilterBar from './SearchFilterBar'

const Shop = () => {
    const [selectedItem, setSelectedItem] = useState(null)
    const [showSwapModal, setShowSwapModal] = useState(false)

    const [userItems, setUserItems] = useState([
        {
            id: 1,
            name: 'Gaming Setup',
            description: 'Complete gaming rig with RGB lighting',
            category: 'Electronics',
            condition: 'Excellent',
            type: 'barter',
            status: 'available',
            views: 89,
            likes: 34,
            image: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=400',
            datePosted: '2024-12-22'
        },
        {
            id: 2,
            name: 'Vintage Camera',
            description: 'Classic film camera in working condition',
            category: 'Electronics',
            condition: 'Good',
            type: 'barter',
            status: 'available',
            views: 156,
            likes: 67,
            image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400',
            datePosted: '2024-12-21'
        }
    ])

    const allItems = [
        {
            id: 1,
            name: "MacBook Pro 2019",
            description: "Excellent condition, barely used",
            category: "Electronics",
            condition: "Excellent",
            type: "barter",
            status: "available",
            views: 145,
            likes: 56,
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
            datePosted: "2024-12-20",
            user: {
                id: 1,
                name: "Sarah Johnson",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b412?w=100",
                email: "sarah.j@email.com",
                phone: "+1 (555) 123-4567",
                location: "San Francisco, CA",
                rating: 4.8,
                swaps: 12
            }
        },
        {
            id: 2,
            name: "Vintage Leather Jacket",
            description: "Authentic 1980s leather jacket, great condition",
            category: "Clothing",
            condition: "Good",
            type: "barter",
            status: "available",
            views: 234,
            likes: 89,
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
            datePosted: "2024-12-19",
            user: {
                id: 2,
                name: "Mike Chen",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
                email: "mike.chen@email.com",
                phone: "+1 (555) 987-6543",
                location: "Austin, TX",
                rating: 4.9,
                swaps: 28
            }
        },
        {
            id: 3,
            name: "Professional Camera Lens",
            description: "Canon 85mm f/1.4 lens, perfect for portraits",
            category: "Electronics",
            condition: "Excellent",
            type: "barter",
            status: "available",
            views: 187,
            likes: 73,
            image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
            datePosted: "2024-12-18",
            user: {
                id: 3,
                name: "Emma Rodriguez",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
                email: "emma.r@email.com",
                phone: "+1 (555) 456-7890",
                location: "New York, NY",
                rating: 4.7,
                swaps: 15
            }
        },
        {
            id: 4,
            name: "Handmade Ceramic Vases",
            description: "Set of 3 unique ceramic vases, artisan made",
            category: "Home & Garden",
            condition: "Excellent",
            type: "donation",
            status: "available",
            views: 98,
            likes: 42,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
            datePosted: "2024-12-17",
            user: {
                id: 4,
                name: "Alex Thompson",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
                email: "alex.t@email.com",
                phone: "+1 (555) 321-0987",
                location: "Portland, OR",
                rating: 4.6,
                swaps: 8
            }
        },
        {
            id: 5,
            name: "Electric Guitar",
            description: "Fender Stratocaster, great for beginners",
            category: "Music",
            condition: "Good",
            type: "barter",
            status: "available",
            views: 312,
            likes: 124,
            image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400",
            datePosted: "2024-12-16",
            user: {
                id: 5,
                name: "Jordan Kim",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
                email: "jordan.k@email.com",
                phone: "+1 (555) 654-3210",
                location: "Seattle, WA",
                rating: 4.9,
                swaps: 22
            }
        },
        {
            id: 6,
            name: "Designer Handbag",
            description: "Authentic designer bag, barely used",
            category: "Fashion",
            condition: "Excellent",
            type: "barter",
            status: "available",
            views: 267,
            likes: 98,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
            datePosted: "2024-12-15",
            user: {
                id: 6,
                name: "Lisa Park",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
                email: "lisa.p@email.com",
                phone: "+1 (555) 789-0123",
                location: "Miami, FL",
                rating: 4.8,
                swaps: 19
            }
        },
        {
            id: 7,
            name: "Mountain Bike",
            description: "Trail-ready, includes suspension and gear kit",
            category: "Sports",
            condition: "Good",
            type: "barter",
            status: "available",
            views: 199,
            likes: 61,
            image: "https://images.unsplash.com/photo-1584991585123-75f33cc4cb94?w=400",
            datePosted: "2024-12-14",
            user: {
                id: 7,
                name: "Tom Lee",
                avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100",
                email: "tom.lee@email.com",
                phone: "+1 (555) 147-2589",
                location: "Denver, CO",
                rating: 4.5,
                swaps: 10
            }
        },
        {
            id: 8,
            name: "Cookware Set",
            description: "Non-stick 10-piece cookware, never used",
            category: "Home & Garden",
            condition: "New",
            type: "donation",
            status: "available",
            views: 88,
            likes: 30,
            image: "https://images.unsplash.com/photo-1572448862528-8b48f9f78a85?w=400",
            datePosted: "2024-12-13",
            user: {
                id: 8,
                name: "Sophia Green",
                avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=100",
                email: "sophia.g@email.com",
                phone: "+1 (555) 369-8741",
                location: "Chicago, IL",
                rating: 4.6,
                swaps: 14
            }
        },
        {
            id: 9,
            name: "Bluetooth Speaker",
            description: "Compact, waterproof, and powerful sound",
            category: "Electronics",
            condition: "Excellent",
            type: "barter",
            status: "available",
            views: 134,
            likes: 49,
            image: "https://images.unsplash.com/photo-1610394217450-2e9d1b3c2ce0?w=400",
            datePosted: "2024-12-12",
            user: {
                id: 9,
                name: "Daniel Cruz",
                avatar: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=100",
                email: "daniel.c@email.com",
                phone: "+1 (555) 302-9982",
                location: "Atlanta, GA",
                rating: 4.7,
                swaps: 17
            }
        },
        {
            id: 10,
            name: "Fitness Tracker",
            description: "Tracks steps, heart rate, and sleep cycles",
            category: "Electronics",
            condition: "Very Good",
            type: "barter",
            status: "available",
            views: 112,
            likes: 36,
            image: "https://images.unsplash.com/photo-1586275722841-cc3c40e1e53f?w=400",
            datePosted: "2024-12-11",
            user: {
                id: 10,
                name: "Nina Patel",
                avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
                email: "nina.p@email.com",
                phone: "+1 (555) 714-6732",
                location: "Phoenix, AZ",
                rating: 4.9,
                swaps: 25
            }
        },
        {
            id: 5,
            name: "Electric Guitar",
            description: "Fender Stratocaster, great for beginners",
            category: "Music",
            condition: "Good",
            type: "barter",
            status: "available",
            views: 312,
            likes: 124,
            image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400",
            datePosted: "2024-12-16",
            user: {
                id: 5,
                name: "Jordan Kim",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
                email: "jordan.k@email.com",
                phone: "+1 (555) 654-3210",
                location: "Seattle, WA",
                rating: 4.9,
                swaps: 22
            }
        },
        {
            id: 6,
            name: "Designer Handbag",
            description: "Authentic designer bag, barely used",
            category: "Fashion",
            condition: "Excellent",
            type: "barter",
            status: "available",
            views: 267,
            likes: 98,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
            datePosted: "2024-12-15",
            user: {
                id: 6,
                name: "Lisa Park",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
                email: "lisa.p@email.com",
                phone: "+1 (555) 789-0123",
                location: "Miami, FL",
                rating: 4.8,
                swaps: 19
            }
        }
    ]

    const handleSwapRequest = (item) => {
        setSelectedItem(item)
        setShowSwapModal(true)
    }

    const handleSelectUserItem = (userItem) => {
        console.log(`Requesting swap: ${userItem.name} for ${selectedItem.name}`)
        setShowSwapModal(false)
        setSelectedItem(null)
    }

    const UserTooltip = ({ user, children }) => {
        const [showTooltip, setShowTooltip] = useState(false)

        return (
            <div className="relative inline-block">
                <div
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="cursor-pointer"
                >
                    {children}
                </div>
                {showTooltip && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
                        <div className="flex items-center space-x-3 mb-3">
                            <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                            <div>
                                <h4 className="font-semibold text-gray-800">{user.name}</h4>
                                <div className="flex items-center text-sm text-yellow-600">
                                    <span>★ {user.rating}</span>
                                    <span className="ml-2 text-gray-500">({user.swaps} swaps)</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center"><Mail className="w-4 h-4 mr-2" />{user.email}</div>
                            <div className="flex items-center"><Phone className="w-4 h-4 mr-2" />{user.phone}</div>
                            <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" />{user.location}</div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <>
            <HeroSection />
            <div className="p-13 space-y-10 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Explore & Swap</h1>
                    <p className="text-gray-600 mt-2 text-sm">Find amazing items and swap them with your own treasures!</p>
                </div>

                <SearchFilterBar />


                {/* Items Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div className="relative">
                                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />

                                <div className="absolute top-2 left-2">
                                    <UserTooltip user={item.user}>
                                        <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden">
                                            <img src={item.user.avatar} alt={item.user.name} className="w-full h-full object-cover" />
                                        </div>
                                    </UserTooltip>
                                </div>

                                <div className="absolute top-2 right-2 flex space-x-1">
                                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${item.type === "barter" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                                        }`}>
                                        {item.type}
                                    </span>
                                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${item.status === "available" ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-800"
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4">
                                <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
                                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                <div className="flex justify-between text-sm text-gray-500 mb-3">
                                    <span>{item.category}</span>
                                    <span>Condition: {item.condition}</span>
                                </div>
                                <div className="flex justify-between mb-3 text-sm text-gray-500">
                                    <div className="flex space-x-3">
                                        <span className="flex items-center"><Eye className="w-4 h-4 mr-1" />{item.views}</span>
                                        <span className="flex items-center"><Heart className="w-4 h-4 mr-1" />{item.likes}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">{item.datePosted}</span>
                                </div>

                                <div className="flex space-x-2">
                                    <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition text-sm flex items-center justify-center space-x-1">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>Contact</span>
                                    </button>
                                    {item.type === "barter" && (
                                        <button
                                            onClick={() => handleSwapRequest(item)}
                                            className="flex-1 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition text-sm flex items-center justify-center space-x-1"
                                        >
                                            <ArrowRight className="w-4 h-4" />
                                            <span>Swap</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Swap Modal */}
                {showSwapModal && selectedItem && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Select Your Item to Swap for "{selectedItem.name}"
                                    </h3>
                                    <button
                                        onClick={() => setShowSwapModal(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <img src={selectedItem.image} alt={selectedItem.name} className="w-16 h-16 rounded-lg object-cover" />
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{selectedItem.name}</h4>
                                            <p className="text-sm text-gray-600">{selectedItem.description}</p>
                                            <p className="text-sm text-gray-500">Owner: {selectedItem.user.name}</p>
                                        </div>
                                    </div>
                                </div>

                                {userItems.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-gray-600 mb-4">You need to have items uploaded to make a swap request.</p>
                                        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition flex items-center space-x-2 mx-auto">
                                            <Plus className="w-4 h-4" />
                                            <span>Add Your First Item</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <h4 className="font-medium text-gray-800 mb-3">Your Available Items:</h4>
                                        <div className="space-y-3">
                                            {userItems.map((userItem) => (
                                                <div
                                                    key={userItem.id}
                                                    className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                                                    onClick={() => handleSelectUserItem(userItem)}
                                                >
                                                    <img src={userItem.image} alt={userItem.name} className="w-12 h-12 rounded-lg object-cover" />
                                                    <div className="flex-1">
                                                        <h5 className="font-medium text-gray-800">{userItem.name}</h5>
                                                        <p className="text-sm text-gray-600">{userItem.description}</p>
                                                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                                                            <span>{userItem.category}</span>
                                                            <span>Condition: {userItem.condition}</span>
                                                        </div>
                                                    </div>
                                                    <ArrowRight className="w-5 h-5 text-purple-600" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Shop
