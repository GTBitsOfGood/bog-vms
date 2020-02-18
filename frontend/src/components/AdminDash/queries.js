import axios from 'axios';

// Added to fulfill requirements of UserManager page
export const fetchUserData = ({ filters, searchTerm, searchValue, start, limit }) => {
  const params = {};

  if (start != null) params.start = start;
  if (limit != null) params.limit = limit;

  if (filters != null && filters.length > 0) {
    params.filters = JSON.stringify(filters);
  }

  if (searchValue !== '' && searchTerm != null) {
    params.search = JSON.stringify({ value: searchValue, term: searchTerm });
  }

  return axios.get('/api/users/search', { params })
};

export const filterApplicants = filterGroups => {
  let filtersToApply = {};
  const query = Object.entries(filterGroups || {}).reduce((queryString, [group, { values }]) => {
    Object.entries(values).forEach(([filter, filterValue]) => {
      if (filterValue) {
        console.log(filterValue);
        if (!filtersToApply[group]) filtersToApply[group] = {};
        filtersToApply[group][filter] = filterValue;
      }
    });
    if (!filtersToApply[group]) {
      return queryString;
    } else {
      return `${queryString}${group}=${JSON.stringify(filtersToApply[group])}&`;
    }
  }, '');
  return axios.get('/api/users?' + query);
};

export const fetchMoreApplicants = lastPaginationId =>
  axios.get(`/api/users?${lastPaginationId ? 'lastPaginationId=' + lastPaginationId : ''}`);

export const fetchUserManagementData = lastPaginationId =>
  axios.get(
    `/api/users/managementData?${lastPaginationId ? 'lastPaginationId=' + lastPaginationId : ''}`
  );

export const fetchUserCount = () => axios.get('/api/users/count');

export const updateApplicantStatus = (email, status) =>
  axios.post(`/api/users/updateStatus?email=${email}&status=${status}`);

export const updateApplicantRole = (email, role) =>
  axios.post(`/api/users/updateRole?email=${email}&role=${role}`);

export const searchApplicants = (textinput, searchType) => {
  return axios.get('/api/users/searchByContent', {
    params: { searchquery: textinput, searchtype: searchType }
  });
};

export const fetchEvents = () => axios.get('/api/events');

export const createEvent = event => axios.post('/api/events', event);

export const editEvent = event => axios.put('/api/events', event);

export const deleteEvent = _id => axios.delete('/api/events/' + _id);
