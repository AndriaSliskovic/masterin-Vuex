import axios from 'axios'
import NProgress from 'nprogress'

if (apiGatewayUrl == null) {
  var apiGatewayUrl = 'http://localhost:5200/'
}

if (appUrl == null) {
  var appUrl = 'http://dev-admin.deluxebrand.com/'
}

//Povezivanje preko json-servera
const apiClient = axios.create({
  baseURL: appUrl,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 5000
})

//Povezivanje sa serverom
const serverClient = axios.create({
  baseURL: apiGatewayUrl,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 5000
})

apiClient.interceptors.request.use(config => {
  // Called on request
  NProgress.start()
  return config
})

serverClient.interceptors.request.use(config => {
  // Called on request
  NProgress.start()
  return config
})

apiClient.interceptors.response.use(response => {
  // Called on response
  NProgress.done()
  return response
})

serverClient.interceptors.response.use(response => {
  // Called on response
  NProgress.done()
  return response
})

export default {
  getCompanies() {
    return apiClient.post('Services/WarehouseService.svc/GetSiteCustomers', {
      siteId: 57
    })
  },
  getFeatures() {
    return serverClient.get('/feature-manager/features')
  },

  getSelectedFeatures(guid) {
    return serverClient.get(`/feature-manager/features/${guid}`)
  },
  getCompanyGroups(companyId) {
    let searchCriteria = {
      searchGroupCritera: {
        COMP_ID: companyId,
        ISACTIVE: true
      }
    }
    return apiClient.post(
      'Services/CompanyService.svc/GetUsergroupsForCompany',
      searchCriteria
    )
  },

  editFeatures(dataObject) {
    return serverClient.put('/feature-manager/features', dataObject)
  }
}
