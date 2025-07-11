export default function TechStackPage() {



  

  return <>
    <h1 className="text-white font-bold">TechStack</h1>
    <div className="bg-white rounded-2xl w-full p-4 mt-12">
      <h1 className="text-2xl text-black-800">List of technologies</h1>
      <button className="px-8 py-2 bg-indigo-400 rounded text-white mt-4 cursor-pointer">Add</button>
      <div className="mt-12">
        <table className="w-full mb-0 align-top border-collapse text-slate-500">
          <thead className="text-left border-b border-indigo-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Created date</th>
              <th className="p-4">Created by</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-left border-b border-indigo-100">
              <td className="p-4">ReactJs</td>
              <td className="p-4">July 11, 2025</td>
              <td className="p-4">JDevocion</td>
              <td className="p-4">
                <button className="p-2 py-1 mr-2 bg-amber-400 rounded text-white text-sm">Delete</button>
                <button className="p-2 py-1 bg-indigo-400 rounded text-white text-sm" >Edit</button>
              </td>
            </tr>
            <tr className="text-left border-b border-indigo-100">
              <td className="p-4">ReactJs</td>
              <td className="p-4">July 11, 2025</td>
              <td className="p-4">JDevocion</td>
              <td className="p-4">
                <button className="p-2 py-1 mr-2 bg-amber-400 rounded text-white text-sm">Delete</button>
                <button className="p-2 py-1 bg-indigo-400 rounded text-white text-sm" >Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
}