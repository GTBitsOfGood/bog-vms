import { statuses } from './applicantInfoHelpers';

export const formValues = {
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
