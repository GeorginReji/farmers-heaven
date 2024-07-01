// services/userService.js
import { useApi } from '@/composable/useApi'
export const authServices = () => {
	const api = useApi()

	return {
		authUser() {
			return api.post('users/oauth_start/')
		},
		// Add other user-related API calls
	}
}
