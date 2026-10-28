import { useEffect, useState } from 'react'

function App() {
  const [employees, setEmployees] = useState([])
  const [formData, setFormData] = useState({ name: '', department: '', salary: '' })
  
  // States for Error, Loading, and Editing
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)

  const fetchEmployees = () => {
    setIsLoading(true)
    fetch('http://localhost:8080/api/employees')
      .then(response => {
        if (!response.ok) throw new Error("Failed to connect to the server.")
        return response.json()
      })
      .then(data => {
        setEmployees(data)
        setError(null)
      })
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Payload now correctly uses "name" to match your Java entity
    const employeePayload = {
      name: formData.name,
      department: formData.department,
      salary: parseFloat(formData.salary)
    }

    // Use PUT if editing, otherwise POST
    const url = editingId 
      ? `http://localhost:8080/api/employees/${editingId}` 
      : 'http://localhost:8080/api/employees'
      
    const method = editingId ? 'PUT' : 'POST'

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employeePayload)
    })
    .then(response => {
      if (!response.ok) throw new Error("Failed to save employee data.")
      return response.json()
    })
    .then(() => {
      fetchEmployees() // Refresh the list
      setFormData({ name: '', department: '', salary: '' }) // Clear form
      setEditingId(null) // Exit edit mode
      setError(null)
    })
    .catch(err => setError(err.message))
  }

  const handleEdit = (emp) => {
    setEditingId(emp.id)
    // Populate the form with the selected employee's data
    setFormData({
      name: emp.name, 
      department: emp.department,
      salary: emp.salary
    })
  }

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    fetch(`http://localhost:8080/api/employees/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) throw new Error("Failed to delete employee.")
      fetchEmployees()
      setError(null)
    })
    .catch(err => setError(err.message))
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData({ name: '', department: '', salary: '' })
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Error Notification */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong>Error: </strong> {error}
          </div>
        )}

        {/* Input Form Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-600">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {editingId ? "Edit Employee" : "Add New Employee"}
          </h2>
          <form onSubmit={handleSubmit} className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="Full Name"
              required
              className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input
              type="text"
              placeholder="Department"
              required
              className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
            />
            <input
              type="number"
              placeholder="Salary"
              required
              className="w-32 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.salary}
              onChange={(e) => setFormData({...formData, salary: e.target.value})}
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              {editingId ? "Update" : "Save"}
            </button>
            
            {/* Cancel Button */}
            {editingId && (
              <button 
                type="button" 
                onClick={cancelEdit}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Dashboard Display Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Employee Roster</h1>
          
          {isLoading ? (
            <p className="text-blue-500 font-semibold animate-pulse">Loading database records...</p>
          ) : employees.length === 0 ? (
            <p className="text-gray-500 italic">No employees found in the database.</p>
          ) : (
            <div className="grid gap-4">
              {employees.map((emp) => (
                <div key={emp.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex justify-between items-center hover:border-blue-300 transition-colors">
                  <div>
                    {/* Render the exact "name" variable */}
                    <p className="font-semibold text-lg text-gray-800">{emp.name}</p>
                    <p className="text-gray-600 text-sm">{emp.department}</p>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-green-600 font-bold bg-green-100 px-3 py-1 rounded-full">
                      ${emp.salary?.toLocaleString()}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(emp)}
                        className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(emp.id)}
                        className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default App
