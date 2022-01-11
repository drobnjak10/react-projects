import React from 'react'
import { useGlobalContext } from '../context'
import Cocktail from './Cocktail';
import Loading from './Loading';

function CocktailList() {
    const {cocktails, loading} = useGlobalContext();
    
    if(loading) {
      return <Loading />
    }

    if(cocktails && cocktails.length < 1) {
      return <h2 className='section-title'>
      no cocktails matched your search criteria
    </h2>
      
    }
    
    return <section className='section'>
    <h2 className='section-title'>cocktails</h2>
    <div className='cocktails-center'>
      {cocktails && cocktails.length > 0 && cocktails.map((item,index) => {
        return <Cocktail key={index} {...item} />
      })}
    </div>
  </section>
}

export default CocktailList
