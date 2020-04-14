import React from 'react';


const Indicators = ({totalCases, totalDeaths, deathRate, newCases, newCaseRate, casesPer100k}) => (
  <div className="grid sm:grid-cols-1 lg:grid-cols-6 gap-6 mt-4 mb-4 font-bold text-2xl">
    <div className="border text-center py-12">
      {totalCases}
      <div className="text-xs text-gray-600 font-light">Cases</div>
    </div>
    <div className="border text-center py-12">
      {totalDeaths}
      <div className="text-xs text-gray-600 font-light">Deaths</div>
    </div>
    <div className="border text-center py-12">
      {deathRate}%
      <div className="text-xs text-gray-600 font-light">Death rate</div>
    </div>
    <div className="border text-center py-12">
      {newCases}
      <div className="text-xs text-gray-600 font-light">New cases yesterday</div>
    </div>
    <div className="border text-center py-12">
      {newCaseRate}%
      <div className="text-xs text-gray-600 font-light">New cases rate</div>
    </div>
    <div className="border text-center py-12">
      {casesPer100k}
      <div className="text-xs text-gray-600 font-light">Cases per 100k</div>
    </div>
  </div>

)


export default Indicators;
