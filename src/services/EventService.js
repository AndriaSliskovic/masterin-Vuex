import axios from 'axios'
import NProgress from 'nprogress'

//Povezivanje preko json-servera
const apiClient = axios.create({
  baseURL: `http://dev-admin.deluxebrand.com/`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout:10000
})

//Povezivanje sa serverom
const serverClient=axios.create({
  baseURL: `http://localhost:5100`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout:10000
})

apiClient.interceptors.request.use(config => { // Called on request
  NProgress.start()
  return config
})

serverClient.interceptors.request.use(config => { // Called on request
  NProgress.start()
  return config
})

apiClient.interceptors.response.use(response => { // Called on response
  NProgress.done()
  return response
})

serverClient.interceptors.response.use(response => { // Called on response
  NProgress.done()
  return response
})

export default {
  getEvents(perPage, page) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  },


  getCompanies(){
    return apiClient.post("Services/WarehouseService.svc/GetSiteCustomers",
    {siteId:57}
    )
  },

getFeatures(){
  return serverClient.get('api/features')
},

getSelectedFeatures(guid){
  return serverClient.get(`api/features/${guid}`)
},

  editFeatures(dataObject){
    return serverClient.put('api/features',dataObject)
  }
}
