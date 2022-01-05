import { useEffect, useState } from 'react';
import './App.css';
import data from './data';
import { FaQuoteRight } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if(index < 0) {
      setIndex(lastIndex);
    }

    if(index > lastIndex) {
      setIndex(0)
    }
  },[index, people])

  useEffect(() => {
   let slider = setInterval(() => {
      setIndex(index + 1)
    },3000)
    return () => clearInterval(slider);
  },[index])

  const checkNumber = (number) => {
    if (number > people.length - 1) {
      return 0
    }

    if (number < 0) {
      return people.length - 1;
    }
    return number;
  }

  const nextHandler = () => {
    setIndex(index => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    })
  }

  const prevHandler = () => {
    setIndex(index => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    })
  }



  return (
    <div className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
        <div className="underline"></div>
      </div>
      <div className="section-center">
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;
          // more stuff coming up
          let position = 'nextSlide';

          if (personIndex === index) {
            position = 'activeSlide'
          }

          if(personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)) {
            position = 'lastSlide';
          }

          return <article className={position} key={id}>
            <img src={image} alt={name} className='person-img' />
            <h4>{name}</h4>
            <p className='title'>{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon" />
          </article>
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default App;
