const targetApi = 'https://www.strava.com/api/v3';

export default class StravaAPI {
  kudos = {};
  laps = {};
  init = code =>
    fetch('https://www.strava.com/oauth/token', {
      body: JSON.stringify({
        client_id: process.env.REACT_APP_STRAVA_ID,
        client_secret: process.env.REACT_APP_STRAVA_SECRET,
        code,
        grant_type: 'authorization_code',
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(({ access_token, refresh_token, athlete, expires_at }) => {
        this.accessToken = access_token;
        this.refreshToken = refresh_token;
        this.tokenExpiresAt = expires_at * 1000;
        this.currentAthlete = athlete;

        const statsRequest = this.getAthleteStats().then(
          ({ all_run_totals }) => {
            this.totalRuns = all_run_totals;
          }
        );

        const activitiesRequest = this.getActivities().then(activities =>
          Promise.all(
            activities
              .filter(activity => activity.type === 'Run')
              .map(activity =>
                this.getActivityDetails(activity.id).then(activityDetail => {
                  this.activities = {
                    ...this.activities,
                    [activityDetail.id]: activityDetail,
                  };
                  return this.getKudosers(activityDetail.id).then(kudosers => {
                    this.kudos = {
                      ...this.kudos,
                      [activityDetail.id]: kudosers,
                    };
                  });
                })
              )
          )
        );

        return Promise.all([statsRequest, activitiesRequest]).then(() => ({
          currentAthlete: athlete,
          totalRuns: this.totalRuns,
          activities: this.activities,
          kudos: this.kudos,
        }));
      });

  createStravaRequest = (path, options = {}) =>
    fetch(`${targetApi}${path}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${this.accessToken}`,
      },
    }).then(res => res.json());

  getAuthenticatedAthelete = () => this.createStravaRequest('/athlete');

  getZones = () => this.createStravaRequest('/athlete/zones');

  getAthleteStats = () =>
    this.createStravaRequest(`/athletes/${this.currentAthlete.id}/stats`);

  getActivities = (page = 1) =>
    this.createStravaRequest(`/athlete/activities?page=${page}&per_page=100`);

  getActivityDetails = id => this.createStravaRequest(`/activities/${id}`);

  getKudosers = activityId =>
    this.createStravaRequest(`/activities/${activityId}/kudos`);

  getLaps = activityId =>
    this.createStravaRequest(`/activities/${activityId}/laps`);

  getRoutes = () =>
    this.createStravaRequest(`/athletes/${this.currentAthlete.id}/routes`);

  getRaces = () => this.createStravaRequest('/running_races');
}
