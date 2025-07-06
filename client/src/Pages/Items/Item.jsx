// MarketplacePage.jsx
"use client"

import React, { useState, useEffect } from "react"
import { Plus, Grid3X3, List, Filter } from "lucide-react"
import { Button } from "@/Components/ui/button"
import SearchFilterBar from "./Components/SearchFilterBar"
import ItemCard from "./Components/ItemCard"
import SwapModal from "./Components/SwapModal"
import CreateItemModal from "./Components/CreateItemModal"
import { useItems } from "../../hooks/UseItem"
import toast from "react-hot-toast"
import ItemList from "./Components/ItemList"
import { useAuth } from "@/context/authContext"
import ConfirmDialog from "@/components/shared/ConfirmDialog"
import UpdateItemModal from "./Components/UpdateModal"

const MarketplacePage = () => {
    const [viewMode, setViewMode] = useState("grid")
    const [showSwapModal, setShowSwapModal] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [searchParams, setSearchParams] = useState({})
    const [sortOption, setSortOption] = useState("newest")
    const [currentPage, setCurrentPage] = useState(1)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)
    const [itemToEdit, setItemToEdit] = useState(null)
    const { userId } = useAuth()

    const { items, pagination, loading, error, fetchItems, createItem, deleteItem, toggleLike, createSwapRequest, updateItem } =
        useItems()

    const currentUserId = userId;

    useEffect(() => {
        fetchItems(searchParams, currentPage, 20, sortOption)
    }, [searchParams, currentPage, sortOption, fetchItems])

    const handleSearch = (params) => {
        setSearchParams(params)
        setCurrentPage(1) // Reset to first page on new search
    }

    const handleSortChange = (sort) => {
        setSortOption(sort)
        setCurrentPage(1) // Reset to first page on sort change
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
        window.scrollTo(0, 0) // Scroll to top on page change
    }

    const handleSwapRequest = (item) => {
        setSelectedItem(item)
        setShowSwapModal(true)
    }

    const handleContact = (item) => {
        // Implement contact functionality
        toast.success(`Contact request sent to ${item.ownerId?.name}`)
    }

    const handleCreateItem = async (itemData, imageFiles = []) => {
        try {
            await createItem(itemData, imageFiles)
            toast.success("Item created successfully!")
            setShowCreateModal(false)
        } catch (error) {
            toast.error("Failed to create item")
        }
    }

    const handleDeleteItem = async (itemId) => {
        setItemToDelete(itemId)
        setConfirmOpen(true)
    }

    const confirmDeleteItem = async () => {
        if (itemToDelete) {
            try {
                await deleteItem(itemToDelete)
                toast.success("Item deleted successfully!")
            } catch (error) {
                toast.error("Failed to delete item")
            }
        }
        setConfirmOpen(false)
        setItemToDelete(null)
    }

    const handleEditItem = (itemId) => {
        const item = items.find(i => i._id === itemId)
        if (item) {
            setItemToEdit(item)
            setShowUpdateModal(true)
        }
    }

    const handleSwapSubmit = async (swapData) => {
        try {
            await createSwapRequest(swapData.requestedItemId, swapData.offeredItemId, swapData.message)
            toast.success("Swap request sent successfully!")
            setShowSwapModal(false)
        } catch (error) {
            toast.error("Failed to send swap request")
        }
    }

    const handleLikeItem = async (itemId) => {
        try {
            await toggleLike(itemId)
        } catch (error) {
            toast.error("Failed to like item")
        }
    }

    const handleUpdateItem = async (id, itemData, imageFiles = [], removeImages = []) => {
        try {
            await updateItem(id, itemData, imageFiles, removeImages);
            toast.success("Item updated successfully!");
            setShowUpdateModal(false);
            setItemToEdit(null);
            fetchItems(searchParams, currentPage, 20, sortOption); // refresh item list
        } catch (error) {
            toast.error("Failed to update item");
        }
    };

    const renderItemsSkeleton = () => (
        <div
            className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                }`}
        >
            {[...Array(8)].map((_, i) => (
                <ItemCard key={i} loading={true} />
            ))}
        </div>
    )

    const renderPagination = () => {
        if (!pagination || pagination.pages <= 1) return null

        return (
            <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1 || loading}
                    >
                        First
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || loading}
                    >
                        Previous
                    </Button>

                    <span className="text-sm px-3 py-2 bg-gray-100 rounded-md">
                        {currentPage} of {pagination.pages}
                    </span>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === pagination.pages || loading}
                    >
                        Next
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pagination.pages)}
                        disabled={currentPage === pagination.pages || loading}
                    >
                        Last
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 mt-16">
            {/* Hero Section */}
            <div className="mx-auto px-2 py-8 border border-red-500">
                <div className="bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-800 text-white rounded-2xl p-8 mb-8 mx-[85px]">
                    <div className="flex justify-between items-center flex-wrap h-30">
                        <div className="max-w-xl">
                            <h1 className="text-4xl font-bold mb-2">Swap & Share</h1>
                            <p className="text-orange-100 text-lg">
                                Turn your unused items into treasures. Connect with your community through sustainable trading.
                            </p>
                        </div>
                        <Button
                            onClick={() => setShowCreateModal(true)}
                            className="bg-white text-yellow-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 mt-4 md:mt-0"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            List Your First Item
                        </Button>
                    </div>
                </div>


                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Search and Filters */}
                    <div className="mb-8">
                        <SearchFilterBar onSearch={handleSearch} loading={loading} />
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {Object.keys(searchParams).length > 0 ? "Search Results" : "All Items"}
                            </h2>
                            {!loading && pagination && (
                                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{pagination.total} items</span>
                            )}
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                            <div className="flex items-center mr-4">
                                <span className="text-sm text-gray-600 mr-2">Sort:</span>
                                <select
                                    value={sortOption}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                    className="text-sm border rounded-md px-2 py-1"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="popular">Most Popular</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="alphabetical">A-Z</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant={viewMode === "grid" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setViewMode("grid")}
                                >
                                    <Grid3X3 className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setViewMode("list")}
                                >
                                    <List className="w-4 h-4" />
                                </Button>
                                <Button
                                    onClick={() => setShowCreateModal(true)}
                                    className="bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 ml-4"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Item
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Items Grid */}
                    {loading ? (
                        renderItemsSkeleton()
                    ) : error ? (
                        <div className="text-center py-12">
                            <div className="text-red-500 mb-4">
                                <Filter className="w-12 h-12 mx-auto mb-2" />
                                <p className="text-lg font-medium">Error loading items</p>
                                <p className="text-sm text-gray-600">{error}</p>
                            </div>
                            <Button onClick={() => fetchItems(searchParams, 1, 20, sortOption)} variant="outline">
                                Try Again
                            </Button>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-500 mb-4">
                                <Grid3X3 className="w-12 h-12 mx-auto mb-2" />
                                <p className="text-lg font-medium">No items found</p>
                                <p className="text-sm">
                                    {Object.keys(searchParams).length > 0
                                        ? "Try adjusting your search filters"
                                        : "Be the first to add an item!"}
                                </p>
                            </div>
                            <Button
                                onClick={() => setShowCreateModal(true)}
                                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:to-yellow-700"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add First Item
                            </Button>
                        </div>
                    ) : (
                        <div
                            className={`grid gap-6 ${viewMode === "grid"
                                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                : "grid-cols-1 max-w-full"
                                }`}
                        >
                            {items.map((item) =>
                                viewMode === "grid" ? (
                                    <React.Fragment key={item._id}>
                                        <ItemCard
                                            item={item}
                                            onSwapRequest={handleSwapRequest}
                                            onContact={handleContact}
                                            onDelete={handleDeleteItem}
                                            onEdit={handleEditItem}
                                            isOwner={item.ownerId?._id === currentUserId}
                                        />
                                        <UpdateItemModal
                                            item={item} // ✅ fixed here
                                            isOpen={showUpdateModal && itemToEdit?._id === item._id}
                                            onClose={() => {
                                                setShowUpdateModal(false);
                                                setItemToEdit(null);
                                            }}
                                            onSubmit={handleUpdateItem}
                                            loading={loading}
                                        />
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment key={item._id}>
                                        <ItemList
                                            item={item}
                                            onSwapRequest={handleSwapRequest}
                                            onContact={handleContact}
                                            onDelete={handleDeleteItem}
                                            onEdit={handleEditItem}
                                            isOwner={item.ownerId?._id === currentUserId}
                                        />
                                        <UpdateItemModal
                                            item={item}
                                            isOpen={showUpdateModal && itemToEdit?._id === item._id}
                                            onClose={() => {
                                                setShowUpdateModal(false);
                                                setItemToEdit(null);
                                            }}
                                            onSubmit={handleUpdateItem}
                                            loading={loading}
                                        />
                                    </React.Fragment>
                                )
                            )}

                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && items.length > 0 && renderPagination()}
                </div>

                {/* Modals */}
                <SwapModal
                    isOpen={showSwapModal}
                    onClose={() => {
                        setShowSwapModal(false)
                        setSelectedItem(null)
                    }}
                    selectedItem={selectedItem}
                    currentUserId={currentUserId}
                    onSwapRequest={handleSwapSubmit}
                />

                <CreateItemModal
                    isOpen={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    onSubmit={handleCreateItem}
                    loading={loading}
                />

                <ConfirmDialog
                    open={confirmOpen}
                    onCancel={() => {
                        setConfirmOpen(false)
                        setItemToDelete(null)
                    }}
                    onConfirm={confirmDeleteItem}
                    message="Are you sure you want to delete this item? This action cannot be undone."
                />
            </div>
        </div>
    )
}

export default MarketplacePage