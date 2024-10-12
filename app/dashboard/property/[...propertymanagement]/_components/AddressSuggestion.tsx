import React from 'react'

interface AddressSuggestion {
  display_name: string
  lat: string
  lon: string
}

interface AddressSuggestionsProps {
  suggestions: AddressSuggestion[]
  onSelect: (suggestion: AddressSuggestion) => void
}

const AddressSuggestion: React.FC<AddressSuggestionsProps> = ({
  suggestions,
  onSelect,
}) => {
  return (
    <ul className='z-50 w-full bg-white border border-secondary mt-1 rounded-md shadow-lg'>
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
          onClick={() => onSelect(suggestion)}
        >
          {suggestion.display_name}
        </li>
      ))}
    </ul>
  )
}
export default AddressSuggestion
