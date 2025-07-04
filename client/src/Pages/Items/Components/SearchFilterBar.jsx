"use client"

import React,{ useState, useEffect } from "react"
import { Search, X, SlidersHorizontal } from "lucide-react"
import { Button } from "../../../Components/ui/button"
import { Input } from "../../../Components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../Components/ui/select"
import { Badge } from "../../../Components/ui/badge"
import { Skeleton } from "../../../Components/ui/skeleton"

const SearchFilterBar = ({ onSearch, loading = false }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")
  const [type, setType] = useState("all")
  const [status, setStatus] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Music",
    "Fashion",
    "Books",
    "Toys",
    "Automotive",
    "Health & Beauty",
  ]

  const handleSearch = () => {
    const searchParams = {
      ...(searchTerm && { keyword: searchTerm }),
      ...(category !== "all" && { category }),
      ...(type !== "all" && { type }),
      ...(status !== "all" && { status }),
    }
    onSearch(searchParams)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setCategory("all")
    setType("all")
    setStatus("all")
    onSearch({})
  }

  const hasActiveFilters = searchTerm || category !== "all" || type !== "all" || status !== "all"

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch()
    }, 500)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm, category, type, status])

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex flex-col lg:flex-row gap-4">
          <Skeleton className="h-12 flex-1" />
          <div className="flex gap-3">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search for items, descriptions, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 text-base bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full lg:w-40 h-12 bg-white/50">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-full lg:w-32 h-12 bg-white/50">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="barter">Barter</SelectItem>
              <SelectItem value="donate">Donate</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowFilters(!showFilters)}
            className="h-12 px-4 bg-white/50 hover:bg-white/70"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-3 items-center">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-40 bg-white/50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="exchanged">Exchanged</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-500 hover:text-gray-700">
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Search: {searchTerm}
              <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSearchTerm("")} />
            </Badge>
          )}
          {category !== "all" && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {category.charAt(0).toUpperCase() + category.slice(1)}
              <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setCategory("all")} />
            </Badge>
          )}
          {type !== "all" && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              {type.charAt(0).toUpperCase() + type.slice(1)}
              <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setType("all")} />
            </Badge>
          )}
          {status !== "all" && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              {status.charAt(0).toUpperCase() + status.slice(1)}
              <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setStatus("all")} />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchFilterBar
