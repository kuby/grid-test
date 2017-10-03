import React from 'react'

import Item1 from './Item1'
import Item2 from './Item2'
import Item3 from './Item3'
import Item4 from './Item4'
import Item5 from './Item5'
import Item6 from './Item6'
import Item7 from './Item7'

/**
 * Every component which you want to use in the grid layout must be imported and returned in this file.
 * Each component have a custom key which must be set manually. The keys must be unique!
 */

export const getComponentById = (id) => {
  let comp

  switch (id) {
    case 'item1':
      comp = <Item1 />
      break;
    case 'item2':
      comp = <Item2 />
      break;
    case 'item3':
      comp = <Item3 />
      break;
    case 'item4':
      comp = <Item4 />
      break;
    case 'item5':
      comp = <Item5 />
      break;
    case 'item6':
      comp = <Item6 />
      break;
    case 'item7':
      comp = <Item7 />
      break;
    default:
      comp = null
  }

  return comp
}