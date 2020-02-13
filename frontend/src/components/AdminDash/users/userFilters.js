import { statuses } from '../applicantInfoHelpers';

export const initialValues = {
  date: {
    label: 'Date Range',
    values: {
      past_6_months: false,
      past_month: false,
      from_current_year: false,
      from_one_year_ago: false,
      from_two_years_ago: false,
      older: false
    }
  },
  status: {
    label: 'Status',
    values: Object.keys(statuses).reduce((obj, status) => {
      obj[status] = false;
      return obj;
    }, {})
  },
  role: {
    label: 'Role',
    values: {
      admin: false,
      volunteer: false,
      manager: false
    }
  },
  skills_interests: {
    label: 'Skills and Interests',
    values: {
      admin_office: false,
      admin_virtual: false,
      atlanta_shelter: false,
      orlando_shelter: false,
      graphic_web_design: false,
      special_events: false,
      grant_writing: false,
      writing_editing: false,
      social_media: false,
      fundraising: false,
      finance: false,
      office_maintenance_housekeeping: false,
      international_projects: false,
      volunteer_coordination: false,
      outreach: false
    }
  }
};

const keyToLabel = key => {
  const words = key.split('_');
  const capitalizedWords = words.map(word => `${word[0].toUpperCase()}${word.slice(1)}`);
  var d = new Date();
  if (key === 'from_current_year') {
    return d.getFullYear();
  } else if (key === 'from_one_year_ago') {
    return d.getFullYear() - 1;
  } else if (key === 'from_two_years_ago') {
    return d.getFullYear() - 2;
  } else if (key === 'older') {
    return d.getFullYear() - 3 + ' and older';
  } else {
    return capitalizedWords.join(' ');
  }
};

const createLabels = groupValues =>
  Object.keys(groupValues).reduce((labels, key) => {
    labels[key] = keyToLabel(key);
    return labels;
  }, {});

export const labels = {
  date: createLabels(initialValues.date.values),
  status: Object.entries(statuses).reduce((labels, [key, label]) => {
    labels[key] = label;
    return labels;
  }, {}),
  role: createLabels(initialValues.role.values),
  skills_interests: createLabels(initialValues.skills_interests.values)
};
