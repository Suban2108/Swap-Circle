import React from 'react'

const SettingFeatures = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Profile Setting</h3>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h4 className="font-semibold text-gray-800 mb-4">Notification Preferences</h4>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="rounded border-gray-300" defaultChecked />
            <span className="text-gray-700">Email notifications for new messages</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="rounded border-gray-300" defaultChecked />
            <span className="text-gray-700">Push notifications for item matches</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-gray-700">Weekly community digest</span>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h4 className="font-semibold text-gray-800 mb-4">Privacy Setting</h4>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="rounded border-gray-300" defaultChecked />
            <span className="text-gray-700">Show my profile to other users</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="rounded border-gray-300" defaultChecked />
            <span className="text-gray-700">Allow direct messages</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-gray-700">Show my location to nearby users</span>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h4 className="font-semibold text-gray-800 mb-4">Account Actions</h4>
        <div className="space-y-3">
          <button className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            Download my data
          </button>
          <button className="w-full text-left px-4 py-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors">
            Deactivate account
          </button>
          <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            Delete account
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingFeatures
