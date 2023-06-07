import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

export function toast(type, message) {
  if (type === 'success') useToast().success(message)
  else if (type === 'error') useToast().error(message)
}
export function errorHandler(err) {
  if (err.name === 'AxiosError') {
    toast('error', err.response.data.message)
  } else {
    toast('error', 'Error!!!')
  }
}

