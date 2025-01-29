"use client";

import { useState } from "react";
import {
  passwordRequirements,
  getPasswordStrength,
} from "@/lib/auth/password-validation";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  showRequirements?: boolean;
  required?: boolean;
}

export default function PasswordInput({
  id,
  value,
  onChange,
  label,
  showRequirements = false,
  required = false,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const strength = getPasswordStrength(value);
  const strengthColor =
    strength < 0.3
      ? "bg-red-500"
      : strength < 0.7
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          required={required}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5 text-gray-400" />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>

      {showRequirements && value && (
        <div className="space-y-2">
          <div className="h-1 w-full bg-gray-200 rounded">
            <div
              className={`h-1 rounded transition-all duration-300 ${strengthColor}`}
              style={{ width: `${strength * 100}%` }}
            />
          </div>
          <ul className="text-sm space-y-1">
            {passwordRequirements.map((req, index) => {
              const isMet = req.validator(value);
              return (
                <li
                  key={index}
                  className={`flex items-center space-x-2 ${
                    isMet ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  <span
                    className={`text-sm ${
                      isMet ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {isMet ? "✓" : "○"}
                  </span>
                  <span>{req.message}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
