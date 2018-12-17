import {
  countBy,
  differenceBy,
  find,
  flatten,
  head,
  map,
  mapKeys,
  mapValues,
  maxBy,
  orderBy,
  uniqBy,
  values,
  without,
} from 'lodash-es';
import { useEffect, useState } from 'react';
import StravaAPI from '../strava';

export default token => {
  const [stravaApi] = useState(new StravaAPI());
  const [isReady, setIsReady] = useState(false);
  const [longestRun, setLongestRun] = useState(undefined);
  const [fastestRun, setFastestRun] = useState(undefined);
  const [topKudosers, setTopKudosers] = useState([]);
  const [biggestFan, setBiggestFan] = useState(undefined);
  const [profilePicture, setProfilePicture] = useState(undefined);
  const [fullName, setFullName] = useState(undefined);
  const [totalRuns, setTotalRuns] = useState(undefined);
  const [athleteId, setAthleteId] = useState(undefined);
  const [matchingRunsByBestEfforts, setMatchingRunsByBestEfforts] = useState(
    undefined
  );
  const [
    matchingRunsByHighestBestEfforts,
    setMatchingRunsByHighestBestEfforts,
  ] = useState(undefined);
  const [matchingRunsBySegments, setMatchingRunsBySegments] = useState(
    undefined
  );
  const [
    matchingRunsBySegmentGroups,
    setMatchingRunsBySegmentGroups,
  ] = useState(undefined);

  useEffect(
    () => {
      stravaApi
        .init(token)
        .then(({ currentAthlete, activities, kudos, totalRuns }) => {
          // Strava ID
          setAthleteId(currentAthlete.id);

          // URL to Profile picture
          setProfilePicture(currentAthlete.profile);

          // Full name
          setFullName(`${currentAthlete.firstname} ${currentAthlete.lastname}`);

          // Total stats
          setTotalRuns(totalRuns);

          // Array of all kudosers
          const allKudosers = uniqBy(
            flatten(values(kudos)),
            kudoser => kudoser.id
          );

          // All kudosers sorted by kudos count
          const _topKudosers = orderBy(
            map(
              countBy(flatten(values(kudos)), kudoser => kudoser.id),
              (value, key) => {
                const kudoser = find(allKudosers, kudoser => {
                  return kudoser.id.toString() === key;
                });
                return {
                  ...kudoser,
                  kudosCount: value,
                };
              }
            ),
            'kudosCount',
            'desc'
          );
          setTopKudosers(_topKudosers);

          // Biggest fan / Top kudoser
          setBiggestFan(head(_topKudosers));

          // Longest run (highest distance)
          setLongestRun(head(orderBy(activities, 'distance', 'desc')));

          // Fastest run (fastest pace)
          setFastestRun(head(orderBy(activities, 'average_speed', 'desc')));

          // Runs matched by highest best efforts
          const allBestEfforts = orderBy(
            uniqBy(
              flatten(
                map(activities, ({ best_efforts }) =>
                  best_efforts.map(({ name, distance }) => ({
                    name,
                    distance,
                  }))
                )
              ),
              b => b.distance
            ),
            'distance',
            'asc'
          );
          setMatchingRunsByHighestBestEfforts({
            ...mapValues(mapKeys(allBestEfforts, v => v.distance), be =>
              values(activities).filter(
                ({ best_efforts }) =>
                  maxBy(best_efforts, be2 => be2.distance).distance ===
                  be.distance
              )
            ),
          });
          // Runs matched by best efforts
          setMatchingRunsByBestEfforts({
            ...mapValues(mapKeys(allBestEfforts, v => v.distance), be =>
              values(activities).filter(({ best_efforts }) =>
                best_efforts.some(be2 => be2.distance === be.distance)
              )
            ),
          });

          // Runs matched by segments
          const allSegments = orderBy(
            uniqBy(
              flatten(
                map(activities, ({ segment_efforts }) => segment_efforts)
              ),
              ({ segment: { id } }) => id
            ),
            'distance',
            'asc'
          );
          setMatchingRunsBySegments({
            ...mapValues(mapKeys(allSegments, v => v.segment.id), seg =>
              values(activities).filter(({ segment_efforts }) =>
                segment_efforts.some(seg2 => seg2.segment.id === seg.segment.id)
              )
            ),
          });

          // Runs matched by segment groups
          let activitiesPool = [...values(activities)];
          let groups = {};

          const doesActivitySegmentsMatch = (activity1, activity2) => {
            const segments1 = activity1.segment_efforts;
            const segments2 = activity2.segment_efforts;
            const uniqueSegments = uniqBy(
              [...segments1, ...segments2],
              ({ segment: { id } }) => id
            );
            const differences = uniqBy(
              [
                ...differenceBy(
                  segments1,
                  segments2,
                  ({ segment: { id } }) => id
                ),
                ...differenceBy(
                  segments2,
                  segments1,
                  ({ segment: { id } }) => id
                ),
              ],
              ({ segment: { id } }) => id
            );
            return differences.length / uniqueSegments.length < 0.9;
          };

          for (const a1 of values(activities)) {
            let newGroup = [];
            for (const a2 of activitiesPool) {
              if (doesActivitySegmentsMatch(a1, a2)) {
                newGroup.push(a2);
              }
            }
            activitiesPool = without(activitiesPool, ...newGroup);
            if (newGroup.length > 0) {
              groups[a1.id] = newGroup;
            }
          }
          setMatchingRunsBySegmentGroups(groups);

          // Strava loaded!
          setIsReady(true);
        });
    },
    [token]
  );

  return {
    isReady,
    athleteId,
    profilePicture,
    fullName,
    longestRun,
    fastestRun,
    topKudosers,
    biggestFan,
    totalRuns,
    matchingRunsByBestEfforts,
    matchingRunsByHighestBestEfforts,
    matchingRunsBySegments,
    matchingRunsBySegmentGroups,
  };
};
