import { useState } from 'react';

import Section from './Section/Section';
import Options from './Options/Options';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

import { initFeedback } from '../initValues/feedback';

export const App = () => {
  const [votes, setVotes] = useState(initFeedback);
  const total = Object.values(votes).reduce((total, value) => {
    return (total += value);
  }, 0);

  const increaseFeedback = name => {
    setVotes(prevVotes => {
      return { ...prevVotes, [name]: prevVotes[name] + 1 };
    });
  };

  const calcPercent = name => {
    return total === 0 ? 0 : Math.floor((votes[name] / total) * 100);
  };

  const positiveFeedback = calcPercent('good');

  return (
    <>
      <Section title="Please leave feedback">
        <Options
          options={Object.keys(votes)}
          onLeaveFeedback={increaseFeedback}
        />
      </Section>
      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={votes.good}
            neutral={votes.neutral}
            bad={votes.bad}
            total={total}
            positivePercentage={positiveFeedback}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
};