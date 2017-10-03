import React from 'react'

const styles = {
  background: '#cc7b2b',
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
      <span style={{ background: '#27cc67', width: '100%', padding: '5px', color: '#fff' }}>{'Item 1'}</span>
    </span>
  )
}
