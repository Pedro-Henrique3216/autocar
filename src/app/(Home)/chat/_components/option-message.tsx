import { ProcessedOptionResponse } from "@/type";


export function OptionMessage({
  options,
  setValue,
}: ProcessedOptionResponse & { setValue: (value: string, id:number | null) => void }) {
  return (
    <div className='flex justify-start flex-wrap gap-2 mt-2'>
      {options.map((option, index) => (
        <button
          className='p-2 text-sm bg-gray-200 border-blue-500 border-2 rounded-md hover:bg-gray-300'
          type='submit'
          key={`${option.value}-${index}`}
          onClick={() => setValue(option.value, option.id ? option.id : null)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
