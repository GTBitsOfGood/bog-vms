const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: 'volunteer',
      enum: ['admin', 'volunteer', 'manager']
    },
    status: {
      type: String,
      default: 'new',
      enum: [
        'accepted',
        'denied',
        'no_response',
        'got_initial_email',
        'has_volunteered',
        'new'
      ]
    },
    bio: {
      first_name: { type: String },
      last_name: { type: String },
      phone_number: { type: String },
      email: { type: String, index: true, unique: true },
      date_of_birth: { type: Date },
      street_address: { type: String },
      city: { type: String },
      state: { type: String },
      zip_code: { type: String }
    },
    history: {
      volunteer_interest_cause: { type: String },
      volunteer_support: { type: String },
      volunteer_commitment: { type: String },
      previous_volunteer_experience: { type: String }
    },
    availability: {
      weekday_mornings: { type: Boolean, default: false },
      weekday_afternoons: { type: Boolean, default: false },
      weekday_evenings: { type: Boolean, default: false },
      weekend_mornings: { type: Boolean, default: false },
      weekend_afternoons: { type: Boolean, default: false },
      weekend_evenings: { type: Boolean, default: false }
    },
    skills_interests: {
      admin_office: { type: Boolean, default: false },
      admin_virtual: { type: Boolean, default: false },
      atlanta_shelter: { type: Boolean, default: false },
      orlando_shelter: { type: Boolean, default: false },
      graphic_web_design: { type: Boolean, default: false },
      special_events: { type: Boolean, default: false },
      grant_writing: { type: Boolean, default: false },
      writing_editing: { type: Boolean, default: false },
      social_media: { type: Boolean, default: false },
      fundraising: { type: Boolean, default: false },
      finance: { type: Boolean, default: false },
      office_maintenance_housekeeping: { type: Boolean, default: false },
      international_projects: { type: Boolean, default: false },
      volunteer_coordination: { type: Boolean, default: false },
      outreach: { type: Boolean, default: false },
      languages: { type: String, default: '' },
      skills_qualifications: { type: String }
    },
    referral: {
      friend: { type: Boolean, default: false },
      newsletter: { type: Boolean, default: false },
      event: { type: Boolean, default: false },
      volunteer_match: { type: Boolean, default: false },
      internet: { type: Boolean, default: false },
      social_media: { type: Boolean, default: false }
    },
    employment: {
      industry: { type: String },
      occupation: { type: [String] }
    }
  },
  { timestamps: true }
);

userDataSchema.virtual('name').get(function() {
  return this.bio.first_name + this.bio.last_name;
});

userDataSchema.virtual('age').get(function() {
  const current = new Date();
  return current.getFullYear() - this.bio.date_of_birth.getFullYear();
});

// export user model to app
module.exports = mongoose.model('UserData', userDataSchema);
module.exports.UserDataSchema = userDataSchema;
