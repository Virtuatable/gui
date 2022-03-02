/**
 * This guard checks if the user is currently authenticated, and if not redirects
 * them to the login page.
 * 
 * @param to The route currently called by the user before entering the guard.
 * @param from The route from which the user is coming from, can be used to
 *   redirect them to the previous route if not matching some conditions.
 * @param next the function used to manipulate the history.
 */
export default function redirectAnonymous(to: any, from: any, next: Function) {
  const session_id: string | null = localStorage.getItem('session_id')
  session_id !== null ? next() : next({path: '/login'});
}