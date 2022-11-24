import { Page } from '../types/types'

export const resolvePath = (path: string) => {
	const p = path.startsWith('/') ? path.substring(1) : path
	return import.meta.env.BASE_URL + p
}

export const registPageInstance = (page: Page) => {
	window.addEventListener('beforeunload', () => {
		page.dispose()
	})
}
