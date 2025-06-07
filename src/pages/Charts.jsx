
const Charts = () => {

  return (
    <div className="bg-weather-teal text-stone-200 mx-4 mb-4">
      <p className="text-2xl">Weather Charts</p>
      <div>
        <h2>Brisbane Radar</h2>
        <div className="border rounded-md shadow-lg overflow-hidden">
          <iframe className="w-full h-[500px] rounded-md"
            title="Brisbane radar viewer"
            src="https://www.bom.gov.au/radar/IDR663.loop.shtml"
            width="100%"
            height="500"
            alt="Brisbane radar loop"
          />
        </div>
      </div>

      <div>
        <h2>Brisbane satellite view</h2>
        <div className="border rounded-md shadow-lg overflow-hidden">
          <iframe className="w-full h-[500px] rounded-md"
            title="Australian satellite viewer"
            src="https://www.bom.gov.au/australia/satellite/"
            width="100%"
            height="500"
            alt="Brisbane satellite"
          />
        </div>
      </div>
    </div>
  )
}

export default Charts;