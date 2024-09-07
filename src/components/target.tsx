import React, { useState } from "react";

const TargetSetter = ({ username }: { username: string }) => {
  const [dailyTarget, setDailyTarget] = useState<number>(5);
  const [monthlyTarget, setMonthlyTarget] = useState<number>(100);

  const handleDailyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDailyTarget(Number(e.target.value));
  };

  const handleMonthlyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyTarget(Number(e.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-zinc-800 to-zinc-900 p-4 rounded-lg shadow-lg h-full w-full">
      {/* Welcome Message */}
      <h2 className="text-2xl font-semibold text-gray-200 mb-6">{`Hey, ${username}`}</h2>

      {/* Target Boxes */}
      <div className="flex flex-col gap-6 w-full justify-center">
        {/* Daily Target */}
        <div className="flex items-center rounded-lg w-full">
          <label className="text-md text-gray-300 mb-2">Daily</label>
          <input
            type="number"
            min="1"
            max="100"
            value={dailyTarget}
            onChange={handleDailyChange}
            className="w-full p-2 text-center text-lg bg-gray-900 text-gray-100 rounded-md border-none focus:outline-none"
          />
        </div>

        {/* Monthly Target */}
        <div className="flex items-center rounded-lg w-full">
          <label className="text-md text-gray-300 mb-2">Monthly</label>
          <input
            type="number"
            min="1"
            max="1000"
            value={monthlyTarget}
            onChange={handleMonthlyChange}
            className="w-full p-2 text-center text-lg bg-gray-900 text-gray-100 rounded-md border-none focus:outline-none"
          />
        </div>
      </div>

      {/* Save Button */}
      
    </div>
  );
};

export default TargetSetter;
