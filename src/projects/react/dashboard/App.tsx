// raw logic
const stats = [
  { id: 1, label: 'Live Sessions', count: 0, badge: 'Joined', color: 'bg-cyan-500' },
  { id: 2, label: 'Quick Notes', count: 0, badge: 'Completed', color: 'bg-emerald-500' },
  { id: 3, label: 'Skill Tests', count: 0, badge: 'Attempted', color: 'bg-indigo-500' },
  { id: 4, label: 'Hands-On Labs', count: 0, badge: 'Completed', color: 'bg-orange-500' },
];

export default function DashWidget() {
  return (
    <div className="w-full p-8 rounded-2xl bg-gradient-to-br from-[#46b3b1] to-[#5a87e5] text-white shadow-xl">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, saqib!</h1>
          <p className="opacity-90 mt-2">Keep learning. Keep Practicing!</p>
        </div>
        <div className="flex gap-2">
           {/* Mocking the Top Buttons */}
           <div className="px-4 py-2 bg-white/20 rounded-full text-xs">0 Certificates</div>
           <div className="px-4 py-2 bg-white/20 rounded-full text-xs">0 Points</div>
        </div>
      </div>

      {/* 🚀 The Map logic goes here */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="relative p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
            {/* The Badge logic */}
            <span className={`absolute -top-2 -right-2 px-2 py-0.5 rounded text-[10px] font-bold ${stat.color}`}>
              {stat.badge}
            </span>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                {/* Icon Placeholder */}
                <span>📦</span>
              </div>
              <div>
                <p className="text-xs opacity-80">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Buttons Row */}
      <div className="flex gap-4 mt-8">
         <button className="flex-1 py-3 bg-[#4db896] rounded-xl font-semibold">My Live Training</button>
         <button className="flex-1 py-3 bg-[#54a3e0] rounded-xl font-semibold">My Live Schedules</button>
         <button className="flex-1 py-3 bg-[#8066f3] rounded-xl font-semibold">All Batches</button>
      </div>
    </div>
  );
}