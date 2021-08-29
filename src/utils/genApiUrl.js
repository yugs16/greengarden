import router from '../router'

export default function genApiUrl(endPoint, id) {
  console.log(endPoint, router)
  const { currentRoute } = router

  return {
    url: `${currentRoute.path}/${endPoint}${id ? `/${id}` : ''}`,
    params: currentRoute.params
  }
}
