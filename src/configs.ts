export const cookieName: string = 'userID';
export const cookieOptions = {
	maxAge: 1000 * 60 * 60 * 12, // would expire after 12 hours
	httpOnly: true, // The cookie only accessible by the web server
	signed: false // Indicates if the cookie should be signed
};