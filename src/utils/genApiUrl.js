import router from '../router'

export default function genApiUrl(endPoint, id) {
  const { currentRoute } = router

  return {
    url: `${currentRoute.path}/${endPoint}${id ? `/${id}` : ''}`,
    params: currentRoute.params
  }
}
