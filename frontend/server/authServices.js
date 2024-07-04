// services/userService.js
import { useApi } from '@/composable/useApi'
const api = useApi()
const authUser = () => {
	return api.post('users/oauth_start/')
}
export { authUser }
