import React from 'react'

const styles = {
  background: '#5acc71',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
}

export default () => {
  return(
    <span className="text" style={styles}>
      <span style={{ background: '#2075cc', width: '100%', padding: '5px', color: '#fff' }}>{'Item 4'}</span>
    </span>
  )
}
