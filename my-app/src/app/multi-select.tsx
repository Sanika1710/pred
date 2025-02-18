"use client"

import * as React from "react"

interface Option {
  value: string
  label: string
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
}

export function MultiSelect({ options, selected, onChange, placeholder }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="relative">
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="w-full border rounded-md p-2 flex justify-between bg-white"
      >
        {selected.length > 0 ? `${selected.length} selected` : placeholder || "Select options..."}
        <span className="ml-2 h-4 w-4 shrink-0 opacity-50">▼</span>
      </button>
      {open && (
        <div className="absolute w-full mt-1 border rounded-md bg-white shadow-lg p-2 z-10">
          <input
            type="text"
            placeholder="Search options..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-1 border rounded-md mb-2"
          />
          <ul className="list-none p-0 max-h-40 overflow-auto">
            {filteredOptions.length === 0 ? (
              <li className="p-2 text-gray-500">No option found.</li>
            ) : (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className="p-2 flex items-center cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    onChange(
                      selected.includes(option.value)
                        ? selected.filter((item) => item !== option.value)
                        : [...selected, option.value]
                    )
                  }}
                >
                  <span
                    className={`mr-2 h-4 w-4 flex items-center justify-center border rounded ${
                      selected.includes(option.value) ? "bg-blue-500 text-white" : "border-gray-400"
                    }`}
                  >
                    {selected.includes(option.value) ? "✓" : ""}
                  </span>
                  {option.label}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
