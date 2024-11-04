import axios from 'axios'

const API_URL =
  'https://api.us-south.assistant.watson.cloud.ibm.com/instances/69585cf6-59a4-4ef7-896c-7d6d171cf223/v2/assistants/2c5d9dd3-09c1-4876-a293-0905a8141118/sessions'
const API_KEY = 'r1fj8vuPOl6071FNoZ30fjn93e-4aO1_IQzVsrO50I2B'

export const createSession = async () => {
  const response = await axios.post(
    `${API_URL}?version=2021-06-14`,
    {},
    {
      auth: {
        username: 'apikey',
        password: API_KEY,
      },
    }
  )
  return response.data.session_id
}

export const sendMessage = async (sessionId: string, message: string) => {
  const response = await axios.post(
    `${API_URL}/${sessionId}/message?version=2021-06-14`,
    {
      input: {
        text: message,
      },
    },
    {
      auth: {
        username: 'apikey',
        password: API_KEY,
      },
    }
  )

  return response.data.output.generic
}
