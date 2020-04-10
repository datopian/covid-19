import React from 'react';


const Indicators = ({totalCases, totalDeaths, deathRate, newCases, newCaseRate}) => (
  <div className="grid sm:grid-cols-1 lg:grid-cols-5 gap-8 mt-4 mb-4 font-bold text-3xl">
    <div className="border text-center py-16">
      {totalCases}
      <div className="text-xs text-gray-600 font-light">Cases Worldwide</div>
    </div>
    <div className="border text-center py-16">
      {totalDeaths}
      <div className="text-xs text-gray-600 font-light">Deaths Worldwide</div>
    </div>
    <div className="border text-center py-16">
      {deathRate} %
      <div className="text-xs text-gray-600 font-light">Death rate</div>
    </div>
    <div className="border text-center py-16">
      {newCases}
      <div className="text-xs text-gray-600 font-light">New cases yesterday</div>
    </div>
    <div className="border text-center py-16">
      {newCaseRate} %
      <div className="text-xs text-gray-600 font-light">New cases rate</div>
    </div>
  </div>

)


export default Indicators;
