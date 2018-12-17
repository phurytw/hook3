const flattenMessages = (nestedMessages, prefix = '') => {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    let value = nestedMessages[key];
    let prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
};

export default {
  'en-US': flattenMessages({
    introduction: {
      title:
        'Welcome to Hook3! A Strava performance analyzer created using React hooks and D3!',
      description:
        'Get pointless statistics about you such as: <div>Your performance over time on matching group of segments!</div><div>Your name!</div>',
      getStartedButton: "Let's get started!",
    },
    header: {
      hello: 'Hi {name}!',
    },
    footer: {
      source: 'Source code',
    },
    summary: {
      mostFrequentRunsTitle: 'Your most frequent runs',
      topKudosersTitle: 'People who give you the most kudos',
    },
    highlights: {
      longestRunTitle: 'Your longest run was <strong>{run}</strong>',
      longestRunHighlight: '{distance} kilometers',
      longestRunSubtitle: 'Done on ',
      mostFrequentRunTitle: 'Your most frequent run is <strong>{run}</strong>',
      mostFrequentRunHighlight: '{count} times',
      mostFrequentRunSubtitle: 'Last run on ',
      biggestFanTitle: 'Your biggest fan is <strong>{fan}</strong>',
      biggestFanSubtitle: '{kudos} total kudos!',
      totalRunsTitle: 'You have a total of',
      totalRunsHighlight: '{runs} runs',
      totalRunsSubtitle: 'so far!',
    },
    runComparison: {
      evolutionOverTime: 'Evolution over time',
      speedComparison: 'Speed comparison',
      distanceComparison: 'Distance comparison',
    },
    chartDistanceComparison: {
      meters: 'meters',
    },
  }),
  'fr-FR': flattenMessages({
    introduction: {
      title:
        'Bienvenue Hook3! Un analyseur de performance Strava créé avec React hooks et D3!',
      description:
        "Des statistiques inutiles pour toi comme: <div>Ta performance sur des groupes de segments (regroupés par cette sublime application) !</div><div>Ton nom (au cas où tu l'aurais oublié) !</div>",
      getStartedButton: "C'est parti !",
    },
    header: {
      hello: 'Salut {name} !',
    },
    footer: {
      source: 'Code source',
    },
    summary: {
      mostFrequentRunsTitle: 'Tes courses les plus fréquentes',
      topKudosersTitle: 'Ceux qui te donnent le plus de kudos !',
    },
    highlights: {
      longestRunTitle: 'Ta plus longue course est <strong>{run}</strong>',
      longestRunHighlight: '{distance} kilomètres',
      longestRunSubtitle: 'Couru le ',
      mostFrequentRunTitle:
        'Ta course la plus fréquente est <strong>{run}</strong>',
      mostFrequentRunHighlight: '{count} fois',
      mostFrequentRunSubtitle: 'Couru pour la dernière fois le ',
      biggestFanTitle: 'Ton plus grand fan est <strong>{fan}</strong>',
      biggestFanSubtitle: 'Un total de {kudos} kudos!',
      totalRunsTitle: 'Tu as couru',
      totalRunsHighlight: '{runs} fois',
      totalRunsSubtitle: 'au total !',
    },
    runComparison: {
      evolutionOverTime: 'Evolution sur la durée',
      speedComparison: 'Comparaison de vitesse',
      distanceComparison: 'Comparaison de distance',
    },
    chartDistanceComparison: {
      meters: 'mètres',
    },
  }),
};
