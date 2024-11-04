// types

// response_type = text | option

// option example
// {
//     "title": "",
//     "options": [
//       {
//         "label": "Informar problema",
//         "value": {
//           "input": {
//             "text": "informar problema"
//           }
//         }
//       },
//       {
//         "label": "Ver meu orçamento",
//         "value": {
//           "input": {
//             "text": "ver orçamento"
//           }
//         }
//       }
//     ],
//     "response_type": "option"
//   }

export interface OptionResponse {
  response_type: 'option'
  title: string
  options: Array<{
    label: string
    value: {
      input: {
        text: string
      }
    }
  }>
}
// deal with a list of options...
// it can be replaced with both (BACKEND and WATSON)
// the option LABEL is the text of the BUTTON and
// the TEXT from the INPUT is the value that will be send as user input

// text example
// {
//   "response_type": "text",
//   "text": "Olá, bem vindo ao Assistente do Pé na Estrada. Como posso te ajudar?"
// }

export interface TextResponse {
  response_type: 'text'
  text: string
}

// WHAT TO DO
// map the generic object from the response and
// type the responses, checking their response_type

export type GenericResponse = TextResponse | OptionResponse
