import { exerciseInfo } from '@/lib/constants';

function getDayOfWeek(date) {
  const dayOfWeek = new Date(date).getDay();
  return isNaN(dayOfWeek)
    ? null
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][dayOfWeek];
}

export function setToMonday(date) {
  var day = date.getDay() || 7;
  if (day !== 1) date.setHours(-24 * (day - 1));
  date.setHours(0, 0, 0, 0);
  return date;
}

export function generateInsights(logs) {
  const timingInsights = [
    'You are exercising close to bedtime on some days. Although exercising is good, doing so too close to sleep can cause difficulty sleeping due to heartrate disruptions.',
    'You are exercising at different times everyday. Try to pick one time and stick with it to build a routine, this way you are more likely to keep exercising in the long term.',
  ];
  const frequencyInsights = [
    'You did not exercise at all this week! Get yourself started by just exercising for 5 minutes on one day - it will be easier after that.',
    'It seems like you are not exercising consistently. Follow the Never Skip Twice rule by always exercising at least once every two days',
  ];
  const generalInsights = [
    'Try to make exercising more enjoyable for you: read about it, listen to podcasts while working out, or give yourself rewards',
    'Make it easier to start exercising by downloading fitness apps or getting membership at a gym close to your home',
    'Get yourself an accountability partner, like a colleague, friend, or family member, to make sure you are exercising',
    'Follow the two-minute rule: just tell yourself you will exercise for 2 minutes! This makes it easier to get started and you will always end up doing more',
  ];

  var late = false;
  var calories = 0;
  logs.forEach(function (log) {
    var type = log.type;
    var hours =
      Math.abs(new Date(log.endDateTime) - new Date(log.startDateTime)) / 36e5;
    calories += hours * exerciseInfo[type].calories;
    console.log(type, hours, calories);
    if (new Date(log.endDateTime).getHours >= 22) {
      late = true;
    }
  });
  const caloriesInsight = `You burned ${calories} calories from exercising this week. If you want to burn more, try to do more running, hiking, and HIIT`;

  var insights = [
    caloriesInsight,
    generalInsights[Math.floor(Math.random() * 3)],
  ];

  if (!logs) {
    insights.push(frequencyInsights[0]);
  }
  if (late) {
    insights.push(timingInsights[0]);
  }

  return insights;
}

export function turnDataToTableFormat(logs, resolution) {
  var table = [
    [
      'Day',
      'Target',
      'Average',
      'Walking',
      'Running',
      'Cycling',
      'Rowing',
      'HIIT',
      'Hiking',
      'Yoga',
      'Dancing',
      'Strength Training',
      'Swimming',
    ],
    ['Mon', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ['Tue', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ['Wed', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ['Thu', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ['Fri', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ['Sat', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ['Sun', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const row_head = table.map(function (x) {
    return x[0];
  });

  let total = 0;
  logs.forEach(function (log) {
    var type = log.type;
    var day = getDayOfWeek(log.startDateTime);
    var hours =
      Math.abs(new Date(log.endDateTime) - new Date(log.startDateTime)) / 36e5;
    var i = row_head.indexOf(day);
    var j = table[0].indexOf(type);
    table[i][j] += hours;
    total += hours;
  });

  var target = 0;

  if (resolution.frequency === 'day' && resolution.units == 'minutes') {
    target = (resolution.quantity * 7) / 60;
  } else if (resolution.frequency === 'day' && resolution.units == 'hours') {
    target = resolution.quantity * 7;
  } else if (resolution.frequency === 'week' && resolution.units == 'minutes') {
    target = resolution.quantity / 60;
  } else if (resolution.frequency === 'week' && resolution.units == 'hours') {
    target = resolution.quantity;
  } else if (
    resolution.frequency === 'month' &&
    resolution.units == 'minutes'
  ) {
    target = ((resolution.quantity / 30) * 7) / 60;
  } else if (resolution.frequency === 'month' && resolution.units == 'hours') {
    target = (resolution.quantity / 30) * 7;
  }

  var avg = total / 7;
  let i = 1;
  while (i < 8) {
    table[i][2] = avg;
    table[i][1] = target;
    i++;
  }
  return table;
}
