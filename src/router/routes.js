/**
 * @intro: 路由.
 *
 */
import routes, {Error, Home, UserLogin} from './auto-routes'
export default [{
  path: '*',
  redirect: Error.path
}, {
  path: '/',
  redirect: Home.path
},
{
  path: '/login',
  redirect: UserLogin.path
}
].concat(routes)
