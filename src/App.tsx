import { FC, useEffect, useState } from 'react';
import './App.css';
import { get } from 'http';

export const App: FC = () => {

  const [userWords, setUserWords] = useState<Array<string>>([]);
  const [isError, setIsError] = useState(false);
  const [correctWord, setCorrectWord] = useState('');
  const [currentUserWord, setCurrentUserWord] = useState('');


  const getCorrectWord = async () => {
    try {
      const response = await fetch('https://lustrous-pudding-ec2574.netlify.app/api/random-words');
      const wordData = await response.json();
      console.log("word", wordData.word)
      setCorrectWord(wordData.word);

    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  } 

  useEffect(() => {
    getCorrectWord();
  }, []);

  useEffect(() => {
    const getKey = (event: KeyboardEvent) => {
      console.log("event", event);
      console.log("key", event.key)
      const letter = event.key

      if (letter === 'Enter') {
        userWords.push(currentUserWord)
        setUserWords([...userWords])
        return
      }
      setCurrentUserWord((word) => word + letter);

    }

    document.addEventListener("keyup", getKey);

    return () => {
        document.removeEventListener("keyup", getKey)
    }
  }, [userWords, currentUserWord]);

  return (
    <div className="wordle">
      {correctWord}
      User input: {currentUserWord}
    </div>
  );
}

