
import { ProcessedApiResponse } from '@/type'
import { OptionMessage } from './option-message'

interface MessageProps {
  text: string | ProcessedApiResponse[]
  fromUser: boolean
  timestamp: string
  setValue: (value: string, id:number | null) => void
}

export function Message({ text, fromUser, timestamp, setValue }: MessageProps) {
  return (
    <div
      className={`flex items-start space-x-2 ${fromUser ? 'justify-end' : ''}`}
    >

      <div className={`flex flex-col ${fromUser ? 'items-end' : ''}`}>
        <div
          className={`p-3 rounded-lg shadow-sm max-w-xs lg:max-w-md ${
            fromUser
              ? 'bg-blue-500 text-white rounded-tr-none'
              : 'bg-white text-gray-800 rounded-tl-none'
          }`}
        >
          {typeof text === 'string' ? (
            <p className='text-sm lg:text-[16px]'>{text}</p>
          ) : (
            text.map((item: ProcessedApiResponse) => {
              if ('content' in item) {
                return (
                  <p
                    key={item.content}
                    className='text-sm lg:text-[16px]'
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                )
              }
              if ('options' in item) {
                return (
                  <OptionMessage
                    key={`${item.options}-${timestamp}`}
                    options={item.options}
                    setValue={setValue}
                  />
                )
              }
              return null
            })
          )}
        </div>
        <span className='text-xs text-gray-500 mt-1'>{timestamp}</span>
      </div>

    </div>
  )
}
