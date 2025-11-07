import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";

function App() {
    const [expenses, setExpenses] = useState([]);
    const [form, setForm] = useState({ title: "", amount: "", category: "", date: "" });
    const [editExpense, setEditExpense] = useState(null); // expense being edited
    const [showModal, setShowModal] = useState(false);

    // Fetch expenses from backend
    const fetchExpenses = () => {
        axios.get("http://localhost:5000/api/expenses")
            .then(res => setExpenses(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    // Add new expense
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/expenses", form);
            setForm({ title: "", amount: "", category: "", date: "" });
            fetchExpenses();
        } catch (err) {
            console.error(err);
        }
    };

    // Delete expense
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this expense?")) {
            try {
                await axios.delete(`http://localhost:5000/api/expenses/${id}`);
                fetchExpenses();
            } catch (err) {
                console.error(err);
            }
        }
    };

    // Open edit modal
    const handleEdit = (expense) => {
        setEditExpense(expense);
        setShowModal(true);
    };

    // Save edit
    const handleSaveEdit = async () => {
        try {
            await axios.put(`http://localhost:5000/api/expenses/${editExpense.id}`, editExpense);
            setShowModal(false);
            setEditExpense(null);
            fetchExpenses();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-6">
                <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
                    {/* Rest of your App content */}
                    <div className="min-h-screen bg-gray-100 p-6">
                        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
                            <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
                                Expense Tracker
                            </h1>

                            {/* Add Expense Form */}
                            <form onSubmit={handleAdd} className="mb-6 space-y-4">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        className="flex-1 p-2 border rounded"
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Amount"
                                        value={form.amount}
                                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                                        className="flex-1 p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="text"
                                        placeholder="Category"
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        className="flex-1 p-2 border rounded"
                                    />
                                    <input
                                        type="date"
                                        value={form.date}
                                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                                        className="flex-1 p-2 border rounded"
                                        required
                                    />
                                </div>
                                <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition">
                                    Add Expense
                                </button>
                            </form>

                            {/* Expense List */}
                            <ul className="space-y-4">
                                {expenses.map(exp => (
                                    <li
                                        key={exp.id}
                                        className="flex justify-between items-center bg-indigo-50 p-4 rounded-lg shadow-sm hover:bg-indigo-100 transition"
                                    >
                                        <div>
                                            <p className="font-semibold text-lg">{exp.title}</p>
                                            <p className="text-gray-600">
                                                ${exp.amount} • {exp.category} • {exp.date}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(exp)}
                                                className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(exp.id)}
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {showModal && editExpense && (
                            <div className="fixed inset-0 flex items-center justify-center z-50">
                                {/* Blurred background */}
                                <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>

                                {/* Modal content */}
                                <div className="relative bg-white p-6 rounded-lg w-full max-w-md shadow-lg z-10">
                                    <h2 className="text-xl font-bold mb-4">Edit Expense</h2>
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            value={editExpense.title}
                                            onChange={(e) => setEditExpense({ ...editExpense, title: e.target.value })}
                                            className="w-full p-2 border rounded"
                                        />
                                        <input
                                            type="number"
                                            value={editExpense.amount}
                                            onChange={(e) => setEditExpense({ ...editExpense, amount: e.target.value })}
                                            className="w-full p-2 border rounded"
                                        />
                                        <input
                                            type="text"
                                            value={editExpense.category}
                                            onChange={(e) => setEditExpense({ ...editExpense, category: e.target.value })}
                                            className="w-full p-2 border rounded"
                                        />
                                        <input
                                            type="date"
                                            value={editExpense.date}
                                            onChange={(e) => setEditExpense({ ...editExpense, date: e.target.value })}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-end gap-2">
                                        <button
                                            onClick={() => { setShowModal(false); setEditExpense(null); }}
                                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSaveEdit}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
