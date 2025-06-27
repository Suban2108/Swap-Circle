import React from 'react'
import { Gift, Package, Heart, Award, CheckCircle } from 'lucide-react'


const Achievements = () => {
      const achievements = [
    {
      id: 1,
      name: "Generous Giver",
      description: "Donated 10+ items",
      icon: <Gift className="w-6 h-6" />,
      earned: true,
      earnedDate: "2024-12-01",
      color: "bg-green-500",
    },
    {
      id: 2,
      name: "Swap Master",
      description: "Completed 5+ successful swaps",
      icon: <Package className="w-6 h-6" />,
      earned: true,
      earnedDate: "2024-11-15",
      color: "bg-blue-500",
    },
    {
      id: 3,
      name: "Community Helper",
      description: "Participated in 3+ events",
      icon: <Heart className="w-6 h-6" />,
      earned: true,
      earnedDate: "2024-11-01",
      color: "bg-pink-500",
    },
    {
      id: 4,
      name: "Eco Warrior",
      description: "Reduced 10kg+ of waste",
      icon: <Award className="w-6 h-6" />,
      earned: false,
      progress: 85,
      color: "bg-emerald-500",
    },
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Achievements & Badges</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 ${
              achievement.earned ? "ring-2 ring-green-200" : "opacity-75"
            }`}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 ${achievement.color} rounded-full flex items-center justify-center text-white`}
              >
                {achievement.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-gray-800">{achievement.name}</h4>
                  {achievement.earned && <CheckCircle className="w-5 h-5 text-green-500" />}
                </div>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                {achievement.earned ? (
                  <p className="text-xs text-green-600 mt-1">Earned on {achievement.earnedDate}</p>
                ) : (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{achievement.progress}% complete</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Achievements
