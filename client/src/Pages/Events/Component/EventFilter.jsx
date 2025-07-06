"use client"

import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Badge } from "@/Components/ui/badge"
import { X, Search, Filter } from "lucide-react"

export function EventFilters({ filters, onFiltersChange, onClearFilters }) {
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "donation", label: "Donation" },
    { value: "volunteer", label: "Volunteer" },
    { value: "awareness", label: "Awareness" },
    { value: "fundraising", label: "Fundraising" },
    { value: "community", label: "Community" },
    { value: "other", label: "Other" },
  ]

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "draft", label: "Draft" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ]

  const sortOptions = [
    { value: "startDate", label: "Start Date" },
    { value: "createdAt", label: "Created Date" },
    { value: "name", label: "Name" },
    { value: "participantCount", label: "Participants" },
  ]

  const hasActiveFilters =
    filters.search ||
    filters.category !== "all" ||
    filters.status !== "all" ||
    filters.upcoming ||
    filters.sortBy !== "startDate" ||
    filters.sortOrder !== "asc"

  return (
    <div className="space-y-6">
      {/* Search and Main Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 h-5 w-5" />
          <Input
            placeholder="Search events by name, description..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            className="pl-12 h-12 border-orange-200 focus:border-orange-400 focus:ring-orange-400 bg-white/80"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={filters.category} onValueChange={(value) => onFiltersChange({ category: value })}>
            <SelectTrigger className="w-full sm:w-48 h-12 border-orange-200 focus:border-orange-400 bg-white/80">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.status} onValueChange={(value) => onFiltersChange({ status: value })}>
            <SelectTrigger className="w-full sm:w-48 h-12 border-orange-200 focus:border-orange-400 bg-white/80">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Sort and Additional Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">Sort by:</span>
          </div>

          <Select value={filters.sortBy} onValueChange={(value) => onFiltersChange({ sortBy: value })}>
            <SelectTrigger className="w-40 border-orange-200 focus:border-orange-400 bg-white/80">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.sortOrder} onValueChange={(value) => onFiltersChange({ sortOrder: value })}>
            <SelectTrigger className="w-32 border-orange-200 focus:border-orange-400 bg-white/80">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3 items-center">
          <Button
            variant={filters.upcoming ? "default" : "outline"}
            size="sm"
            onClick={() => onFiltersChange({ upcoming: !filters.upcoming })}
            className={
              filters.upcoming
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                : "border-orange-200 text-orange-600 hover:bg-orange-50"
            }
          >
            Upcoming Only
          </Button>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-orange-600 hover:bg-orange-50">
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-100">
          <span className="text-sm font-medium text-orange-800 mr-2">Active filters:</span>
          {filters.search && (
            <Badge className="bg-white text-orange-700 border-orange-200 hover:bg-orange-50">
              Search: {filters.search}
              <X
                className="h-3 w-3 ml-2 cursor-pointer hover:text-orange-900"
                onClick={() => onFiltersChange({ search: "" })}
              />
            </Badge>
          )}
          {filters.category !== "all" && (
            <Badge className="bg-white text-orange-700 border-orange-200 hover:bg-orange-50">
              Category: {categories.find((c) => c.value === filters.category)?.label}
              <X
                className="h-3 w-3 ml-2 cursor-pointer hover:text-orange-900"
                onClick={() => onFiltersChange({ category: "all" })}
              />
            </Badge>
          )}
          {filters.status !== "all" && (
            <Badge className="bg-white text-orange-700 border-orange-200 hover:bg-orange-50">
              Status: {statuses.find((s) => s.value === filters.status)?.label}
              <X
                className="h-3 w-3 ml-2 cursor-pointer hover:text-orange-900"
                onClick={() => onFiltersChange({ status: "all" })}
              />
            </Badge>
          )}
          {filters.upcoming && (
            <Badge className="bg-white text-orange-700 border-orange-200 hover:bg-orange-50">
              Upcoming Only
              <X
                className="h-3 w-3 ml-2 cursor-pointer hover:text-orange-900"
                onClick={() => onFiltersChange({ upcoming: false })}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
