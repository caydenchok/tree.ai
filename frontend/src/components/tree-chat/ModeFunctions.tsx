import React, { useState } from 'react';
import { ModeFunctions } from '../../types/mode-functions';

interface ModeFunctionProps {
  mode: string;
  onFunctionSelect: (functionId: string, parameters: any) => void;
}

export const ModeFunctionSelector: React.FC<ModeFunctionProps> = ({
  mode,
  onFunctionSelect,
}) => {
  const [selectedFunction, setSelectedFunction] = useState<string>('');
  const [parameters, setParameters] = useState<Record<string, any>>({});

  const functions = ModeFunctions[mode] || [];

  const handleFunctionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const functionId = e.target.value;
    setSelectedFunction(functionId);
    setParameters({});
  };

  const handleParameterChange = (key: string, value: string) => {
    setParameters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFunction) {
      onFunctionSelect(selectedFunction, parameters);
    }
  };

  const selectedFunctionData = functions.find(f => f.id === selectedFunction);

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Function
          </label>
          <select
            value={selectedFunction}
            onChange={handleFunctionChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Choose a function...</option>
            {functions.map(func => (
              <option key={func.id} value={func.id}>
                {func.name}
              </option>
            ))}
          </select>
        </div>

        {selectedFunctionData?.parameters && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Parameters</h3>
            {Object.entries(selectedFunctionData.parameters).map(([key, param]) => (
              <div key={key}>
                <label className="block text-sm text-gray-600 mb-1">
                  {param.description}
                  {param.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  value={parameters[key] || ''}
                  onChange={(e) => handleParameterChange(key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required={param.required}
                />
              </div>
            ))}
          </div>
        )}

        {selectedFunction && (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Execute Function
          </button>
        )}
      </form>
    </div>
  );
};
