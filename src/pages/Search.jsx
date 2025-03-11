

const Search = () => {

  return (
    <form >
      <div className="flex gap-4 mb-1">
        <label className="text-stone-200 font-bold p-2">Search for a location</label>
        <input type="text" placeholder="Gold Coast" className="p-2 rounded-md"/>
      </div>
      <div>
        <button type="submit" className="text-stone-200 font-bold bg-stone-900 rounded-md px-6 py-2 hover:bg-slate-800 cursor-pointer">Submit</button>
      </div>
    </form>
    
  )
};

export default Search;

<h1 className="text-stone-200">Search</h1>