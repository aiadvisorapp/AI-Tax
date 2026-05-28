import React, { useState } from 'react';
import { UserPersonalizationData } from '../types';

interface Props {
  onComplete: (data: UserPersonalizationData) => void;
}

export default function PersonalizationForm({ onComplete }: Props) {
  const [data, setData] = useState<UserPersonalizationData>({
    age: 0,
    filingStatus: 'Single',
    annualIncome: 0,
    annualIncomeType: 'W2',
    residenceCity: '',
    financialGoal: '',
    riskTolerance: 'Medium',
    netWorth: 0,
    investmentExperience: 'Beginner',
    investmentPreferences: '',
    interestedInTbills: false,
    taxReturnYear: new Date().getFullYear(),
    anyChildren: 0,
    childrenAges: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : (type === 'number' ? Number(value) : value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(data);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 space-y-4">
      <h2 className="text-lg font-bold mb-4">We help self-employed professionals minimize their tax burden, maximize tax-free accounts, and grow their investments to achieve long-term financial freedom.</h2>
      <p className="text-sm text-gray-600 mb-4">Note: You don't have to fill out every field to get started—provide what you're comfortable sharing.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Age</label>
          <input name="age" type="number" required onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Filing Status</label>
          <select name="filingStatus" onChange={handleChange} className="w-full p-2 border rounded">
            <option>Single</option>
            <option>Married Filing Jointly</option>
            <option>Married Filing Separately</option>
            <option>Head of Household</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Annual Income</label>
          <input name="annualIncome" type="number" required onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Income Type</label>
          <div className="flex gap-4">
            <label><input type="radio" name="annualIncomeType" value="W2" checked={data.annualIncomeType === 'W2'} onChange={handleChange} /> W2</label>
            <label><input type="radio" name="annualIncomeType" value="Net 1099" checked={data.annualIncomeType === 'Net 1099'} onChange={handleChange} /> Net 1099</label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Residence City</label>
          <input name="residenceCity" type="text" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Risk Tolerance</label>
          <select name="riskTolerance" onChange={handleChange} className="w-full p-2 border rounded">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Financial Goal</label>
          <textarea name="financialGoal" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Net Worth</label>
          <input name="netWorth" type="number" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Experience</label>
          <select name="investmentExperience" onChange={handleChange} className="w-full p-2 border rounded">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Investment Preferences</label>
          <textarea name="investmentPreferences" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="flex items-center gap-2">
          <input name="interestedInTbills" type="checkbox" checked={data.interestedInTbills} onChange={handleChange} id="tbills" />
          <label htmlFor="tbills">Interested in T-bills/Money Market?</label>
        </div>
        <div>
          <label className="block text-sm font-medium">Tax Return Year</label>
          <input name="taxReturnYear" type="number" required onChange={handleChange} value={data.taxReturnYear} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Tax Credit: Any Children & Age</label>
          <input name="anyChildren" type="number" required onChange={handleChange} value={data.anyChildren} className="w-full p-2 border rounded" />
          <input name="childrenAges" type="text" placeholder="e.g. 5, 8" onChange={handleChange} value={data.childrenAges} className="w-full p-2 border rounded mt-2" />
        </div>
      </div>
      <button type="submit" className="bg-blue-600 text-white w-full p-3 rounded font-bold">Submit Personal Info</button>
    </form>
  );
}
