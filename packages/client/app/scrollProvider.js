import React, { useState } from 'react'

const scrollContext = React.createContext({})

const { Provider, Consumer } = scrollContext

const withScroll = Component => {
  console.log('in withScroll');
  const C = props => (
    <Consumer>
      {(providerProps) => <Component {...providerProps} {...props} />}
    </Consumer>
  )

  return C
}

const ScrollProvider = ({ children }) => { 
  console.log('in ScrollProvider');
  const [scrollProvider, setScrollProvider] = useState(null)

  const createScrollProvider  = () => {
    console.log('createScrollProvider ');
  }

  return (
    <Provider value={{ scrollProvider, createScrollProvider  }}>
        {children}  
    </Provider>
)
}

export {
  Consumer as ScrollConsumer,
  ScrollProvider,
  withScroll,
}

export default scrollContext
